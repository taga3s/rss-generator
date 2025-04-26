import type {
  Atom,
  Channel,
  Cloud,
  Enclosure,
  Guid,
  Image,
  Item,
  Namespaces,
  Source,
  TextInput,
} from "./generate_rss_types.ts";
import type { XMLObj } from "./ast_types.ts";
import type {
  ChannelAtomLink,
  ChannelCloud,
  ChannelImage,
  ChannelItem,
  ChannelTextInput,
  ItemEnclosure,
  ItemGuid,
  ItemSource,
} from "./xmlobj_types.ts";

const optionalProp = <TValue, TTransformed = TValue>(
  key: string,
  value: TValue | undefined,
  transform?: (value: TValue) => TTransformed,
): { [x: string]: TTransformed | NonNullable<TValue> } | undefined => {
  if (!value) {
    return undefined;
  }

  return {
    [key]: transform ? transform(value) : value,
  };
};

const buildNamespaces = (namespaces: Namespaces): { [key: string]: string } => {
  const ret: { [key: string]: string } = {};

  for (const ns of namespaces) {
    switch (ns) {
      case "atom":
        ret["@xmlns:atom"] = "http://www.w3.org/2005/Atom";
        break;
      case "content":
        ret["@xmlns:content"] = "http://purl.org/rss/1.0/modules/content/";
        break;
      case "dc":
        ret["@xmlns:dc"] = "http://purl.org/dc/elements/1.1/";
        break;
      default:
        continue;
    }
  }

  return ret;
};

const buildXMLObj = (input: {
  channel: Channel;
  items?: Item[];
  namespaces?: Namespaces;
}): XMLObj => {
  const { channel, items, namespaces } = input;

  const xmlObj = {
    xml: {
      "@version": "1.0",
      "@encoding": "UTF-8",
    },
    rss: {
      "@version": "2.0",
      ...(namespaces && buildNamespaces(namespaces)),
      channel: {
        title: channel.title,
        description: channel.description,
        link: channel.link,
        ...optionalProp<Atom["link"], ChannelAtomLink>(
          "atom:link",
          channel.atom?.link,
          toXMLAtomLinkTag,
        ),
        ...optionalProp("category", channel.category),
        ...optionalProp<Cloud, ChannelCloud>(
          "cloud",
          channel.cloud,
          toChannelCloud,
        ),
        ...optionalProp<string>("copyright", channel.copyright),
        ...optionalProp<string>("generator", channel.generator),
        ...optionalProp<string>("docs", channel.docs),
        ...optionalProp<Image, ChannelImage>(
          "image",
          channel.image,
          toChannelImage,
        ),
        ...optionalProp<string>("language", channel.language),
        ...optionalProp<string>(
          "lastBuildDate",
          channel.lastBuildDate,
        ),
        ...optionalProp<string>(
          "managingEditor",
          channel.managingEditor,
        ),
        ...optionalProp<string>("pubDate", channel.pubDate),
        ...optionalProp<string>("rating", channel.rating),
        ...optionalProp<string[]>("skipDays", channel.skipDays),
        ...optionalProp<string>(
          "skipHours",
          channel.skipHours ? channel.skipHours.toString() : undefined,
        ),
        ...optionalProp<TextInput, ChannelTextInput>(
          "textInput",
          channel.textInput,
          toChannelTextInput,
        ),
        ...optionalProp<string>(
          "ttl",
          channel.ttl ? channel.ttl.toString() : undefined,
        ),
        ...optionalProp<string>("webMaster", channel.webMaster),
        ...optionalProp<Item[], ChannelItem[]>(
          "item",
          items,
          toChannelItem,
        ),
      },
    },
  };

  return xmlObj;
};

const toChannelCloud = (data: Cloud): ChannelCloud => ({
  "@domain": data.domain,
  "@port": data.port,
  "@path": data.path,
  "@registerProcedure": data.registerProcedure,
  "@protocol": data.protocol,
});

const toChannelImage = (data: Image): ChannelImage => ({
  title: data.title,
  url: data.url,
  link: data.link,
  ...optionalProp<string>("description", data.description),
  ...optionalProp<string>("width", data.width ? data.width.toString() : "88"),
  ...optionalProp<string>(
    "height",
    data.height ? data.height.toString() : "31",
  ),
});

const toChannelTextInput = (data: TextInput): ChannelTextInput => ({
  title: data.title,
  description: data.description,
  name: data.name,
  link: data.link,
});

const toChannelItem = (data: Item[]): ChannelItem[] => {
  return data.map((item) => ({
    ...optionalProp<string>("title", item.title),
    ...optionalProp<string>("description", item.description),
    ...optionalProp<string>("content:encoded", item.content?.encoded),
    ...optionalProp<string>("link", item.link),
    ...optionalProp<string>("author", item.author),
    ...optionalProp<string[]>("category", item.category),
    ...optionalProp<string>("dc:creator", item.dc?.creator),
    ...optionalProp<string>("comments", item.comments),
    ...optionalProp<Enclosure, ItemEnclosure>(
      "enclosure",
      item.enclosure,
      toItemEnclosure,
    ),
    ...optionalProp<Guid, ItemGuid>("guid", item.guid, toItemGuid),
    ...optionalProp<string>("pubDate", item.pubDate),
    ...optionalProp<Source, ItemSource>(
      "source",
      item.source,
      toItemSource,
    ),
  }));
};

const toItemEnclosure = (data: Enclosure): ItemEnclosure => ({
  "@url": data.url,
  "@length": data.length,
  "@type": data.type,
});

const toItemGuid = (data: Guid): ItemGuid => ({
  $value: data.value,
  "@isPermaLink": data.isPermaLink ? "true" : "false",
});

const toItemSource = (data: Source): ItemSource => ({
  $value: data.value,
  "@url": data.url,
});

const toXMLAtomLinkTag = (data: Atom["link"]): ChannelAtomLink => ({
  "@href": data.href,
  "@rel": data.rel,
  "@type": data.type,
});

export {
  buildXMLObj,
  optionalProp,
  toChannelCloud,
  toChannelImage,
  toChannelItem,
  toChannelTextInput,
  toItemEnclosure,
  toItemGuid,
  toItemSource,
  toXMLAtomLinkTag,
};
