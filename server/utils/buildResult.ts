import fuzzysort from 'fuzzysort';
import { Entity, FilteredEntry } from '../interfaces/interfaces';
import isJson from './isJSON';

export default ({
  model,
  keys,
  query,
}: {
  model: FilteredEntry;
  keys: string[];
  query: string;
}) => {
  for (const entry of model[model.pluralName]) {
    for (const key of Object.keys(entry)) {
      const value = entry[key];

      if (Array.isArray(value)) {
        entry[key] = JSON.stringify(value);
      }
    }
  }

  if (model.fuzzysortOptions.characterLimit) {
    model[model.pluralName].forEach((entry) => {
      const entryKeys = Object.keys(entry);

      entryKeys.forEach((key) => {
        if (!keys.includes(key)) return;

        if (!entry[key]) return;

        entry[key] = entry[key].slice(0, model.fuzzysortOptions.characterLimit);
      });
    });
  }

  const result = {
    pluralName: model.pluralName,
    schemaInfo: model.schemaInfo,
    uid: model.uid,
    fuzzysortResults: fuzzysort.go<Entity>(query, model[model.pluralName], {
      threshold: model.fuzzysortOptions.threshold,
      limit: model.fuzzysortOptions.limit,
      keys,
      scoreFn: (a) =>
        Math.max(
          ...model.fuzzysortOptions.keys.map((key, index) =>
            a[index] ? a[index].score + key.weight : -9999
          )
        ),
    }),
  };

  for (const entry of result.fuzzysortResults) {
    for (const key of Object.keys(entry.obj)) {
      const value = entry.obj[key];

      if (isJson(value) && Array.isArray(JSON.parse(value))) {
        entry.obj[key] = JSON.parse(value);
      }
    }
  }

  return result;
};
