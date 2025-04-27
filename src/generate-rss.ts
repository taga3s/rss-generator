import { stringify } from "./stringify.ts";
import { createXMLTree } from "./ast.ts";
import type { Channel, Item, Namespaces } from "./generate-rss_types.ts";
import { buildXMLObj } from "./xmlobj.ts";

/**
 * Generate RSS feed
 * @param data - RSS feed data
 * @returns RSS feed as string
 */
export const generateRSS = (
  data: { channel: Channel; items?: Item[]; namespaces?: Namespaces },
): string => {
  const { channel, items, namespaces } = data;

  const xmlObj = buildXMLObj({ channel, items, namespaces });

  const xmlTree = createXMLTree(xmlObj);

  return stringify(xmlTree);
};
