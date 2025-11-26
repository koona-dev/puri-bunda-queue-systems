import { desc, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgTable } from "drizzle-orm/pg-core";
import { DBSchemaType } from "src/database/schemas";

export async function generateCode(
  db: NodePgDatabase<DBSchemaType | Record<string, never>>,
  schema: PgTable,
  key: string,
  prefix: string
): Promise<string> {
  const now = new Date();

  const datePart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const latestData = await db
    .select({
      lastNumber: sql<number>`
      CAST(substring(${schema[key]} from '(\\d+)$') AS INTEGER)
    `,
    })
    .from(schema)
    .orderBy(
      desc(
        sql<number>`CAST(substring(${schema[key]} from '(\\d+)$') AS INTEGER)`
      )
    )
    .limit(1);

  let nextNumber = 1;
  if (latestData && latestData.length > 0) {
    nextNumber = latestData[0].lastNumber + 1;
  }

  const newCode = `${prefix}-${datePart}-${String(nextNumber).padStart(3, "0")}`;
  return newCode;
}
