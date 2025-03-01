import {
  isArrayOfString,
  isArrayOfXMLObj,
  isString,
  isXMLObj,
  Value,
  XMLObj,
} from "./tree_types.ts";

interface Node {
  type: string;
}

interface XMLTagNode extends Node {
  type: "tag";
  tagName: string;
  children: (XMLTagNode | ValueNode)[];
  attributes?: { [key: string]: string };
}

interface ValueNode extends Node {
  type: "value";
  value: string;
}

const createXMLTagNode = (
  name: string,
  children: XMLObj | string,
): XMLTagNode => {
  if (isXMLObj(children)) {
    // Extract attributes which start with "@" from the input object
    const _extractAttributes = (input: XMLObj): { [key: string]: string } => {
      const attributes: { [key: string]: string } = {};
      for (const key of Object.keys(input)) {
        if (key.startsWith("@") && isString(input[key])) {
          attributes[key.substring(1)] = input[key];
          delete input[key];
        }
      }
      return attributes;
    };

    // Extract "$value" from the input object
    const _extractValue = (input: XMLObj): string | undefined =>
      isString(input.$value) ? input.$value : undefined;

    const attributes = _extractAttributes(children);
    const value = _extractValue(children);

    if (attributes || value) {
      return {
        type: "tag",
        tagName: name,
        ...(Object.keys(attributes).length > 0 ? { attributes } : {}),
        children: value ? createValueNodes(value) : createXMLTagNodes(children),
      };
    }
  }

  return ({
    type: "tag",
    tagName: name,
    children: createNodes(children),
  });
};

const createXMLTagNodes = (xmlObj: XMLObj): XMLTagNode[] => {
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

const createValueNode = (value: Value): ValueNode => ({
  type: "value",
  value,
});

const createValueNodes = (
  value: Value,
): ValueNode[] => [createValueNode(value)];

const createNodes = (input: XMLObj | string): (XMLTagNode | ValueNode)[] => {
  // If the input is an object, create multiple nodes
  if (isXMLObj(input)) {
    return createXMLTagNodes(input);
  }

  // If the input is a string, create a value node
  if (isString(input)) {
    return createValueNodes(input);
  }

  return [];
};

/**
 * Create an XML tree from the input object. This is an entry point.
 */
const createXMLTree = (input: XMLObj): XMLTagNode[] => createXMLTagNodes(input);

export {
  createNodes,
  createValueNode,
  createXMLTagNode,
  createXMLTagNodes,
  createXMLTree,
};
export type { ValueNode, XMLTagNode };
