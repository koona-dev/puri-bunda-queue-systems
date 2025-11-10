"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClinicsController", {
    enumerable: true,
    get: function() {
        return ClinicsController;
    }
});
const _common = require("@nestjs/common");
const _clinicsservice = /*#__PURE__*/ _interop_require_default(require("../services/clinics.service"));
const _clinicsqueryparams = require("../dtos/clinics/clinics-query.params");
const _createclinicdto = require("../dtos/clinics/create-clinic.dto");
const _updateclinicdto = require("../dtos/clinics/update-clinic.dto");
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
let ClinicsController = class ClinicsController {
    findById(clinicId) {
        return this.clinicsService.findById(clinicId);
    }
    findOne(query) {
        return this.clinicsService.findOne(query);
    }
    findAll(query) {
        return this.clinicsService.findMany(query);
    }
    create(createClinicsDto) {
        return this.clinicsService.create(createClinicsDto);
    }
    update(clinicId, updateClinicsDto) {
        return this.clinicsService.update({
            ...updateClinicsDto,
            id: clinicId
        });
    }
    remove(clinicId) {
        return this.clinicsService.delete(clinicId);
    }
    constructor(clinicsService){
        this.clinicsService = clinicsService;
    }
};
_ts_decorate([
    (0, _common.Get)(":clinicId"),
    _ts_param(0, (0, _common.Param)("clinicId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ClinicsController.prototype, "findById", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clinicsqueryparams.ClinicsQueryParams === "undefined" ? Object : _clinicsqueryparams.ClinicsQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], ClinicsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clinicsqueryparams.ClinicsQueryParams === "undefined" ? Object : _clinicsqueryparams.ClinicsQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], ClinicsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createclinicdto.CreateClinicDto === "undefined" ? Object : _createclinicdto.CreateClinicDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ClinicsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(":clinicId"),
    _ts_param(0, (0, _common.Param)("clinicId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateclinicdto.UpdateClinicDto === "undefined" ? Object : _updateclinicdto.UpdateClinicDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ClinicsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":clinicId"),
    _ts_param(0, (0, _common.Param)("clinicId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ClinicsController.prototype, "remove", null);
ClinicsController = _ts_decorate([
    (0, _common.Controller)("clinics"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clinicsservice.default === "undefined" ? Object : _clinicsservice.default
    ])
], ClinicsController);

//# sourceMappingURL=clinics.controller.js.map