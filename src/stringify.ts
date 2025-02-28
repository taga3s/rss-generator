import { ValueNode, XMLNode } from "./tree.ts";

const stringifyValueNode = (node: ValueNode): string => {
  return `${node.value}`;
};

const stringifyXMLNodes = (children: (XMLNode | ValueNode)[]): string => {
  return children.map((child) => {
    switch (child.type) {
      case "node":
        return stringifyXMLNode(child);
      case "value":
        return stringifyValueNode(child);
      default:
        return "";
    }
  }).join("");
};

const stringifyXMLNode = (node: XMLNode): string => {
  const attributes = node.attributes
    ? stringifyAttributes(node.attributes)
    : "";

  if (node.children.length === 0) {
    return `<${node.tagName}${attributes}/>`;
  }

  return `<${node.tagName}${attributes}>${
    stringifyXMLNodes(node.children)
  }</${node.tagName}>`;
};

const stringifyAttributes = (attributes: { [key: string]: string }): string => {
  return Object.entries(attributes).map(([key, value]) => {
    return ` ${key}="${value}"`;
  }).join("");
};

const stringify = (node: XMLNode): string => stringifyXMLNode(node);

export { stringify, stringifyValueNode, stringifyXMLNode, stringifyXMLNodes };
