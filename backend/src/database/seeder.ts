import { drizzle } from "drizzle-orm/node-postgres";
import {
  clinics,
  doctors,
  NewClinic,
  NewDoctor,
  NewPatient,
  NewStaff,
  patients,
  staff,
} from "./schemas/master.schema";
import { generateCode } from "src/utils/generate-code";
import { encryptPassword } from "src/utils/encrypt";
import { PatientClass } from "src/modules/master/utils/patient-class.enum";
import { PatientType } from "src/modules/master/utils/patient-type.enum";
import { Gender } from "src/modules/master/utils/gender.enum";

async function seedDatabase() {
  console.log("Loading environment variables...");
  const dbConnectionString = process.env.DB_CONNECTION_STRING;

  console.log("DATABASE_URL:", dbConnectionString);

  if (!dbConnectionString) {
    console.error("❌ Database connection string is missing.");
    return;
  }

  console.log("✅ Connecting to database...");
  const database = drizzle(dbConnectionString);

  console.log("🌱 Seeding database...");

  try {
    const doctorsData: NewDoctor = {
      code: await generateCode(database, doctors, doctors.code, "code", "DTR"),
      name: "Poli Kandungan",
      dayOfWeek: 6,
      startTime: "08:00:00",
      endTime: "16:00:00",
      quota: 30,
    };

    const insertedDoctor = await database
      .insert(doctors)
      .values(doctorsData)
      .returning({
        id: doctors.id,
        name: doctors.name,
      });

    console.log("Doctor is created:", insertedDoctor);

    if (!insertedDoctor) {
      console.error("Error seeding doctor:");
      return;
    }

    const clinicsData: NewClinic = {
      code: await generateCode(database, clinics, clinics.code, "code", "CLC"),
      name: "Poli Kandungan",
    };

    const insertedClinic = await database
      .insert(clinics)
      .values(clinicsData)
      .returning({
        id: clinics.id,
        name: clinics.name,
      });

    console.log("Clinic is created:", insertedClinic);

    if (!insertedClinic) {
      console.error("Error seeding clinics group:");
      return;
    }

    const staffData: NewStaff = {
      code: await generateCode(database, staff, staff.code, "code", "STF"),
      loketNumber: "01",
      username: "admin",
      email: "admin@dmcones.com",
      password: encryptPassword("admin911"),
      name: "Holding Company",
      phone: "08123456789",
      clinicId: insertedClinic[0].id,
      address: "Tabanan, Bali, Indonesia",
    };

    const insertedStaff = await database
      .insert(staff)
      .values(staffData)
      .returning({
        id: staff.id,
        name: staff.name,
      });

    console.log("Staff created:", insertedStaff);

    if (!insertedStaff) {
      console.error("Error seeding staff:");
      return;
    }

    const patientsData: NewPatient = {
      code: await generateCode(database, patients, patients.code, "code", "PTN"),
      registrationNumber: await generateCode(
        database,
        patients,
        patients.registrationNumber,
        "registrationNumber", "REG"
      ),
      name: "Ryan Santoso",
      phone: "08123456789",
      birthDate: new Date("2000-01-01"),
      gender: Gender.l,
      nik: "1234567890",
      patientClass: PatientClass.second,
      patientType: PatientType.assurance,
      address: "Tabanan, Bali, Indonesia",
      haveAssurance: true,
      assuranceCode: await generateCode(
        database,
        patients,
        patients.assuranceCode,
        "assuranceCode", "ASSR"
      ),
    };

    const [newPatient] = await database
      .insert(patients)
      .values(patientsData)
      .returning({
        id: patients.id,
        name: patients.name,
      });

    console.log("✅ Patient created:", newPatient);
  } catch (error) {
    console.error("❌ Error seeding patient:", error);
  }

  console.log("🎉 Seeding Finished.");
}

seedDatabase();
