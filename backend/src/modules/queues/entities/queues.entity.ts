import { Patients } from "src/modules/master/entities/patients.entity";
import { Priority } from "../utils/priority.enum";
import { QueueStatus } from "../utils/queue-status.enum";
import { QueueType } from "../utils/queue-type.enum";
import { ReferenceType } from "../utils/reference-type.enum";
import { ServiceType } from "../utils/service-type";
import { Clinics } from "src/modules/master/entities/clinics.entity";
import { Doctors } from "src/modules/master/entities/doctors.entity";
import { Staff } from "src/modules/master/entities/staff.entity";

export interface PatientQueueDetails {
  queue: Queues;
  patient: Patients;
  clinic: Clinics;
  doctor: Doctors;
  staff: Staff;
  queueCall: QueueCalls;
}

export interface Queues {
  id?: string;
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
  symptomsStartDate: Date;
  previousTreatment?: string | null;
  reservationDate: Date;
  preferredTime: string;
  status: QueueStatus;
  calledAt?: Date | null;
  completedAt?: Date | null;
  staffNotes?: string | null;
  cancellationReason?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface QueuesProps {
  id?: string;
  patientId?: string;
  clinicId?: string;
  doctorId?: string;
  staffId?: string;
  queueNumber?: string;
  queueType?: QueueType;
  priority?: Priority;
  serviceType?: ServiceType;
  referenceType?: ReferenceType;
  reservationDate?: Date;
  status?: QueueStatus;
  createdAt?: Date;
}

export interface CreateQueue
  extends Omit<
    Queues,
    | "id"
    | "queueNumber"
    | "status"
    | "staffNotes"
    | "calledAt"
    | "completedAt"
    | "cancellationReason"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

export interface UpdateQueue {
  id: string;
  queueType?: QueueType;
  priority?: Priority;
  serviceType?: ServiceType;
  referenceType?: ReferenceType;
  chiefComplaint?: string;
  symptoms?: string;
  symptomsStartDate?: Date;
  previousTreatment?: string;
  reservationDate?: Date;
  preferredTime?: string;
  status?: QueueStatus;
  staffNotes?: string;
  cancellationReason?: string;
}

export class QueueCalls {
  id: string;
  queueId: string;
  staffId: string;
  calledAt?: Date | null;
  responseTime?: number | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
