import { pgEnum } from "drizzle-orm/pg-core";

// ========================================
// ENUMS
// ========================================

export const gender = pgEnum("gender", ["L", "P"]);
export const queueType = pgEnum("queue_type", ["Reservation", "Walkin"]);
export const queueStatus = pgEnum("queue_status", [
  "Waiting",
  "Called",
  "Done",
  "Cancelled",
]);
