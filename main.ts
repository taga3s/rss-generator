import { stringify } from "./src/stringify.ts";
import { createXMLTree } from "./src/tree.ts";

const xml = {
  rss: {
    channel: {
      "@version": "2.0",
      title: "Example",
      description: "This is an example website",
      link: "https://example.com",
      image: {
        url: "https://example.com/image.png",
        title: "example",
        link: "https://example.com",
      },
      lastBuildDate: "Thu, 20 Feb 2025 03:25:17 +0000",
      copyright: "2025",
      language: "ja",
      category: ["example1", "example2", "example3"],
    },
  },
};

if (import.meta.main) {
  const xmlTree = createXMLTree(xml)[0];
  const xmlString = stringify(xmlTree);
  console.log(xmlString);
}
