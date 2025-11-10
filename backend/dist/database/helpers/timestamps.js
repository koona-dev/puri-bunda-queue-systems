"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "timestamps", {
    enumerable: true,
    get: function() {
        return timestamps;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const timestamps = {
    createdAt: (0, _pgcore.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, _pgcore.timestamp)("updated_at").$onUpdate(()=>new Date()),
    deletedAt: (0, _pgcore.timestamp)("deleted_at")
};

//# sourceMappingURL=timestamps.js.map