import { ContentType, Result } from '../interfaces/interfaces';
import sanitizeOutput from './sanitizeOutput';

// Destructure search results and return them in appropriate/sanitized format
const buildGraphqlResponse = async (searchResults: Result[], auth: any) => {
  const { toEntityResponseCollection } = strapi
    .plugin('graphql')
    .service('format').returnTypes;
  const { getFindQueryName } = strapi.plugin('graphql').service('utils').naming;

  const resultsResponse = {};

  // Map over results instead of using for each so promises can be resolved
  // and thus resultsResponse can be build properly
  await Promise.all(
    searchResults.map(async (res) => {
      const { schemaInfo, fuzzysortResults, uid } = res;
      const queryName = getFindQueryName({ info: schemaInfo });

      resultsResponse[queryName] = toEntityResponseCollection(
        fuzzysortResults.map(async (fuzzyRes) => {
          const schema = strapi.getModel(uid);

          const sanitizedEntity = await sanitizeOutput(
            fuzzyRes.obj,
            schema,
            auth
          );

          return sanitizedEntity;
        })
      );
    })
  );

  return resultsResponse;
};

export default buildGraphqlResponse;
