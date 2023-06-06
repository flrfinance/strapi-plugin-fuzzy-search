import * as yup from "yup";

const pluginConfigSchema = yup.object({
  contentTypes: yup.array().of(
    yup.object({
      uid: yup.string().required(),
      modelName: yup.string().required(),
      queryConstraints: yup.object(),
      transliterate: yup.boolean(),
      fuzzysortOptions: yup
        .object({
          threshold: yup.number(),
          limit: yup.number(),
          keys: yup.array().of(
            yup.object({
              name: yup.string().required(),
              weight: yup.number(),
            })
          ),
        })
        .required(),
        populate : yup.array()
    })
  ),
});

export default pluginConfigSchema;
