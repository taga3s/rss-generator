import {
  isArrayOfStringValue,
  isArrayOfXMLObj,
  isStringValue,
  isXMLObj,
  Value,
  XMLObj,
} from "./input_data.ts";

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

const createXMLNode = (name: string, input: XMLObj | Value): XMLNode => {
  if (isXMLObj(input)) {
    // Extract attributes which start with "@" from the input object if they exist
    const _extractAttributes = (input: XMLObj): { [key: string]: string } => {
      const attributes: { [key: string]: string } = {};
      for (const key of Object.keys(input)) {
        if (key.startsWith("@") && isStringValue(input[key])) {
          attributes[key.substring(1)] = input[key];
          delete input[key];
        }
      }
      return attributes;
    };

    // Extract "$text" from the input object if it exists
    const _extractText = (input: XMLObj): string | undefined =>
      isStringValue(input.$text) ? input.$text : undefined;

    const attributes = _extractAttributes(input);
    const textValue = _extractText(input);

    return {
      type: "xml",
      tagName: name,
      ...(Object.keys(attributes).length > 0 ? { attributes } : {}),
      children: textValue ? createValueNodes(textValue) : createNodes(input),
    };
  }

  return ({
    type: "xml",
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
    if (isArrayOfStringValue(value) || isArrayOfXMLObj(value)) {
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
  if (isStringValue(input)) {
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
