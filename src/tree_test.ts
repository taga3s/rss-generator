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
  const node = createXMLNode("example", "example");
  const expected: XMLNode = {
    type: "xml",
    tagName: "example",
    children: [{
      type: "value",
      value: "example",
    }],
  };
  assertEquals(node, expected);
});

Deno.test("it should return self-closing XMLNode", () => {
  const node = createXMLNode("self-closing", {});
  const expected: XMLNode = {
    type: "xml",
    tagName: "self-closing",
    children: [],
  };
  assertEquals(node, expected);
});

Deno.test("it should return self-closing XMLNode with attributes", () => {
  const node = createXMLNode("self-closing", { "@version": "2.0" });
  const expected: XMLNode = {
    type: "xml",
    tagName: "self-closing",
    attributes: {
      "version": "2.0",
    },
    children: [],
  };
  assertEquals(node, expected);
});

Deno.test("it should return XMLNode with attributes", () => {
  const node = createXMLNode("example", {
    "@version": "2.0",
    "$text": "example",
  });
  const expected: XMLNode = {
    type: "xml",
    tagName: "example",
    attributes: {
      "version": "2.0",
    },
    children: [{
      type: "value",
      value: "example",
    }],
  };
  assertEquals(node, expected);
});
