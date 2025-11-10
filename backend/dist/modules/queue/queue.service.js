"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueService", {
    enumerable: true,
    get: function() {
        return QueueService;
    }
});
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let QueueService = class QueueService {
    create(createQueueDto) {
        return 'This action adds a new queue';
    }
    findAll() {
        return `This action returns all queue`;
    }
    findOne(id) {
        return `This action returns a #${id} queue`;
    }
    update(id, updateQueueDto) {
        return `This action updates a #${id} queue`;
    }
    remove(id) {
        return `This action removes a #${id} queue`;
    }
};
QueueService = _ts_decorate([
    (0, _common.Injectable)()
], QueueService);

//# sourceMappingURL=queue.service.js.map