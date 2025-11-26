import { relations } from "drizzle-orm";
import {
  date,
  index,
  integer,
  pgTable,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  priority,
  queueStatus,
  queueType,
  referenceType,
  serviceType,
} from "../helpers/enums";
import { clinics, doctors, patients, staff } from "./master.schema";
import { timestamps } from "../helpers/timestamps";

// ========================================
// MODUL ANTRIAN
// ========================================

export const queues = pgTable(
  "queues",
  {
    id: uuid().defaultRandom().primaryKey(),
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
    staffId: uuid("staff_id")
      .references(() => staff.id, {
        onDelete: "set null",
      })
      .notNull(),
    queueNumber: varchar("queue_number").notNull().unique(),
    queueType: queueType("queue_type").notNull(),
    priority: priority("priority").default("Normal").notNull(), // BARU: prioritas antrian
    serviceType: serviceType("service_type").notNull(),
    referenceType: referenceType("reference_type").notNull(),
    chiefComplaint: text("chief_complaint").notNull(), // Keluhan utama
    symptoms: text("symptoms").notNull(), // Gejala yang dirasakan
    symptomsStartDate: date("symptoms_start_date", { mode: "date" }).notNull(), // Sejak kapan
    previousTreatment: text("previous_treatment"), // Pengobatan yang sudah dilakukan
    reservationDate: date("reservation_date", { mode: "date" }).notNull(),
    preferredTime: time("preferred_time").notNull(), // BARU: Jam yang diinginkan
    status: queueStatus("status").default("Waiting").notNull(),
    calledAt: timestamp("called_at", { mode: "date" }),
    completedAt: timestamp("completed_at", { mode: "date" }),
    staffNotes: text("staff_notes"),
    cancellationReason: text("cancellation_reason"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("queues_queue_number_idx").on(table.queueNumber),
    index("queues_status_idx").on(table.status),
    index("queues_type_idx").on(table.queueType),
    index("queues_priority_idx").on(table.priority),
    index("queues_clinic_idx").on(table.clinicId),
    index("queues_date_idx").on(table.createdAt),
    index("queues_status_clinic_idx").on(table.status, table.clinicId),
    index("queues_reservation_date_idx").on(table.reservationDate),
  ]
);

export type QueuesSchema = typeof queues.$inferSelect; // return type when queried
export type NewQueue = typeof queues.$inferInsert; // insert type

export const queueCalls = pgTable(
  "queue_calls",
  {
    id: uuid().defaultRandom().primaryKey(),
    queueId: uuid("queue_id")
      .notNull()
      .references(() => queues.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id")
      .notNull()
      .references(() => staff.id, { onDelete: "set null" }),
    calledAt: timestamp("called_at").defaultNow(),
    responseTime: integer("response_time"), // Berapa lama pasien respon (dalam detik)
    ...timestamps,
  },
  (table) => [
    index("queue_calls_queue_idx").on(table.queueId),
    index("queue_calls_staff_idx").on(table.staffId),
  ]
);

export type QueueCallsSchema = typeof queueCalls.$inferSelect; // return type when queried
export type NewQueueCall = typeof queueCalls.$inferInsert; // insert type

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

export const queueCallsRelations = relations(queueCalls, ({ one }) => ({
  staff: one(staff, {
    fields: [queueCalls.staffId],
    references: [staff.id],
  }),
  queues: one(queues, {
    fields: [queueCalls.queueId],
    references: [queues.id],
  }),
}));
