import { XMLObj } from "./input-data.ts";
import { isPlainObject } from "./utils.ts";

interface Node {
  type: string;
}

interface XMLNode extends Node {
  type: "node";
  tagName: string;
  attributes?: { [key: string]: string };
  children?: (XMLNode | TextNode)[];
}

interface TextNode extends Node {
  type: "text";
  value: string;
}

const createXMLNode = (name: string, value: XMLObj | string): XMLNode => {
  return ({
    type: "node",
    tagName: name,
    children: createNodes(value),
  });
};

const createTextNode = (value: string): TextNode => ({
  type: "text",
  value: value,
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

const createTextNodes = (value: string): TextNode[] => [createTextNode(value)];

const createNodes = (input: XMLObj | string): (XMLNode | TextNode)[] => {
  // If the input is a string, create a text node
  if (typeof input === "string") {
    return createTextNodes(input);
  }

  // If the input is an object, create multiple nodes
  if (isPlainObject(input)) {
    return createXMLNodes(input);
  }

  return [];
};

/**
 * Create an XML tree from the input object. This is an entry point.
 */
const createXMLTree = (input: XMLObj): XMLNode[] => createXMLNodes(input);

export { createNodes, createTextNode, createXMLNode, createXMLTree };
export type { TextNode, XMLNode };
