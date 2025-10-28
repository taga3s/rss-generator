import {
  createValueNode,
  createXMLDeclarationNode,
  createXMLTagNode,
  createXMLTagNodes,
  NodeTypes,
  type ValueNode,
  type XMLDeclarationNode,
  type XMLTagNode,
} from "./ast.ts";
import { assertEquals } from "@std/assert";

Deno.test("it should return XMlDeclarationNode", () => {
  const node = createXMLDeclarationNode({
    "@version": "1.0",
    "@encoding": "UTF-8",
  });
  const expected: XMLDeclarationNode = {
    type: NodeTypes.XML_DECLARATION,
    attributes: {
      version: "1.0",
      encoding: "UTF-8",
    },
  };
  assertEquals(node, expected);
});

Deno.test("it should return ValueNode when typeof value === 'string'", () => {
  const node = createValueNode("example");
  const expected: ValueNode = {
    type: NodeTypes.VALUE,
    value: "example",
  };
  assertEquals(node, expected);
});

Deno.test("it should return XMLTagNode", () => {
  const node = createXMLTagNode("example", "example");
  const expected: XMLTagNode = {
    type: NodeTypes.XML_TAG,
    tagName: "example",
    children: [{
      type: NodeTypes.VALUE,
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
    type: NodeTypes.XML_TAG,
    tagName: "example",
    attributes: {
      "version": "2.0",
    },
    children: [{
      type: NodeTypes.VALUE,
      value: "example",
    }],
  };
  assertEquals(node, expected);
});

Deno.test("it should return self-closing XMLTagNode", () => {
  const node = createXMLTagNode("self-closing", {});
  const expected: XMLTagNode = {
    type: NodeTypes.XML_TAG,
    tagName: "self-closing",
    children: [],
  };
  assertEquals(node, expected);
});

Deno.test("it should return self-closing XMLTagNode with attributes", () => {
  const node = createXMLTagNode("self-closing", { "@version": "2.0" });
  const expected: XMLTagNode = {
    type: NodeTypes.XML_TAG,
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
    type: NodeTypes.XML_TAG,
    tagName: "parent",
    children: [{
      type: NodeTypes.XML_TAG,
      tagName: "child1",
      children: [{
        type: NodeTypes.VALUE,
        value: "example",
      }],
    }, {
      type: NodeTypes.XML_TAG,
      tagName: "child2",
      children: [{
        type: NodeTypes.VALUE,
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
    type: NodeTypes.XML_TAG,
    tagName: "parent",
    children: [{
      type: NodeTypes.XML_TAG,
      tagName: "child",
      children: [{
        type: NodeTypes.VALUE,
        value: "example1",
      }],
    }, {
      type: NodeTypes.XML_TAG,
      tagName: "child",
      children: [{
        type: NodeTypes.VALUE,
        value: "example2",
      }],
    }],
  }];
  assertEquals(nodes, expected);
});
