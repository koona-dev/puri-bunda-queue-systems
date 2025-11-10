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
async function generateCode(db, schema, field, key) {
    const prefix = "DM";
    const now = new Date();
    const datePart = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
    const latestData = await db.select().from(schema).where((0, _drizzleorm.like)(field, `${datePart}%`)).orderBy((0, _drizzleorm.desc)(field));
    let nextNumber = 1;
    if (latestData && latestData.length > 0) {
        // Type assertion
        const codeValue = latestData[0][key];
        const parts = codeValue.split("/");
        const lastNum = parseInt(parts[1], 10);
        nextNumber = lastNum + 1;
    }
    const newCode = `${prefix}${String(nextNumber).padStart(3, "0")}/${datePart}`;
    return newCode;
}

//# sourceMappingURL=generate-code.js.map