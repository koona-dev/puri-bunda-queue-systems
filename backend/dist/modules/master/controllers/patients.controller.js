"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PatientsController", {
    enumerable: true,
    get: function() {
        return PatientsController;
    }
});
const _common = require("@nestjs/common");
const _createpatientdto = require("../dtos/patients/create-patient.dto");
const _updatepatientdto = require("../dtos/patients/update-patient.dto");
const _patientsservice = /*#__PURE__*/ _interop_require_default(require("../services/patients.service"));
const _patientsqueryparams = require("../dtos/patients/patients-query.params");
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
let PatientsController = class PatientsController {
    findById(patientId) {
        return this.patientsService.findById(patientId);
    }
    findOne(query) {
        return this.patientsService.findOne(query);
    }
    findMany(query) {
        return this.patientsService.findMany(query);
    }
    create(createPatientsDto) {
        return this.patientsService.create(createPatientsDto);
    }
    update(patientId, updatePatientsDto) {
        return this.patientsService.update({
            ...updatePatientsDto,
            id: patientId
        });
    }
    remove(patientId) {
        return this.patientsService.delete(patientId);
    }
    constructor(patientsService){
        this.patientsService = patientsService;
    }
};
_ts_decorate([
    (0, _common.Get)(":patientId"),
    _ts_param(0, (0, _common.Param)("patientId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PatientsController.prototype, "findById", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _patientsqueryparams.FindOnePatientQueryParams === "undefined" ? Object : _patientsqueryparams.FindOnePatientQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], PatientsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _patientsqueryparams.FindManyPatientsQueryParams === "undefined" ? Object : _patientsqueryparams.FindManyPatientsQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], PatientsController.prototype, "findMany", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpatientdto.CreatePatientDto === "undefined" ? Object : _createpatientdto.CreatePatientDto
    ]),
    _ts_metadata("design:returntype", void 0)
], PatientsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(":patientId"),
    _ts_param(0, (0, _common.Param)("patientId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepatientdto.UpdatePatientDto === "undefined" ? Object : _updatepatientdto.UpdatePatientDto
    ]),
    _ts_metadata("design:returntype", void 0)
], PatientsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":patientId"),
    _ts_param(0, (0, _common.Param)("patientId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PatientsController.prototype, "remove", null);
PatientsController = _ts_decorate([
    (0, _common.Controller)("patients"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _patientsservice.default === "undefined" ? Object : _patientsservice.default
    ])
], PatientsController);

//# sourceMappingURL=patients.controller.js.map