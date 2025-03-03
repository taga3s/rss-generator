import { assertEquals } from "@std/assert/equals";
import type { ValueNode, XMLDeclarationNode, XMLTagNode } from "./ast.ts";
import { stringifyValueNode, stringifyXMLNode } from "./stringify.ts";

Deno.test("stringify XMLNode which is DeclarationNode", () => {
  const node: XMLDeclarationNode = {
    type: "declaration",
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
    type: "tag",
    tagName: "parent",
    children: [
      {
        type: "tag",
        tagName: "child",
        children: [{
          type: "value",
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
    type: "tag",
    tagName: "self-closing",
    children: [],
  };
  const expected = "<self-closing/>";
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify XMLNode with attributes", () => {
  const node: XMLTagNode = {
    type: "tag",
    tagName: "example",
    attributes: {
      version: "2.0",
    },
    children: [{
      type: "value",
      value: "example",
    }],
  };
  const expected = '<example version="2.0">example</example>';
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify ValueNode with value string", () => {
  const node: ValueNode = {
    type: "value",
    value: "example",
  };
  const expected = "example";
  assertEquals(stringifyValueNode(node), expected);
});
