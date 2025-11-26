import { Inject } from "@nestjs/common";
import { and, asc, eq, sql, SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DBSchemaType } from "src/database/schemas";

import { toEnum } from "src/utils/converter";
import { generateCode } from "src/utils/generate-code";
import {
  CreateQueue,
  PatientQueueDetails,
  Queues,
  QueuesProps,
  UpdateQueue,
} from "./entities/queues.entity";
import { Priority } from "./utils/priority.enum";
import { QueueType } from "./utils/queue-type.enum";
import { ReferenceType } from "./utils/reference-type.enum";
import { ServiceType } from "./utils/service-type";
import { QueueStatus } from "./utils/queue-status.enum";
import { queueCalls, queues } from "src/database/schemas/queue.schema";
import { Patients } from "../master/entities/patients.entity";
import { PatientClass } from "../master/utils/patient-class.enum";
import { PatientType } from "../master/utils/patient-type.enum";
import { Gender } from "../master/utils/gender.enum";

class QueuesService {
  constructor(@Inject("DB_PG") private db: NodePgDatabase<DBSchemaType>) {}

  // ===========[Queries]===========

  async findOne(query: QueuesProps): Promise<PatientQueueDetails | null> {
    const queueRecord = await this.db.query.queues.findFirst({
      with: {
        calls: true,
        patient: true,
        staff: true,
        clinic: true,
        doctor: true,
      },
      where: (queue, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(queue.id, query.id));
        if (query.patientId)
          conditions.push(eq(queue.patientId, query.patientId));
        if (query.clinicId) conditions.push(eq(queue.clinicId, query.clinicId));
        if (query.doctorId) conditions.push(eq(queue.doctorId, query.doctorId));
        if (query.staffId) conditions.push(eq(queue.staffId, query.staffId));
        if (query.queueNumber)
          conditions.push(eq(queue.queueNumber, query.queueNumber));
        if (query.createdAt)
          conditions.push(eq(queue.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    if (!queueRecord) {
      return null;
    }

    const { calls, patient, staff, clinic, doctor, ...queue } = queueRecord;

    const patientEntity: Patients = {
      ...patient,
      patientClass: toEnum(patient.patientClass, Object.values(PatientClass)),
      patientType: toEnum(patient.patientType, Object.values(PatientType)),
      gender: toEnum(patient.gender, Object.values(Gender)),
    };

    const queueEntity: Queues = {
      ...queue,
      priority: toEnum(queue.priority, Object.values(Priority)),
      queueType: toEnum(queue.queueType, Object.values(QueueType)),
      referenceType: toEnum(queue.referenceType, Object.values(ReferenceType)),
      serviceType: toEnum(queue.serviceType, Object.values(ServiceType)),
      status: toEnum(queue.status, Object.values(QueueStatus)),
    };

    return {
      queue: queueEntity,
      queueCall: calls[0],
      patient: patientEntity,
      staff,
      clinic,
      doctor,
    };
  }

  async findMany(query: QueuesProps): Promise<PatientQueueDetails[]> {
    const queueList = await this.db.query.queues.findMany({
      with: {
        calls: true,
        patient: true,
        staff: true,
        clinic: true,
        doctor: true,
      },
      where: (queue, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.queueType)
          conditions.push(eq(queue.queueType, query.queueType));
        if (query.priority) conditions.push(eq(queue.priority, query.priority));
        if (query.serviceType)
          conditions.push(eq(queue.serviceType, query.serviceType));
        if (query.referenceType)
          conditions.push(eq(queue.referenceType, query.referenceType));
        if (query.reservationDate)
          conditions.push(eq(queue.reservationDate, query.reservationDate));
        if (query.status) conditions.push(eq(queue.status, query.status));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      orderBy: (queue, { asc }) => [
        sql`
    CASE 
      WHEN ${queue.priority} = ${Priority.Emergency} THEN 0
      WHEN ${queue.priority} = ${Priority.Urgent} THEN 1
      ELSE 2 
    END
  `,
        sql`
    CASE 
      WHEN ${queue.serviceType} = ${ServiceType.ugd} THEN 0
      WHEN ${queue.serviceType} = ${ServiceType.rawatInap} THEN 1
      WHEN ${queue.serviceType} = ${ServiceType.rawatJalan} THEN 2
      ELSE 3
    END
  `,
        asc(queue.reservationDate),
        asc(queue.preferredTime),
      ],
    });

    const queueListEntity = queueList.map((record) => {
      const { calls, patient, staff, clinic, doctor, ...queue } = record;

      const patientEntity: Patients = {
        ...patient,
        patientClass: toEnum(patient.patientClass, Object.values(PatientClass)),
        patientType: toEnum(patient.patientType, Object.values(PatientType)),
        gender: toEnum(patient.gender, Object.values(Gender)),
      };

      const queueEntity: Queues = {
        ...queue,
        priority: toEnum(queue.priority, Object.values(Priority)),
        queueType: toEnum(queue.queueType, Object.values(QueueType)),
        referenceType: toEnum(
          queue.referenceType,
          Object.values(ReferenceType)
        ),
        serviceType: toEnum(queue.serviceType, Object.values(ServiceType)),
        status: toEnum(queue.status, Object.values(QueueStatus)),
      };

      return {
        queue: queueEntity,
        queueCall: calls[0],
        patient: patientEntity,
        staff,
        clinic,
        doctor,
      };
    });

    return queueListEntity;
  }

  // ===========[Commands]===========
  async create(data: CreateQueue): Promise<Queues | undefined> {
    try {
      const queueData: Queues = {
        ...data,
        queueNumber: await generateCode(
          this.db,
          queues,          
          "queueNumber",
          data.queueType.charAt(0)
        ),
        status: QueueStatus.Waiting,
      };

      const queueRecord = await this.db
        .insert(queues)
        .values(queueData)
        .returning();

      console.log(queueRecord[0]);

      if (!queueRecord[0]) return;

      const queueEntity: Queues = {
        ...queueRecord[0],
        priority: toEnum(queueRecord[0].priority, Object.values(Priority)),
        queueType: toEnum(queueRecord[0].queueType, Object.values(QueueType)),
        referenceType: toEnum(
          queueRecord[0].referenceType,
          Object.values(ReferenceType)
        ),
        serviceType: toEnum(
          queueRecord[0].serviceType,
          Object.values(ServiceType)
        ),
        status: toEnum(queueRecord[0].status, Object.values(QueueStatus)),
      };

      return queueEntity;
    } catch (error) {}
  }

  async update(data: UpdateQueue): Promise<Queues | undefined> {
    try {
      let obj: any = data;

      if (data.status === QueueStatus.Done) {
        {
          obj = {
            ...data,
            status: data.status,
            completedAt: new Date(),
          };
        }
      }

      const queueRecord = await this.db
        .update(queues)
        .set(obj)
        .where(eq(queues.id, data.id))
        .returning();

      if (queueRecord[0].status == QueueStatus.Done) {
        const nextQueue = await this._getNextQueue();

        await this.db
          .update(queues)
          .set({ status: QueueStatus.Called, calledAt: new Date() })
          .where(and(eq(queues.id, nextQueue?.id!)));

        await this.db
          .insert(queueCalls)
          .values({ queueId: nextQueue?.id!, staffId: nextQueue?.staffId! });
      }

      const queueEntity: Queues = {
        ...queueRecord[0],
        priority: toEnum(queueRecord[0].priority, Object.values(Priority)),
        queueType: toEnum(queueRecord[0].queueType, Object.values(QueueType)),
        referenceType: toEnum(
          queueRecord[0].referenceType,
          Object.values(ReferenceType)
        ),
        serviceType: toEnum(
          queueRecord[0].serviceType,
          Object.values(ServiceType)
        ),
        status: toEnum(queueRecord[0].status, Object.values(QueueStatus)),
      };

      return queueEntity;
    } catch (error) {}
  }

  async delete(id: string): Promise<boolean | undefined> {
    try {
      const queueRecord = await this.db
        .delete(queues)
        .where(eq(queues.id, id))
        .returning();

      if (!queueRecord) {
        return false;
      }
      return true;
    } catch (error) {}
  }

  private async _getNextQueue(): Promise<Queues | null> {
    const waitingQueuesList = await this.db
      .select()
      .from(queues)
      .where(and(eq(queues.status, QueueStatus.Waiting)))
      .orderBy(
        sql`
    CASE 
      WHEN ${queues.priority} = ${Priority.Emergency} THEN 0
      WHEN ${queues.priority} = ${Priority.Urgent} THEN 1
      ELSE 2 
    END
  `,
        sql`
    CASE 
      WHEN ${queues.serviceType} = ${ServiceType.ugd} THEN 0
      WHEN ${queues.serviceType} = ${ServiceType.rawatInap} THEN 1
      WHEN ${queues.serviceType} = ${ServiceType.rawatJalan} THEN 2
      ELSE 3
    END
  `,
        asc(queues.reservationDate),
        asc(queues.preferredTime)
      );

    if (waitingQueuesList.length === 0) {
      return null;
    }

    // Separate by type (after priority)
    const reservation = waitingQueuesList.filter(
      (q) => q.queueType === QueueType.Reservation
    );
    const walkin = waitingQueuesList.filter(
      (q) => q.queueType === QueueType.Walkin
    );

    // Implement 2R:1W algorithm
    const result: any[] = [];
    let rIndex = 0;
    let wIndex = 0;

    while (rIndex < reservation.length || wIndex < walkin.length) {
      // Add 2 reservation
      if (rIndex < reservation.length) result.push(reservation[rIndex++]);
      if (rIndex < reservation.length) result.push(reservation[rIndex++]);

      // Add 1 walkin
      if (wIndex < walkin.length) result.push(walkin[wIndex++]);
    }

    if (result.length === 0) {
      return null;
    }

    const queueEntity: Queues = {
      ...result[0],
      priority: toEnum(result[0].priority, Object.values(Priority)),
      queueType: toEnum(result[0].queueType, Object.values(QueueType)),
      referenceType: toEnum(
        result[0].referenceType,
        Object.values(ReferenceType)
      ),
      serviceType: toEnum(result[0].serviceType, Object.values(ServiceType)),
      status: toEnum(result[0].status, Object.values(QueueStatus)),
      queueCall: result[0].calls[0],
    };

    return queueEntity;
  }
}

export default QueuesService;
