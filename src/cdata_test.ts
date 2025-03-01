import { assertEquals } from "@std/assert/equals";
import { cdata } from "./cdata.ts";
import { assertThrows } from "@std/assert/throws";

Deno.test("cdata", () => {
  assertEquals(cdata("data"), "<![CDATA[data]]>");
  assertThrows(
    () => cdata("]]>"),
    Error,
    'CDATA section contains forbidden string "]]>"',
  );
});
