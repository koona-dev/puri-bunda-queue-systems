// utils/enum.ts
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
    get toDate () {
        return toDate;
    },
    get toEnum () {
        return toEnum;
    }
});
function toEnum(value, enumValues) {
    return enumValues.find((v)=>v === value);
}
function toDate(record) {
    return {
        createdAt: new Date(record.createdAt),
        updatedAt: record.updatedAt ? new Date(record.updatedAt) : null,
        deletedAt: record.deletedAt ? new Date(record.deletedAt) : null
    };
}

//# sourceMappingURL=converter.js.map