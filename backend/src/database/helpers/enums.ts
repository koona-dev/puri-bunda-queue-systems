import { pgEnum } from "drizzle-orm/pg-core";

// ========================================
// ENUMS
// ========================================

export const gender = pgEnum("gender", ["L", "P"]);

export const patientClass = pgEnum("patient_class", [
  "Kelas 3",
  "Kelas 2",
  "Kelas 1",
  "VIP",
]);

export const queueType = pgEnum("queue_type", ["Reservasi", "Walk-In"]);

export const queueStatus = pgEnum("queue_status", [
  "Draft",
  "Waiting",
  "Called",
  "Done",
  "On-Hold",
  "Cancelled",
]);

export const patientType = pgEnum("patient_type", [
  "Umum",
  "Asuransi",
  "Rujukan",
]);

export const serviceType = pgEnum("service_type", [
  "Rawat Jalan",
  "Rawat Inap",
  "UGD",
]);

export const referenceType = pgEnum("reference_type", [
  "Konsultasi",
  "Checkup",
  "Perawatan",
  "Lab",
  "Radiologi",
  "Vaksin",
  "Operasi",
]);

export const priority = pgEnum("priority", ["Normal", "Urgent", "Emergency"]);
