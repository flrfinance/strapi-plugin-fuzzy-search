import settingsService from '../services/settingsService';

const buildDbQuery = (locale: string, modelUid: string, modelName: string) => {
  const { contentTypes } = settingsService().get();
  const { queryConstraints, populateOptions } = contentTypes.find(
    (entry) => entry.modelName === modelName
  );
  return {
    ...queryConstraints,
    where: {
      ...(queryConstraints?.where && { ...queryConstraints.where }),
      ...(locale && { locale: locale }),
    },
    ...(populateOptions && { populate: populateOptions.populate }),
  };
};

const getFilteredEntries = async (
  locale: string,
  modelUid: string,
  modelName: string
) => {
  const q = buildDbQuery(locale, modelUid, modelName);

  const res = await strapi.db.query(modelUid).findMany(q);

  return res;
};

export default getFilteredEntries;
