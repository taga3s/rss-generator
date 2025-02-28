export type XMLObj = { [key: string]: XMLObj | Value | string[] };
export type Value = string | number;

type Input = XMLObj | Value | string[];

export const isXMLObj = (input: Input): input is XMLObj => {
  return typeof input === "object" && input !== null;
};

export const isStringValue = (
  input: Input,
): input is string => {
  return typeof input === "string";
};

export const isNumberValue = (
  input: Input,
): input is number => {
  return typeof input === "number";
};

export const isArrayOfStringValue = (
  input: Input,
): input is string[] => {
  return Array.isArray(input) &&
    input.every((value) => typeof value === "string");
};
