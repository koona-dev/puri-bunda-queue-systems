"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateCode", {
    enumerable: true,
    get: function() {
        return generateCode;
    }
});
const _drizzleorm = require("drizzle-orm");
async function generateCode(db, schema, key, prefix) {
    const now = new Date();
    const datePart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const latestData = await db.select({
        lastNumber: (0, _drizzleorm.sql)`
      CAST(substring(${schema[key]} from '(\\d+)$') AS INTEGER)
    `
    }).from(schema).orderBy((0, _drizzleorm.desc)((0, _drizzleorm.sql)`CAST(substring(${schema[key]} from '(\\d+)$') AS INTEGER)`)).limit(1);
    let nextNumber = 1;
    if (latestData && latestData.length > 0) {
        nextNumber = latestData[0].lastNumber + 1;
    }
    const newCode = `${prefix}-${datePart}-${String(nextNumber).padStart(3, "0")}`;
    return newCode;
}

//# sourceMappingURL=generate-code.js.map