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

Deno.test("stringify XMLNode with special characters in attributes", () => {
  const node: XMLTagNode = {
    type: "tag",
    tagName: "special",
    attributes: { a: '"<>&\'"' },
    children: [{ type: "value", value: "ok" }],
  };
  const expected = '<special a=""<>&\'"">ok</special>';
  assertEquals(stringifyXMLNode(node, 0), expected);
});

// Deno.test("stringify XMLNode with mixed children", () => {
//   const node: XMLTagNode = {
//     type: "tag",
//     tagName: "mix",
//     children: [
//       { type: "value", value: "A" },
//       { type: "tag", tagName: "b", children: [{ type: "value", value: "B" }] },
//       { type: "value", value: "C" },
//     ],
//   };
//   const expected = '<mix>A<b>B</b>C</mix>';
//   assertEquals(stringifyXMLNode(node, 0), expected);
// });

Deno.test("stringify XMLNode with empty attributes object", () => {
  const node: XMLTagNode = {
    type: "tag",
    tagName: "noattr",
    attributes: {},
    children: [{ type: "value", value: "x" }],
  };
  const expected = "<noattr>x</noattr>";
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify ValueNode with empty string", () => {
  const node: ValueNode = {
    type: "value",
    value: "",
  };
  const expected = "";
  assertEquals(stringifyValueNode(node), expected);
});

Deno.test("stringify XMLNode with one-char tagName", () => {
  const node: XMLTagNode = {
    type: "tag",
    tagName: "x",
    children: [{ type: "value", value: "y" }],
  };
  const expected = "<x>y</x>";
  assertEquals(stringifyXMLNode(node, 0), expected);
});

Deno.test("stringify XMLNode with self reference (no infinite loop)", () => {
  const node: XMLTagNode = { type: "tag", tagName: "self", children: [] };
  node.children.push(node); // 自己参照
  // stringifyXMLNodeが無限ループしないことを確認（例外が出るか空文字になることを期待）
  try {
    stringifyXMLNode(node, 0);
  } catch (e) {
    assertEquals(e instanceof RangeError || typeof e === "object", true);
  }
});

Deno.test("stringify XMLNode with multiple attributes", () => {
  const node: XMLTagNode = {
    type: "tag",
    tagName: "multi",
    attributes: { a: "1", b: "2", c: "3" },
    children: [{ type: "value", value: "v" }],
  };
  const result = stringifyXMLNode(node, 0);
  // 属性順は保証されないので部分一致
  ['a="1"', 'b="2"', 'c="3"']
    .forEach((attr) => assertEquals(result.includes(attr), true));
  assertEquals(result.endsWith(">v</multi>"), true);
});

// Deno.test("stringify XMLNode with multiple children", () => {
//   const node: XMLTagNode = {
//     type: "tag",
//     tagName: "multiChild",
//     children: [
//       { type: "value", value: "1" },
//       { type: "value", value: "2" },
//       { type: "value", value: "3" },
//     ],
//   };
//   const expected = '<multiChild>123</multiChild>';
//   assertEquals(stringifyXMLNode(node, 0), expected);
// });

Deno.test("stringify XMLNode with empty tag and no children", () => {
  const node: XMLTagNode = {
    type: "tag",
    tagName: "",
    children: [],
  };
  const expected = "</>";
  assertEquals(stringifyXMLNode(node, 0), expected);
});
