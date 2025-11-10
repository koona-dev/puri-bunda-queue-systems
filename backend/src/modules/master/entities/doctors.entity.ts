export interface Doctors {
  id?: string;
  code: string;
  name: string;
  specialization?: string | null;
  phone?: string | null;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  quota: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface DoctorsProps {
  id?: string;
  code?: string;
  name?: string;
  specialization?: string;
  isActive?: boolean;
  createdAt?: Date;
}

export interface CreateDoctor
  extends Omit<
    Doctors,
    "id" | "code" | "isActive" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface UpdateDoctor
  extends Omit<DoctorsProps, "id" | "code" | "createdAt"> {
  id: string;
  phone?: string;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  quota?: number;
}
