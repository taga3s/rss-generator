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

export type Atom = {
  link: {
    href: string;

    rel: string;

    type: string;
  };
};
