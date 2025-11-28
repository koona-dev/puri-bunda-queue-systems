"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardController", {
    enumerable: true,
    get: function() {
        return DashboardController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _jwtauthenticationguard = /*#__PURE__*/ _interop_require_default(require("../../utils/guards/jwt-authentication.guard"));
const _dashboardservice = require("./dashboard.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DashboardController = class DashboardController {
    async getDashboardSummary() {
        const summary = await this.dashboardService.getDashboardSummary();
        return summary;
    }
    constructor(dashboardService){
        this.dashboardService = dashboardService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardSummary", null);
DashboardController = _ts_decorate([
    (0, _swagger.ApiTags)("Dashboard Analytics"),
    (0, _common.Controller)("dashboard"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dashboardservice.DashboardService === "undefined" ? Object : _dashboardservice.DashboardService
    ])
], DashboardController);

//# sourceMappingURL=dashboard.controller.js.map