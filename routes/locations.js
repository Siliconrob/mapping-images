const Joi = require("joi");
const appHelper = require("../src/helpers");
const crypto = require("crypto");
const Airtable = require("airtable");
const turf = require("@turf/helpers");

const dataTable = "Locations";

function getAirTableBase() {
  const base = new Airtable({
    apiKey: process.env.airtable_key,
  }).base(process.env.airtable_base);
  return base;
}

async function getCurrentLocations() {
  const base = getAirTableBase();
  const points = [];
  const paged = await base(dataTable)
    .select({
      filterByFormula: "{Approved} = 1",
    })
    .eachPage(function page(records, fetchNextPage) {
      records.forEach((z) => {
        const newPoint = turf.point([z.fields.Longitude, z.fields.Latitude], {
          dataId: z.id,
          id: z.fields.Id,
          photo: z.fields.Photo.shift(),
          text: z.fields.PublicText,
        });
        points.push(newPoint);
      });
      fetchNextPage();
    });
  return turf.featureCollection(points);
}

async function createNewLocationRecord(newRecord) {
  const base = getAirTableBase();
  const updatedRecords = await base(dataTable).create([{ fields: newRecord }]);
  return updatedRecords;
}

module.exports = [
  {
    method: "GET",
    path: "/locations",
    options: {
      description: "Get All Locations",
      notes: "Returns all locations",
      tags: ["api", "Locations"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const locations = await getCurrentLocations();
        return {
          mapkey: process.env.mapkey,
          details: locations,
        };
      });
    },
  },
  {
    method: "POST",
    path: "/locations",
    options: {
      description: "Create a new record",
      notes: "Creates a new location record",
      tags: ["api", "Locations"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          id: Joi.string()
            .guid()
            .default(`${crypto.randomUUID()}`)
            .optional()
            .description("RecordUUID"),
          photo: Joi.string().default("").required().description("Photo url"),
          publicText: Joi.string()
            .default("This is some text")
            .optional()
            .description("Text to display publicly"),
          latitude: Joi.number()
            .required()
            .default(46.786671)
            .min(-90)
            .max(90)
            .description("Latitude"),
          longitude: Joi.number()
            .required()
            .default(-92.100487)
            .min(-180)
            .max(180)
            .description("Longitude"),
        }),
      },
    },
    handler: async (request, h) => {
      const newRecord = {
        Id: request.payload.id || crypto.randomUUID(),
        Approved: false,
        Photo: [{ url: request.payload.photo }],
        PublicText: request.payload.publicText,
        Latitude: request.payload.latitude,
        Longitude: request.payload.longitude,
        SubmissionDate: new Date().toISOString(),
        ApprovalDate: null,
      };

      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await createNewLocationRecord(newRecord);
        return response;
      });
    },
  },
];
