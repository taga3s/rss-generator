import { createTextNode, createXMLNode, TextNode, XMLNode } from "./tree.ts";
import { assertEquals } from "@std/assert";

Deno.test("it should return TextNode", () => {
  const node = createTextNode("example");
  const expected: TextNode = {
    type: "text",
    value: "example",
  };
  assertEquals(node, expected);
});

Deno.test("it should return XMLNode", () => {
  const node = createXMLNode("example", "example1");
  const expected: XMLNode = {
    type: "node",
    tagName: "example",
    children: [{
      type: "text",
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
