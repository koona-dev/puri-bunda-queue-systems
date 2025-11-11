import { Inject } from "@nestjs/common";
import { eq, SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DBSchemaType } from "src/database/schemas";
import { doctors } from "src/database/schemas/master.schema";
import { generateCode } from "src/utils/generate-code";
import {
  CreateDoctor,
  Doctors,
  DoctorsProps,
  UpdateDoctor,
} from "../entities/doctors.entity";

class DoctorsService {
  constructor(@Inject("DB_PG") private db: NodePgDatabase<DBSchemaType>) {}

  // ===========[Queries]===========
  async findById(id: string): Promise<Doctors | null> {
    const doctorRecord = await this.db.query.doctors.findFirst({
      where: (doctor, { eq }) => eq(doctor.id, id),
    });

    if (!doctorRecord) {
      return null;
    }

    return doctorRecord;
  }

  async findOne(query: DoctorsProps): Promise<Doctors | null> {
    const doctorRecord = await this.db.query.doctors.findFirst({
      where: (doctor, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(doctor.id, query.id));
        if (query.code) conditions.push(eq(doctor.code, query.code));
        if (query.name) conditions.push(eq(doctor.name, query.name));
        if (query.specialization)
          conditions.push(eq(doctor.specialization, query.specialization));
        if (query.isActive)
          conditions.push(eq(doctor.isActive, query.isActive));
        if (query.createdAt)
          conditions.push(eq(doctor.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    if (!doctorRecord) {
      return null;
    }

    return doctorRecord;
  }

  async findMany(query: DoctorsProps): Promise<Doctors[]> {
    const doctorList = await this.db.query.doctors.findMany({
      where: (doctor, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(doctor.id, query.id));
        if (query.code) conditions.push(eq(doctor.code, query.code));
        if (query.name) conditions.push(eq(doctor.name, query.name));
        if (query.specialization)
          conditions.push(eq(doctor.specialization, query.specialization));
        if (query.isActive)
          conditions.push(eq(doctor.isActive, query.isActive));
        if (query.createdAt)
          conditions.push(eq(doctor.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    return doctorList;
  }

  // ===========[Commands]===========
  async create(data: CreateDoctor): Promise<Doctors | undefined> {
    try {
      const doctorData: Doctors = {
        ...data,
        code: await generateCode(this.db, doctors, doctors.code, "code", "DTR"),
        isActive: true,
      };

      const doctorRecord = await this.db
        .insert(doctors)
        .values(doctorData)
        .returning();

      return doctorRecord[0];
    } catch (error) {}
  }

  async update(data: UpdateDoctor): Promise<Doctors | undefined> {
    try {
      const doctorRecord = await this.db
        .update(doctors)
        .set(data)
        .where(eq(doctors.id, data.id))
        .returning();

      return doctorRecord[0];
    } catch (error) {}
  }

  async delete(id: string): Promise<boolean | undefined> {
    try {
      const doctorRecord = await this.db
        .delete(doctors)
        .where(eq(doctors.id, id))
        .returning();

      if (!doctorRecord) {
        return false;
      }
      return true;
    } catch (error) {}
  }
}

export default DoctorsService;
