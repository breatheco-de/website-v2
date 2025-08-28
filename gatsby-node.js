const path = require("path");
const fs = require("fs");
const YAML = require("yaml");
const logger = require("./src/utils/log");
const { createFilePath } = require(`gatsby-source-filesystem`);
const bcSourcePlugin = require(`./bc-source-plugin/gatsby-node.js`);

var redirects = [];
var ymls = [];

const saveRedirectLogs = () => {
  console.log("Saving redirect log");
  fs.writeFile(
    "./logs/redirects.log",
    JSON.stringify(redirects, null, 1),
    function (err) {
      if (err) return console.log(err);
      else console.log("Created redirects file");
    }
  );

  return true;
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  config
) => {
  return await bcSourcePlugin.sourceNodes(
    { actions, createNodeId, createContentDigest },
    config
  );
};
exports.onCreateNode = ({ node, getNode, actions, ...rest }) => {
  const { createNodeField } = actions;

  // custom post types for the website
  if (
    [
      "MarkdownRemark",
      "LeadFormYaml",
      "NewsYaml",
      "PartnerYaml",
      "CredentialsYaml",
      "FooterYaml",
      "NavbarYaml",
      "CustomBarYaml",
      "BadgesYaml",
      "PageYaml",
      "LandingYaml",
      "DownloadableYaml",
      "CourseYaml",
      "LocationYaml",
      "JobAlertYaml",
      "JobYaml",
      "AlumniProjects",
      "TestimonialsYaml",
      "GeeksVsOthersYaml",
      "JobsStatisticsYaml",
      "Why4GeeksYaml",
      "AlumniProjectsYaml",
      "StaffYaml",
      "ProgramSvgYaml",
      "PricesAndPaymentYaml",
      "PlansYaml",
      "WhyPythonYaml",
      "ChooseYourProgramYaml",
      "About4GeeksYaml",
      "LocYaml",
      "UpcomingDatesYaml",
      "GeeksInfoYaml",
      "TechsWeTeachYaml",
      "FullStackTechsYaml",
      "SoftwareEngineeringTechsYaml",
      "MachineLearningTechsYaml",
      "With4GeeksYaml",
      "ScholarshipProjectsYaml",
      "ScholarshipSuccessCasesYaml",
      "JobGuaranteeSmallYaml",
      "FaqYaml",
      "AdmissionsStaffYaml",
    ].includes(node.internal.type)
  ) {
    let url = null;
    if (node.internal.type == "MarkdownRemark") {
      // skip without formatting
      if (!node.frontmatter) {
        logger.error("Missing frontmatter on node: " + node.id);
      }

      // Calculate wordCount for blog posts
      if (node.rawMarkdownBody) {
        // Remove URLs but keep markdown symbols
        const textWithoutUrls = node.rawMarkdownBody.replace(
          /https?:\/\/\S+/g,
          ""
        );
        const wordCount = textWithoutUrls.trim().split(/\s+/).length;

        createNodeField({
          node,
          name: "wordCount",
          value: wordCount,
        });
      }

      const slug = node.frontmatter.slug.replace(/\.[a-z]{2,2}/, "");
      url = `/data/blog/${slug}.${node.frontmatter.lang || "us"}/`;
    } else url = createFilePath({ node, getNode });

    const meta = getMetaFromPath({ url, ...node });

    if (meta) {
      createNodeField({ node, name: `lang`, value: meta.lang });
      createNodeField({ node, name: `slug`, value: meta.slug });
      createNodeField({ node, name: `file_name`, value: meta.file_name });
      createNodeField({ node, name: `defaultTemplate`, value: meta.template });
      createNodeField({ node, name: `type`, value: meta.type });
      createNodeField({ node, name: `pagePath`, value: meta.pagePath });
      createNodeField({ node, name: `filePath`, value: url });
      ymls.push(meta);
    } else {
      logger.error("No meta could be generated for " + url);
    }
  }

  return node;
};

