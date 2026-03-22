export interface Clinic {
  id?: string;
  code: string;
  name: string;
  description?: string | null;
  isActive: boolean;
}

export interface QueuePatient {
  id?: string;
  code: string;
  name: string;
  nik: string;
}

export interface QueueDoctor {
  id?: string;
  code: string;
  name: string;
  specialization?: string | null;
}

export interface QueueStaff {
  id?: string;
  code: string;
  name: string;
  loketNumber: string;
}

export interface QueueCall {
  calledAt?: string | null;
}

export interface QueueItem {
  queue: {
    id?: string;
    queueNumber: string;
    status: string;
    priority: string;
    serviceType: string;
    reservationDate: string;
    preferredTime: string;
  };
  clinic: Clinic;
  patient: QueuePatient;
  doctor: QueueDoctor;
  staff: QueueStaff;
  queueCall?: QueueCall;
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`/api${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Please log in to view clinic queue data.");
    }

    throw new Error(`Request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export function fetchClinics() {
  return fetchJson<Clinic[]>("/clinics/list");
}

export function fetchQueues() {
  return fetchJson<QueueItem[]>("/queues/list");
}
