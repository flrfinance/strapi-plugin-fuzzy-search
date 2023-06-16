import fuzzysort from 'fuzzysort';
import { Entity, FilteredEntry } from '../interfaces/interfaces';
import { isJson, tryGetJson } from './isJSON';

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
      let value = entry[key];

      if (Array.isArray(value)) {
        const keyToSearchArray = keys.find((k) => k === key);

        if (!keyToSearchArray) continue;

        const isArrayOfObjects = value.every(
          (v) => typeof v === 'object' && !!v
        );

        if (isArrayOfObjects) {
          const keysToIncludeForArray = keys
            .filter((k) => k.startsWith(`${key}.`))
            .map((k) => k.replace(`${key}.`, ''));

          value.map((v) => {
            for (const k of Object.keys(v)) {
              if (!keysToIncludeForArray.includes(k)) delete v[k];
            }
          });
        }

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
    modelName : model.modelName,
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

      const tryParse = tryGetJson(value);

      if (tryParse && Array.isArray(tryParse)) {
        entry.obj[key] = tryParse;
      }
    }
  }

  return result;
};
