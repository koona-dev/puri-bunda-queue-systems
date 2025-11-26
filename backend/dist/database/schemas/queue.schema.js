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
    get queueCalls () {
        return queueCalls;
    },
    get queueCallsRelations () {
        return queueCallsRelations;
    },
    get queues () {
        return queues;
    },
    get queuesRelations () {
        return queuesRelations;
    }
});
const _drizzleorm = require("drizzle-orm");
const _pgcore = require("drizzle-orm/pg-core");
const _enums = require("../helpers/enums");
const _masterschema = require("./master.schema");
const _timestamps = require("../helpers/timestamps");
const queues = (0, _pgcore.pgTable)("queues", {
    id: (0, _pgcore.uuid)().defaultRandom().primaryKey(),
    patientId: (0, _pgcore.uuid)("patient_id").references(()=>_masterschema.patients.id, {
        onDelete: "set null"
    }).notNull(),
    clinicId: (0, _pgcore.uuid)("clinic_id").references(()=>_masterschema.clinics.id, {
        onDelete: "cascade"
    }).notNull(),
    doctorId: (0, _pgcore.uuid)("doctor_id").references(()=>_masterschema.doctors.id, {
        onDelete: "set null"
    }).notNull(),
    staffId: (0, _pgcore.uuid)("staff_id").references(()=>_masterschema.staff.id, {
        onDelete: "set null"
    }).notNull(),
    queueNumber: (0, _pgcore.varchar)("queue_number").notNull().unique(),
    queueType: (0, _enums.queueType)("queue_type").notNull(),
    priority: (0, _enums.priority)("priority").default("Normal").notNull(),
    serviceType: (0, _enums.serviceType)("service_type").notNull(),
    referenceType: (0, _enums.referenceType)("reference_type").notNull(),
    chiefComplaint: (0, _pgcore.text)("chief_complaint").notNull(),
    symptoms: (0, _pgcore.text)("symptoms").notNull(),
    symptomsStartDate: (0, _pgcore.date)("symptoms_start_date", {
        mode: "date"
    }).notNull(),
    previousTreatment: (0, _pgcore.text)("previous_treatment"),
    reservationDate: (0, _pgcore.date)("reservation_date", {
        mode: "date"
    }).notNull(),
    preferredTime: (0, _pgcore.time)("preferred_time").notNull(),
    status: (0, _enums.queueStatus)("status").default("Waiting").notNull(),
    calledAt: (0, _pgcore.timestamp)("called_at", {
        mode: "date"
    }),
    completedAt: (0, _pgcore.timestamp)("completed_at", {
        mode: "date"
    }),
    staffNotes: (0, _pgcore.text)("staff_notes"),
    cancellationReason: (0, _pgcore.text)("cancellation_reason"),
    ..._timestamps.timestamps
}, (table)=>[
        (0, _pgcore.uniqueIndex)("queues_queue_number_idx").on(table.queueNumber),
        (0, _pgcore.index)("queues_status_idx").on(table.status),
        (0, _pgcore.index)("queues_type_idx").on(table.queueType),
        (0, _pgcore.index)("queues_priority_idx").on(table.priority),
        (0, _pgcore.index)("queues_clinic_idx").on(table.clinicId),
        (0, _pgcore.index)("queues_date_idx").on(table.createdAt),
        (0, _pgcore.index)("queues_status_clinic_idx").on(table.status, table.clinicId),
        (0, _pgcore.index)("queues_reservation_date_idx").on(table.reservationDate)
    ]);
const queueCalls = (0, _pgcore.pgTable)("queue_calls", {
    id: (0, _pgcore.uuid)().defaultRandom().primaryKey(),
    queueId: (0, _pgcore.uuid)("queue_id").notNull().references(()=>queues.id, {
        onDelete: "cascade"
    }),
    staffId: (0, _pgcore.uuid)("staff_id").notNull().references(()=>_masterschema.staff.id, {
        onDelete: "set null"
    }),
    calledAt: (0, _pgcore.timestamp)("called_at").defaultNow(),
    responseTime: (0, _pgcore.integer)("response_time"),
    ..._timestamps.timestamps
}, (table)=>[
        (0, _pgcore.index)("queue_calls_queue_idx").on(table.queueId),
        (0, _pgcore.index)("queue_calls_staff_idx").on(table.staffId)
    ]);
const queuesRelations = (0, _drizzleorm.relations)(queues, ({ one, many })=>({
        patient: one(_masterschema.patients, {
            fields: [
                queues.patientId
            ],
            references: [
                _masterschema.patients.id
            ]
        }),
        clinic: one(_masterschema.clinics, {
            fields: [
                queues.clinicId
            ],
            references: [
                _masterschema.clinics.id
            ]
        }),
        doctor: one(_masterschema.doctors, {
            fields: [
                queues.doctorId
            ],
            references: [
                _masterschema.doctors.id
            ]
        }),
        staff: one(_masterschema.staff, {
            fields: [
                queues.staffId
            ],
            references: [
                _masterschema.staff.id
            ]
        }),
        calls: many(queueCalls)
    }));
const queueCallsRelations = (0, _drizzleorm.relations)(queueCalls, ({ one })=>({
        staff: one(_masterschema.staff, {
            fields: [
                queueCalls.staffId
            ],
            references: [
                _masterschema.staff.id
            ]
        }),
        queues: one(queues, {
            fields: [
                queueCalls.queueId
            ],
            references: [
                queues.id
            ]
        })
    }));

//# sourceMappingURL=queue.schema.js.map