import {
  isNumberValue,
  isStringValue,
  isXMLObj,
  Value,
  XMLObj,
} from "./input-data.ts";

interface Node {
  type: string;
}

interface XMLNode extends Node {
  type: "node";
  tagName: string;
  children: (XMLNode | ValueNode)[];
  attributes?: { [key: string]: string };
}

interface ValueNode extends Node {
  type: "value";
  value: string | number;
}

const createXMLNode = (name: string, input: XMLObj | Value): XMLNode => {
  return ({
    type: "node",
    tagName: name,
    children: createNodes(input),
  });
};

const createValueNode = (input: Value): ValueNode => ({
  type: "value",
  value: input,
});

const createXMLNodes = (input: XMLObj): XMLNode[] => {
  const nodes: XMLNode[] = [];

  for (const [key, value] of Object.entries(input)) {
    // If the value is an array, create multiple nodes
    if (Array.isArray(value)) {
      for (const v of value) {
        nodes.push(createXMLNode(key, v));
      }
      continue;
    }

    nodes.push(createXMLNode(key, value));
  }

  return nodes;
};

const createValueNodes = (
  input: Value,
): ValueNode[] => [createValueNode(input)];

const createNodes = (input: XMLObj | Value): (XMLNode | ValueNode)[] => {
  // If the input is a string, create a text node
  if (isStringValue(input) || isNumberValue(input)) {
    return createValueNodes(input);
  }

  // If the input is an object, create multiple nodes
  if (isXMLObj(input)) {
    return createXMLNodes(input);
  }

  return [];
};

/**
 * Create an XML tree from the input object. This is an entry point.
 */
const createXMLTree = (input: XMLObj): XMLNode[] => createXMLNodes(input);

export { createNodes, createValueNode, createXMLNode, createXMLTree };
export type { ValueNode, XMLNode };
