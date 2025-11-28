"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get FindManyPatientsQueryParams () {
        return FindManyPatientsQueryParams;
    },
    get FindOnePatientQueryParams () {
        return FindOnePatientQueryParams;
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
let FindOnePatientQueryParams = class FindOnePatientQueryParams {
};
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOnePatientQueryParams.prototype, "id", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOnePatientQueryParams.prototype, "code", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOnePatientQueryParams.prototype, "registrationNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOnePatientQueryParams.prototype, "nik", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOnePatientQueryParams.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOnePatientQueryParams.prototype, "assuranceCode", void 0);
let FindManyPatientsQueryParams = class FindManyPatientsQueryParams {
};
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindManyPatientsQueryParams.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDate)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FindManyPatientsQueryParams.prototype, "birthDate", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _genderenum.Gender
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_genderenum.Gender),
    _ts_metadata("design:type", typeof _genderenum.Gender === "undefined" ? Object : _genderenum.Gender)
], FindManyPatientsQueryParams.prototype, "gender", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindManyPatientsQueryParams.prototype, "address", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _patienttypeenum.PatientType
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_patienttypeenum.PatientType),
    _ts_metadata("design:type", typeof _patienttypeenum.PatientType === "undefined" ? Object : _patienttypeenum.PatientType)
], FindManyPatientsQueryParams.prototype, "patientType", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _patientclassenum.PatientClass
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_patientclassenum.PatientClass),
    _ts_metadata("design:type", typeof _patientclassenum.PatientClass === "undefined" ? Object : _patientclassenum.PatientClass)
], FindManyPatientsQueryParams.prototype, "patientClass", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], FindManyPatientsQueryParams.prototype, "haveAssurance", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDate)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FindManyPatientsQueryParams.prototype, "createdAt", void 0);

//# sourceMappingURL=patients-query.params.js.map