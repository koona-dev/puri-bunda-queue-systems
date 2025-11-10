import { Gender } from "../utils/gender.enum";
import { PatientClass } from "../utils/patient-class.enum";
import { PatientType } from "../utils/patient-type.enum";

export interface Patients {
  id?: string;
  code: string;
  registrationNumber: string;
  nik: string;
  name: string;
  birthDate: Date;
  gender: Gender;
  phone: string;
  address: string;
  patientType: PatientType;
  patientClass: PatientClass;
  haveAssurance: boolean;
  assuranceCode?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface PatientsProps {
  id?: string;
  code?: string;
  registrationNumber?: string;
  nik?: string;
  name?: string;
  birthDate?: Date;
  gender?: Gender;
  phone?: string;
  address?: string;
  patientType?: PatientType;
  patientClass?: PatientClass;
  haveAssurance?: boolean;
  assuranceCode?: string | null;
  createdAt?: Date;
}

export interface CreatePatient
  extends Omit<
    Patients,
    | "id"
    | "code"
    | "registrationNumber"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

export interface UpdatePatient
  extends Omit<
    PatientsProps,
    | "id"
    | "code"
    | "registrationNumber"
    | "createdAt"
  > {
  id: string;
}
