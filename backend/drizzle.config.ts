import { ConfigService } from "@nestjs/config";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const configService = new ConfigService();

const dbConnectionString = configService.getOrThrow<string>(
  "DB_CONNECTION_STRING"
);

if (!dbConnectionString) {
  throw new Error("Missing required database environment variables");
}

export default defineConfig({
  dialect: "postgresql",
  schema: [
    "./src/database/helpers/enums.ts",
    "./src/database/schemas/master.schema.ts",
    "./src/database/schemas/queue.schema.ts",  
    "./src/database/schemas/dashboard.view.ts",  
  ],
  out: "./migrations",
  dbCredentials: {
    url: dbConnectionString,
  },
});
