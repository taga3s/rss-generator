import { assertEquals, assertThrows } from "@std/assert";
import { cdata } from "./cdata.ts";

Deno.test("cdata", () => {
  assertEquals(cdata("data"), "<![CDATA[data]]>");
  assertThrows(
    () => cdata("]]>"),
    Error,
    'CDATA section contains forbidden string "]]>"',
  );
});

Deno.test("cdata with empty string", () => {
  assertEquals(cdata(""), "<![CDATA[]]>");
});

Deno.test("cdata with long string", () => {
  const longStr = "a".repeat(1000);
  assertEquals(cdata(longStr), `<![CDATA[${longStr}]]>`);
});

Deno.test("cdata with special characters", () => {
  assertEquals(cdata("<>&'\""), "<![CDATA[<>&'\"]]>");
});