// Disable CookieBot on the /thumbnail page
exports.onCreatePage = async ({ page, actions }) => {
  const { deletePage, createPage } = actions;
  if (page.path === "/thumbnail") {
    // Remove CookieBot by setting a flag in context
    deletePage(page);
    createPage({
      ...page,
      context: {
        ...page.context,
        disableCookieBot: true,
      },
    });
  }
};

// Create all the pages needed
exports.createPages = async (params) =>
  (await createEditPage(params)) &&
  (await createBlog(params)) &&
  (await createPagesfromYml(params)) &&
  //also for the custom post types
  (await createEntityPagesfromYml("Course", params, ["related_clusters"])) &&
  (await createEntityPagesfromYml("Location", params, ["related_clusters"])) &&
  (await createEntityPagesfromYml("Job", params)) &&
  (await createEntityPagesfromYml(
    "Downloadable",
    params,
    (extraFields = ["visibility"]),
    (extraContext = (node) => {
      return {
        visibility: node.meta_info.visibility,
      };
    })
  )) &&
  (await createEntityPagesfromYml(
    "Landing",
    params,
    (extraFields = ["utm_course", "utm_location", "visibility"]),
    (extraContext = (node) => {
      return {
        utm_course: node.meta_info.utm_course + "." + node.fields.lang,
        visibility: node.meta_info.visibility,
      };
    })
  )) &&
  (await addAdditionalRedirects(params)) &&
  saveRedirectLogs();

const createEditPage = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;
  createPage({
    path: "/edit",
    component: path.resolve("src/templates/edit.js"),
    context: {
      ymls,
    },
  });

  return true;
};

// CLUSTERS:
let clusters = {
  us: [],
  es: [],
};

