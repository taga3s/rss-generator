export type XMLCloudTag = {
  "@domain": string;
  "@port": number;
  "@path": string;
  "@registerProcedure": string;
  "@protocol": string;
};

export type XMLImageTag = {
  title: string;
  url: string;
  link: string;
  description?: string;
  width?: string;
  height?: string;
};

export type XMLTextInputTag = {
  title: string;
  description: string;
  name: string;
  link: string;
};

export type XMLItemTag = {
  title?: string;
  description?: string;
  link?: string;
  author?: string;
  category?: string;
  comments?: string;
  enclosure?: XMLEnclosureTag;
  guid?: XMLGuidTag;
  pubDate?: string;
  source?: XMLSourceTag;
};

export type XMLEnclosureTag = {
  "@url": string;
  "@length": number;
  "@type": string;
};

export type XMLGuidTag = {
  $value: string;
  "@isPermaLink": string;
};

export type XMLSourceTag = {
  $value: string;
  "@url": string;
};

export type XMLAtomLinkTag = {
  "@href": string;
  "@rel": string;
  "@type": string;
};
