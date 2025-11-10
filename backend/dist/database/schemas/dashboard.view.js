// ========================================
// MATERIALIZED VIEWS untuk DASHBOARD
// ========================================
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get dashboardSummary () {
        return dashboardSummary;
    },
    get hourlyQueueDistribution () {
        return hourlyQueueDistribution;
    },
    get queueStatsByClinics () {
        return queueStatsByClinics;
    },
    get staffPerformance () {
        return staffPerformance;
    }
});
const _drizzleorm = require("drizzle-orm");
const _pgcore = require("drizzle-orm/pg-core");
const _queueschema = require("./queue.schema");
const _masterschema = require("./master.schema");
const dashboardSummary = (0, _pgcore.pgMaterializedView)("dashboard_summary").as((qb)=>qb.select({
        totalWaiting: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE status = 'Waiting')`.as("total_waiting"),
        totalCalled: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE status = 'Called')`.as("total_called"),
        totalDone: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE status = 'Done')`.as("total_done"),
        totalCancelled: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE status = 'Cancelled')`.as("total_cancelled"),
        totalReservation: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE queue_type = 'Reservation')`.as("total_reservation"),
        totalWalkin: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE queue_type = 'Walkin')`.as("total_walkin"),
        avgServiceTimeMinutes: (0, _drizzleorm.sql)`
      AVG(EXTRACT(EPOCH FROM (completed_at - called_at))/60) 
      FILTER (WHERE completed_at IS NOT NULL AND called_at IS NOT NULL)
    `.as("avg_service_time_minutes"),
        lastUpdated: (0, _drizzleorm.sql)`NOW()`.as("last_updated")
    }).from(_queueschema.queues).where((0, _drizzleorm.sql)`DATE(created_at) = CURRENT_DATE`));
const queueStatsByClinics = (0, _pgcore.pgMaterializedView)("queue_stats_by_clinic").as((qb)=>qb.select({
        clinicId: _masterschema.clinics.id,
        clinicCode: _masterschema.clinics.code,
        clinicName: _masterschema.clinics.name,
        totalWaiting: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE ${_queueschema.queues.status} = 'Waiting')`.as("total_waiting"),
        totalCalled: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE ${_queueschema.queues.status} = 'Called')`.as("total_called"),
        totalDone: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE ${_queueschema.queues.status} = 'Done')`.as("total_done"),
        totalQueues: (0, _drizzleorm.sql)`COUNT(*)`.as("total_queues"),
        avgWaitingTimeMinutes: (0, _drizzleorm.sql)`
          AVG(EXTRACT(EPOCH FROM (COALESCE(${_queueschema.queues.calledAt}, NOW()) - ${_queueschema.queues.createdAt}))/60)
        `.as("avg_waiting_time_minutes"),
        lastUpdated: (0, _drizzleorm.sql)`NOW()`.as("last_updated")
    }).from(_masterschema.clinics).leftJoin(_queueschema.queues, (0, _drizzleorm.sql)`${_queueschema.queues.clinicId} = ${_masterschema.clinics.id} AND DATE(${_queueschema.queues.createdAt}) = CURRENT_DATE`).groupBy(_masterschema.clinics.id, _masterschema.clinics.code, _masterschema.clinics.name));
const staffPerformance = (0, _pgcore.pgMaterializedView)("staff_performance").as((qb)=>qb.select({
        staffId: _masterschema.staff.id,
        staffCode: _masterschema.staff.code,
        staffName: (0, _drizzleorm.sql)`${_masterschema.staff.name}`.as("staff_name"),
        loketNumber: _masterschema.staff.loketNumber,
        clinicName: (0, _drizzleorm.sql)`${_masterschema.clinics.name}`.as("clinic_name"),
        totalServed: (0, _drizzleorm.sql)`COUNT(${_queueschema.queues.id})`.as("total_served"),
        avgServiceTimeMinutes: (0, _drizzleorm.sql)`
      AVG(EXTRACT(EPOCH FROM (${_queueschema.queues.completedAt} - ${_queueschema.queues.calledAt}))/60)
    `.as("avg_service_time_minutes"),
        totalCallAttempts: (0, _drizzleorm.sql)`COUNT(${_queueschema.queueCalls.id})`.as("total_call_attempts"),
        lastServiceAt: (0, _drizzleorm.sql)`MAX(${_queueschema.queues.completedAt})`.as("last_service_at"),
        lastUpdated: (0, _drizzleorm.sql)`NOW()`.as("last_updated")
    }).from(_masterschema.staff).leftJoin(_masterschema.clinics, (0, _drizzleorm.sql)`${_masterschema.staff.clinicId} = ${_masterschema.clinics.id}`).leftJoin(_queueschema.queues, (0, _drizzleorm.sql)`${_queueschema.queues.staffId} = ${_masterschema.staff.id} AND ${_queueschema.queues.status} = 'Done' AND DATE(${_queueschema.queues.createdAt}) = CURRENT_DATE`).leftJoin(_queueschema.queueCalls, (0, _drizzleorm.sql)`${_queueschema.queueCalls.queueId} = ${_queueschema.queues.id}`).where((0, _drizzleorm.sql)`${_masterschema.staff.isActive} = true`).groupBy(_masterschema.staff.id, _masterschema.staff.code, _masterschema.staff.name, _masterschema.staff.loketNumber, _masterschema.clinics.name));
const hourlyQueueDistribution = (0, _pgcore.pgMaterializedView)("hourly_queue_distribution").as((qb)=>qb.select({
        hour: (0, _drizzleorm.sql)`EXTRACT(HOUR FROM created_at)`.as("hour"),
        totalReservation: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE queue_type = 'Reservation')`.as("total_reservation"),
        totalWalkin: (0, _drizzleorm.sql)`COUNT(*) FILTER (WHERE queue_type = 'Walkin')`.as("total_walkin"),
        totalQueues: (0, _drizzleorm.sql)`COUNT(*)`.as("total_queues"),
        avgProcessingMinutes: (0, _drizzleorm.sql)`
      AVG(EXTRACT(EPOCH FROM (completed_at - called_at))/60) 
      FILTER (WHERE completed_at IS NOT NULL)
    `.as("avg_processing_minutes")
    }).from(_queueschema.queues).where((0, _drizzleorm.sql)`DATE(created_at) = CURRENT_DATE`).groupBy((0, _drizzleorm.sql)`EXTRACT(HOUR FROM created_at)`).orderBy((0, _drizzleorm.sql)`hour`));

//# sourceMappingURL=dashboard.view.js.map