const createBlog = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const clusterTemplate = path.resolve("src/templates/clusters.js");
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            html
            id
            frontmatter {
              excerpt
              title
              slug
              template
              author
              date
              status
              translations {
                es
                us
              }
              featured
              cluster
            }
            fields {
              lang
              slug
              file_name
              defaultTemplate
              type
              pagePath
              filePath
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    logger.error(result.errors);
    throw new Error(result.errors);
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(({ node }) => {
    const postTemplate = path.resolve(
      `src/templates/${node.frontmatter.template || "post"}.js`
    );

    // if a blog post has the "landing_cluster" template its not a real blog post, its more like a landing page meant as a topic cluster
    // and it will not follow the same URL structure, landing_cluster's have a very unique URL.
    const translations = { ...node.frontmatter.translations };
    if (translations && node.frontmatter.template != "landing_cluster") {
      Object.keys(translations).forEach((language) => {
        if (!translations[language]) {
          delete translations[language];
          return;
        }
        if (language === node.fields.lang)
          translations[language] = node.fields.pagePath;
        else {
          const translation = posts.find(
            ({ node }) => node.frontmatter.slug === translations[language]
          )?.node;
          if (translation)
            translations[
              language
            ] = `${translation.fields.lang}/${translation.frontmatter.cluster}/${translation.frontmatter.slug}`;
        }
      });
    }

    createPage({
      path:
        node.frontmatter.template != "landing_cluster"
          ? node.fields.pagePath
          : `/${node.fields.slug}`,
      component: postTemplate,
      context: {
        ...node.fields,
        translations,
      },
    });

    if (node.frontmatter.template != "landing_cluster") {
      // the old website had the blog posts with this path '/post-name' and we want now '/<lang>/<cluster>/post-name'
      _createRedirect({
        fromPath: `/${node.fields.slug}`,
        toPath: node.fields.pagePath,
        redirectInBrowser: true,
        isPermanent: true,
      });

      logger.debug(`Redirect for post /us/post/${node.fields.slug}`);
      _createRedirect({
        fromPath: `/us/post/${node.fields.slug}`,
        toPath: node.fields.pagePath,
        redirectInBrowser: true,
        isPermanent: true,
      });
    }
  });

  // Read redirect property from front-matter
  posts.forEach(({ node }) => {
    if (node.frontmatter.redirects) {
      node.frontmatter.redirects.forEach((path) => {
        if (typeof path !== "string")
          throw new Error(
            `The path in ${node.frontmatter.slug} is not a string: ${path}`
          );
        if (!path || path === "") return;
        path = path[0] !== "/" ? "/" + path : path; //and forward slash at the beginning of path
        logger.debug(`Additional redirect ${path} => ${node.fields.pagePath}`);
        _createRedirect({
          fromPath: path,
          toPath: node.fields.pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        });
      });
    }
  });

  // Iterate through each post, putting all found tags into `tags`
  posts.forEach(({ node }) => {
    if (node.frontmatter?.cluster) {
      clusters[node.fields.lang] = clusters[node.fields.lang].concat(
        node.frontmatter.cluster
      );
    }
  });

  // Eliminate duplicate clusters
  Object.keys(clusters).forEach(
    (lang) =>
      (clusters[lang] = clusters[lang].filter(
        (value, index) => clusters[lang].indexOf(value) === index
      ))
  );
  // Make clusters pages
  const langSwitcher = {
    es: "blog-en-espanol",
    us: "blog",
  };
  Object.keys(clusters).forEach((lang) =>
    clusters[lang].forEach((cluster) => {
      let file_name = `clusters.${lang}`;
      let type = "page";
      let path = `/${lang}/${langSwitcher[lang]}/${cluster}`;
      createPage({
        path,
        component: clusterTemplate,
        context: {
          cluster,
          file_name,
          lang,
          type,
          pagePath: path,
        },
      });
    })
  );

  return true;
};
const createEntityPagesfromYml = async (
  entity,
  { graphql, actions },
  extraFields = [],
  extraContext = null
) => {
  const { createPage, createRedirect } = actions;
  const extraFieldsQuery = extraFields.join("\n");
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const result = await graphql(`
        {
          all${entity}Yaml {
            edges {
              node {
                meta_info {
                    slug
                    redirects
                    visibility
                    template
                    ${extraFieldsQuery}
                }
                fields{
                    lang
                    slug
                    file_name
                    defaultTemplate
                    type
                    pagePath
                    filePath
                }
              }
            }
          }
        }`);
  if (result.errors) throw new Error(result.errors);
  let translations;
  if (entity !== "Location")
    translations = buildTranslations(result.data[`all${entity}Yaml`]);

  result.data[`all${entity}Yaml`].edges.forEach(({ node }) => {
    logger.debug(
      `Creating entity ${entity} ${node.fields.pagePath} with template ${
        node.meta_info.template || node.fields.defaultTemplate
      }.js`
    );
    const _extraContext = extraContext ? extraContext(node) : {};
    if (entity === "Location") {
      _extraContext.related_clusters = node.meta_info.related_clusters;
      translations = buildTranslations({
        edges: result.data[`all${entity}Yaml`].edges.filter((l) =>
          l.node.fields.file_name.includes(node.fields.file_name.slice(0, -2))
        ),
      });
    } else if (entity === "Course") {
      _extraContext.related_clusters = node.meta_info.related_clusters;
      if (node.meta_info.visibility === "hidden") return;
    }

    createPage({
      path: node.fields.pagePath,
      component: path.resolve(
        `./src/templates/${
          node.meta_info.template || node.fields.defaultTemplate
        }.js`
      ),
      context: {
        ...node.meta_info,
        ...node.fields,
        ..._extraContext,
        translations: translations[node.fields.defaultTemplate],
      },
    });

    if (node.fields.lang === "us") {
      _createRedirect({
        fromPath: `/${node.fields.defaultTemplate}/${node.fields.slug}`,
        toPath: node.fields.pagePath,
        redirectInBrowser: true,
        isPermanent: true,
      });

      // _createRedirect({
      //   fromPath: `/en/${node.fields.defaultTemplate}/${node.fields.slug}`,
      //   toPath: node.fields.pagePath,
      //   redirectInBrowser: true,
      //   isPermanent: true,
      // });
    }
    if (node.fields.lang === "es") {
      _createRedirect({
        fromPath: `/${node.fields.defaultTemplate}/${node.fields.slug}`,
        toPath: node.fields.pagePath,
        redirectInBrowser: true,
        isPermanent: true,
      });
    }

    if (node.meta_info && node.meta_info.redirects) {
      node.meta_info.redirects.forEach((path) => {
        if (typeof path !== "string")
          throw new Error(
            `The path in ${node.meta_info.slug} is not a string: ${path}`
          );
        if (path === "") return;
        path = path[0] !== "/" ? "/" + path : path; //and forward slash at the beginning of path
        logger.debug(`Additional redirect ${path} => ${node.fields.pagePath}`);
        _createRedirect({
          fromPath: path,
          toPath: node.fields.pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        });
      });
    }
  });

  return true;
};

