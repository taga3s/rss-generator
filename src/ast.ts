import {
  isArrayOfString,
  isArrayOfXMLObj,
  isString,
  isXMLObj,
  type Value,
  type XMLObj,
} from "./ast_types.ts";

interface Node {
  type: string;
}

export interface XMLDeclarationNode extends Node {
  type: "declaration";
  attributes: { [key: string]: string };
}

export interface XMLTagNode extends Node {
  type: "tag";
  tagName: string;
  children: (XMLTagNode | ValueNode)[];
  attributes?: { [key: string]: string };
}

export interface ValueNode extends Node {
  type: "value";
  value: string;
}

/**
 * Extract attributes which start with "@" from the input object
 */
const extractAttrs = (input: XMLObj): { [key: string]: string } => {
  const attributes: { [key: string]: string } = {};
  for (const key of Object.keys(input)) {
    if (key.startsWith("@") && isString(input[key])) {
      attributes[key.substring(1)] = input[key];
      delete input[key];
    }
  }
  return attributes;
};

/**
 * Extract "$value" from the input object
 */
const extractValue = (input: XMLObj): string | undefined =>
  isString(input.$value) ? input.$value : undefined;

export const createXMLDeclarationNode = (
  children: XMLObj,
): XMLDeclarationNode => {
  const attributes = extractAttrs(children);
  return {
    type: "declaration",
    attributes,
  };
};

export const createXMLTagNode = (
  name: string,
  children: XMLObj | string,
): XMLTagNode => {
  if (isXMLObj(children)) {
    const attributes = extractAttrs(children);
    const value = extractValue(children);

    if (attributes || value) {
      return {
        type: "tag",
        tagName: name,
        ...(Object.keys(attributes).length > 0 ? { attributes } : {}),
        children: value ? createValueNodes(value) : createXMLTagNodes(children),
      };
    }
  }

  if (isString(children)) {
    return {
      type: "tag",
      tagName: name,
      children: createValueNodes(children),
    };
  }

  return {
    type: "tag",
    tagName: name,
    children: createXMLTagNodes(children),
  };
};

export const createXMLTagNodes = (xmlObj: XMLObj): XMLTagNode[] => {
  const nodes: XMLTagNode[] = [];

  for (const [key, value] of Object.entries(xmlObj)) {
    // If the value is an array, create multiple nodes
    if (isArrayOfXMLObj(value) || isArrayOfString(value)) {
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
  type: "value",
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
