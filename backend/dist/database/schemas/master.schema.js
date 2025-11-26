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
    get clinicRelations () {
        return clinicRelations;
    },
    get clinics () {
        return clinics;
    },
    get doctors () {
        return doctors;
    },
    get doctorsRelations () {
        return doctorsRelations;
    },
    get patients () {
        return patients;
    },
    get patientsRelations () {
        return patientsRelations;
    },
    get staff () {
        return staff;
    },
    get staffRelations () {
        return staffRelations;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _drizzleorm = require("drizzle-orm");
const _queueschema = require("./queue.schema");
const _timestamps = require("../helpers/timestamps");
const _enums = require("../helpers/enums");
const staff = (0, _pgcore.pgTable)("staff", {
    id: (0, _pgcore.uuid)().defaultRandom().primaryKey(),
    clinicId: (0, _pgcore.uuid)("clinic_id").references(()=>clinics.id, {
        onDelete: "set null"
    }),
    code: (0, _pgcore.varchar)("code").notNull().unique(),
    loketNumber: (0, _pgcore.varchar)("loket_number").notNull(),
    nik: (0, _pgcore.varchar)().unique(),
    name: (0, _pgcore.varchar)("name").notNull(),
    username: (0, _pgcore.varchar)("username").notNull().unique(),
    email: (0, _pgcore.varchar)("email").notNull().unique(),
    password: (0, _pgcore.varchar)("password_hash").notNull(),
    phone: (0, _pgcore.varchar)().notNull(),
    address: (0, _pgcore.text)(),
    lastLoginAt: (0, _pgcore.timestamp)("last_login_at"),
    isActive: (0, _pgcore.boolean)("is_active").default(true).notNull(),
    ..._timestamps.timestamps
}, (table)=>[
        (0, _pgcore.index)("staff_clinic_idx").on(table.clinicId),
        (0, _pgcore.index)("staff_code_idx").on(table.code),
        (0, _pgcore.index)("staff_active_idx").on(table.isActive)
    ]);
const patients = (0, _pgcore.pgTable)("patients", {
    id: (0, _pgcore.uuid)().defaultRandom().primaryKey(),
    code: (0, _pgcore.varchar)("code").notNull().unique(),
    registrationNumber: (0, _pgcore.varchar)("registration_number").notNull().unique(),
    nik: (0, _pgcore.varchar)("nik").unique().notNull(),
    name: (0, _pgcore.varchar)("name").notNull(),
    birthDate: (0, _pgcore.date)("birth_date", {
        mode: "date"
    }).notNull(),
    gender: (0, _enums.gender)("gender").notNull(),
    phone: (0, _pgcore.varchar)("phone").notNull(),
    address: (0, _pgcore.text)("address").notNull(),
    patientType: (0, _pgcore.varchar)("patient_type").notNull(),
    patientClass: (0, _pgcore.varchar)("patient_class").notNull(),
    haveAssurance: (0, _pgcore.boolean)("have_assurance").notNull(),
    assuranceCode: (0, _pgcore.varchar)("assuranceCode").unique(),
    ..._timestamps.timestamps
}, (table)=>[
        (0, _pgcore.uniqueIndex)("patients_nik_idx").on(table.nik),
        (0, _pgcore.index)("patients_reg_number_idx").on(table.registrationNumber)
    ]);
const doctors = (0, _pgcore.pgTable)("doctors", {
    id: (0, _pgcore.uuid)().defaultRandom().primaryKey(),
    code: (0, _pgcore.varchar)("code").notNull().unique(),
    name: (0, _pgcore.varchar)("name").notNull(),
    specialization: (0, _pgcore.varchar)("specialization"),
    phone: (0, _pgcore.varchar)("phone"),
    dayOfWeek: (0, _pgcore.integer)("day_of_week").notNull(),
    startTime: (0, _pgcore.time)("start_time").notNull(),
    endTime: (0, _pgcore.time)("end_time").notNull(),
    quota: (0, _pgcore.integer)("quota").default(30).notNull(),
    isActive: (0, _pgcore.boolean)("is_active").default(true).notNull(),
    ..._timestamps.timestamps
}, (table)=>[
        (0, _pgcore.index)("doctors_code_idx").on(table.code),
        (0, _pgcore.index)("doctors_active_idx").on(table.isActive)
    ]);
const clinics = (0, _pgcore.pgTable)("clinics", {
    id: (0, _pgcore.uuid)().defaultRandom().primaryKey(),
    code: (0, _pgcore.varchar)("code").notNull().unique(),
    name: (0, _pgcore.varchar)("name").notNull(),
    description: (0, _pgcore.text)("description"),
    isActive: (0, _pgcore.boolean)("is_active").default(true).notNull(),
    ..._timestamps.timestamps
}, (table)=>[
        (0, _pgcore.index)("clinics_code_idx").on(table.code),
        (0, _pgcore.index)("clinics_active_idx").on(table.isActive)
    ]);
const staffRelations = (0, _drizzleorm.relations)(staff, ({ one, many })=>({
        clinics: one(clinics, {
            fields: [
                staff.clinicId
            ],
            references: [
                clinics.id
            ]
        }),
        queues: many(_queueschema.queues),
        queueCalls: many(_queueschema.queueCalls)
    }));
const patientsRelations = (0, _drizzleorm.relations)(patients, ({ many })=>({
        queues: many(_queueschema.queues)
    }));
const doctorsRelations = (0, _drizzleorm.relations)(doctors, ({ many })=>({
        queues: many(_queueschema.queues)
    }));
const clinicRelations = (0, _drizzleorm.relations)(clinics, ({ many })=>({
        staff: many(staff),
        doctor: many(doctors),
        queues: many(_queueschema.queues)
    }));

//# sourceMappingURL=master.schema.js.map