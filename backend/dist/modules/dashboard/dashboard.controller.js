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
const _dashboardservice = require("./dashboard.service");
const _createdashboarddto = require("./dto/create-dashboard.dto");
const _updatedashboarddto = require("./dto/update-dashboard.dto");
const _jwtauthenticationguard = /*#__PURE__*/ _interop_require_default(require("../../utils/guards/jwt-authentication.guard"));
const _swagger = require("@nestjs/swagger");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let DashboardController = class DashboardController {
    create(createDashboardDto) {
        return this.dashboardService.create(createDashboardDto);
    }
    findAll() {
        return this.dashboardService.findAll();
    }
    findOne(id) {
        return this.dashboardService.findOne(+id);
    }
    update(id, updateDashboardDto) {
        return this.dashboardService.update(+id, updateDashboardDto);
    }
    remove(id) {
        return this.dashboardService.remove(+id);
    }
    constructor(dashboardService){
        this.dashboardService = dashboardService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    (0, _swagger.ApiBody)({
        type: _createdashboarddto.CreateDashboardDto
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createdashboarddto.CreateDashboardDto === "undefined" ? Object : _createdashboarddto.CreateDashboardDto
    ]),
    _ts_metadata("design:returntype", void 0)
], DashboardController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], DashboardController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(":id"),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], DashboardController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(":id"),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    (0, _swagger.ApiBody)({
        type: _updatedashboarddto.UpdateDashboardDto
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatedashboarddto.UpdateDashboardDto === "undefined" ? Object : _updatedashboarddto.UpdateDashboardDto
    ]),
    _ts_metadata("design:returntype", void 0)
], DashboardController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":id"),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], DashboardController.prototype, "remove", null);
DashboardController = _ts_decorate([
    (0, _common.Controller)("dashboard"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dashboardservice.DashboardService === "undefined" ? Object : _dashboardservice.DashboardService
    ])
], DashboardController);

//# sourceMappingURL=dashboard.controller.js.map