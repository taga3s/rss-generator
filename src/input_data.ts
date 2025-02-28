export type XMLObj = { [key: string]: XMLObj | Value | string[] };
export type Value = string;

type Input = XMLObj | XMLObj[] | Value | Value[];

export const isXMLObj = (input: Input): input is XMLObj => {
  return typeof input === "object" && input !== null;
};

export const isArrayOfXMLObj = (
  input: Input,
): input is XMLObj[] => {
  return Array.isArray(input) &&
    input.every(isXMLObj);
};

export const isStringValue = (
  input: Input,
): input is string => {
  return typeof input === "string";
};

export const isArrayOfStringValue = (
  input: Input,
): input is string[] => {
  return Array.isArray(input) &&
    input.every(isStringValue);
};
