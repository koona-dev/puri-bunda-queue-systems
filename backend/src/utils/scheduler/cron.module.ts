import { Module } from '@nestjs/common';
import { DashboardCronService } from './dashboard-cron.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DashboardCronService],
  exports: []
})
export class CronModule { }
