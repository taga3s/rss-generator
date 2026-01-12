import { isObject, isString } from "./utils/types.ts";

export interface XMLObj {
  [key: string | number | symbol]: XMLObj | string | string[];
}
export type Value = string;

type Input = XMLObj | XMLObj[] | string | string[];

export const isXMLObj = (input: Input): input is XMLObj => {
  return isObject(input);
};

export const isArrayOfXMLObj = (
  input: Input,
): input is XMLObj[] => {
  return Array.isArray(input) &&
    input.every(isXMLObj);
};

export const isValue = (
  input: Input,
): input is Value => {
  return isString(input);
};

export const isArrayOfValue = (
  input: Input,
): input is Value[] => {
  return Array.isArray(input) &&
    input.every(isValue);
};
