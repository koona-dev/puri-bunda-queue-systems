"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateQueueDto", {
    enumerable: true,
    get: function() {
        return UpdateQueueDto;
    }
});
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
const _queuetypeenum = require("../utils/queue-type.enum");
const _priorityenum = require("../utils/priority.enum");
const _servicetype = require("../utils/service-type");
const _referencetypeenum = require("../utils/reference-type.enum");
const _queuestatusenum = require("../utils/queue-status.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateQueueDto = class UpdateQueueDto {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_queuetypeenum.QueueType),
    _ts_metadata("design:type", typeof _queuetypeenum.QueueType === "undefined" ? Object : _queuetypeenum.QueueType)
], UpdateQueueDto.prototype, "queueType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_priorityenum.Priority),
    _ts_metadata("design:type", typeof _priorityenum.Priority === "undefined" ? Object : _priorityenum.Priority)
], UpdateQueueDto.prototype, "priority", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_servicetype.ServiceType),
    _ts_metadata("design:type", typeof _servicetype.ServiceType === "undefined" ? Object : _servicetype.ServiceType)
], UpdateQueueDto.prototype, "serviceType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_referencetypeenum.ReferenceType),
    _ts_metadata("design:type", typeof _referencetypeenum.ReferenceType === "undefined" ? Object : _referencetypeenum.ReferenceType)
], UpdateQueueDto.prototype, "referenceType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdateQueueDto.prototype, "chiefComplaint", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdateQueueDto.prototype, "symptoms", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdateQueueDto.prototype, "symptomsStartDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdateQueueDto.prototype, "previousTreatment", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdateQueueDto.prototype, "reservationDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdateQueueDto.prototype, "preferredTime", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_queuestatusenum.QueueStatus),
    _ts_metadata("design:type", typeof _queuestatusenum.QueueStatus === "undefined" ? Object : _queuestatusenum.QueueStatus)
], UpdateQueueDto.prototype, "status", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdateQueueDto.prototype, "staffNotes", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdateQueueDto.prototype, "cancellationReason", void 0);

//# sourceMappingURL=update-queue.dto.js.map