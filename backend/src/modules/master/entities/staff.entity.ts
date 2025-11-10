export interface Staff {
  id?: string;
  code: string;
  loketNumber: string;
  nik?: string | null;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address?: string | null;
  isActive: boolean;
  lastLoginAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface StaffProps {
  id?: string;
  code?: string;
  loketNumber?: string;
  nik?: string | null;
  name?: string;
  email?: string;
  phone?: string;
  address?: string | null;
  isActive?: boolean;
  createdAt?: Date;
}

export interface CreateStaff
  extends Omit<
    Staff,
    | "id"
    | "code"
    | "isActive"
    | "lastLoginAt"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

export interface UpdateStaff
  extends Omit<StaffProps, "id" | "code" | "loketNumber" | "createdAt"> {
  id: string;
  password?: string;
  lastLoginAt?: Date;
}