const createPagesfromYml = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    logger.debug(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const result = await graphql(`
    {
      allPageYaml {
        edges {
          node {
            meta_info {
              slug
              visibility
              redirects
            }
            fields {
              lang
              slug
              file_name
              defaultTemplate
              type
              pagePath
              filePath
            }
          }
        }
      }
    }
  `);
  if (result.errors) throw new Error(result.errors);

  const translations = buildTranslations(result.data[`allPageYaml`]);

  //for each page found on the YML
  for (let i = 0; i < result.data[`allPageYaml`].edges.length; i++) {
    const { node } = result.data[`allPageYaml`].edges[i];

    // ignore pages with visibility hidden
    if (node.fields.visibility == "hidden") continue;

    const _targetPath = node.fields.pagePath;
    logger.debug(
      `Creating page ${node.fields.pagePath} in ${node.fields.lang}`
    );

    createPage({
      path: _targetPath,
      component: path.resolve(
        `./src/templates/${node.fields.defaultTemplate}.js`
      ),
      context: {
        ...node.fields,
        ...node.meta_info,
        translations: translations[node.fields.defaultTemplate],
        clusters: clusters[node.fields.lang],
      },
    });

    if (node.fields.lang === "us") {
      _createRedirect({
        fromPath: "/" + node.fields.slug,
        toPath: _targetPath,
        // redirectInBrowser: true,
        isPermanent: true,
      });

      _createRedirect({
        fromPath: "/en/" + node.fields.slug,
        toPath: _targetPath,
        // redirectInBrowser: true,
        isPermanent: true,
      });

      if (node.fields.slug === "index") {
        createPage({
          path: "/",
          component: path.resolve(
            `./src/templates/${node.fields.defaultTemplate}.js`
          ),
          context: {
            ...node.fields,
            ...node.meta_info,
            translations: translations[node.fields.defaultTemplate],
            clusters: clusters[node.fields.lang],
          },
        });

        _createRedirect({
          fromPath: "/en",
          toPath: _targetPath,
          // redirectInBrowser: true,
          isPermanent: true,
        });

        _createRedirect({
          fromPath: "/",
          toPath: _targetPath,
          // redirectInBrowser: true,
          isPermanent: true,
        });
      }
    }
    if (node.fields.lang === "es") {
      _createRedirect({
        fromPath: "/" + node.fields.slug,
        toPath: _targetPath,
        // redirectInBrowser: true,
        isPermanent: true,
      });
      // _createRedirect({
      //     fromPath: "/es/" + node.fields.slug,
      //     toPath: _targetPath,
      //     // redirectInBrowser: true,
      //     isPermanent: true
      // });
    }

    if (node.meta_info && node.meta_info.redirects) {
      node.meta_info.redirects.forEach((path) => {
        if (typeof path !== "string") {
          throw new Error(
            `The path in ${node.meta_info.slug} its not a string: ${path}`
          );
        }
        path = path[0] !== "/" ? "/" + path : path;
        const exists = redirects.find(
          (p) => p === `Redirect from ${path} to ${_targetPath}`
        );
        if (!exists || exists === undefined)
          _createRedirect({
            fromPath: path,
            toPath: _targetPath,
            // redirectInBrowser: true,
            isPermanent: true,
          });
      });
    }
  }

  return true;
};

