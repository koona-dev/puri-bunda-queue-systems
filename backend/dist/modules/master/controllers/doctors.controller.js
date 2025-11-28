"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DoctorsController", {
    enumerable: true,
    get: function() {
        return DoctorsController;
    }
});
const _common = require("@nestjs/common");
const _doctorsservice = /*#__PURE__*/ _interop_require_default(require("../services/doctors.service"));
const _doctorsqueryparams = require("../dtos/doctors/doctors-query.params");
const _createdoctordto = require("../dtos/doctors/create-doctor.dto");
const _updatedoctordto = require("../dtos/doctors/update-doctor.dto");
const _jwtauthenticationguard = /*#__PURE__*/ _interop_require_default(require("../../../utils/guards/jwt-authentication.guard"));
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
let DoctorsController = class DoctorsController {
    findOne(query) {
        return this.doctorsService.findOne(query);
    }
    findAll(query) {
        return this.doctorsService.findMany(query);
    }
    create(createDoctorsDto) {
        return this.doctorsService.create(createDoctorsDto);
    }
    update(doctorId, updateDoctorsDto) {
        return this.doctorsService.update({
            ...updateDoctorsDto,
            id: doctorId
        });
    }
    remove(doctorId) {
        return this.doctorsService.delete(doctorId);
    }
    constructor(doctorsService){
        this.doctorsService = doctorsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _doctorsqueryparams.DoctorsQueryParams === "undefined" ? Object : _doctorsqueryparams.DoctorsQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], DoctorsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Get)("list"),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _doctorsqueryparams.DoctorsQueryParams === "undefined" ? Object : _doctorsqueryparams.DoctorsQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], DoctorsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    (0, _swagger.ApiBody)({
        type: _createdoctordto.CreateDoctorDto
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createdoctordto.CreateDoctorDto === "undefined" ? Object : _createdoctordto.CreateDoctorDto
    ]),
    _ts_metadata("design:returntype", void 0)
], DoctorsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(":doctorId"),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    (0, _swagger.ApiBody)({
        type: _updatedoctordto.UpdateDoctorDto
    }),
    _ts_param(0, (0, _common.Param)("doctorId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatedoctordto.UpdateDoctorDto === "undefined" ? Object : _updatedoctordto.UpdateDoctorDto
    ]),
    _ts_metadata("design:returntype", void 0)
], DoctorsController.prototype, "update", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    (0, _common.Delete)(":doctorId"),
    _ts_param(0, (0, _common.Param)("doctorId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], DoctorsController.prototype, "remove", null);
DoctorsController = _ts_decorate([
    (0, _common.Controller)("doctors"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _doctorsservice.default === "undefined" ? Object : _doctorsservice.default
    ])
], DoctorsController);

//# sourceMappingURL=doctors.controller.js.map