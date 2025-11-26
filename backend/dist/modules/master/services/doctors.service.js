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
let DoctorsService = class DoctorsService {
    // ===========[Queries]===========
    async findOne(query) {
        const doctorRecord = await this.db.query.doctors.findFirst({
            where: (doctor, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(doctor.id, query.id));
                if (query.code) conditions.push(eq(doctor.code, query.code));
                if (query.name) conditions.push(eq(doctor.name, query.name));
                if (query.specialization) conditions.push(eq(doctor.specialization, query.specialization));
                if (query.isActive) conditions.push(eq(doctor.isActive, query.isActive));
                if (query.createdAt) conditions.push(eq(doctor.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        if (!doctorRecord) {
            return null;
        }
        return doctorRecord;
    }
    async findMany(query) {
        const doctorList = await this.db.query.doctors.findMany({
            where: (doctor, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(doctor.id, query.id));
                if (query.code) conditions.push(eq(doctor.code, query.code));
                if (query.name) conditions.push(eq(doctor.name, query.name));
                if (query.specialization) conditions.push(eq(doctor.specialization, query.specialization));
                if (query.isActive) conditions.push(eq(doctor.isActive, query.isActive));
                if (query.createdAt) conditions.push(eq(doctor.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        return doctorList;
    }
    // ===========[Commands]===========
    async create(data) {
        try {
            const doctorData = {
                ...data,
                code: await (0, _generatecode.generateCode)(this.db, _masterschema.doctors, "code", "DTR"),
                isActive: true
            };
            const doctorRecord = await this.db.insert(_masterschema.doctors).values(doctorData).returning();
            return doctorRecord[0];
        } catch (error) {}
    }
    async update(data) {
        try {
            const doctorRecord = await this.db.update(_masterschema.doctors).set(data).where((0, _drizzleorm.eq)(_masterschema.doctors.id, data.id)).returning();
            return doctorRecord[0];
        } catch (error) {}
    }
    async delete(id) {
        try {
            const doctorRecord = await this.db.delete(_masterschema.doctors).where((0, _drizzleorm.eq)(_masterschema.doctors.id, id)).returning();
            if (!doctorRecord) {
                return false;
            }
            return true;
        } catch (error) {}
    }
    constructor(db){
        this.db = db;
    }
};
DoctorsService = _ts_decorate([
    _ts_param(0, (0, _common.Inject)("DB_PG")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], DoctorsService);
const _default = DoctorsService;

//# sourceMappingURL=doctors.service.js.map