// import * as bcrypt from "bcrypt";
// import { drizzle } from "drizzle-orm/node-postgres";
// async function seedDatabase() {
//   console.log("Loading environment variables...");
//   const dbConnectionString = process.env.DB_CONNECTION_STRING;
//   console.log("DATABASE_URL:", dbConnectionString);
//   if (!dbConnectionString) {
//     console.error("❌ Database connection string is missing.");
//     return;
//   }
//   console.log("✅ Connecting to database...");
//   const database = drizzle(dbConnectionString);
//   console.log("🌱 Seeding database...");
//   try {
//     const branchData: NewBranch = {
//       name: "Holding Company",
//       phone: "08123456789",
//       address: "Tabanan, Bali, Indonesia",
//     };
//     const insertedBranch = await database
//       .insert(branches)
//       .values(branchData)
//       .returning({
//         id: branches.id,
//         name: branches.name,
//       });
//     console.log("Branch created:", insertedBranch);
//     if (!insertedBranch) {
//       console.error("Error seeding branch:");
//       return;
//     }
//     const userGroupData: NewUserGroups = {
//       name: "Administrator",
//     };
//     const insertedGroup = await database
//       .insert(userGroups)
//       .values(userGroupData)
//       .returning({
//         id: branches.id,
//         name: branches.name,
//       });
//     console.log("User group created:", insertedGroup);
//     if (!insertedGroup) {
//       console.error("Error seeding user group:");
//       return;
//     }
//     const userData: NewUser = {
//       name: "Admin",
//       phone: "08123456789",
//       username: "admin@dmcones.com",
//       password: encryptPassword("admin911"),
//       branchId: insertedBranch[0].id,
//       groupId: insertedGroup[0].id,
//       aktif: true,
//     };
//     const [newUser] = await database.insert(users).values(userData).returning({
//       id: users.id,
//       email: users.username,
//       name: users.name,
//     });
//     console.log("✅ User created:", newUser);
//   } catch (error) {
//     console.error("❌ Error seeding user:", error);
//   }
//   console.log("🎉 Seeding Finished.");
// }
// seedDatabase();
"use strict";

//# sourceMappingURL=seeder.js.map