import {
  createValueNode,
  createXMLTagNode,
  createXMLTagNodes,
  ValueNode,
  XMLTagNode,
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

Deno.test("it should return XMLTagNode", () => {
  const node = createXMLTagNode("example", "example");
  const expected: XMLTagNode = {
    type: "tag",
    tagName: "example",
    children: [{
      type: "value",
      value: "example",
    }],
  };
  assertEquals(node, expected);
});

Deno.test("it should return XMLTagNode with attributes", () => {
  const node = createXMLTagNode("example", {
    "@version": "2.0",
    "$value": "example",
  });
  const expected: XMLTagNode = {
    type: "tag",
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

Deno.test("it should return self-closing XMLTagNode", () => {
  const node = createXMLTagNode("self-closing", {});
  const expected: XMLTagNode = {
    type: "tag",
    tagName: "self-closing",
    children: [],
  };
  assertEquals(node, expected);
});

Deno.test("it should return self-closing XMLTagNode with attributes", () => {
  const node = createXMLTagNode("self-closing", { "@version": "2.0" });
  const expected: XMLTagNode = {
    type: "tag",
    tagName: "self-closing",
    attributes: {
      "version": "2.0",
    },
    children: [],
  };
  assertEquals(node, expected);
});

Deno.test("it should return XMLTagNode with children (different tags)", () => {
  const nodes = createXMLTagNodes({
    parent: { child1: "example", child2: "example" },
  });
  const expected: XMLTagNode[] = [{
    type: "tag",
    tagName: "parent",
    children: [{
      type: "tag",
      tagName: "child1",
      children: [{
        type: "value",
        value: "example",
      }],
    }, {
      type: "tag",
      tagName: "child2",
      children: [{
        type: "value",
        value: "example",
      }],
    }],
  }];
  assertEquals(nodes, expected);
});

Deno.test("it should return XMLTagNode with children (same tag)", () => {
  const nodes = createXMLTagNodes({
    parent: {
      child: ["example1", "example2"],
    },
  });
  const expected: XMLTagNode[] = [{
    type: "tag",
    tagName: "parent",
    children: [{
      type: "tag",
      tagName: "child",
      children: [{
        type: "value",
        value: "example1",
      }],
    }, {
      type: "tag",
      tagName: "child",
      children: [{
        type: "value",
        value: "example2",
      }],
    }],
  }];
  assertEquals(nodes, expected);
});
