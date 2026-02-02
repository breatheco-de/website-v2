var colors = require("colors");
const {
  walk,
  loadYML,
  empty,
  fail,
  warn,
  success,
  validateObjectProperties,
  getEntityTypeFromPath,
} = require("./_utils");

const metas = [
  { key: "slug", type: "string", mandatory: true },
  { key: "title", type: "string", mandatory: true },
  { key: "description", type: "string", length: 160 },
  { key: "image", type: "string" },
  { key: "keywords", type: "string" },
  { key: "redirects", type: "array" },
];

const mustHaveAcademies = (val) => {
  if (!Array.isArray(val))
    throw Error(
      `academies property should be an array and its a ${typeof val}`
    );
  // Empty academies array is allowed for plans that are kept in file but inactive (e.g. region-specific courses with USA-only plans).
};
const validateEmptyPlan = (val) => {
  if (val.slug == undefined) throw Error("Pricing plan missing slug");

  if (!Array.isArray(val.bullets))
    throw Error(
      `bullets property should exist and be array and its ${typeof val.bullets}`
    );
  else if (val.bullets.length == 0)
    throw Error(
      "Pricing plan bullets are missing, please add at least one bullet"
    );
};

let duplicateDescriptions = {};
walk(`${__dirname}/../data/plans/`, function (err, files) {
  if (err) fail("Error reding the YML files: ", err);
  const _files = files.filter(
    (f) => f.indexOf(".yml") > 1 || f.indexOf(".yaml") > 1
  );

  let langs = {};
  let slugs = {};
  _files.forEach((_path) => {
    const doc = loadYML(_path);
    langs[doc.lang] = true;
    if (!slugs[doc.name]) slugs[doc.name] = {};
    if (!slugs[doc.name][doc.lang]) slugs[doc.name][doc.lang] = {};

    const yml = doc && doc.yaml;
    if (!yml) fail("Invalid YML syntax for " + _path);
    else if (empty(yml.full_time))
      fail("Missing full_time pricing plans for " + _path);
    else if (empty(yml.part_time))
      fail("Missing part_time pricing plans for " + _path);
    else {
      // look for duplicated slugs
      try {
        const validateSlug = (val, breadcrumbPath) => {
          // if(slugs[doc.name][doc.lang][val]) throw Error(`Plan slug ${val} already found for ${slugs[doc.name][doc.lang][val]} (please remove duplicate)`)
          // else slugs[doc.name][doc.lang][val] = breadcrumbPath;
          slugs[doc.name][doc.lang][val] = breadcrumbPath;
        };

        validateObjectProperties(doc.yaml, {
          "full_time[].academies": mustHaveAcademies,
          "part_time[].academies": mustHaveAcademies,
          "full_time[].slug": validateSlug,
          "part_time[].slug": validateSlug,
          "full_time[]": validateEmptyPlan,
          "part_time[]": validateEmptyPlan,
        });
      } catch (error) {
        fail(`${error.message} in ${error.path} for file: \n ${_path}`);
      }
    }
  });

  for (let course in slugs) {
    for (let lang in langs) {
      if (!slugs[course][lang])
        fail(
          `Missing pricing plans for ${course} in language: ${lang}, maybe you want to create a ./src/data/plans/${course}.${lang}.yml file`
        );
      for (let planName in slugs[course][lang]) {
        for (let otherLang in langs) {
          if (!slugs[course][otherLang][planName])
            fail(
              `Pricing plan ${planName} is missing a "${otherLang}" translation for the course ${course}.\nTo fix this, open the ./src/data/plans/${course}.${otherLang}.yml file and add a plan with slug "${planName}"`
            );
        }
      }
    }
  }
  success("All the pricing plans are OK!");
});
