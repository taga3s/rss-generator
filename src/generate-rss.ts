import { stringify } from "./stringify.ts";
import { createXMLTree } from "./ast.ts";
import type { Channel } from "./generate-rss_types.ts";
import { buildXMLObj } from "./xmlobj.ts";

/**
 * Generate RSS feed
 * @param data - RSS feed data
 * @returns RSS feed as string
 */
export const generateRSS = (
  data: { channel: Channel },
): string => {
  const { channel } = data;

  const xmlObj = buildXMLObj({ channel });

  const xmlTree = createXMLTree(xmlObj);

  return stringify(xmlTree);
};
