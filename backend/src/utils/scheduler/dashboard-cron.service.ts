import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DBSchema } from "src/database/schemas";
import {
  dashboardSummary,
  hourlyQueueDistribution,
  queueStatsByStaff,
  staffPerformance,
} from "src/database/schemas/dashboard.view";

@Injectable()
export class DashboardCronService {
  private readonly logger = new Logger(DashboardCronService.name);

  constructor(@Inject("DB_PG") private db: NodePgDatabase<typeof DBSchema>) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async generateDashboardGraphCron() {
    await this.db.refreshMaterializedView(dashboardSummary);
    await this.db.refreshMaterializedView(queueStatsByStaff);
    await this.db.refreshMaterializedView(staffPerformance);
    await this.db.refreshMaterializedView(hourlyQueueDistribution);
  }
}
