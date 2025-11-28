import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Inject } from "@nestjs/common";

import { DBSchema } from "src/database/schemas";
import {
  dashboardSummary,
  hourlyQueueDistribution,
  queueStatsByStaff,
  staffPerformance,
} from "src/database/schemas/dashboard.view";
import { DashboardSummary } from "./entities/dashboard.entity";

export class DashboardService {
  constructor(@Inject("DB_PG") private db: NodePgDatabase<typeof DBSchema>) {}

  // ===========[Queries]===========
  async getDashboardSummary(): Promise<DashboardSummary | undefined> {
    try {
      const queueSummary = await this.db.select().from(dashboardSummary);
      const staffSummary = await this.db.select().from(queueStatsByStaff);
      const topStaffPerformance = await this.db.select().from(staffPerformance);
      const hourlyQueue = await this.db.select().from(hourlyQueueDistribution);

      return {
        queuesSummmary: queueSummary[0],
        staffSummary: staffSummary,
        topStaffPerformance: topStaffPerformance,
        staffServiceTimeAvg: hourlyQueue,
      };
    } catch (error) {}
  }
}
