"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _queuescontroller = require("./queues.controller");
const _queuesservice = /*#__PURE__*/ _interop_require_default(require("./queues.service"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe("QueueController", ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _queuescontroller.QueuesController
            ],
            providers: [
                _queuesservice.default
            ]
        }).compile();
        controller = module.get(_queuescontroller.QueuesController);
    });
    it("should be defined", ()=>{
        expect(controller).toBeDefined();
    });
});

//# sourceMappingURL=queues.controller.spec.js.map