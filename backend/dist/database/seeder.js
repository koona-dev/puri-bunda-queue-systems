"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nodepostgres = require("drizzle-orm/node-postgres");
const _masterschema = require("./schemas/master.schema");
const _generatecode = require("../utils/generate-code");
const _encrypt = require("../utils/encrypt");
async function seedDatabase() {
    console.log("Loading environment variables...");
    const dbConnectionString = process.env.DB_CONNECTION_STRING;
    console.log("DATABASE_URL:", dbConnectionString);
    if (!dbConnectionString) {
        console.error("❌ Database connection string is missing.");
        return;
    }
    console.log("✅ Connecting to database...");
    const database = (0, _nodepostgres.drizzle)(dbConnectionString);
    console.log("🌱 Seeding database...");
    try {
        const doctorsData = {
            code: await (0, _generatecode.generateCode)(database, _masterschema.doctors, "code", "DTR"),
            name: "Dr. Hj. Haryono",
            dayOfWeek: 5,
            startTime: "09:00:00",
            endTime: "17:00:00",
            quota: 40
        };
        const insertedDoctor = await database.insert(_masterschema.doctors).values(doctorsData).returning({
            id: _masterschema.doctors.id,
            code: _masterschema.doctors.code,
            name: _masterschema.doctors.name
        });
        console.log("Doctor is created:", insertedDoctor);
        if (!insertedDoctor) {
            console.error("Error seeding doctor:");
            return;
        }
        const clinicsData = {
            code: await (0, _generatecode.generateCode)(database, _masterschema.clinics, "code", "CLC"),
            name: "Poli Kandungan"
        };
        const insertedClinic = await database.insert(_masterschema.clinics).values(clinicsData).returning({
            id: _masterschema.clinics.id,
            code: _masterschema.clinics.code,
            name: _masterschema.clinics.name
        });
        console.log("Clinic is created:", insertedClinic);
        if (!insertedClinic) {
            console.error("Error seeding clinics group:");
            return;
        }
        const staffData = {
            code: await (0, _generatecode.generateCode)(database, _masterschema.staff, "code", "STF"),
            loketNumber: "02",
            username: "staff-loket2",
            email: "staff2@puribunda.com",
            password: (0, _encrypt.encryptPassword)("staff2"),
            name: "Holding Company",
            phone: "0812343534534",
            clinicId: insertedClinic[0].id,
            address: "Badung, Bali, Indonesia"
        };
        const insertedStaff = await database.insert(_masterschema.staff).values(staffData).returning({
            id: _masterschema.staff.id,
            code: _masterschema.staff.code,
            name: _masterschema.staff.name
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

//# sourceMappingURL=seeder.js.map