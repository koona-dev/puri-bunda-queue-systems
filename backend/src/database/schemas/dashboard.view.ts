// ========================================
// MATERIALIZED VIEWS untuk DASHBOARD
// ========================================

import { eq, sql } from "drizzle-orm";
import { pgMaterializedView } from "drizzle-orm/pg-core";
import { queueCalls, queues } from "./queue.schema";
import { clinics, staff } from "./master.schema";

// View 1: Dashboard Summary (Real-time stats)
export const dashboardSummary = pgMaterializedView("dashboard_summary").as(
  (qb) =>
    qb
      .select({
        totalWaiting:
          sql<number>`COUNT(*) FILTER (WHERE status = 'Waiting')`.as(
            "total_waiting"
          ),
        totalCalled: sql<number>`COUNT(*) FILTER (WHERE status = 'Called')`.as(
          "total_called"
        ),
        totalDone: sql<number>`COUNT(*) FILTER (WHERE status = 'Done')`.as(
          "total_done"
        ),
        totalCancelled:
          sql<number>`COUNT(*) FILTER (WHERE status = 'Cancelled')`.as(
            "total_cancelled"
          ),
        totalReservation:
          sql<number>`COUNT(*) FILTER (WHERE queue_type = 'Reservasi')`.as(
            "total_reservation"
          ),
        totalWalkin:
          sql<number>`COUNT(*) FILTER (WHERE queue_type = 'Walk-In')`.as(
            "total_walkin"
          ),
        avgServiceTimeMinutes: sql<number>`
      AVG(EXTRACT(EPOCH FROM (completed_at - called_at))/60) 
      FILTER (WHERE completed_at IS NOT NULL AND called_at IS NOT NULL)
    `.as("avg_service_time_minutes"),
        lastUpdated: sql<Date>`NOW()`.as("last_updated"),
      })
      .from(queues)
      .where(sql`DATE(created_at) = CURRENT_DATE`)
);

// View 2: Queue Stats per Staff (Antrian per staff hari ini)
export const queueStatsByStaff = pgMaterializedView("queue_stats_by_staff").as(
  (qb) =>
    qb
      .select({
        staffId: sql<string>`{staff.id}`.as("staff_id"),
        staffCode: sql<string>`{staff.code}`.as("staff_code"),
        staffName: sql<string>`{staff.name}`.as("staff_name"),
        totalWaiting:
          sql<number>`COUNT(*) FILTER (WHERE ${queues.status} = 'Waiting')`.as(
            "total_waiting"
          ),
        totalCalled:
          sql<number>`COUNT(*) FILTER (WHERE ${queues.status} = 'Called')`.as(
            "total_called"
          ),
        totalDone:
          sql<number>`COUNT(*) FILTER (WHERE ${queues.status} = 'Done')`.as(
            "total_done"
          ),
        totalQueues: sql<number>`COUNT(*)`.as("total_queues"),
        avgWaitingTimeMinutes: sql<number>`
          AVG(EXTRACT(EPOCH FROM (COALESCE(${queues.calledAt}, NOW()) - ${queues.createdAt}))/60)
        `.as("avg_waiting_time_minutes"),
        lastUpdated: sql<Date>`NOW()`.as("last_updated"),
      })
      .from(staff)
      .leftJoin(
        queues,
        sql`${queues.staffId} = ${staff.id} AND DATE(${queues.createdAt}) = CURRENT_DATE`
      )
      .where(eq(staff.isActive, true))
      .groupBy(staff.id, staff.code, staff.name)
);

// View 3: Staff Performance (Top staff hari ini)
export const staffPerformance = pgMaterializedView("staff_performance").as(
  (qb) =>
    qb
      .select({
        staffId: sql<string>`{staff.id}`.as("staff_id"),
        staffCode: sql<string>`{staff.code}`.as("staff_code"),
        staffName: sql<string>`{staff.name}`.as("staff_name"),
        loketNumber: sql<string>`{staff.loketNumber}`.as("loket_number"),
        clinicName: sql<string>`${clinics.name}`.as("clinic_name"),
        totalServed: sql<number>`COUNT(${queues.id})`.as("total_served"),
        avgServiceTimeMinutes: sql<number>`
      AVG(EXTRACT(EPOCH FROM (${queues.completedAt} - ${queues.calledAt}))/60)
    `.as("avg_service_time_minutes"),
        totalCallAttempts: sql<number>`COUNT(${queueCalls.id})`.as(
          "total_call_attempts"
        ),
        lastServiceAt: sql<Date>`MAX(${queues.completedAt})`.as(
          "last_service_at"
        ),
        lastUpdated: sql<Date>`NOW()`.as("last_updated"),
      })
      .from(staff)
      .leftJoin(clinics, sql`${staff.clinicId} = ${clinics.id}`)
      .leftJoin(
        queues,
        sql`${queues.staffId} = ${staff.id} AND ${queues.status} = 'Done' AND DATE(${queues.createdAt}) = CURRENT_DATE`
      )
      .leftJoin(queueCalls, sql`${queueCalls.queueId} = ${queues.id}`)
      .where(sql`${staff.isActive} = true`)
      .orderBy(sql`total_served DESC`)
      .groupBy(
        staff.id,
        staff.code,
        staff.name,
        staff.loketNumber,
        clinics.name
      )
);

// View 4: Hourly Queue Distribution (Distribusi antrian per jam)
export const hourlyQueueDistribution = pgMaterializedView(
  "hourly_queue_distribution"
).as((qb) =>
  qb
    .select({
      hour: sql<number>`EXTRACT(HOUR FROM created_at)`.as("hour"),
      totalReservation:
        sql<number>`COUNT(*) FILTER (WHERE queue_type = 'Reservasi')`.as(
          "total_reservation"
        ),
      totalWalkin:
        sql<number>`COUNT(*) FILTER (WHERE queue_type = 'Walk-In')`.as(
          "total_walkin"
        ),
      totalQueues: sql<number>`COUNT(*)`.as("total_queues"),
      avgProcessingMinutes: sql<number>`
      AVG(EXTRACT(EPOCH FROM (completed_at - called_at))/60) 
      FILTER (WHERE completed_at IS NOT NULL)
    `.as("avg_processing_minutes"),
    })
    .from(queues)
    .where(sql`DATE(created_at) = CURRENT_DATE`)
    .groupBy(sql`EXTRACT(HOUR FROM created_at)`)
    .orderBy(sql`hour`)
);
