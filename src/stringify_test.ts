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
    type: "node",
    tagName: "parent",
    children: [
      {
        type: "node",
        tagName: "child",
        children: [{
          type: "value",
          value: "example",
        }],
      },
    ],
  };
  const expected = "<parent><child>example</child></parent>";
  assertEquals(stringifyXMLNode(node), expected);
});

Deno.test("stringify XMLNode without children", () => {
  const node: XMLNode = {
    type: "node",
    tagName: "parent",
    children: [],
  };
  const expected = "<parent/>";
  assertEquals(stringifyXMLNode(node), expected);
});

Deno.test("stringify XMLNode with attributes", () => {
  const node: XMLNode = {
    type: "node",
    tagName: "parent",
    attributes: {
      version: "2.0",
    },
    children: [{
      type: "value",
      value: "example",
    }],
  };
  const expected = '<parent version="2.0">example</parent>';
  assertEquals(stringifyXMLNode(node), expected);
});
