"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StaffController", {
    enumerable: true,
    get: function() {
        return StaffController;
    }
});
const _common = require("@nestjs/common");
const _createstaffdto = require("../dtos/staff/create-staff.dto");
const _updatesatffdto = require("../dtos/staff/update-satff.dto");
const _staffservice = /*#__PURE__*/ _interop_require_default(require("../services/staff.service"));
const _staffqueryparams = require("../dtos/staff/staff-query.params");
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
let StaffController = class StaffController {
    findOne(query) {
        return this.staffService.findOne(query);
    }
    findAll(query) {
        return this.staffService.findMany(query);
    }
    create(createStaffDto) {
        return this.staffService.create(createStaffDto);
    }
    update(staffId, updateStaffDto) {
        return this.staffService.update({
            ...updateStaffDto,
            id: staffId
        });
    }
    remove(staffId) {
        return this.staffService.delete(staffId);
    }
    constructor(staffService){
        this.staffService = staffService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _staffqueryparams.StaffQueryParams === "undefined" ? Object : _staffqueryparams.StaffQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], StaffController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Get)("list"),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _staffqueryparams.StaffQueryParams === "undefined" ? Object : _staffqueryparams.StaffQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], StaffController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createstaffdto.CreateStaffDto === "undefined" ? Object : _createstaffdto.CreateStaffDto
    ]),
    _ts_metadata("design:returntype", void 0)
], StaffController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(":staffId"),
    _ts_param(0, (0, _common.Param)("staffId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatesatffdto.UpdateStaffDto === "undefined" ? Object : _updatesatffdto.UpdateStaffDto
    ]),
    _ts_metadata("design:returntype", void 0)
], StaffController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":staffId"),
    _ts_param(0, (0, _common.Param)("staffId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], StaffController.prototype, "remove", null);
StaffController = _ts_decorate([
    (0, _common.Controller)("staff"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _staffservice.default === "undefined" ? Object : _staffservice.default
    ])
], StaffController);

//# sourceMappingURL=staff.controller.js.map