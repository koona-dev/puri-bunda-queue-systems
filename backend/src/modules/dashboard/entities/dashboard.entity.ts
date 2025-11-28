export interface DashboardSummary {
  queuesSummmary: QueuesSummary;
  staffSummary: StaffSummary[];
  topStaffPerformance: StaffPerformance[];
  staffServiceTimeAvg: StaffServiceTimeAvg[];
}

export interface QueuesSummary {
  totalWaiting: number;
  totalCalled: number;
  totalDone: number;
  totalCancelled: number;
  totalReservation: number;
  totalWalkin: number;
  avgServiceTimeMinutes: number;
  lastUpdated: Date;
}

export interface StaffSummary {
  staffId: string;
  staffCode: string;
  staffName: string;
  totalWaiting: number;
  totalCalled: number;
  totalDone: number;
  totalQueues: number;
  avgWaitingTimeMinutes: number;
  lastUpdated: Date;
}

export interface StaffPerformance {
  staffId: string;
  staffCode: string;
  staffName: string;
  loketNumber: string;
  clinicName: string;
  totalServed: number;
  avgServiceTimeMinutes: number;
  totalCallAttempts: number;
  lastServiceAt: Date;
  lastUpdated: Date;
}

export interface StaffServiceTimeAvg {
  hour: number;
  totalReservation: number;
  totalWalkin: number;
  totalQueues: number;
  avgProcessingMinutes: number;
}
