"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MasterModule", {
    enumerable: true,
    get: function() {
        return MasterModule;
    }
});
const _common = require("@nestjs/common");
const _patientscontroller = require("./controllers/patients.controller");
const _staffcontroller = require("./controllers/staff.controller");
const _clinicscontroller = require("./controllers/clinics.controller");
const _doctorscontroller = require("./controllers/doctors.controller");
const _patientsservice = /*#__PURE__*/ _interop_require_default(require("./services/patients.service"));
const _staffservice = /*#__PURE__*/ _interop_require_default(require("./services/staff.service"));
const _clinicsservice = /*#__PURE__*/ _interop_require_default(require("./services/clinics.service"));
const _doctorsservice = /*#__PURE__*/ _interop_require_default(require("./services/doctors.service"));
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
let MasterModule = class MasterModule {
};
MasterModule = _ts_decorate([
    (0, _common.Module)({
        controllers: [
            _patientscontroller.PatientsController,
            _staffcontroller.StaffController,
            _clinicscontroller.ClinicsController,
            _doctorscontroller.DoctorsController
        ],
        providers: [
            _patientsservice.default,
            _staffservice.default,
            _clinicsservice.default,
            _doctorsservice.default
        ]
    })
], MasterModule);

//# sourceMappingURL=master.module.js.map