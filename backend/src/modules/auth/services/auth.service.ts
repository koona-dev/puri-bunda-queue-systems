import { Inject } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DBSchemaType } from "src/database/schemas";
import { CreateStaff, Staff } from "../../master/entities/staff.entity";
import { Patients } from "../../master/entities/patients.entity";
import { toEnum } from "src/utils/converter";
import { Gender } from "../../master/utils/gender.enum";
import { PatientType } from "../../master/utils/patient-type.enum";
import { staff } from "src/database/schemas/master.schema";
import { generateCode } from "src/utils/generate-code";
import { PatientClass } from "src/modules/master/utils/patient-class.enum";

export class AuthService {
  constructor(@Inject("DB_PG") private db: NodePgDatabase<DBSchemaType>) {}

  // ===========[Queries]===========
  async getById(userId: string): Promise<Staff | null> {
    const userRecord = await this.db.query.staff.findFirst({
      where: (staff, { eq }) => eq(staff.id, userId),
    });

    if (!userRecord) {
      return null;
    }

    return userRecord;
  }

  async getByUsername(username: string): Promise<Staff | null> {
    const userRecord = await this.db.query.staff.findFirst({
      where: (staff, { eq }) => eq(staff.username, username),
    });

    if (!userRecord) {
      return null;
    }

    return userRecord;
  }

  async getByNik(nik: string): Promise<Patients | null> {
    const userRecord = await this.db.query.patients.findFirst({
      where: (patient, { eq }) => eq(patient.nik, nik),
    });

    if (!userRecord) {
      return null;
    }

    return {
      ...userRecord,
      gender: toEnum(userRecord.gender, Object.values(Gender)),
      patientType: toEnum(userRecord.patientType, Object.values(PatientType)),
      patientClass: toEnum(
        userRecord.patientClass,
        Object.values(PatientClass)
      ),
    };
  }

  // ===========[Commands]===========
  async register(data: CreateStaff): Promise<Staff | undefined> {
    try {
      const staffData: Staff = {
        ...data,
        isActive: true,
        code: await generateCode(this.db, staff, "code", "STF"),
      };

      const staffRecord = await this.db
        .insert(staff)
        .values(staffData)
        .returning();

      return staffRecord[0];
    } catch (error) {}
  }
}
