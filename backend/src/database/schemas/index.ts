import * as masterSchema from "./master.schema";
import * as queueSchema from "./queue.schema";
import * as dashboardView from "./dashboard.view";

export const DBSchema = {
  ...masterSchema,
  ...queueSchema,
  ...dashboardView,
};
export type DBSchemaType = typeof DBSchema;
