import { ValueNode, XMLDeclarationNode, XMLTagNode } from "./tree.ts";

const stringifyValueNode = (node: ValueNode): string => {
  return `${node.value}`;
};

const stringifyNodes = (
  children: (XMLTagNode | ValueNode)[],
  indentLevel: number,
): {
  childrenType: "tags" | "value";
  value: string;
} => {
  if (children[0].type === "value") {
    return {
      childrenType: "value",
      value: stringifyValueNode(children[0]),
    };
  }

  const stringifiedXMLNodes: string[] = children.filter((child) =>
    child.type === "tag"
  ).map((child) => stringifyXMLNode(child, indentLevel));

  return {
    childrenType: "tags",
    value: `${stringifiedXMLNodes.join("\n")}`,
  };
};

const stringifyXMLNode = (
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

  if (node.type === "declaration") {
    return `<?xml${_stringifyAttributes(node.attributes)}?>`;
  }

  if (node.children.length === 0) {
    return `<${node.tagName}${attributes}/>`;
  }

  const { childrenType, value } = stringifyNodes(
    node.children,
    indentLevel + 1,
  );

  const indent = "  ".repeat(indentLevel);

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

/**
 * Converts an array of XMLNodes to a XML String. This is an entry point.
 */
const stringify = (nodes: (XMLDeclarationNode | XMLTagNode)[]): string => {
  const indentLevel = 0;
  return nodes.map((node) => stringifyXMLNode(node, indentLevel)).join("\n");
};

export { stringify, stringifyNodes, stringifyValueNode, stringifyXMLNode };
