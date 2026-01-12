import {
  type Channel,
  type Cloud,
  type Enclosure,
  type Guid,
  type Image,
  type Item,
  NAMESPACE_URLS,
  type Namespaces,
  type SkipDays,
  type Source,
  type TextInput,
} from "./generate-rss_types.ts";
import type { XMLObj } from "./ast_types.ts";
import type {
  ChannelBase,
  ChannelCloud,
  ChannelImage,
  ChannelItem,
  ChannelTextInput,
  ItemEnclosure,
  ItemGuid,
  ItemSource,
} from "./xmlobj_types.ts";
import type { Undefinable } from "./utils/types.ts";

const genOptionalProps = <TObject>() => {
  const optionalProps = <TValue, TTransformed = TValue>(
    key: keyof TObject,
    value: TValue | undefined,
    transform?: (value: TValue) => TTransformed,
  ): Undefinable<{ [key: string]: TTransformed | NonNullable<TValue> }> => {
    if (!value) {
      return undefined;
    }

    return {
      [key]: transform ? transform(value) : value,
    };
  };
  return optionalProps;
};

const insertNamespacesAttrs = (
  namespaces: Namespaces,
): { [key: string]: string } => {
  const ret: { [key: string]: string } = {};

  for (const ns of namespaces) {
    if (ns in NAMESPACE_URLS) {
      ret[`@xmlns:${ns}`] = NAMESPACE_URLS[ns];
    }
  }

  return ret;
};

const DEFAULT_ATOM_LINK_REL = "self";
const DEFAULT_ATOM_LINK_REL_TYPE = "application/rss+xml";

export const buildXMLObj = (input: {
  channel: Channel;
  items?: Item[];
}): XMLObj => {
  const { channel, items } = input;

  const optionalProps = genOptionalProps<ChannelBase>();

  const xmlObj = {
    xml: {
      "@version": "1.0",
      "@encoding": "UTF-8",
    },
    rss: {
      "@version": "2.0",
      // Treat them as default namespaces
      ...insertNamespacesAttrs([
        "content",
        "dc",
        "atom",
      ]),
      channel: {
        title: channel.title,
        description: channel.description,
        link: channel.link,
        "atom:link": {
          "@href": channel.atom.link.href,
          "@rel": channel.atom.link.rel ?? DEFAULT_ATOM_LINK_REL,
          "@type": channel.atom.link.type ?? DEFAULT_ATOM_LINK_REL_TYPE,
        },
        ...optionalProps<string[]>("category", channel.category),
        ...optionalProps<Cloud, ChannelCloud>(
          "cloud",
          channel.cloud,
          toChannelCloud,
        ),
        ...optionalProps<string>("copyright", channel.copyright),
        ...optionalProps<string>("generator", channel.generator),
        ...optionalProps<string>("docs", channel.docs),
        ...optionalProps<Image, ChannelImage>(
          "image",
          channel.image,
          toChannelImage,
        ),
        ...optionalProps<string>("language", channel.language),
        ...optionalProps<string>(
          "lastBuildDate",
          channel.lastBuildDate,
        ),
        ...optionalProps<string>(
          "managingEditor",
          channel.managingEditor,
        ),
        ...optionalProps<string>("pubDate", channel.pubDate),
        ...optionalProps<string>("rating", channel.rating),
        ...optionalProps<SkipDays[]>("skipDays", channel.skipDays),
        ...optionalProps<string>(
          "skipHours",
          channel.skipHours?.toString(),
        ),
        ...optionalProps<TextInput, ChannelTextInput>(
          "textInput",
          channel.textInput,
          toChannelTextInput,
        ),
        ...optionalProps<string>(
          "ttl",
          channel.ttl ? channel.ttl.toString() : undefined,
        ),
        ...optionalProps<string>(
          "webMaster",
          channel.webMaster,
        ),
        ...optionalProps<Item[], ChannelItem[]>(
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

const toChannelImage = (data: Image): ChannelImage => {
  const optionalProps = genOptionalProps<ChannelImage>();

  const DEFAULT_IMAGE_WIDTH = 88;
  const DEFAULT_IMAGE_HEIGHT = 31;
  const toWidth = (data: number): string => data.toString();
  const toHeight = (data: number): string => data.toString();

  return ({
    title: data.title,
    url: data.url,
    link: data.link,
    ...optionalProps<string>(
      "description",
      data.description,
    ),
    ...optionalProps<number, string>(
      "width",
      data.width ?? DEFAULT_IMAGE_WIDTH,
      toWidth,
    ),
    ...optionalProps<number, string>(
      "height",
      data.height ?? DEFAULT_IMAGE_HEIGHT,
      toHeight,
    ),
  });
};

const toChannelTextInput = (data: TextInput): ChannelTextInput => ({
  title: data.title,
  description: data.description,
  name: data.name,
  link: data.link,
});

const toChannelItems = (data: Item[]): ChannelItem[] => {
  const optionalProps = genOptionalProps<ChannelItem>();

  const toItem = (item: Item): ChannelItem => ({
    ...optionalProps<string>("title", item.title),
    ...optionalProps<string>("description", item.description),
    ...optionalProps<string>(
      "content:encoded",
      item.content?.encoded,
    ),
    ...optionalProps<string>("link", item.link),
    ...optionalProps<string>("author", item.author),
    ...optionalProps<string[]>("category", item.category),
    ...optionalProps<string>("dc:creator", item.dc?.creator),
    ...optionalProps<string>("comments", item.comments),
    ...optionalProps<string>(
      "slash:comments",
      item.slash?.comments?.toString(),
    ),
    ...optionalProps<Enclosure, ItemEnclosure>(
      "enclosure",
      item.enclosure,
      toItemEnclosure,
    ),
    ...optionalProps<Guid, ItemGuid>(
      "guid",
      item.guid,
      toItemGuid,
    ),
    ...optionalProps<string>("pubDate", item.pubDate),
    ...optionalProps<Source, ItemSource>(
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
