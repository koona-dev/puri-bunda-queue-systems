"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _nestjsdrizzlepg = require("@knaadh/nestjs-drizzle-pg");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _queuesmodule = require("./modules/queues/queues.module");
const _mastermodule = require("./modules/master/master.module");
const _schemas = require("./database/schemas");
const _dashboardmodule = require("./modules/dashboard/dashboard.module");
const _authmodule = require("./modules/auth/auth.module");
const _cronmodule = require("./utils/scheduler/cron.module");
const _schedule = require("@nestjs/schedule");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                isGlobal: true
            }),
            _nestjsdrizzlepg.DrizzlePGModule.registerAsync({
                inject: [
                    _config.ConfigService
                ],
                tag: "DB_PG",
                useFactory (configService) {
                    return {
                        pg: {
                            connection: "pool",
                            config: {
                                connectionString: configService.get("DB_CONNECTION_STRING")
                            }
                        },
                        config: {
                            schema: _schemas.DBSchema
                        }
                    };
                }
            }),
            _schedule.ScheduleModule.forRoot(),
            _cronmodule.CronModule,
            _authmodule.AuthModule,
            _dashboardmodule.DashboardModule,
            _mastermodule.MasterModule,
            _queuesmodule.QueueModule
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map