import { cdata, Channel, generateRSS, Item } from "./mod.ts";

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
    link: "https://example.com/articles/1",
    guid: {
      isPermaLink: true,
      value: "https://example.com/articles/1",
    },
    pubDate: new Date().toUTCString(),
  },
  {
    title: "Example Title 2",
    description: cdata("Example description"),
    link: "https://example.com/articles/2",
    guid: {
      isPermaLink: true,
      value: "https://example.com/articles/2",
    },
    pubDate: new Date().toUTCString(),
  },
];

if (import.meta.main) {
  const xml = generateRSS({ channel, items });
  const data = new TextEncoder().encode(xml);
  await Deno.writeFile("rss.xml", data);
}
