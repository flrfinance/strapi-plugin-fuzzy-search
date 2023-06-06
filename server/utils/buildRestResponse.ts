import { Result } from '../interfaces/interfaces';
import sanitizeOutput from './sanitizeOutput';
import settingsService from '../services/settingsService';

// Since sanitizeOutput returns a promise --> Resolve all promises in async for loop so that results can be awaited correctly
const buildRestResponse = async (searchResults: Result[], auth: any) => {
  const resultsResponse = {};
  const { contentTypes } = settingsService().get();

  for (const res of searchResults) {
    resultsResponse[res.pluralName] = await Promise.all(
      res.fuzzysortResults.map(async (fuzzyRes) => {
        const contentType = contentTypes.find(
          (contentType) => contentType.uid === res.uid
        );

        const schema = strapi.getModel(res.uid);

        console.dir({ obj: fuzzyRes.obj, schema }, { depth: 10 });

        let sanitizedEntity = await sanitizeOutput(fuzzyRes.obj, schema, auth);

        console.dir({ sanitizedEntity }, { depth: 10 });

        if (contentType.populate) {
          const objPopulatedData = {};

          const populatedFields = contentType.populate;

          for (const field of populatedFields) {
            const fieldData = fuzzyRes.obj[field];
            objPopulatedData[field] = fieldData;
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
