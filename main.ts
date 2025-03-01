import { Item, RSS } from "./src/generate_rss_types.ts";
import { Channel, generateRSS } from "./src/mod.ts";

const rss: RSS = {
  version: "2.0",
};

const channel: Channel = {
  title: "example",
  description: "This is an example website",
  link: "https://example.com",
  image: {
    url: "https://example.com/image.png",
    title: "example",
    link: "https://example.com",
  },
  lastBuildDate: "Thu, 20 Feb 2025 03:25:17 +0000",
  copyright: "© 2025 example",
  language: "ja",
  category: ["tech blog", "programming", "hiring"],
};

const items: Item[] = [{
  title: "Blog1",
  link: "https://example.com/blog/1",
  description: "This is a blog1",
  guid: {
    isPermaLink: true,
    value: "https://example.com/blog/1",
  },
}, {
  title: "Blog2",
  link: "https://example.com/blog/2",
  description: "This is a blog2",
  source: {
    value: "Example.com News Headlines",
    url: "https://example.com/rss.xml",
  },
}];

if (import.meta.main) {
  const xml = generateRSS({ rss, channel, items });
  console.log(xml);
}
