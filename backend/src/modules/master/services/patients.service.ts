import { Inject } from "@nestjs/common";
import { eq, SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DBSchemaType } from "src/database/schemas";
import {
  CreatePatient,
  Patients,
  PatientsProps,
  UpdatePatient,
} from "../entities/patients.entity";
import { toEnum } from "src/utils/converter";
import { Gender } from "../utils/gender.enum";
import { patients } from "src/database/schemas/master.schema";
import { generateCode } from "src/utils/generate-code";
import { PatientClass } from "../utils/patient-class.enum";
import { PatientType } from "../utils/patient-type.enum";

class PatientsService {
  constructor(@Inject("DB_PG") private db: NodePgDatabase<DBSchemaType>) {}

  // ===========[Queries]===========
  async findById(id: string): Promise<Patients | null> {
    const patientRecord = await this.db.query.patients.findFirst({
      where: (patient, { eq }) => eq(patient.id, id),
    });

    if (!patientRecord) {
      return null;
    }

    const patientEntity: Patients = {
      ...patientRecord,
      patientClass: toEnum(
        patientRecord.patientClass,
        Object.values(PatientClass)
      ),
      patientType: toEnum(
        patientRecord.patientType,
        Object.values(PatientType)
      ),
      gender: toEnum(patientRecord.gender, Object.values(Gender)),
    };

    return patientEntity;
  }

  async findOne(query: PatientsProps): Promise<Patients | null> {
    const patientRecord = await this.db.query.patients.findFirst({
      where: (patient, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(patient.id, query.id));
        if (query.code) conditions.push(eq(patient.code, query.code));
        if (query.registrationNumber)
          conditions.push(
            eq(patient.registrationNumber, query.registrationNumber)
          );
        if (query.nik) conditions.push(eq(patient.nik, query.nik));
        if (query.name) conditions.push(eq(patient.name, query.name));
        if (query.assuranceCode)
          conditions.push(eq(patient.assuranceCode, query.assuranceCode));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    if (!patientRecord) {
      return null;
    }

    const patientEntity: Patients = {
      ...patientRecord,
      patientClass: toEnum(
        patientRecord.patientClass,
        Object.values(PatientClass)
      ),
      patientType: toEnum(
        patientRecord.patientType,
        Object.values(PatientType)
      ),
      gender: toEnum(patientRecord.gender, Object.values(Gender)),
    };

    return patientEntity;
  }

  async findMany(query: PatientsProps): Promise<Patients[]> {
    const patientList = await this.db.query.patients.findMany({
      where: (patient, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.name) conditions.push(eq(patient.name, query.name));
        if (query.birthDate)
          conditions.push(eq(patient.birthDate, new Date(query.birthDate)));
        if (query.gender) conditions.push(eq(patient.gender, query.gender));
        if (query.address) conditions.push(eq(patient.address, query.address));
        if (query.patientType)
          conditions.push(eq(patient.patientType, query.patientType));
        if (query.patientClass)
          conditions.push(eq(patient.patientClass, query.patientClass));
        if (query.haveAssurance)
          conditions.push(eq(patient.haveAssurance, query.haveAssurance));
        if (query.createdAt)
          conditions.push(eq(patient.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    const patientListEntity = patientList.map((record) => {
      return {
        ...record,
        patientClass: toEnum(record.patientClass, Object.values(PatientClass)),
        patientType: toEnum(record.patientType, Object.values(PatientType)),
        gender: toEnum(record.gender, Object.values(Gender)),
      };
    });

    return patientListEntity;
  }

  // ===========[Commands]===========
  async create(data: CreatePatient): Promise<Patients | undefined> {
    try {
      const patientData: Patients = {
        ...data,
        code: await generateCode(this.db, patients, patients.code, "code", "PTN"),
        registrationNumber: await generateCode(
          this.db,
          patients,
          patients.registrationNumber,
          "registrationNumber",
          "REG"
        ),
      };

      const patientRecord = await this.db
        .insert(patients)
        .values(patientData)
        .returning();

      const patientEntity: Patients = {
        ...patientRecord[0],
        patientClass: toEnum(
          patientRecord[0].patientClass,
          Object.values(PatientClass)
        ),
        patientType: toEnum(
          patientRecord[0].patientType,
          Object.values(PatientType)
        ),
        gender: toEnum(patientRecord[0].gender, Object.values(Gender)),
      };

      return patientEntity;
    } catch (error) {}
  }

  async update(data: UpdatePatient): Promise<Patients | undefined> {
    try {
      const patientRecord = await this.db
        .update(patients)
        .set(data)
        .where(eq(patients.id, data.id))
        .returning();

      const patientEntity: Patients = {
        ...patientRecord[0],
        patientClass: toEnum(
          patientRecord[0].patientClass,
          Object.values(PatientClass)
        ),
        patientType: toEnum(
          patientRecord[0].patientType,
          Object.values(PatientType)
        ),
        gender: toEnum(patientRecord[0].gender, Object.values(Gender)),
      };

      return patientEntity;
    } catch (error) {}
  }

  async delete(id: string): Promise<boolean | undefined> {
    try {
      const patientRecord = await this.db
        .delete(patients)
        .where(eq(patients.id, id))
        .returning();

      if (!patientRecord) {
        return false;
      }
      return true;
    } catch (error) {}
  }
}

export default PatientsService;
