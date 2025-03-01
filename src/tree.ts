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

interface XMLNode extends Node {
  type: "xml";
  tagName: string;
  children: (XMLNode | ValueNode)[];
  attributes?: { [key: string]: string };
}

interface ValueNode extends Node {
  type: "value";
  value: string;
}

const createXMLNode = (name: string, children: XMLObj | string): XMLNode => {
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
        type: "xml",
        tagName: name,
        ...(Object.keys(attributes).length > 0 ? { attributes } : {}),
        children: value ? createValueNodes(value) : createXMLNodes(children),
      };
    }
  }

  return ({
    type: "xml",
    tagName: name,
    children: createNodes(children),
  });
};

const createXMLNodes = (xmlObj: XMLObj): XMLNode[] => {
  const nodes: XMLNode[] = [];

  for (const [key, value] of Object.entries(xmlObj)) {
    // If the value is an array, create multiple nodes
    if (isArrayOfXMLObj(value) || isArrayOfString(value)) {
      for (const v of value) {
        nodes.push(createXMLNode(key, v));
      }
      continue;
    }

    nodes.push(createXMLNode(key, value));
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

const createNodes = (input: XMLObj | string): (XMLNode | ValueNode)[] => {
  // If the input is an object, create multiple nodes
  if (isXMLObj(input)) {
    return createXMLNodes(input);
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
const createXMLTree = (input: XMLObj): XMLNode[] => createXMLNodes(input);

export {
  createNodes,
  createValueNode,
  createXMLNode,
  createXMLNodes,
  createXMLTree,
};
export type { ValueNode, XMLNode };
