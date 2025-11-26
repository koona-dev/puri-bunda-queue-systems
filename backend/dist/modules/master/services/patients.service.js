"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _common = require("@nestjs/common");
const _drizzleorm = require("drizzle-orm");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _converter = require("../../../utils/converter");
const _genderenum = require("../utils/gender.enum");
const _masterschema = require("../../../database/schemas/master.schema");
const _generatecode = require("../../../utils/generate-code");
const _patientclassenum = require("../utils/patient-class.enum");
const _patienttypeenum = require("../utils/patient-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let PatientsService = class PatientsService {
    // ===========[Queries]===========
    async findOne(query) {
        const patientRecord = await this.db.query.patients.findFirst({
            where: (patient, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(patient.id, query.id));
                if (query.code) conditions.push(eq(patient.code, query.code));
                if (query.registrationNumber) conditions.push(eq(patient.registrationNumber, query.registrationNumber));
                if (query.nik) conditions.push(eq(patient.nik, query.nik));
                if (query.name) conditions.push(eq(patient.name, query.name));
                if (query.assuranceCode) conditions.push(eq(patient.assuranceCode, query.assuranceCode));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        if (!patientRecord) {
            return null;
        }
        const patientEntity = {
            ...patientRecord,
            patientClass: (0, _converter.toEnum)(patientRecord.patientClass, Object.values(_patientclassenum.PatientClass)),
            patientType: (0, _converter.toEnum)(patientRecord.patientType, Object.values(_patienttypeenum.PatientType)),
            gender: (0, _converter.toEnum)(patientRecord.gender, Object.values(_genderenum.Gender))
        };
        return patientEntity;
    }
    async findMany(query) {
        const patientList = await this.db.query.patients.findMany({
            where: (patient, { eq, and })=>{
                const conditions = [];
                if (query.name) conditions.push(eq(patient.name, query.name));
                if (query.birthDate) conditions.push(eq(patient.birthDate, new Date(query.birthDate)));
                if (query.gender) conditions.push(eq(patient.gender, query.gender));
                if (query.address) conditions.push(eq(patient.address, query.address));
                if (query.patientType) conditions.push(eq(patient.patientType, query.patientType));
                if (query.patientClass) conditions.push(eq(patient.patientClass, query.patientClass));
                if (query.haveAssurance) conditions.push(eq(patient.haveAssurance, query.haveAssurance));
                if (query.createdAt) conditions.push(eq(patient.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        const patientListEntity = patientList.map((record)=>{
            return {
                ...record,
                patientClass: (0, _converter.toEnum)(record.patientClass, Object.values(_patientclassenum.PatientClass)),
                patientType: (0, _converter.toEnum)(record.patientType, Object.values(_patienttypeenum.PatientType)),
                gender: (0, _converter.toEnum)(record.gender, Object.values(_genderenum.Gender))
            };
        });
        return patientListEntity;
    }
    // ===========[Commands]===========
    async create(data) {
        try {
            const patientData = {
                ...data,
                code: await (0, _generatecode.generateCode)(this.db, _masterschema.patients, "code", "PTN"),
                registrationNumber: await (0, _generatecode.generateCode)(this.db, _masterschema.patients, "registrationNumber", "REG")
            };
            const patientRecord = await this.db.insert(_masterschema.patients).values(patientData).returning();
            const patientEntity = {
                ...patientRecord[0],
                patientClass: (0, _converter.toEnum)(patientRecord[0].patientClass, Object.values(_patientclassenum.PatientClass)),
                patientType: (0, _converter.toEnum)(patientRecord[0].patientType, Object.values(_patienttypeenum.PatientType)),
                gender: (0, _converter.toEnum)(patientRecord[0].gender, Object.values(_genderenum.Gender))
            };
            return patientEntity;
        } catch (error) {}
    }
    async update(data) {
        try {
            const patientRecord = await this.db.update(_masterschema.patients).set(data).where((0, _drizzleorm.eq)(_masterschema.patients.id, data.id)).returning();
            const patientEntity = {
                ...patientRecord[0],
                patientClass: (0, _converter.toEnum)(patientRecord[0].patientClass, Object.values(_patientclassenum.PatientClass)),
                patientType: (0, _converter.toEnum)(patientRecord[0].patientType, Object.values(_patienttypeenum.PatientType)),
                gender: (0, _converter.toEnum)(patientRecord[0].gender, Object.values(_genderenum.Gender))
            };
            return patientEntity;
        } catch (error) {}
    }
    async delete(id) {
        try {
            const patientRecord = await this.db.delete(_masterschema.patients).where((0, _drizzleorm.eq)(_masterschema.patients.id, id)).returning();
            if (!patientRecord) {
                return false;
            }
            return true;
        } catch (error) {}
    }
    constructor(db){
        this.db = db;
    }
};
PatientsService = _ts_decorate([
    _ts_param(0, (0, _common.Inject)("DB_PG")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], PatientsService);
const _default = PatientsService;

//# sourceMappingURL=patients.service.js.map