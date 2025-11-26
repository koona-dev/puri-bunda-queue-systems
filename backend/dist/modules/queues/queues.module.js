"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueModule", {
    enumerable: true,
    get: function() {
        return QueueModule;
    }
});
const _common = require("@nestjs/common");
const _queuescontroller = require("./queues.controller");
const _queuesservice = /*#__PURE__*/ _interop_require_default(require("./queues.service"));
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
let QueueModule = class QueueModule {
};
QueueModule = _ts_decorate([
    (0, _common.Module)({
        controllers: [
            _queuescontroller.QueuesController
        ],
        providers: [
            _queuesservice.default
        ]
    })
], QueueModule);

//# sourceMappingURL=queues.module.js.map