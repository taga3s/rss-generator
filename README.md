# rss-generator

[![JSR badge](https://jsr.io/badges/@taga3s/rss-generator)](https://jsr.io/@taga3s/rss-generator)

A simple RSS 2.0 feed generator. This project is just for fun and learning
purpose, so the implementation is intentionally minimal.

## features

- Generates RSS 2.0 feed (following the
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

const channel: Channel = {
  title: "Example Web",
  link: "https://example.com",
  description: cdata("Example description"),
  ttl: 60,
  language: "en",
  category: ["sports", "politics", "technology"],
  copyright: "Example Web",
  items: items,
};

if (import.meta.main) {
  const xml = generateRSS({ channel });
  const data = new TextEncoder().encode(xml);
  await Deno.writeFile("rss.xml", data);
}
```

<details>

<summary>Generated RSS file</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Example Web</title>
    <description><![CDATA[Example description]]></description>
    <link>https://example.com</link>
    <atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml"/>
    <category>sports</category>
    <category>politics</category>
    <category>technology</category>
    <copyright>Example Web</copyright>
    <language>en</language>
    <ttl>60</ttl>
    <item>
      <title>Example Title 1</title>
      <description><![CDATA[Example description]]></description>
      <content:encoded><![CDATA[<p>Example content</p>]]></content:encoded>
      <link>https://example.com/articles/1</link>
      <dc:creator>John Doe</dc:creator>
      <guid isPermaLink="true">https://example.com/articles/1</guid>
      <pubDate>Wed, 14 Jan 2026 01:21:54 GMT</pubDate>
    </item>
    <item>
      <title>Example Title 2</title>
      <description><![CDATA[Example description]]></description>
      <content:encoded><![CDATA[<p>Example content</p>]]></content:encoded>
      <link>https://example.com/articles/2</link>
      <dc:creator>John Doe</dc:creator>
      <guid isPermaLink="true">https://example.com/articles/2</guid>
      <pubDate>Wed, 14 Jan 2026 01:21:54 GMT</pubDate>
    </item>
  </channel>
</rss>
```

</details>

> [!NOTE]
> You can validate the generated RSS file by using
> [W3C Feed Validation Service](https://validator.w3.org/feed/).

## license

[MIT](https://github.com/taga3s/rss-generator/blob/main/LICENSE)

## author

- [taga3s](https://github.com/taga3s)
