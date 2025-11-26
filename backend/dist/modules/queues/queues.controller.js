"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueuesController", {
    enumerable: true,
    get: function() {
        return QueuesController;
    }
});
const _common = require("@nestjs/common");
const _queuesservice = /*#__PURE__*/ _interop_require_default(require("./queues.service"));
const _queuesqueryparams = require("./dto/queues-query.params");
const _createqueuedto = require("./dto/create-queue.dto");
const _updatequeuedto = require("./dto/update-queue.dto");
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
let QueuesController = class QueuesController {
    findOne(query) {
        return this.queuesService.findOne(query);
    }
    findMany(query) {
        return this.queuesService.findMany(query);
    }
    create(createQueuesDto) {
        return this.queuesService.create(createQueuesDto);
    }
    update(queueId, updateQueuesDto) {
        return this.queuesService.update({
            ...updateQueuesDto,
            id: queueId
        });
    }
    remove(queueId) {
        return this.queuesService.delete(queueId);
    }
    constructor(queuesService){
        this.queuesService = queuesService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _queuesqueryparams.FindOneQueuesQueryParams === "undefined" ? Object : _queuesqueryparams.FindOneQueuesQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], QueuesController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Get)('list'),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _queuesqueryparams.FindManyQueuesQueryParams === "undefined" ? Object : _queuesqueryparams.FindManyQueuesQueryParams
    ]),
    _ts_metadata("design:returntype", void 0)
], QueuesController.prototype, "findMany", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createqueuedto.CreateQueueDto === "undefined" ? Object : _createqueuedto.CreateQueueDto
    ]),
    _ts_metadata("design:returntype", void 0)
], QueuesController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(":queueId"),
    _ts_param(0, (0, _common.Param)("queueId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatequeuedto.UpdateQueueDto === "undefined" ? Object : _updatequeuedto.UpdateQueueDto
    ]),
    _ts_metadata("design:returntype", void 0)
], QueuesController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":queueId"),
    _ts_param(0, (0, _common.Param)("queueId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], QueuesController.prototype, "remove", null);
QueuesController = _ts_decorate([
    (0, _common.Controller)("queues"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _queuesservice.default === "undefined" ? Object : _queuesservice.default
    ])
], QueuesController);

//# sourceMappingURL=queues.controller.js.map