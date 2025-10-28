import { assertEquals } from "@std/assert/equals";
import {
  NodeTypes,
  type ValueNode,
  type XMLDeclarationNode,
  type XMLTagNode,
} from "./ast.ts";
import { stringifyValueNode, stringifyXMLNode } from "./stringify.ts";

Deno.test("stringify XMLNode which is DeclarationNode", () => {
  const node: XMLDeclarationNode = {
    type: NodeTypes.XML_DECLARATION,
    attributes: {
      version: "1.0",
      encoding: "UTF-8",
    },
  };
  const expected = '<?xml version="1.0" encoding="UTF-8"?>';
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify XMLNode with children", () => {
  const node: XMLTagNode = {
    type: NodeTypes.XML_TAG,
    tagName: "parent",
    children: [
      {
        type: NodeTypes.XML_TAG,
        tagName: "child",
        children: [{
          type: NodeTypes.VALUE,
          value: "example",
        }],
      },
    ],
  };
  const indentLevel = 0;
  const indent = "  ".repeat(indentLevel + 1);
  const expected = `<parent>\n${indent}<child>example</child>\n</parent>`;
  assertEquals(stringifyXMLNode(node, indentLevel), expected);
});

Deno.test("stringify XMLNode without children", () => {
  const node: XMLTagNode = {
    type: NodeTypes.XML_TAG,
    tagName: "self-closing",
    children: [],
  };
  const expected = "<self-closing/>";
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify XMLNode with attributes", () => {
  const node: XMLTagNode = {
    type: NodeTypes.XML_TAG,
    tagName: "example",
    attributes: {
      version: "2.0",
    },
    children: [{
      type: NodeTypes.VALUE,
      value: "example",
    }],
  };
  const expected = '<example version="2.0">example</example>';
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify ValueNode with value string", () => {
  const node: ValueNode = {
    type: NodeTypes.VALUE,
    value: "example",
  };
  const expected = "example";
  assertEquals(stringifyValueNode(node), expected);
});
