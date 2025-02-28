export type XMLObj = { [key: string]: XMLObj | string | string[] };
export type Value = string;

type Input = XMLObj | XMLObj[] | string | string[];

export const isXMLObj = (input: Input): input is XMLObj => {
  return typeof input === "object" && input !== null;
};

export const isArrayOfXMLObj = (
  input: Input,
): input is XMLObj[] => {
  return Array.isArray(input) &&
    input.every(isXMLObj);
};

export const isString = (
  input: Input,
): input is string => {
  return typeof input === "string";
};

export const isArrayOfString = (
  input: Input,
): input is string[] => {
  return Array.isArray(input) &&
    input.every(isString);
};
