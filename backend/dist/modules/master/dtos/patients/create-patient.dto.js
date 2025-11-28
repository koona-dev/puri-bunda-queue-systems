"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePatientDto", {
    enumerable: true,
    get: function() {
        return CreatePatientDto;
    }
});
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
const _genderenum = require("../../utils/gender.enum");
const _patienttypeenum = require("../../utils/patient-type.enum");
const _patientclassenum = require("../../utils/patient-class.enum");
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreatePatientDto = class CreatePatientDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreatePatientDto.prototype, "nik", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreatePatientDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsDate)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreatePatientDto.prototype, "birthDate", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        enum: _genderenum.Gender
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsEnum)(_genderenum.Gender),
    _ts_metadata("design:type", typeof _genderenum.Gender === "undefined" ? Object : _genderenum.Gender)
], CreatePatientDto.prototype, "gender", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreatePatientDto.prototype, "phone", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        enum: _patienttypeenum.PatientType
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsEnum)(_patienttypeenum.PatientType),
    _ts_metadata("design:type", typeof _patienttypeenum.PatientType === "undefined" ? Object : _patienttypeenum.PatientType)
], CreatePatientDto.prototype, "patientType", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        enum: _patientclassenum.PatientClass
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsEnum)(_patientclassenum.PatientClass),
    _ts_metadata("design:type", typeof _patientclassenum.PatientClass === "undefined" ? Object : _patientclassenum.PatientClass)
], CreatePatientDto.prototype, "patientClass", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], CreatePatientDto.prototype, "haveAssurance", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", Object)
], CreatePatientDto.prototype, "assuranceCode", void 0);

//# sourceMappingURL=create-patient.dto.js.map