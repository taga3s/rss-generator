export const isPlainObject = (val: unknown) =>
  !!val && typeof val === "object" && val.constructor === Object;
