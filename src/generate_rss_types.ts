type RSS = {
  version: "2.0";
  [namespace: string]: string;
};

type Channel = {
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

type Cloud = {
  domain: string;

  port: number;

  path: string;

  registerProcedure: string;

  protocol: Protocol;
};

type Protocol = "xml-rpc" | "soap" | "http-post";

type Image = {
  url: string;

  title: string;

  link: string;

  /**
   * Maximum 144, default 88
   */
  width?: number;

  /**
   * Maximum 400, default 31
   */
  height?: number;

  description?: string;
};

type TextInput = {
  title: string;

  description: string;

  name: string;

  link: string;
};

type SkipDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type Item = {
  title: string;

  link: string;

  description: string;

  author?: string;

  category?: string[];

  comments?: string;

  enclosure?: Enclosure;

  guid?: Guid;

  pubDate?: string;

  source?: Source;
};

type Enclosure = {
  url: string;

  length: number;

  type: string;
};

type Guid = {
  value: string;

  isPermaLink: boolean;
};

type Source = {
  value: string;

  url: string;
};

export type {
  Channel,
  Cloud,
  Enclosure,
  Guid,
  Image,
  Item,
  RSS,
  SkipDays,
  Source,
  TextInput,
};
