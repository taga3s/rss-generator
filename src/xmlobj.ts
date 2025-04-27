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
} from "./generate-rss_types.ts";
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
): { [key: string]: TTransformed | NonNullable<TValue> } | undefined => {
  if (!value) {
    return undefined;
  }

  return {
    [key]: transform ? transform(value) : value,
  };
};

const NAMESPACE_URLS: { [key: string]: string } = {
  atom: "http://www.w3.org/2005/Atom",
  content: "http://purl.org/rss/1.0/modules/content/",
  dc: "http://purl.org/dc/elements/1.1/",
  slash: "http://purl.org/rss/1.0/modules/slash/",
};

const buildNamespaces = (namespaces: Namespaces): { [key: string]: string } => {
  const ret: { [key: string]: string } = {};

  for (const ns of namespaces) {
    if (NAMESPACE_URLS[ns]) {
      ret[`@xmlns:${ns}`] = NAMESPACE_URLS[ns];
    }
  }

  return ret;
};

export const buildXMLObj = (input: {
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
          toChannelAtomLink,
        ),
        ...optionalProp<string[]>("category", channel.category),
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
          toChannelItems,
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

const DEFAULT_IMAGE_WIDTH = "88";
const DEFAULT_IMAGE_HEIGHT = "31";

const toChannelImage = (data: Image): ChannelImage => {
  const toWidth = (val: number | undefined): string =>
    val ? val.toString() : DEFAULT_IMAGE_WIDTH;
  const toHeight = (val: number | undefined): string =>
    val ? val.toString() : DEFAULT_IMAGE_HEIGHT;
  return ({
    title: data.title,
    url: data.url,
    link: data.link,
    ...optionalProp<string>("description", data.description),
    ...optionalProp<number, string>("width", data.width, toWidth),
    ...optionalProp<number, string>("height", data.height, toHeight),
  });
};

const toChannelTextInput = (data: TextInput): ChannelTextInput => ({
  title: data.title,
  description: data.description,
  name: data.name,
  link: data.link,
});

const toChannelAtomLink = (data: Atom["link"]): ChannelAtomLink => ({
  "@href": data.href,
  "@rel": data.rel,
  "@type": data.type,
});

const toChannelItems = (data: Item[]): ChannelItem[] => {
  const toItem = (item: Item): ChannelItem => ({
    ...optionalProp<string>("title", item.title),
    ...optionalProp<string>("description", item.description),
    ...optionalProp<string>("content:encoded", item.content?.encoded),
    ...optionalProp<string>("link", item.link),
    ...optionalProp<string>("author", item.author),
    ...optionalProp<string[]>("category", item.category),
    ...optionalProp<string>("dc:creator", item.dc?.creator),
    ...optionalProp<string>("comments", item.comments),
    ...optionalProp<string>("slash:comments", item.slash?.comments.toString()),
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
  });

  return data.map((item) => toItem(item));
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
