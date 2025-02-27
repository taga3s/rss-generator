import { createValueNode, createXMLNode, ValueNode, XMLNode } from "./tree.ts";
import { assertEquals } from "@std/assert";

Deno.test("it should return ValueNode when typeof value === 'string'", () => {
  const node = createValueNode("example");
  const expected: ValueNode = {
    type: "value",
    value: "example",
  };
  assertEquals(node, expected);
});

Deno.test("it should return ValueNode when typeof value === 'number'", () => {
  const node = createValueNode(1);
  const expected: ValueNode = {
    type: "value",
    value: 1,
  };
  assertEquals(node, expected);
});

Deno.test("it should return XMLNode", () => {
  const node = createXMLNode("example", "example1");
  const expected: XMLNode = {
    type: "node",
    tagName: "example",
    children: [{
      type: "value",
      value: "example1",
    }],
  };
  assertEquals(node, expected);
});

Deno.test("it should return self closing tag node", () => {
  const node = createXMLNode("example", {});
  const expected: XMLNode = {
    type: "node",
    tagName: "example",
    children: [],
  };
  assertEquals(node, expected);
});
