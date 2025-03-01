# rss-generator

## features

This project is just for fun and learning purposes.

- generate RSS 2.0 XML (following
  [RSS 2.0 Specification](https://www.rssboard.org/rss-specification))
- zero dependencies

## example usage

```ts
import { cdata, Channel, generateRSS, Item, RSS } from "./mod.ts";

const rss: RSS = {
  version: "2.0",
  "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
  "xmlns:dc": "http://purl.org/dc/elements/1.1/",
  "xmlns:media": "http://search.yahoo.com/mrss/",
};

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
  const xml = generateRSS({ rss, channel, items });
  const data = new TextEncoder().encode(xml);
  await Deno.writeFile("rss.xml", data);
}
```

- You can validate the generated RSS XML by using
  [W3C Feed Validation Service](https://validator.w3.org/feed/)

## license

- MIT

## author

- [taga3s](https://github.com/taga3s)
