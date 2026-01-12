export type Undefinable<T> = T | undefined;

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};
