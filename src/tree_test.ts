import {
  createValueNode,
  createXMLNode,
  createXMLNodes,
  ValueNode,
  XMLNode,
} from "./tree.ts";
import { assertEquals } from "@std/assert";

Deno.test("it should return ValueNode when typeof value === 'string'", () => {
  const node = createValueNode("example");
  const expected: ValueNode = {
    type: "value",
    value: "example",
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

Deno.test("it should return XMLNode with attributes", () => {
  const node = createXMLNode("example", {
    "@version": "2.0",
    "$value": "example",
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

Deno.test("it should return XMLNode with children (different tags)", () => {
  const nodes = createXMLNodes({
    parent: { child1: "example", child2: "example" },
  });
  const expected: XMLNode[] = [{
    type: "xml",
    tagName: "parent",
    children: [{
      type: "xml",
      tagName: "child1",
      children: [{
        type: "value",
        value: "example",
      }],
    }, {
      type: "xml",
      tagName: "child2",
      children: [{
        type: "value",
        value: "example",
      }],
    }],
  }];
  assertEquals(nodes, expected);
});

Deno.test("it should return XMLNode with children (same tag)", () => {
  const nodes = createXMLNodes({
    parent: {
      child: ["example1", "example2"],
    },
  });
  const expected: XMLNode[] = [{
    type: "xml",
    tagName: "parent",
    children: [{
      type: "xml",
      tagName: "child",
      children: [{
        type: "value",
        value: "example1",
      }],
    }, {
      type: "xml",
      tagName: "child",
      children: [{
        type: "value",
        value: "example2",
      }],
    }],
  }];
  assertEquals(nodes, expected);
});
