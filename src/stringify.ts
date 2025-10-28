import {
  NodeTypes,
  type ValueNode,
  type XMLDeclarationNode,
  type XMLTagNode,
} from "./ast.ts";

export const stringifyValueNode = (node: ValueNode): string => {
  return `${node.value}`;
};

export const stringifyNodes = (
  children: (XMLTagNode | ValueNode)[],
  indentLevel: number,
): {
  childrenType: "tags" | "value";
  value: string;
} => {
  if (children.length === 0) {
    return {
      childrenType: "value",
      value: "",
    };
  }

  if (children[0].type === NodeTypes.VALUE) {
    return {
      childrenType: "value",
      value: stringifyValueNode(children[0]),
    };
  }

  const stringifiedXMLNodes = children.filter((child) =>
    child.type === NodeTypes.XML_TAG
  )
    .map((child) => stringifyXMLNode(child, indentLevel));

  return {
    childrenType: "tags",
    value: stringifiedXMLNodes.join("\n"),
  };
};

export const stringifyXMLNode = (
  node: XMLDeclarationNode | XMLTagNode,
  indentLevel: number,
): string => {
  const _stringifyAttributes = (
    attributes: { [key: string]: string },
  ): string => {
    return Object.entries(attributes).map(([key, value]) => {
      return ` ${key}="${value}"`;
    }).join("");
  };

  const attributes = node.attributes
    ? _stringifyAttributes(node.attributes)
    : "";

  if (node.type === NodeTypes.XML_DECLARATION) {
    return `<?xml${_stringifyAttributes(node.attributes)}?>`;
  }

  const indent = "  ".repeat(indentLevel);

  if (node.children.length === 0) {
    return `${indent}<${node.tagName}${attributes}/>`;
  }

  const { childrenType, value } = stringifyNodes(
    node.children,
    indentLevel + 1,
  );

  switch (childrenType) {
    case "tags": {
      return `${indent}<${node.tagName}${attributes}>\n${value}\n${indent}</${node.tagName}>`;
    }
    case "value":
      return `${indent}<${node.tagName}${attributes}>${value}</${node.tagName}>`;
    default:
      throw new Error("Invalid type");
  }
};

const INIT_INDENT_LEVEL = 0;

/**
 * Converts an array of XMLNodes to a XML String. This is an entry point.
 */
export const stringify = (
  nodes: (XMLDeclarationNode | XMLTagNode)[],
): string => {
  return nodes.map((node) => stringifyXMLNode(node, INIT_INDENT_LEVEL)).join(
    "\n",
  );
};
