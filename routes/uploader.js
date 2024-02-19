const Joi = require("joi");
const appHelper = require("../src/helpers");
const uploadHelper = require("../src/s3uploader");

module.exports = [
  {
    method: "POST",
    path: "/upload",
    options: {
      description: "Upload a file",
      notes: "Uploads a file",
      tags: ["api", "Upload"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          fileData: Joi.string()
            .required()
            .default(
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAD0lEQVR42mNkwAIYh7IgAAVVAAuInjI5AAAAAElFTkSuQmCC"
            )
            .description("Base 64 Image bytes"),
        }),
      },
    },
    handler: async (request, h) => {
      const input = request.payload;
      console.log(input);
      return await appHelper.GeneralErrorHandlerFn(async () => {
        return {
          shareUrl: await uploadHelper.uploadImage(input.fileData),
        };
      });
    },
  },
];
