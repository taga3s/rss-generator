import { cdata } from "./cdata.ts";
import { generateRSS } from "./generate-rss.ts";
import type { Channel, Item, Namespaces } from "./generate-rss_types.ts";
import { assertSnapshot } from "@std/testing/snapshot";

const fixture = (): {
  xml: string;
} => {
  const channel: Channel = {
    title: "Example Web",
    link: "https://example.com",
    description: cdata("Example description"),
    ttl: 60,
    language: "en",
    category: ["sports", "politics", "technology"],
    copyright: "Example Web",
  };

  const items: Item[] = [
    {
      title: "Example Title 1",
      description: cdata("Example description"),
      content: {
        encoded: cdata("<p>Example content</p>"),
      },
      link: "https://example.com/articles/1",
      guid: {
        isPermaLink: true,
        value: "https://example.com/articles/1",
      },
      pubDate: "Sun, 27 Apr 2025 03:24:20 GMT",
    },
    {
      title: "Example Title 2",
      description: cdata("Example description"),
      content: {
        encoded: cdata("<p>Example content</p>"),
      },
      link: "https://example.com/articles/2",
      guid: {
        isPermaLink: true,
        value: "https://example.com/articles/2",
      },
      pubDate: "Sun, 27 Apr 2025 03:24:20 GMT",
    },
  ];

  const namespaces: Namespaces = ["atom", "content", "dc", "slash"];

  return {
    xml: generateRSS({ channel, items, namespaces }),
  };
};

Deno.test("generateRSS", async (t) => {
  const { xml } = fixture();
  await assertSnapshot(t, xml);
});
