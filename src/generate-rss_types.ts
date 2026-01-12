export interface Channel {
  title: string;

  link: string;

  // Following http://www.w3.org/2005/Atom.
  atom: {
    link: AtomLink;
  };

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
}

export interface Cloud {
  domain: string;

  port: number;

  path: string;

  registerProcedure: string;

  protocol: Protocol;
}

export type Protocol = "xml-rpc" | "soap" | "http-post";

export interface Image {
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
}

export interface TextInput {
  title: string;

  description: string;

  name: string;

  link: string;
}

export type SkipDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface AtomLink {
  href: string;

  rel?: "alternate" | "enclosure" | "related" | "self" | "via";

  type?: string;
}

export interface Item {
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
}

export interface Enclosure {
  url: string;

  length: number;

  type: string;
}

export interface Guid {
  value: string;

  isPermaLink: boolean;
}

export interface Source {
  value: string;

  url: string;
}

export const NAMESPACE_URLS = {
  atom: "http://www.w3.org/2005/Atom",
  content: "http://purl.org/rss/1.0/modules/content/",
  dc: "http://purl.org/dc/elements/1.1/",
} as const;

export type Namespaces = (keyof typeof NAMESPACE_URLS)[];