const addAdditionalRedirects = ({ graphql, actions }) => {
  const { createRedirect } = actions;
  const _createRedirect = (args) => {
    redirects.push(`Redirect from ${args.fromPath} to ${args.toPath}`);
    createRedirect(args);
  };
  const URL = "./src/data/additional-redirects.yml";
  try {
    const contents = fs.readFileSync(URL, "utf8");
    if (!contents) throw Error("Error reading the redirect file");
    const file = YAML.parse(contents);
    if (!file) throw Error("Error persing the " + URL);

    file.redirects.forEach((r) => {
      _createRedirect({
        fromPath: r.fromPath,
        toPath: r.toPath,
        redirectInBrowser: r.redirectInBrowser,
        isPermanent: r.redirectInBrowser,
      });
    });
  } catch (error) {
    throw Error(error);
  }

  return true;
};

const getMetaFromPath = ({ url, meta_info, frontmatter }) => {
  let slugMap = {
    course: "coding-bootcamps",
    location: "coding-campus",
  };

  //if its a blog post the meta_info comes from the front-matter
  if (!meta_info && frontmatter) meta_info = frontmatter;

  // Captura: [1] -> type, [2] -> file_name, [3] -> lang
  const regex = /.*\/([\w-]*)\/([\w-]+)\.?(\w{2})?\//gm;
  let m = regex.exec(url);
  if (!m) return false;

  const _cluster = meta_info?.cluster || "post";
  const type = frontmatter ? _cluster : m[1];

  const lang = m[3] || "us";
  const file_name = m[2];
  const slug = meta_info?.slug ? meta_info.slug : file_name;

  let middle = "";
  if (type === "page") {
    middle = "";
  } else {
    middle = slugMap[type] || type;
  }

  const pagePath = middle ? `/${lang}/${middle}/${slug}` : `/${lang}/${slug}`;
  const finalTemplate = meta_info?.template
    ? meta_info.template
    : type === "page"
    ? file_name
    : type;

  return {
    lang,
    slug,
    file_name: `${file_name}.${lang}`,
    template: finalTemplate,
    type,
    url,
    pagePath,
  };
};

const buildTranslations = ({ edges }) => {
  let translations = {};
  edges.forEach(({ node }) => {
    const meta = getMetaFromPath({ url: node.fields.filePath, ...node });
    if (typeof translations[meta.template] === "undefined")
      translations[meta.template] = {};
    translations[meta.template][meta.lang] = meta.pagePath;
  });
  return translations;
};

// Add this new function to define custom fields
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemarkFields implements Node {
      wordCount: Int
      lang: String
      slug: String
      file_name: String
      defaultTemplate: String
      type: String
      pagePath: String
      filePath: String
      readingTime: ReadingTime
    }
    type ReadingTime {
      text: String
    }
    type CourseYaml implements Node {
      meta_info: MetaInfo
    }
    type MetaInfo {
      duration: String
      slug: String
      title: String
      description: String
      template: String
      visibility: String
      redirects: [String]
      related_clusters: [String]
    }
    type PlansYamlFull_time implements Node {
      recomended: String
      recommended_color: String
      scholarship: String
      payment_time: String
      price: String
      original_price: String
      warning_message: String
      offer: String
      bullets: [String]
      icons: [String]
      academies: [String]
      slug: String
    }
    type PlansYamlPart_time implements Node {
      recomended: String
      recommended_color: String
      scholarship: String
      payment_time: String
      price: String
      original_price: String
      warning_message: String
      offer: String
      bullets: [String]
      icons: [String]
      academies: [String]
      slug: String
    }
  `;
  createTypes(typeDefs);
};

// This section was commented during the migration from GatsbyV2 to GatsbyV5
// Now the worker is being loded with the webpack 5 native method
// Package workerize-loader was uninstalled

// exports.onCreateWebpackConfig = ({
//   actions: { replaceWebpackConfig },
//   getConfig,
// }) => {
//   const config = getConfig();

//   config.module.rules.push({
//     test: /\.worker\.js$/,
//     use: { loader: "workerize-loader" },
//   });

//   //This line was commented during the migration from GatsbyV2 to GatsbyV5 because it caused the build product to fail
//   // config.output.globalObject = "this";

//   replaceWebpackConfig(config);
// };
