"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardCronService", {
    enumerable: true,
    get: function() {
        return DashboardCronService;
    }
});
const _common = require("@nestjs/common");
const _schedule = require("@nestjs/schedule");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _dashboardview = require("../../database/schemas/dashboard.view");
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
let DashboardCronService = class DashboardCronService {
    async generateDashboardGraphCron() {
        await this.db.refreshMaterializedView(_dashboardview.dashboardSummary);
        await this.db.refreshMaterializedView(_dashboardview.queueStatsByStaff);
        await this.db.refreshMaterializedView(_dashboardview.staffPerformance);
        await this.db.refreshMaterializedView(_dashboardview.hourlyQueueDistribution);
    }
    constructor(db){
        this.db = db;
        this.logger = new _common.Logger(DashboardCronService.name);
    }
};
_ts_decorate([
    (0, _schedule.Cron)(_schedule.CronExpression.EVERY_30_MINUTES),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], DashboardCronService.prototype, "generateDashboardGraphCron", null);
DashboardCronService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)("DB_PG")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], DashboardCronService);

//# sourceMappingURL=dashboard-cron.service.js.map