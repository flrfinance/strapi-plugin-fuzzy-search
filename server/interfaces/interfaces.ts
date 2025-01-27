import { Schema, SchemaInfo } from '@strapi/strapi';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface Config {
  contentTypes: ContentType[];
}

interface FuzzySortOptions {
  threshold?: number;
  limit?: number;
  characterLimit?: number;
  keys: [
    {
      name: string;
      weight?: number;
    }
  ];
}

export interface ContentType {
  uid: string;
  modelName: string;
  queryConstraints?: { where: {} };
  transliterate?: boolean;
  fuzzysortOptions: FuzzySortOptions;
  model: Schema & { uid: string; responseName: string; modelName: string };
  populateOptions: {
    populate: string[];
    populatedKeys: string[];
  };
}

export interface FilteredEntry {
  uid: string;
  pluralName: string;
  schemaInfo: SchemaInfo;
  transliterate: boolean;
  fuzzysortOptions: FuzzySortOptions;
  [x: string]: any;
}

export interface Result {
  modelName : string;
  pluralName: string;
  schemaInfo: SchemaInfo;
  uid: string;
  fuzzysortResults: Writeable<Fuzzysort.KeysResults<Entity>>;
}

export interface Entity {
  id: string | number;
  [x: string]: any;
}
