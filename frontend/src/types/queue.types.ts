export enum QueueStatus {
  Waiting = "Waiting",
  Called = "Called",
  Done = "Done",
  Cancelled = "Cancelled",
}

export enum Priority {
  Normal = "Normal",
  Urgent = "Urgent",
  Emergency = "Emergency",
}

export enum QueueType {
  Reservation = "Reservasi",
  Walkin = "Walk-In",
}

export enum ServiceType {
  RawatJalan = "Rawat Jalan",
  RawatInap = "Rawat Inap",
  UGD = "UGD",
}

export enum ReferenceType {
  Konsultasi = "Konsultasi",
  Checkup = "Checkup",
  Perawatan = "Perawatan",
  Lab = "Lab",
  Radiologi = "Radiologi",
  Vaksin = "Vaksin",
  Operasi = "Operasi",
}

export interface Patient {
  id: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface Clinic {
  id: string;
  name: string;
  code: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization?: string;
}

export interface Staff {
  id: string;
  name: string;
  loketNumber?: string;
}

export interface Queue {
  id: string;
  patientId: string;
  clinicId: string;
  doctorId: string;
  staffId: string;
  queueNumber: string;
  queueType: QueueType;
  priority: Priority;
  serviceType: ServiceType;
  referenceType: ReferenceType;
  chiefComplaint: string;
  symptoms: string;
  symptomsStartDate: Date | string;
  previousTreatment?: string | null;
  reservationDate: Date | string;
  preferredTime: string;
  status: QueueStatus;
  calledAt?: Date | string | null;
  completedAt?: Date | string | null;
  staffNotes?: string | null;
  cancellationReason?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string | null;
  deletedAt?: Date | string | null;
}

export interface QueueWithDetails extends Queue {
  patient: Patient;
  clinic: Clinic;
  doctor: Doctor;
  staff: Staff;
}
