import {
  pgTable,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  date,
  time,
  index,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { queueCalls, queues } from "./queue.schema";
import { timestamps } from "../helpers/timestamps";
import { gender } from "../helpers/enums";

// ========================================
// MODUL MASTER DATA
// ========================================

export const staff = pgTable(
  "staff",
  {
    id: uuid().defaultRandom().primaryKey(),
    clinicId: uuid("clinic_id").references(() => clinics.id, {
      onDelete: "set null",
    }),
    code: varchar("code", { length: 20 }).notNull().unique(),
    loketNumber: varchar("loket_number", { length: 10 }).notNull(),
    nik: varchar({ length: 16 }).unique(),
    name: varchar("name", { length: 100 }).notNull(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password_hash", { length: 255 }).notNull(),
    phone: varchar({ length: 20 }).notNull(),
    address: text(),
    lastLoginAt: timestamp("last_login_at"),
    isActive: boolean("is_active").default(true).notNull(),
    ...timestamps,
  },
  (table) => [
    index("staff_clinic_idx").on(table.clinicId),
    index("staff_code_idx").on(table.code),
    index("staff_active_idx").on(table.isActive),
  ]
);

export type StaffsSchema = typeof staff.$inferSelect; // return type when queried
export type NewStaff = typeof staff.$inferInsert; // insert type

export const patients = pgTable(
  "patients",
  {
    id: uuid().defaultRandom().primaryKey(),
    code: varchar("code").notNull().unique(),
    registrationNumber: varchar("registration_number", { length: 20 })
      .notNull()
      .unique(),
    nik: varchar("nik", { length: 20 }).unique().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    birthDate: date("birth_date").notNull(),
    gender: gender("gender").notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    address: text("address").notNull(),
    patientType: varchar("patient_type").notNull(),
    patientClass: varchar("patient_class").notNull(),
    haveAssurance: boolean("have_assurance").notNull(),
    assuranceCode: varchar("assuranceCode").unique(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("patients_nik_idx").on(table.nik),
    index("patients_reg_number_idx").on(table.registrationNumber),
  ]
);

export type PatientsSchema = typeof patients.$inferSelect; // return type when queried
export type NewPatient = typeof patients.$inferInsert; // insert type

export const doctors = pgTable(
  "doctors",
  {
    id: uuid().defaultRandom().primaryKey(),
    code: varchar("code", { length: 20 }).notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    specialization: varchar("specialization", { length: 100 }),
    phone: varchar("phone", { length: 20 }),
    isActive: boolean("is_active").default(true).notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    quota: integer("quota").default(30).notNull(),
    ...timestamps,
  },
  (table) => [
    index("doctors_code_idx").on(table.code),
    index("doctors_active_idx").on(table.isActive),
  ]
);

export type DoctorsSchema = typeof doctors.$inferSelect; // return type when queried
export type NewDoctor = typeof doctors.$inferInsert; // insert type

export const clinics = pgTable(
  "clinics",
  {
    id: uuid().defaultRandom().primaryKey(),
    code: varchar("code", { length: 10 }).notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    ...timestamps,
  },
  (table) => [
    index("clinics_code_idx").on(table.code),
    index("clinics_active_idx").on(table.isActive),
  ]
);

export type ClinicsSchema = typeof clinics.$inferSelect; // return type when queried
export type NewClinic = typeof clinics.$inferInsert; // insert type

// ========================================
// RELATIONS
// ========================================

export const staffRelations = relations(staff, ({ one, many }) => ({
  clinics: one(clinics, {
    fields: [staff.clinicId],
    references: [clinics.id],
  }),
  queues: many(queues),
  queueCalls: many(queueCalls),
}));
