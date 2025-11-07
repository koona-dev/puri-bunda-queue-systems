// utils/enum.ts
export function toEnum<T extends string>(
  value: string | undefined,
  enumValues: readonly T[]
): T {
  return enumValues.find((v) => v === value) as T;
}

export function toDate(
  record: Record<string, any>
): Record<string, Date | null> {
  return {
    createdAt: new Date(record.createdAt),
    updatedAt: record.updatedAt ? new Date(record.updatedAt) : null,
    deletedAt: record.deletedAt ? new Date(record.deletedAt) : null,
  };
}
