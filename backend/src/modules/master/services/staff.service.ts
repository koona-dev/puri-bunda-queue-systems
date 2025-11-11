import { Inject } from "@nestjs/common";
import { eq, SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DBSchemaType } from "src/database/schemas";
import { staff } from "src/database/schemas/master.schema";
import { generateCode } from "src/utils/generate-code";
import {
  CreateStaff,
  Staff,
  StaffProps,
  UpdateStaff,
} from "../entities/staff.entity";

class StaffService {
  constructor(@Inject("DB_PG") private db: NodePgDatabase<DBSchemaType>) {}

  // ===========[Queries]===========
  async findById(id: string): Promise<Staff | null> {
    const staffRecord = await this.db.query.staff.findFirst({
      where: (staff, { eq }) => eq(staff.id, id),
    });

    if (!staffRecord) {
      return null;
    }

    return staffRecord;
  }

  async findOne(query: StaffProps): Promise<Staff | null> {
    const staffRecord = await this.db.query.staff.findFirst({
      where: (staff, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(staff.id, query.id));
        if (query.code) conditions.push(eq(staff.code, query.code));
        if (query.email) conditions.push(eq(staff.email, query.email));
        if (query.nik) conditions.push(eq(staff.nik, query.nik));
        if (query.name) conditions.push(eq(staff.name, query.name));
        if (query.address) conditions.push(eq(staff.address, query.address));
        if (query.loketNumber)
          conditions.push(eq(staff.loketNumber, query.loketNumber));
        if (query.phone) conditions.push(eq(staff.phone, query.phone));
        if (query.isActive) conditions.push(eq(staff.isActive, query.isActive));
        if (query.createdAt)
          conditions.push(eq(staff.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    if (!staffRecord) {
      return null;
    }

    return staffRecord;
  }

  async findMany(query: StaffProps): Promise<Staff[]> {
    const staffList = await this.db.query.staff.findMany({
      where: (staff, { eq, and }) => {
        const conditions: SQL[] = [];

        if (query.id) conditions.push(eq(staff.id, query.id));
        if (query.code) conditions.push(eq(staff.code, query.code));
        if (query.email) conditions.push(eq(staff.email, query.email));
        if (query.nik) conditions.push(eq(staff.nik, query.nik));
        if (query.name) conditions.push(eq(staff.name, query.name));
        if (query.address) conditions.push(eq(staff.address, query.address));
        if (query.loketNumber)
          conditions.push(eq(staff.loketNumber, query.loketNumber));
        if (query.phone) conditions.push(eq(staff.phone, query.phone));
        if (query.isActive) conditions.push(eq(staff.isActive, query.isActive));
        if (query.createdAt)
          conditions.push(eq(staff.createdAt, query.createdAt));

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    return staffList;
  }

  // ===========[Commands]===========
  async create(data: CreateStaff): Promise<Staff | undefined> {
    try {
      const staffData: Staff = {
        ...data,
        isActive: true,

        code: await generateCode(this.db, staff, staff.code, "code", "STF"),
      };

      const staffRecord = await this.db
        .insert(staff)
        .values(staffData)
        .returning();

      return staffRecord[0];
    } catch (error) {}
  }

  async update(data: UpdateStaff): Promise<Staff | undefined> {
    try {
      const staffRecord = await this.db
        .update(staff)
        .set(data)
        .where(eq(staff.id, data.id))
        .returning();

      return staffRecord[0];
    } catch (error) {}
  }

  async delete(id: string): Promise<boolean | undefined> {
    try {
      const staffRecord = await this.db
        .delete(staff)
        .where(eq(staff.id, id))
        .returning();

      if (!staffRecord) {
        return false;
      }
      return true;
    } catch (error) {}
  }
}

export default StaffService;
