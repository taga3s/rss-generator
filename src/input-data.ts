export type XMLObj = { [key: string]: XMLObj | string | string[] };
export type Value = string | number;

export const isXMLObj = (input: XMLObj | Value): input is XMLObj => {
  return typeof input === "object" && input !== null;
};

export const isStringValue = (input: XMLObj | Value): input is string => {
  return typeof input === "string";
};

export const isNumberValue = (input: XMLObj | Value): input is number => {
  return typeof input === "number";
};
