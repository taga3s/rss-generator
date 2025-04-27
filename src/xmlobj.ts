import type {
  AtomLink,
  Channel,
  Cloud,
  Enclosure,
  Guid,
  Image,
  Item,
  Namespaces,
  SkipDays,
  Source,
  TextInput,
} from "./generate-rss_types.ts";
import type { XMLObj } from "./ast_types.ts";
import type {
  ChannelAtomLink,
  ChannelBase,
  ChannelCloud,
  ChannelImage,
  ChannelItem,
  ChannelTextInput,
  ItemEnclosure,
  ItemGuid,
  ItemSource,
} from "./xmlobj_types.ts";

const genOptionalProps = <TObject>() => {
  const optionalProps = <TValue, TTransformed = TValue>(
    key: keyof TObject,
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
  return optionalProps;
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

  const optionalProps = genOptionalProps<ChannelBase>();

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
        ...optionalProps<AtomLink, ChannelAtomLink>(
          "atom:link",
          channel.atom?.link,
          toChannelAtomLink,
        ),
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
        ...optionalProps<number, string>(
          "skipHours",
          channel.skipHours,
          toChannelSkipHours,
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

const toChannelAtomLink = (data: AtomLink): ChannelAtomLink => {
  return {
    "@href": data.href,
    "@rel": data.rel,
    "@type": data.type,
  };
};

const toChannelSkipHours = (value: number): string => value.toString();

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
    ...optionalProps<number, string>(
      "slash:comments",
      item.slash?.comments,
      toItemSlashComments,
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

const toItemSlashComments = (data: number): string => data.toString();

const toItemSource = (data: Source): ItemSource => ({
  $value: data.value,
  "@url": data.url,
});
