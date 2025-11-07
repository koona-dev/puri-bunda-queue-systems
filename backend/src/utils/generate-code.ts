import { desc, like } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { DBSchemaType } from "src/database/schemas";

export async function generateCode(
  db: NodePgDatabase<DBSchemaType>,
  schema: PgTable,
  field: PgColumn,
  key: string
): Promise<string> {
  const prefix = "DM";
  const now = new Date();

  const datePart = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;

  const latestData = await db
    .select()
    .from(schema)
    .where(like(field, `${datePart}%`))
    .orderBy(desc(field));

  let nextNumber = 1;
  if (latestData && latestData.length > 0) {
    // Type assertion
    const codeValue = (latestData[0] as any)[key] as string;
    const parts = codeValue.split("/");
    const lastNum = parseInt(parts[1], 10);
    nextNumber = lastNum + 1;
  }

  const newCode = `${prefix}${String(nextNumber).padStart(3, "0")}/${datePart}`;
  return newCode;
}
