import { stringify } from "./stringify.ts";
import { createXMLTree } from "./tree.ts";
import type { Atom, Channel, Item } from "./generate_rss_types.ts";
import { buildXMLObj } from "./xmlobj.ts";

const generateRSS = (
  data: { channel: Channel; items?: Item[]; atom?: Atom },
): string => {
  const { channel, items, atom } = data;

  const xmlObj = buildXMLObj({ channel, items, atom });

  const xmlTree = createXMLTree(xmlObj);

  return stringify(xmlTree);
};

export { generateRSS };
