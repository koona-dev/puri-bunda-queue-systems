import { ConfigService } from "@nestjs/config";
import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import { DBSchema } from "./schemas";

const configService = new ConfigService();

const dbConnectionString = configService.get<string>("DB_CONNECTION_STRING");

const pool = new Pool({
  connectionString: dbConnectionString,
});

export const db = drizzle(pool, {
  schema: DBSchema,
});

export default db;
