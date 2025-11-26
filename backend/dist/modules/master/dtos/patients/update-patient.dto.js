"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePatientDto", {
    enumerable: true,
    get: function() {
        return UpdatePatientDto;
    }
});
const _swagger = require("@nestjs/swagger");
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
const _genderenum = require("../../utils/gender.enum");
const _patienttypeenum = require("../../utils/patient-type.enum");
const _patientclassenum = require("../../utils/patient-class.enum");
const _createpatientdto = require("./create-patient.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdatePatientDto = class UpdatePatientDto extends (0, _swagger.PartialType)(_createpatientdto.CreatePatientDto) {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdatePatientDto.prototype, "nik", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdatePatientDto.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdatePatientDto.prototype, "birthDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_genderenum.Gender),
    _ts_metadata("design:type", typeof _genderenum.Gender === "undefined" ? Object : _genderenum.Gender)
], UpdatePatientDto.prototype, "gender", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdatePatientDto.prototype, "phone", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdatePatientDto.prototype, "address", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_patienttypeenum.PatientType),
    _ts_metadata("design:type", typeof _patienttypeenum.PatientType === "undefined" ? Object : _patienttypeenum.PatientType)
], UpdatePatientDto.prototype, "patientType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_patientclassenum.PatientClass),
    _ts_metadata("design:type", typeof _patientclassenum.PatientClass === "undefined" ? Object : _patientclassenum.PatientClass)
], UpdatePatientDto.prototype, "patientClass", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], UpdatePatientDto.prototype, "haveAssurance", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdatePatientDto.prototype, "assuranceCode", void 0);

//# sourceMappingURL=update-patient.dto.js.map