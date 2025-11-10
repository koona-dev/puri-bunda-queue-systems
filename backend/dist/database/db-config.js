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
    get db () {
        return db;
    },
    get default () {
        return _default;
    }
});
const _config = require("@nestjs/config");
require("dotenv/config");
const _pg = require("pg");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _schemas = require("./schemas");
const configService = new _config.ConfigService();
const dbConnectionString = configService.get("DB_CONNECTION_STRING");
const pool = new _pg.Pool({
    connectionString: dbConnectionString
});
const db = (0, _nodepostgres.drizzle)(pool, {
    schema: _schemas.DBSchema
});
const _default = db;

//# sourceMappingURL=db-config.js.map