"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _queuecontroller = require("./queue.controller");
const _queueservice = require("./queue.service");
describe('QueueController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _queuecontroller.QueueController
            ],
            providers: [
                _queueservice.QueueService
            ]
        }).compile();
        controller = module.get(_queuecontroller.QueueController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});

//# sourceMappingURL=queue.controller.spec.js.map