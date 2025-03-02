import {
  Atom,
  Channel,
  Cloud,
  Enclosure,
  Guid,
  Image,
  Item,
  Source,
  TextInput,
} from "./generate_rss_types.ts";
import { XMLObj } from "./tree_types.ts";
import {
  XMLAtomLinkTag,
  XMLCloudTag,
  XMLEnclosureTag,
  XMLGuidTag,
  XMLImageTag,
  XMLItemTag,
  XMLSourceTag,
  XMLTextInputTag,
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

const buildXMLObj = (input: {
  channel: Channel;
  items?: Item[];
  atom?: Atom;
}): XMLObj => {
  const { channel, items, atom } = input;

  const xmlObj = {
    xml: {
      "@version": "1.0",
      "@encoding": "UTF-8",
    },
    rss: {
      "@version": "2.0",
      "@xmlns:atom": "http://www.w3.org/2005/Atom",
      channel: {
        title: channel.title,
        description: channel.description,
        link: channel.link,
        ...optionalProp<Atom["link"], XMLAtomLinkTag>(
          "atom:link",
          atom?.link,
          toXMLAtomLinkTag,
        ),
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

  console.log(xmlObj);
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
    ...optionalProp<string>("title", item.title),
    ...optionalProp<string>("description", item.description),
    ...optionalProp<string>("link", item.link),
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

const toXMLAtomLinkTag = (data: Atom["link"]): XMLAtomLinkTag => ({
  "@href": data.href,
  "@rel": data.rel,
  "@type": data.type,
});

export {
  buildXMLObj,
  optionalProp,
  toXMLAtomLinkTag,
  toXMLCloudTag,
  toXMLEnclosureTag,
  toXMLGuidTag,
  toXMLImageTag,
  toXMLItemTags,
  toXMLSourceTag,
  toXMLTextInputTag,
};
