export type ChannelBase = {
  title: string;
  description: string;
  link: string;
  "atom:link"?: ChannelAtomLink;
  category?: string[];
  cloud?: ChannelCloud;
  copyright?: string;
  generator?: string;
  docs?: string;
  image?: ChannelImage;
  language?: string;
  lastBuildDate?: string;
  managingEditor?: string;
  pubDate?: string;
  rating?: string;
  skipDays?: string[];
  skipHours?: string;
  textInput?: ChannelTextInput;
  ttl?: string;
  webMaster?: string;
  item?: ChannelItem[];
};

export type ChannelCloud = {
  "@domain": string;
  "@port": number;
  "@path": string;
  "@registerProcedure": string;
  "@protocol": string;
};

export type ChannelImage = {
  title: string;
  url: string;
  link: string;
  description?: string;
  width?: string;
  height?: string;
};

export type ChannelTextInput = {
  title: string;
  description: string;
  name: string;
  link: string;
};

export type ChannelAtomLink = {
  "@href": string;
  "@rel": string;
  "@type": string;
};

type DublinCore = {
  "dc:contributor"?: string;
  "dc:coverage"?: string;
  "dc:creator"?: string;
  "dc:date"?: string;
  "dc:description"?: string;
  "dc:format"?: string;
  "dc:identifier"?: string;
  "dc:language"?: string;
  "dc:publisher"?: string;
  "dc:relation"?: string;
  "dc:rights"?: string;
  "dc:source"?: string;
  "dc:subject"?: string;
  "dc:title"?: string;
  "dc:type"?: string;
};

export type ChannelItem = {
  title?: string;
  description?: string;
  "content:encoded"?: string;
  link?: string;
  author?: string;
  category?: string;
  comments?: string;
  "slash:comments"?: string;
  enclosure?: ItemEnclosure;
  guid?: ItemGuid;
  pubDate?: string;
  source?: ItemSource;
} & DublinCore;

export type ItemEnclosure = {
  "@url": string;
  "@length": number;
  "@type": string;
};

export type ItemGuid = {
  $value: string;
  "@isPermaLink": string;
};

export type ItemSource = {
  $value: string;
  "@url": string;
};
