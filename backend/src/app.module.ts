import { DrizzlePGModule } from "@knaadh/nestjs-drizzle-pg";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { QueueModule } from "./modules/queue/queue.module";
import { MasterModule } from "./modules/master/master.module";
import { DBSchema } from "./database/schemas";
import { DashboardModule } from "./modules/dashboard/dashboard.module";

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzlePGModule.registerAsync({
      inject: [ConfigService],
      tag: "DB_PG",
      useFactory(configService: ConfigService) {
        return {
          pg: {
            connection: "pool",
            config: {
              connectionString: configService.get<string>(
                "DB_CONNECTION_STRING"
              ),
            },
          },
          config: {
            schema: DBSchema,
          },
        };
      },
    }),
    MasterModule,
    QueueModule,
    DashboardModule,
  ],
})
export class AppModule {}
