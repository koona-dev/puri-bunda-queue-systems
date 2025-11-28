"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _common = require("@nestjs/common");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _converter = require("../../../utils/converter");
const _genderenum = require("../../master/utils/gender.enum");
const _patienttypeenum = require("../../master/utils/patient-type.enum");
const _masterschema = require("../../../database/schemas/master.schema");
const _generatecode = require("../../../utils/generate-code");
const _patientclassenum = require("../../master/utils/patient-class.enum");
const _encrypt = require("../../../utils/encrypt");
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
let AuthService = class AuthService {
    // ===========[Queries]===========
    async getById(userId) {
        const userRecord = await this.db.query.staff.findFirst({
            where: (staff, { eq })=>eq(staff.id, userId)
        });
        if (!userRecord) {
            return null;
        }
        return userRecord;
    }
    async getByUsername(username) {
        const userRecord = await this.db.query.staff.findFirst({
            where: (staff, { eq })=>eq(staff.username, username)
        });
        if (!userRecord) {
            return null;
        }
        return userRecord;
    }
    async getByNik(nik) {
        const userRecord = await this.db.query.patients.findFirst({
            where: (patient, { eq })=>eq(patient.nik, nik)
        });
        if (!userRecord) {
            return null;
        }
        return {
            ...userRecord,
            gender: (0, _converter.toEnum)(userRecord.gender, Object.values(_genderenum.Gender)),
            patientType: (0, _converter.toEnum)(userRecord.patientType, Object.values(_patienttypeenum.PatientType)),
            patientClass: (0, _converter.toEnum)(userRecord.patientClass, Object.values(_patientclassenum.PatientClass))
        };
    }
    // ===========[Commands]===========
    async register(data) {
        try {
            const hashPassword = await (0, _encrypt.encryptPassword)(data.password);
            const staffData = {
                ...data,
                code: await (0, _generatecode.generateCode)(this.db, _masterschema.staff, "code", "STF"),
                isActive: true,
                password: hashPassword
            };
            const staffRecord = await this.db.insert(_masterschema.staff).values(staffData).returning();
            return staffRecord[0];
        } catch (error) {}
    }
    constructor(db){
        this.db = db;
    }
};
AuthService = _ts_decorate([
    _ts_param(0, (0, _common.Inject)("DB_PG")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map