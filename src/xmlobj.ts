import {
  Channel,
  Cloud,
  Enclosure,
  Guid,
  Image,
  Item,
  RSS,
  Source,
  TextInput,
} from "./generate_rss_types.ts";
import { XMLObj } from "./tree_types.ts";
import {
  XMLCloudTag,
  XMLEnclosureTag,
  XMLGuidTag,
  XMLImageTag,
  XMLItemTag,
  XMLSourceTag,
  XMLTextInputTag,
} from "./xmlobj_types.ts";

const rssProps = (rss: RSS): {
  [key: string]: string;
} | undefined => {
  if (!rss) {
    return undefined;
  }
  const props: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(rss)) {
    props[`@${key}`] = value;
  }
  return props;
};

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

const buildXMLObj = (input: {
  rss: RSS;
  channel: Channel;
  items?: Item[];
}): XMLObj => {
  const { rss, channel, items } = input;

  const xmlObj = {
    rss: {
      ...rssProps(rss),
      channel: {
        title: channel.title,
        description: channel.description,
        link: channel.link,
        ...optionalProp("category", channel.category),
        ...optionalProp<Cloud, XMLCloudTag>(
          "cloud",
          channel.cloud,
          toXMLCloudTag,
        ),
        ...optionalProp<string>("copyright", channel.copyright),
        ...optionalProp<string>("generator", channel.generator),
        ...optionalProp<string>("docs", channel.docs),
        ...optionalProp<Image, XMLImageTag>(
          "image",
          channel.image,
          toXMLImageTag,
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
        ...optionalProp<TextInput, XMLTextInputTag>(
          "textInput",
          channel.textInput,
          toXMLTextInputTag,
        ),
        ...optionalProp<string>(
          "ttl",
          channel.ttl ? channel.ttl.toString() : undefined,
        ),
        ...optionalProp<string>("webMaster", channel.webMaster),
        ...optionalProp<Item[], XMLItemTag[]>(
          "item",
          items,
          toXMLItemTags,
        ),
      },
    },
  };

  return xmlObj;
};

const toXMLCloudTag = (data: Cloud): XMLCloudTag => ({
  "@domain": data.domain,
  "@port": data.port,
  "@path": data.path,
  "@registerProcedure": data.registerProcedure,
  "@protocol": data.protocol,
});

const toXMLImageTag = (data: Image): XMLImageTag => ({
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

const toXMLTextInputTag = (data: TextInput): XMLTextInputTag => ({
  title: data.title,
  description: data.description,
  name: data.name,
  link: data.link,
});

const toXMLItemTags = (data: Item[]): XMLItemTag[] => {
  return data.map((item) => ({
    title: item.title,
    description: item.description,
    link: item.link,
    ...optionalProp<string>("author", item.author),
    ...optionalProp<string[]>("category", item.category),
    ...optionalProp<string>("comments", item.comments),
    ...optionalProp<Enclosure, XMLEnclosureTag>(
      "enclosure",
      item.enclosure,
      toXMLEnclosureTag,
    ),
    ...optionalProp<Guid, XMLGuidTag>("guid", item.guid, toXMLGuidTag),
    ...optionalProp<string>("pubDate", item.pubDate),
    ...optionalProp<Source, XMLSourceTag>(
      "source",
      item.source,
      toXMLSourceTag,
    ),
  }));
};

const toXMLEnclosureTag = (data: Enclosure): XMLEnclosureTag => ({
  "@url": data.url,
  "@length": data.length,
  "@type": data.type,
});

const toXMLGuidTag = (data: Guid): XMLGuidTag => ({
  $value: data.value,
  "@isPermaLink": data.isPermaLink ? "true" : "false",
});

const toXMLSourceTag = (data: Source): XMLSourceTag => ({
  $value: data.value,
  "@url": data.url,
});

export {
  buildXMLObj,
  optionalProp,
  toXMLCloudTag,
  toXMLEnclosureTag,
  toXMLGuidTag,
  toXMLImageTag,
  toXMLItemTags,
  toXMLSourceTag,
  toXMLTextInputTag,
};
