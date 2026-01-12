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
