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
    get gender () {
        return gender;
    },
    get patientClass () {
        return patientClass;
    },
    get patientType () {
        return patientType;
    },
    get priority () {
        return priority;
    },
    get queueStatus () {
        return queueStatus;
    },
    get queueType () {
        return queueType;
    },
    get referenceType () {
        return referenceType;
    },
    get serviceType () {
        return serviceType;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const gender = (0, _pgcore.pgEnum)("gender", [
    "L",
    "P"
]);
const patientClass = (0, _pgcore.pgEnum)("patient_class", [
    "Kelas 3",
    "Kelas 2",
    "Kelas 1",
    "VIP"
]);
const queueType = (0, _pgcore.pgEnum)("queue_type", [
    "Reservasi",
    "Walk-In"
]);
const queueStatus = (0, _pgcore.pgEnum)("queue_status", [
    "Draft",
    "Waiting",
    "Called",
    "On-Hold",
    "Done",
    "Cancelled"
]);
const patientType = (0, _pgcore.pgEnum)("patient_type", [
    "Umum",
    "Asuransi",
    "Rujukan"
]);
const serviceType = (0, _pgcore.pgEnum)("service_type", [
    "Rawat Jalan",
    "Rawat Inap",
    "UGD"
]);
const referenceType = (0, _pgcore.pgEnum)("reference_type", [
    "Konsultasi",
    "Checkup",
    "Perawatan",
    "Lab",
    "Radiologi",
    "Vaksin",
    "Operasi"
]);
const priority = (0, _pgcore.pgEnum)("priority", [
    "Normal",
    "Urgent",
    "Emergency"
]);

//# sourceMappingURL=enums.js.map