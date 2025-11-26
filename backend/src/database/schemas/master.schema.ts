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
import { gender, patientClass, patientType } from "../helpers/enums";

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
    code: varchar("code").notNull().unique(),
    loketNumber: varchar("loket_number").notNull(),
    nik: varchar().unique(),
    name: varchar("name").notNull(),
    username: varchar("username").notNull().unique(),
    email: varchar("email").notNull().unique(),
    password: varchar("password_hash").notNull(),
    phone: varchar().notNull(),
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
    registrationNumber: varchar("registration_number").notNull().unique(),
    nik: varchar("nik").unique().notNull(),
    name: varchar("name").notNull(),
    birthDate: date("birth_date", { mode: "date" }).notNull(),
    gender: gender("gender").notNull(),
    phone: varchar("phone").notNull(),
    address: text("address").notNull(),
    patientType: patientType("patient_type").notNull(),
    patientClass: patientClass("patient_class").notNull(),
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
    code: varchar("code").notNull().unique(),
    name: varchar("name").notNull(),
    specialization: varchar("specialization"),
    phone: varchar("phone"),
    dayOfWeek: integer("day_of_week").notNull(), // 1=Monday, 7=Sunday
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    quota: integer("quota").default(30).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
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
    code: varchar("code").notNull().unique(),
    name: varchar("name").notNull(),
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

export const patientsRelations = relations(patients, ({ many }) => ({
  queues: many(queues),
}));

export const doctorsRelations = relations(doctors, ({ many }) => ({
  queues: many(queues),
}));

export const clinicRelations = relations(clinics, ({ many }) => ({
  staff: many(staff),
  doctor: many(doctors),
  queues: many(queues),
}));
