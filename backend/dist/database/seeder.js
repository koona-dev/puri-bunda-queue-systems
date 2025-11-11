"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nodepostgres = require("drizzle-orm/node-postgres");
const _masterschema = require("./schemas/master.schema");
const _generatecode = require("../utils/generate-code");
const _encrypt = require("../utils/encrypt");
const _patientclassenum = require("../modules/master/utils/patient-class.enum");
const _patienttypeenum = require("../modules/master/utils/patient-type.enum");
const _genderenum = require("../modules/master/utils/gender.enum");
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
            code: await (0, _generatecode.generateCode)(database, _masterschema.doctors, _masterschema.doctors.code, "code"),
            name: "Poli Kandungan",
            dayOfWeek: 6,
            startTime: "08:00:00",
            endTime: "16:00:00",
            quota: 30
        };
        const insertedDoctor = await database.insert(_masterschema.doctors).values(doctorsData).returning({
            id: _masterschema.doctors.id,
            name: _masterschema.doctors.name
        });
        console.log("Doctor is created:", insertedDoctor);
        if (!insertedDoctor) {
            console.error("Error seeding doctor group:");
            return;
        }
        const clinicsData = {
            code: await (0, _generatecode.generateCode)(database, _masterschema.clinics, _masterschema.clinics.code, "code"),
            name: "Poli Kandungan"
        };
        const insertedClinic = await database.insert(_masterschema.clinics).values(clinicsData).returning({
            id: _masterschema.clinics.id,
            name: _masterschema.clinics.name
        });
        console.log("Clinic is created:", insertedClinic);
        if (!insertedClinic) {
            console.error("Error seeding clinics group:");
            return;
        }
        const staffData = {
            code: await (0, _generatecode.generateCode)(database, _masterschema.staff, _masterschema.staff.code, "code"),
            loketNumber: "01",
            username: "admin",
            email: "admin@dmcones.com",
            password: (0, _encrypt.encryptPassword)("admin911"),
            name: "Holding Company",
            phone: "08123456789",
            clinicId: insertedClinic[0].id,
            address: "Tabanan, Bali, Indonesia"
        };
        const insertedStaff = await database.insert(_masterschema.staff).values(staffData).returning({
            id: _masterschema.staff.id,
            name: _masterschema.staff.name
        });
        console.log("Staff created:", insertedStaff);
        if (!insertedStaff) {
            console.error("Error seeding staff:");
            return;
        }
        const patientsData = {
            code: await (0, _generatecode.generateCode)(database, _masterschema.patients, _masterschema.patients.code, "code"),
            registrationNumber: await (0, _generatecode.generateCode)(database, _masterschema.patients, _masterschema.patients.registrationNumber, "registrationNumber"),
            name: "Ryan Santoso",
            phone: "08123456789",
            birthDate: new Date("2000-01-01"),
            gender: _genderenum.Gender.l,
            nik: "1234567890",
            patientClass: _patientclassenum.PatientClass.second,
            patientType: _patienttypeenum.PatientType.assurance,
            address: "Tabanan, Bali, Indonesia",
            haveAssurance: true,
            assuranceCode: await (0, _generatecode.generateCode)(database, _masterschema.patients, _masterschema.patients.assuranceCode, "assuranceCode")
        };
        const [newPatient] = await database.insert(_masterschema.patients).values(patientsData).returning({
            id: _masterschema.patients.id,
            name: _masterschema.patients.name
        });
        console.log("✅ Patient created:", newPatient);
    } catch (error) {
        console.error("❌ Error seeding patient:", error);
    }
    console.log("🎉 Seeding Finished.");
}
seedDatabase();

//# sourceMappingURL=seeder.js.map