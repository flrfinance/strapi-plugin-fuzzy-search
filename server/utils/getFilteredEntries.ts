import settingsService from '../services/settingsService';

const buildDbQuery = (locale: string, modelUid: string) => {
  const { contentTypes } = settingsService().get();
  const { queryConstraints , populateOptions } = contentTypes.find(
    (entry) => entry.uid === modelUid
  );
  return {
    ...queryConstraints,
    where: {
      ...(queryConstraints?.where && { ...queryConstraints.where }),
      ...(locale && { locale: locale }),
    },
    populate: populateOptions.populate,
  };
};

const getFilteredEntries = async (locale: string, modelUid: string) => {
  const q = buildDbQuery(locale, modelUid);
    
  const res = await strapi.db
      .query(modelUid)
      .findMany(q);
    
  return res;
};

export default getFilteredEntries;
