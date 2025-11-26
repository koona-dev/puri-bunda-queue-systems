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
let StaffService = class StaffService {
    // ===========[Queries]===========
    async findOne(query) {
        const staffRecord = await this.db.query.staff.findFirst({
            where: (staff, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(staff.id, query.id));
                if (query.code) conditions.push(eq(staff.code, query.code));
                if (query.email) conditions.push(eq(staff.email, query.email));
                if (query.nik) conditions.push(eq(staff.nik, query.nik));
                if (query.name) conditions.push(eq(staff.name, query.name));
                if (query.address) conditions.push(eq(staff.address, query.address));
                if (query.loketNumber) conditions.push(eq(staff.loketNumber, query.loketNumber));
                if (query.phone) conditions.push(eq(staff.phone, query.phone));
                if (query.isActive) conditions.push(eq(staff.isActive, query.isActive));
                if (query.createdAt) conditions.push(eq(staff.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        if (!staffRecord) {
            return null;
        }
        return staffRecord;
    }
    async findMany(query) {
        const staffList = await this.db.query.staff.findMany({
            where: (staff, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(staff.id, query.id));
                if (query.code) conditions.push(eq(staff.code, query.code));
                if (query.email) conditions.push(eq(staff.email, query.email));
                if (query.nik) conditions.push(eq(staff.nik, query.nik));
                if (query.name) conditions.push(eq(staff.name, query.name));
                if (query.address) conditions.push(eq(staff.address, query.address));
                if (query.loketNumber) conditions.push(eq(staff.loketNumber, query.loketNumber));
                if (query.phone) conditions.push(eq(staff.phone, query.phone));
                if (query.isActive) conditions.push(eq(staff.isActive, query.isActive));
                if (query.createdAt) conditions.push(eq(staff.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        return staffList;
    }
    // ===========[Commands]===========
    async create(data) {
        try {
            const staffData = {
                ...data,
                isActive: true,
                code: await (0, _generatecode.generateCode)(this.db, _masterschema.staff, "code", "STF")
            };
            const staffRecord = await this.db.insert(_masterschema.staff).values(staffData).returning();
            return staffRecord[0];
        } catch (error) {}
    }
    async update(data) {
        try {
            const staffRecord = await this.db.update(_masterschema.staff).set(data).where((0, _drizzleorm.eq)(_masterschema.staff.id, data.id)).returning();
            return staffRecord[0];
        } catch (error) {}
    }
    async delete(id) {
        try {
            const staffRecord = await this.db.delete(_masterschema.staff).where((0, _drizzleorm.eq)(_masterschema.staff.id, id)).returning();
            if (!staffRecord) {
                return false;
            }
            return true;
        } catch (error) {}
    }
    constructor(db){
        this.db = db;
    }
};
StaffService = _ts_decorate([
    _ts_param(0, (0, _common.Inject)("DB_PG")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], StaffService);
const _default = StaffService;

//# sourceMappingURL=staff.service.js.map