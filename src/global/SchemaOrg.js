import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

const SchemaOrg = ({
  author,
  canonicalUrl,
  datePublished,
  description,
  image,
  type,
  organization,
  title,
  url,
  seoTitle,
  context,
  wordCount = 0,
}) => {
  const dataQuery = useStaticQuery(graphql`
    {
      allFaqYaml {
        edges {
          node {
            faq {
              topic
              questions {
                locations
                question
                answer
              }
            }
            fields {
              lang
            }
          }
        }
      }
      allCourseYaml {
        edges {
          node {
            meta_info {
              title
              description
              slug
              duration
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const faqs =
    dataQuery.allFaqYaml.edges
      .find(({ node }) => node.fields.lang === context.lang)
      ?.node.faq.flatMap((elem) => elem.questions) || [];

  const courses = dataQuery.allCourseYaml.edges
    .filter(({ node }) => node.fields.lang === context.lang)
    .map(({ node }) => ({
      "@type": "Course",
      name: node.meta_info.title,
      description: node.meta_info.description,
      url: `https://4geeksacademy.com/${context.lang}/coding-bootcamps/${node.meta_info.slug}`,
      timeRequired: node.meta_info.duration || "P16W",
      provider: {
        "@type": "EducationalOrganization",
        name: "4Geeks Academy",
        sameAs: "https://4geeksacademy.com/",
      },
      "@context": {
        jobGuarantee: "https://4geeksacademy.com/schema#jobGuarantee",
      },
      jobGuarantee: true,
    }));

  const campusLocation = context.locations.find(
    ({ node }) => node.meta_info.slug === context.slug
  )?.node;
  const faqsFilteredByLocation = faqs.filter((faq) =>
    faq.locations?.includes(campusLocation?.breathecode_location_slug)
  );

  const baseSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url,
      name: title,
    },
  ];

  const educationalOrganizationSchema = {
    "@context": {
      "@vocab": "https://schema.org/",
      jobGuarantee: "https://4geeksacademy.com/schema#jobGuarantee",
    },
    "@type": "EducationalOrganization",
    name: "4Geeks Academy",
    description:
      "4Geeks Academy is a coding bootcamp that offers comprehensive programming education with a focus on practical skills and job placement.",
    url: "https://4geeksacademy.com",
    logo: "https://storage.googleapis.com/media-breathecode/b25a096eb14565c0c5e75d72442f888c17ac06fcfec7282747bf6c87baaf559c",
    sameAs: [
      "https://twitter.com/4GeeksAcademy",
      "https://www.instagram.com/4geeksacademy/",
      "https://www.facebook.com/4geeksacademy",
      "https://4geeksacademy.com/",
      "https://www.youtube.com/@4GeeksAcademy",
      "https://4geeksacademy.com/us/job-guarantee",
    ],
    jobGuarantee: true,
  };

  const page = [...baseSchema];
  const location = [
    ...baseSchema,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqsFilteredByLocation.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
  const blog = [
    ...baseSchema,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": url,
            name: title,
            image,
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      url,
      name: title,
      headline: title,
      image: {
        "@type": "ImageObject",
        url: image,
      },
      description,
      author: {
        "@type": "Person",
        name: author,
      },
      publisher: {
        "@type": "Organization",
        url: organization.url,
        logo: organization.logo,
        name: organization.name,
      },
      mainEntityOfPage: {
        "@type": "WebSite",
        "@id": canonicalUrl,
      },
      datePublished,
      wordCount,
    },
  ];

  const faqSchema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  const schemaType = {
    page,
    location,
    landing: page,
    course: [
      ...baseSchema,
      {
        "@context": {
          "@vocab": "https://schema.org/",
          jobGuarantee: "https://4geeksacademy.com/schema#jobGuarantee",
        },
        "@type": "Course",
        name: seoTitle,
        description,
        provider: {
          "@type": "EducationalOrganization",
          name: "4Geeks Academy",
          sameAs: "https://4geeksacademy.com/",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://4geeksacademy.com/${context.lang}/coding-bootcamps/${context.slug}`,
        },
        timeRequired:
          context?.meta_info?.duration || context?.duration || "P16W",
        jobGuarantee: true,
        url: `https://4geeksacademy.com/${context.lang}/coding-bootcamps/${context.slug}`,
        image: {
          "@type": "ImageObject",
          url: image || "https://4geeksacademy.com/path/to/default-image.jpg", // Fallback
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (faqsFilteredByLocation.length > 0
          ? faqsFilteredByLocation
          : faqs
        ).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <Helmet>
      {/* Schema.org tags */}
      {type in schemaType && (
        <script type="application/ld+json">
          {JSON.stringify(schemaType[type])}
        </script>
      )}
      {(type === "post" || context.defaultTemplate === "landing_post") && (
        <script type="application/ld+json">{JSON.stringify(blog)}</script>
      )}
      {context.defaultTemplate === "faq" && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};

SchemaOrg.defaultProps = {
  title: null,
  description: null,
  image: null,
  twitterUsername: null,
  pathname: null,
  article: false,
  author: "",
};

export default React.memo(SchemaOrg);
