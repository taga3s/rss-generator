# rss-generator

[![JSR badge](https://jsr.io/badges/@taga3s/rss-generator)](https://jsr.io/@taga3s/rss-generator)

A simple RSS 2.0 XML generator. This project is just for fun and learning
purpose, so the implementation is intentionally minimal.

## features

- Generates RSS 2.0 XML (following the
  [RSS 2.0 Specification](https://www.rssboard.org/rss-specification))
- Zero dependencies

## example usage

```ts
import {
  cdata,
  type Channel,
  generateRSS,
  type Item,
} from "jsr:@taga3s/rss-generator";

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
    atom: {
      link: {
        href: "https://example.com/rss.xml",
      },
    },
    guid: {
      isPermaLink: true,
      value: "https://example.com/articles/1",
    },
    pubDate: new Date().toUTCString(),
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
    pubDate: new Date().toUTCString(),
  },
];

if (import.meta.main) {
  const xml = generateRSS({ channel, items });
  const data = new TextEncoder().encode(xml);
  await Deno.writeFile("rss.xml", data);
}
```

- You can validate the generated RSS XML by using
  [W3C Feed Validation Service](https://validator.w3.org/feed/).

## license

[MIT](https://github.com/taga3s/rss-generator/blob/main/LICENSE)

## author

- [taga3s](https://github.com/taga3s)
