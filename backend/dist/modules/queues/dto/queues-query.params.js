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
    get FindManyQueuesQueryParams () {
        return FindManyQueuesQueryParams;
    },
    get FindOneQueuesQueryParams () {
        return FindOneQueuesQueryParams;
    }
});
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
const _queuetypeenum = require("../utils/queue-type.enum");
const _priorityenum = require("../utils/priority.enum");
const _servicetype = require("../utils/service-type");
const _referencetypeenum = require("../utils/reference-type.enum");
const _queuestatusenum = require("../utils/queue-status.enum");
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
let FindOneQueuesQueryParams = class FindOneQueuesQueryParams {
};
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOneQueuesQueryParams.prototype, "id", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOneQueuesQueryParams.prototype, "patientId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOneQueuesQueryParams.prototype, "clinicId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOneQueuesQueryParams.prototype, "doctorId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOneQueuesQueryParams.prototype, "staffId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FindOneQueuesQueryParams.prototype, "queueNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDate)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FindOneQueuesQueryParams.prototype, "createdAt", void 0);
let FindManyQueuesQueryParams = class FindManyQueuesQueryParams {
};
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _queuetypeenum.QueueType
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_queuetypeenum.QueueType),
    _ts_metadata("design:type", typeof _queuetypeenum.QueueType === "undefined" ? Object : _queuetypeenum.QueueType)
], FindManyQueuesQueryParams.prototype, "queueType", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _priorityenum.Priority
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_priorityenum.Priority),
    _ts_metadata("design:type", typeof _priorityenum.Priority === "undefined" ? Object : _priorityenum.Priority)
], FindManyQueuesQueryParams.prototype, "priority", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _servicetype.ServiceType
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_servicetype.ServiceType),
    _ts_metadata("design:type", typeof _servicetype.ServiceType === "undefined" ? Object : _servicetype.ServiceType)
], FindManyQueuesQueryParams.prototype, "serviceType", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _referencetypeenum.ReferenceType
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_referencetypeenum.ReferenceType),
    _ts_metadata("design:type", typeof _referencetypeenum.ReferenceType === "undefined" ? Object : _referencetypeenum.ReferenceType)
], FindManyQueuesQueryParams.prototype, "referenceType", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDate)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FindManyQueuesQueryParams.prototype, "reservationDate", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        enum: _queuestatusenum.QueueStatus
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_queuestatusenum.QueueStatus),
    _ts_metadata("design:type", typeof _queuestatusenum.QueueStatus === "undefined" ? Object : _queuestatusenum.QueueStatus)
], FindManyQueuesQueryParams.prototype, "status", void 0);

//# sourceMappingURL=queues-query.params.js.map