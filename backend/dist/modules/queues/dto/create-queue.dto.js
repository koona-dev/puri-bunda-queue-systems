"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateQueueDto", {
    enumerable: true,
    get: function() {
        return CreateQueueDto;
    }
});
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
const _priorityenum = require("../utils/priority.enum");
const _queuetypeenum = require("../utils/queue-type.enum");
const _referencetypeenum = require("../utils/reference-type.enum");
const _servicetype = require("../utils/service-type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateQueueDto = class CreateQueueDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateQueueDto.prototype, "patientId", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateQueueDto.prototype, "clinicId", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateQueueDto.prototype, "doctorId", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateQueueDto.prototype, "staffId", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsEnum)(_queuetypeenum.QueueType),
    _ts_metadata("design:type", typeof _queuetypeenum.QueueType === "undefined" ? Object : _queuetypeenum.QueueType)
], CreateQueueDto.prototype, "queueType", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsEnum)(_priorityenum.Priority),
    _ts_metadata("design:type", typeof _priorityenum.Priority === "undefined" ? Object : _priorityenum.Priority)
], CreateQueueDto.prototype, "priority", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsEnum)(_servicetype.ServiceType),
    _ts_metadata("design:type", typeof _servicetype.ServiceType === "undefined" ? Object : _servicetype.ServiceType)
], CreateQueueDto.prototype, "serviceType", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsEnum)(_referencetypeenum.ReferenceType),
    _ts_metadata("design:type", typeof _referencetypeenum.ReferenceType === "undefined" ? Object : _referencetypeenum.ReferenceType)
], CreateQueueDto.prototype, "referenceType", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateQueueDto.prototype, "chiefComplaint", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateQueueDto.prototype, "symptoms", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsDateString)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateQueueDto.prototype, "symptomsStartDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", Object)
], CreateQueueDto.prototype, "previousTreatment", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsDateString)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateQueueDto.prototype, "reservationDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateQueueDto.prototype, "preferredTime", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", Object)
], CreateQueueDto.prototype, "staffNotes", void 0);

//# sourceMappingURL=create-queue.dto.js.map