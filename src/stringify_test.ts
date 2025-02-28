import { assertEquals } from "@std/assert/equals";
import { stringifyValueNode } from "./stringify.ts";
import { ValueNode, XMLNode } from "./tree.ts";
import { stringifyXMLNode } from "./stringify.ts";

Deno.test("stringify ValueNode with value string", () => {
  const node: ValueNode = {
    type: "value",
    value: "example",
  };
  const expected = "example";
  assertEquals(stringifyValueNode(node), expected);
});

Deno.test("stringify ValueNode with value number", () => {
  const node: ValueNode = {
    type: "value",
    value: 42,
  };
  const expected = "42";
  assertEquals(stringifyValueNode(node), expected);
});

Deno.test("stringify XMLNode with children", () => {
  const node: XMLNode = {
    type: "xml",
    tagName: "parent",
    children: [
      {
        type: "xml",
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
  const node: XMLNode = {
    type: "xml",
    tagName: "self-closing",
    children: [],
  };
  const expected = "<self-closing/>";
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify XMLNode with attributes", () => {
  const node: XMLNode = {
    type: "xml",
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
