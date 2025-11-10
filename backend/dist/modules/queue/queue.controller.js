"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueController", {
    enumerable: true,
    get: function() {
        return QueueController;
    }
});
const _common = require("@nestjs/common");
const _queueservice = require("./queue.service");
const _createqueuedto = require("./dto/create-queue.dto");
const _updatequeuedto = require("./dto/update-queue.dto");
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
let QueueController = class QueueController {
    create(createQueueDto) {
        return this.queueService.create(createQueueDto);
    }
    findAll() {
        return this.queueService.findAll();
    }
    findOne(id) {
        return this.queueService.findOne(+id);
    }
    update(id, updateQueueDto) {
        return this.queueService.update(+id, updateQueueDto);
    }
    remove(id) {
        return this.queueService.remove(+id);
    }
    constructor(queueService){
        this.queueService = queueService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createqueuedto.CreateQueueDto === "undefined" ? Object : _createqueuedto.CreateQueueDto
    ]),
    _ts_metadata("design:returntype", void 0)
], QueueController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], QueueController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], QueueController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatequeuedto.UpdateQueueDto === "undefined" ? Object : _updatequeuedto.UpdateQueueDto
    ]),
    _ts_metadata("design:returntype", void 0)
], QueueController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], QueueController.prototype, "remove", null);
QueueController = _ts_decorate([
    (0, _common.Controller)('queue'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _queueservice.QueueService === "undefined" ? Object : _queueservice.QueueService
    ])
], QueueController);

//# sourceMappingURL=queue.controller.js.map