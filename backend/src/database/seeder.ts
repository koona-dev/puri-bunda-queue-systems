import { drizzle } from "drizzle-orm/node-postgres";
import {
  clinics,
  doctors,
  NewClinic,
  NewDoctor,
  NewStaff,
  staff,
} from "./schemas/master.schema";
import { generateCode } from "src/utils/generate-code";
import { encryptPassword } from "src/utils/encrypt";

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
      code: await generateCode(database, doctors, "code", "DTR"),
      name: "Dr. Hj. Haryono",
      dayOfWeek: 5,
      startTime: "09:00:00",
      endTime: "17:00:00",
      quota: 40,
    };

    const insertedDoctor = await database
      .insert(doctors)
      .values(doctorsData)
      .returning({
        id: doctors.id,
        code: doctors.code,
        name: doctors.name,
      });

    console.log("Doctor is created:", insertedDoctor);

    if (!insertedDoctor) {
      console.error("Error seeding doctor:");
      return;
    }

    const clinicsData: NewClinic = {
      code: await generateCode(database, clinics, "code", "CLC"),
      name: "Poli Kandungan",
    };

    const insertedClinic = await database
      .insert(clinics)
      .values(clinicsData)
      .returning({
        id: clinics.id,
        code: clinics.code,
        name: clinics.name,
      });

    console.log("Clinic is created:", insertedClinic);

    if (!insertedClinic) {
      console.error("Error seeding clinics group:");
      return;
    }

    const staffData: NewStaff = {
      code: await generateCode(database, staff, "code", "STF"),
      loketNumber: "02",
      username: "staff-loket2",
      email: "staff2@puribunda.com",
      password: encryptPassword("staff2"),
      name: "Holding Company",
      phone: "0812343534534",
      clinicId: insertedClinic[0].id,
      address: "Badung, Bali, Indonesia",
    };

    const insertedStaff = await database
      .insert(staff)
      .values(staffData)
      .returning({
        id: staff.id,
        code: staff.code,
        name: staff.name,
      });

    console.log("Staff created:", insertedStaff);

    if (!insertedStaff) {
      console.error("Error seeding staff:");
      return;
    }
  } catch (error) {
    console.error("❌ Error seeding any data:", error);
  }

  console.log("🎉 Seeding Finished.");
}

seedDatabase();
