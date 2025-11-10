export interface Clinics {
  id?: string;
  code: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface ClinicsProps {
  id?: string;
  code?: string;
  name?: string;
  isActive?: boolean;
  createdAt?: Date;
}

export interface CreateClinic extends Pick<Clinics, "name" | "description"> {}

export interface UpdateClinic {
  id: string;
  name?: string;
  description?: string;
}
