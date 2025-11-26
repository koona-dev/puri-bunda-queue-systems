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
const _masterschema = require("../../../database/schemas/master.schema");
const _generatecode = require("../../../utils/generate-code");
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
let ClinicsService = class ClinicsService {
    // ===========[Queries]===========
    async findOne(query) {
        const clinicRecord = await this.db.query.clinics.findFirst({
            where: (clinic, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(clinic.id, query.id));
                if (query.code) conditions.push(eq(clinic.code, query.code));
                if (query.name) conditions.push(eq(clinic.name, query.name));
                if (query.isActive) conditions.push(eq(clinic.isActive, query.isActive));
                if (query.createdAt) conditions.push(eq(clinic.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        if (!clinicRecord) {
            return null;
        }
        return clinicRecord;
    }
    async findMany(query) {
        const clinicList = await this.db.query.clinics.findMany({
            where: (clinic, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(clinic.id, query.id));
                if (query.code) conditions.push(eq(clinic.code, query.code));
                if (query.name) conditions.push(eq(clinic.name, query.name));
                if (query.isActive) conditions.push(eq(clinic.isActive, query.isActive));
                if (query.createdAt) conditions.push(eq(clinic.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        return clinicList;
    }
    // ===========[Commands]===========
    async create(data) {
        try {
            const clinicData = {
                ...data,
                code: await (0, _generatecode.generateCode)(this.db, _masterschema.clinics, "code", "CLC"),
                isActive: true
            };
            const clinicRecord = await this.db.insert(_masterschema.clinics).values(clinicData).returning();
            return clinicRecord[0];
        } catch (error) {}
    }
    async update(data) {
        try {
            const clinicRecord = await this.db.update(_masterschema.clinics).set(data).where((0, _drizzleorm.eq)(_masterschema.clinics.id, data.id)).returning();
            return clinicRecord[0];
        } catch (error) {}
    }
    async delete(id) {
        try {
            const clinicRecord = await this.db.delete(_masterschema.clinics).where((0, _drizzleorm.eq)(_masterschema.clinics.id, id)).returning();
            if (!clinicRecord) {
                return false;
            }
            return true;
        } catch (error) {}
    }
    constructor(db){
        this.db = db;
    }
};
ClinicsService = _ts_decorate([
    _ts_param(0, (0, _common.Inject)("DB_PG")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], ClinicsService);
const _default = ClinicsService;

//# sourceMappingURL=clinics.service.js.map