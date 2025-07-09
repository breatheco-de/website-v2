/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");

// Basic schema that will be injected at the start of head
const baseSchema = {
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

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="schema-org-base"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseSchema),
      }}
    />,
  ]);
};
