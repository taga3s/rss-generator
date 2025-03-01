import { stringify } from "./stringify.ts";
import { createXMLTree } from "./tree.ts";
import { Channel, Item } from "./generate_rss_types.ts";
import { buildXMLObj } from "./xmlobj.ts";

const generateRSS = (
  data: { channel: Channel; items?: Item[] },
): string => {
  const { channel, items } = data;

  const xmlObj = buildXMLObj({ channel, items });

  const xmlTree = createXMLTree(xmlObj);

  return stringify(xmlTree);
};

export { generateRSS };
