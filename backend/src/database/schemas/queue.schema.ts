import { relations } from "drizzle-orm";
import {
  date,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { queueStatus, queueType } from "../helpers/enums";
import { clinics, doctors, patients, staff } from "./master.schema";
import { timestamps } from "../helpers/timestamps";

// ========================================
// MODUL ANTRIAN
// ========================================

export const queues = pgTable(
  "queues",
  {
    id: uuid().defaultRandom().primaryKey(),
    staffId: uuid("staff_id")
      .references(() => staff.id, {
        onDelete: "set null",
      })
      .notNull(),
    patientId: uuid("patient_id")
      .references(() => patients.id, {
        onDelete: "set null",
      })
      .notNull(),
    clinicId: uuid("clinic_id")
      .references(() => clinics.id, { onDelete: "cascade" })
      .notNull(),
    doctorId: uuid("doctor_id")
      .references(() => doctors.id, {
        onDelete: "set null",
      })
      .notNull(),
    queueNumber: varchar("queue_number", { length: 20 }).notNull().unique(),
    queueType: queueType("queue_type").notNull(),
    reservationDate: date("reservation_date"),
    status: queueStatus("status").default("Waiting").notNull(),
    deseases: varchar("deseases").notNull(),
    calledAt: timestamp("called_at"),
    completedAt: timestamp("completed_at"),
    notes: text("notes"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("queue_number_idx").on(table.queueNumber),
    index("queue_status_idx").on(table.status),
    index("queue_type_idx").on(table.queueType),
    index("queue_clinic_idx").on(table.clinicId),
    index("queue_date_idx").on(table.createdAt),
    index("queue_status_clinic_idx").on(table.status, table.clinicId),
  ]
);

export const queueCalls = pgTable(
  "queue_calls",
  {
    id: uuid().defaultRandom().primaryKey(),
    queueId: uuid("queue_id")
      .notNull()
      .references(() => queues.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id")
      .notNull()
      .references(() => staff.id, { onDelete: "cascade" }),
    calledAt: timestamp("called_at").defaultNow().notNull(),
    ...timestamps,
  },
  (table) => [
    index("queue_calls_queue_idx").on(table.queueId),
    index("queue_calls_staff_idx").on(table.staffId),
  ]
);

// ========================================
// RELATIONS
// ========================================

export const queuesRelations = relations(queues, ({ one, many }) => ({
  patient: one(patients, {
    fields: [queues.patientId],
    references: [patients.id],
  }),
  clinic: one(clinics, {
    fields: [queues.clinicId],
    references: [clinics.id],
  }),
  doctor: one(doctors, {
    fields: [queues.doctorId],
    references: [doctors.id],
  }),
  staff: one(staff, {
    fields: [queues.staffId],
    references: [staff.id],
  }),
  calls: many(queueCalls),
}));
