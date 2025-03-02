import { Atom } from "./generate_rss_types.ts";
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

const atom: Atom = {
  link: {
    href: "https://example.com/feed",
    rel: "self",
    type: "application/rss+xml",
  },
};

if (import.meta.main) {
  const xml = generateRSS({ channel, items, atom });
  const data = new TextEncoder().encode(xml);
  await Deno.writeFile("rss.xml", data);
}
