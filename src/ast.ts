import {
  isArrayOfValue,
  isArrayOfXMLObj,
  isValue,
  isXMLObj,
  type Value,
  type XMLObj,
} from "./ast_types.ts";
import { isString } from "./utils/types.ts";

interface Node {
  type: NodeTypes;
}

export enum NodeTypes {
  XML_DECLARATION = "declaration",
  XML_TAG = "tag",
  VALUE = "value",
}

export interface XMLDeclarationNode extends Node {
  type: NodeTypes.XML_DECLARATION;
  attributes: { [key: string]: string };
}

export interface XMLTagNode extends Node {
  type: NodeTypes.XML_TAG;
  tagName: string;
  children: (XMLTagNode | ValueNode)[];
  attributes?: { [key: string]: string };
}

export interface ValueNode extends Node {
  type: NodeTypes.VALUE;
  value: string;
}

interface Attributes {
  [key: string]: Value;
}
/**
 * Extract attributes which start with "@" from the input object
 */
const extractAttrs = (input: XMLObj): Attributes => {
  const attributes: Attributes = {};
  for (const key of Object.keys(input)) {
    if (key.startsWith("@") && isString(input[key])) {
      attributes[key.substring(1)] = input[key];
      delete input[key];
    }
  }
  return attributes;
};

export const createXMLDeclarationNode = (
  children: XMLObj,
): XMLDeclarationNode => ({
  type: NodeTypes.XML_DECLARATION,
  attributes: extractAttrs(children),
});

export const createXMLTagNode = (
  name: string,
  children: XMLObj | Value,
): XMLTagNode => {
  if (isXMLObj(children)) {
    const attributes = extractAttrs(children);
    return {
      type: NodeTypes.XML_TAG,
      tagName: name,
      ...(Object.keys(attributes).length > 0 ? { attributes } : {}),
      children: isValue(children.$value)
        ? createValueNodes(children.$value)
        : createXMLTagNodes(children),
    };
  }

  return {
    type: NodeTypes.XML_TAG,
    tagName: name,
    children: isValue(children)
      ? createValueNodes(children)
      : createXMLTagNodes(children),
  };
};

export const createXMLTagNodes = (xmlObj: XMLObj): XMLTagNode[] => {
  const nodes: XMLTagNode[] = [];

  for (const [key, value] of Object.entries(xmlObj)) {
    // If the value is an array, create multiple nodes
    if (isArrayOfXMLObj(value) || isArrayOfValue(value)) {
      for (const v of value) {
        nodes.push(createXMLTagNode(key, v));
      }
      continue;
    }

    nodes.push(createXMLTagNode(key, value));
  }

  return nodes;
};

export const createValueNode = (value: Value): ValueNode => ({
  type: NodeTypes.VALUE,
  value,
});

const createValueNodes = (
  value: Value,
): ValueNode[] => [createValueNode(value)];

const createXMLRootNodes = (
  xmlObj: XMLObj,
): (XMLDeclarationNode | XMLTagNode)[] => {
  const nodes: (XMLDeclarationNode | XMLTagNode)[] = [];

  for (const [key, value] of Object.entries(xmlObj)) {
    if (isXMLObj(value)) {
      // If the key represents <xml>, create a declaration node
      if (key === "xml") {
        nodes.push(createXMLDeclarationNode(value));
        continue;
      }

      nodes.push(createXMLTagNode(key, value));
    }
  }

  return nodes;
};

/**
 * Create an XML tree from the input object. This is an entry point.
 */
export const createXMLTree = (
  input: XMLObj,
): (XMLDeclarationNode | XMLTagNode)[] => createXMLRootNodes(input);
