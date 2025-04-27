export type Channel = {
  title: string;

  link: string;

  description: string;

  language?: string;

  copyright?: string;

  managingEditor?: string;

  webMaster?: string;

  pubDate?: string;

  lastBuildDate?: string;

  category?: string[];

  generator?: string;

  docs?: string;

  cloud?: Cloud;

  ttl?: number;

  image?: Image;

  rating?: string;

  textInput?: TextInput;

  skipDays?: SkipDays[];

  skipHours?: number;

  // Following http://www.w3.org/2005/Atom.
  atom?: {
    link?: AtomLink;
  };
};

export type Cloud = {
  domain: string;

  port: number;

  path: string;

  registerProcedure: string;

  protocol: Protocol;
};

export type Protocol = "xml-rpc" | "soap" | "http-post";

export type Image = {
  url: string;

  title: string;

  link: string;

  /**
   * Maximum value for width is 144, default value is 88.
   */
  width?: number;

  /**
   * Maximum value for height is 400, default value is 31.
   */
  height?: number;

  description?: string;
};

export type TextInput = {
  title: string;

  description: string;

  name: string;

  link: string;
};

export type SkipDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type AtomLink = {
  href: string;

  rel: "alternate" | "enclosure" | "related" | "self" | "via";

  type: string;
};

export type Item = {
  title?: string;

  link?: string;

  description?: string;

  author?: string;

  category?: string[];

  comments?: string;

  enclosure?: Enclosure;

  guid?: Guid;

  pubDate?: string;

  source?: Source;

  // Following http://purl.org/rss/1.0/modules/content/.
  content?: {
    encoded?: string;
  };

  // Following http://purl.org/dc/elements/1.1/.
  dc?: {
    creator?: string;
    // TODO: Add other properties.
  };

  // Following http://purl.org/rss/1.0/modules/slash/.
  slash?: {
    comments?: number;
  };
};

export type Enclosure = {
  url: string;

  length: number;

  type: string;
};

export type Guid = {
  value: string;

  isPermaLink: boolean;
};

export type Source = {
  value: string;

  url: string;
};

export type Namespaces = ("atom" | "content" | "dc" | "slash")[];
