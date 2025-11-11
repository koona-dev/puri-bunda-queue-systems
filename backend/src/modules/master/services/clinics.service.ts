import { Inject } from "@nestjs/common";
import { eq, SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DBSchemaType } from "src/database/schemas";
import { clinics } from "src/database/schemas/master.schema";
import { generateCode } from "src/utils/generate-code";
import {
  Clinics,
  ClinicsProps,
  CreateClinic,
  UpdateClinic,
} from "../entities/clinics.entity";

class ClinicsService {
  constructor(@Inject("DB_PG") private db: NodePgDatabase<DBSchemaType>) {}

  // ===========[Queries]===========
  async findById(id: string): Promise<Clinics | null> {
    const clinicRecord = await this.db.query.clinics.findFirst({
      where: (clinic, { eq }) => eq(clinic.id, id),
    });

    if (!clinicRecord) {
      return null;
    }

    return clinicRecord;
  }

  async findOne(query: ClinicsProps): Promise<Clinics | null> {
    const clinicRecord = await this.db.query.clinics.findFirst({
      where: (clinic, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(clinic.id, query.id));
        if (query.code) conditions.push(eq(clinic.code, query.code));
        if (query.name) conditions.push(eq(clinic.name, query.name));
        if (query.isActive)
          conditions.push(eq(clinic.isActive, query.isActive));
        if (query.createdAt)
          conditions.push(eq(clinic.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    if (!clinicRecord) {
      return null;
    }

    return clinicRecord;
  }

  async findMany(query: ClinicsProps): Promise<Clinics[]> {
    const clinicList = await this.db.query.clinics.findMany({
      where: (clinic, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(clinic.id, query.id));
        if (query.code) conditions.push(eq(clinic.code, query.code));
        if (query.name) conditions.push(eq(clinic.name, query.name));
        if (query.isActive)
          conditions.push(eq(clinic.isActive, query.isActive));
        if (query.createdAt)
          conditions.push(eq(clinic.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    return clinicList;
  }

  // ===========[Commands]===========
  async create(data: CreateClinic): Promise<Clinics | undefined> {
    try {
      const clinicData: Clinics = {
        ...data,
        code: await generateCode(this.db, clinics, clinics.code, "code", "CLC"),
        isActive: true,
      };

      const clinicRecord = await this.db
        .insert(clinics)
        .values(clinicData)
        .returning();

      return clinicRecord[0];
    } catch (error) {}
  }

  async update(data: UpdateClinic): Promise<Clinics | undefined> {
    try {
      const clinicRecord = await this.db
        .update(clinics)
        .set(data)
        .where(eq(clinics.id, data.id))
        .returning();

      return clinicRecord[0];
    } catch (error) {}
  }

  async delete(id: string): Promise<boolean | undefined> {
    try {
      const clinicRecord = await this.db
        .delete(clinics)
        .where(eq(clinics.id, id))
        .returning();

      if (!clinicRecord) {
        return false;
      }
      return true;
    } catch (error) {}
  }
}

export default ClinicsService;
