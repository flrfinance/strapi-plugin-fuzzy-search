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
        populateOptions : yup.object({
          populate : yup.array().of(
            yup.string().required()
          ),
          populatedKeys : yup.array().of(
            yup.string().required()
          )
        })
    })
  ),
});

export default pluginConfigSchema;
