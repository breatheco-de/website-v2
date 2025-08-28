const fs = require("fs");
var colors = require("colors");
const fetch = require("node-fetch");
const {
  walk,
  loadYML,
  empty,
  fail,
  warn,
  success,
  localizeImage,
  checkForLanguages,
} = require("./_utils");

require("dotenv").config();

const content_fields = [
  { key: "breathecode_location_slug", type: "string", mandatory: true },
];

const onlineSlugs = [
  "europe",
  "online",
  // "bootcamp-programacion-europa-online",
  // "europe-online-coding-bootcamp",
  // "online-bootcamp-programacion",
  // "online-coding-bootcamp",
];

const locations_fields = [
  { key: "active_campaign_location_slug", type: "string", mandatory: true },
  { key: "city", type: "string", mandatory: true },
  { key: "phone", type: "string", mandatory: false },
  { key: "latitude", type: "string", mandatory: true },
  { key: "longitude", type: "string", mandatory: true },
];

const regionLists = ["latam", "usa-canada", "europe"];

let allLocations = {};

walk(`${__dirname}/../data/location`, async (err, files) => {
  const academySlug = [];
  err && fail("Error reading the YAML files: ", err);
  console.log("verifying location slugs...");

  files.forEach((_path) => {
    const doc = loadYML(_path);
    if (!doc || !doc.yaml) fail("Invalid YML syntax for " + _path);
    doc.filePath = _path;
    let pieces = _path.split(".");
    if (pieces.length !== 3)
      fail(
        'The file path for this location can\'t contain dot(".") and it most include the languague, ex: miami.us.yaml' +
          _path
      );
    // if (!doc.lang) fail('Missing language on yml file name for ' + _path);
    const fileSlug = pieces[0].substr(_path.lastIndexOf("/") + 1);
    const fileLang = pieces[1];

    // If the first file is undefined replace the value with an object (in this case bogota-colombia[es/us])
    if (allLocations[fileLang] === undefined) allLocations[fileLang] = {};
    // Replace file language inside the file yaml because the filename lang must prevail
    doc.lang = fileLang;
    allLocations[fileLang][fileSlug] = doc;
  });

  const _files = files.filter(
    (f) =>
      (f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1) &&
      f.indexOf("additional-redirects.yml") === -1 &&
      f.indexOf("call-to-actions.yml") === -1
  );

  let allCoordinates = {};
  let slugs = [];

  for (let i = 0; i < _files.length; i++) {
    const _path = _files[i];
    const doc = loadYML(_path);
    let _slug = _path.split(".")[0].substr(_path.lastIndexOf("/") + 1);
    slugs.push(_slug);

    // It ask if we already looped thru all the files
    if (slugs.length === _files.length) checkForLanguages(slugs, "location");

    try {
      if (!doc || doc === undefined)
        fail(`Impossible to load YML file for ${_slug}`);

      const location = doc.yaml;
      const meta_keys = Object.keys(location);

      if (
        location.meta_info.region &&
        !regionLists.includes(location.meta_info.region)
      ) {
        fail(
          `Region ${
            location.meta_info.region
          } is not included, should be one of this: ${regionLists.map(
            (reg) => reg
          )}`
        );
      }
      if (location.images_box.images !== null) {
        for (let i = 0; i < location.images_box.images.length; i++) {
          let images_box = location.images_box.images[i].path;
          let header_image = location.header.image;
          let info_box = location.info_box.image;

          localizeImage(info_box, "relative_images", _path, "locations");
          localizeImage(header_image, "relative_images", _path, "locations");
          localizeImage(images_box, "relative_images", _path, "locations");
        }
      }

      //NOTE: warn if location not have any image
      // if (
      //   location.images_box.images?.length < 5 ||
      //   location.images_box.images?.length === undefined
      // ) {
      //   console.log("\nlocation needs images as soon as possible".yellow);
      //   console.log(
      //     "Images count:",
      //     location.images_box.images?.length,
      //     "\npath: ",
      //     _path,
      //     "\n"
      //   );
      // }

      content_fields.forEach((obj) => {
        let slugMatch = academySlug.some(
          (el) => el === location.breathecode_location_slug
        );

        // TODO: Uncoment when all location have correct images
        // if(!location.images_box.images?.length === limit_images) fail(`The images in locations yml should have exactly 5 images.\n\nConflict: found ${location.images_box.images?.length} of ${limit_images} images in:\n${_path}\n\n`)

        if (!meta_keys.includes(obj["key"]))
          fail(`Missing prop ${obj["key"]} from location on ${_path}`);
        else {
          if (obj["type"] === "string") {
            if (
              obj["mandatory"] === true &&
              slugMatch !== true &&
              location[obj["key"]] !== _slug
            )
              fail(
                `\n\nInvalid mandatory prop ${
                  obj["key"]
                } on ${_path} expected: ${location[obj["key"]].yellow} ${
                  "match with".red
                } ${_slug.yellow}\n\n`
              );
          }
        }
      });

      if (
        allCoordinates[location.latitude] != undefined &&
        allCoordinates[location.latitude] != location.breathecode_location_slug
      )
        fail(
          `❌ ERROR: Location ${
            location.breathecode_location_slug
          } has same latitude as ${allCoordinates[location.latitude]}\n`
        );
      else
        allCoordinates[location.latitude] = location.breathecode_location_slug;

      if (
        allCoordinates[location.longitude] != undefined &&
        allCoordinates[location.longitude] != location.breathecode_location_slug
      )
        fail(
          `❌ ERROR: Location ${
            location.breathecode_location_slug
          } has same longitude as ${allCoordinates[location.longitude]}\n`
        );
      else
        allCoordinates[location.longitude] = location.breathecode_location_slug;

      locations_fields.forEach((field) => {
        if (!meta_keys.includes(field["key"]) && field["mandatory"] === true)
          warn(`Missing prop ${field["key"]} from location on ${_path}`);
        Object.keys(allLocations["us"]).forEach((slug) => {
          const esNode = allLocations["es"][slug];
          const usNode = allLocations["us"][slug];
          if (!esNode || !usNode) {
            fail(
              `❌ ERROR: Missing location pair for slug ${slug} => es=${!!esNode}, us=${!!usNode}`
            );
          }
          const location_fields_es = esNode["yaml"][field["key"]];
          const location_fields_us = usNode["yaml"][field["key"]];
          const path = esNode.filePath;
          if (
            !onlineSlugs.includes(slug) &&
            location_fields_es !== location_fields_us
          ) {
            fail(
              `❌ ERROR: ${field["key"].yellow} for spanish ${location_fields_es.yellow} musth match with english ${location_fields_us.yellow} in ${path}\n`
            );
          }
        });
      });
    } catch (error) {
      console.error(`Error on file: ${_path}`.red);
      fail(error.message || error);
    }
  }
  success("All Locations test passed");
});
