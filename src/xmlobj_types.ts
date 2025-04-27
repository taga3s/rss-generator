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

export type ChannelItem = {
  title?: string;
  description?: string;
  "content:encoded"?: string;
  link?: string;
  author?: string;
  "dc:creator"?: string;
  category?: string;
  comments?: string;
  "slash:comments"?: string;
  enclosure?: ItemEnclosure;
  guid?: ItemGuid;
  pubDate?: string;
  source?: ItemSource;
};

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
