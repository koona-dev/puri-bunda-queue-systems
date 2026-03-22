export type QueueStatus = "Waiting" | "Called" | "Done";
export type QueuePriority = "Normal" | "Urgent" | "Emergency";

export interface QueueItem {
  id: string;
  queueNumber: string;
  patientName: string;
  loketNumber: string;
  clinicId: string;
  clinicName: string;
  priority: QueuePriority;
  status: QueueStatus;
}

export interface ClinicTab {
  id: string;
  name: string;
}
