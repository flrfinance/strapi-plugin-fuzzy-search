import { Result } from '../interfaces/interfaces';
import sanitizeOutput from './sanitizeOutput';
import settingsService from '../services/settingsService';

// Since sanitizeOutput returns a promise --> Resolve all promises in async for loop so that results can be awaited correctly
const buildRestResponse = async (searchResults: Result[], auth: any) => {
  const resultsResponse = {};
  const { contentTypes } = settingsService().get();

  for (const res of searchResults) {
    resultsResponse[res.modelName] = await Promise.all(
      res.fuzzysortResults.map(async (fuzzyRes) => {
        const contentType = contentTypes.find(
          (contentType) => contentType.uid === res.uid
        );

        const schema = strapi.getModel(res.uid);

        let sanitizedEntity = await sanitizeOutput(fuzzyRes.obj, schema, auth);

        if (contentType.populateOptions) {
          const objPopulatedData = {};

          const populatedFields = contentType.populateOptions.populate;

          for (const field of populatedFields) {
            const fieldData = fuzzyRes.obj[field];
            const keysToInclude = contentType.populateOptions.populatedKeys
              .filter((k) => k.startsWith(field))
              .map((k) => k.replace(`${field}.`, ''));

            let includedPopulatedData;

            if (!fieldData) {
              continue;
            }

            if (Array.isArray(fieldData)) {
              includedPopulatedData = [];

              for (const entry of fieldData) {
                const includedEntry = {};

                for (const fK of Object.keys(entry)) {
                  if (keysToInclude.includes(fK)) {
                    includedEntry[fK] = entry[fK];
                  }
                }

                includedPopulatedData.push(includedEntry);
              }
            } else {
              includedPopulatedData = {};

              for (const fK of Object.keys(fieldData)) {
                if (keysToInclude.includes(fK)) {
                  includedPopulatedData[fK] = fieldData[fK];
                }
              }
            }

            objPopulatedData[field] = includedPopulatedData;
          }

          sanitizedEntity = {
            ...sanitizedEntity,
            ...objPopulatedData,
          };
        }

        return sanitizedEntity;
      })
    );
  }

  return resultsResponse;
};

export default buildRestResponse;
