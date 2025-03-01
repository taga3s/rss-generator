import { stringify } from "./stringify.ts";
import { createXMLTree } from "./tree.ts";
import { Channel, Item, RSS } from "./generate_rss_types.ts";
import { buildXMLObj } from "./xmlobj.ts";

const generateRSS = (
  data: { rss: RSS; channel: Channel; items?: Item[] },
): string => {
  const { rss, channel, items } = data;

  const xmlObj = buildXMLObj({ rss, channel, items });

  const xmlTree = createXMLTree(xmlObj);

  return stringify(xmlTree);
};

export { generateRSS };
