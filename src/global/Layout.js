import React from "react";
import PropTypes from "prop-types";
import "../assets/css/style.css";
import "../assets/css/utils.css";
import "../assets/css/PhoneInput/flags.css";
import "../assets/css/PhoneInput/index.css";
import { Navbar } from "../components/NavbarDesktop";
import { NavbarMobile } from "../components/NavbarMobile";
import { useStaticQuery, graphql } from "gatsby";
import Footer from "../components/Footer";
import CookieBot from "react-cookiebot";
import CustomBar from "../components/CustomBar";
import PageWrapper from "./PageWrapper";

import GlobalStyle from "./GlobalStyle";
import SEO from "./SEO";
import { Helmet } from "react-helmet";

const Layout = ({ children, seo, context, metaInfo }) => {
  // const {slug, title, description, image, keywords} = seo;
  const [editMode, setEditMode] = React.useState();
  const [showUpcoming, setShowUpcoming] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem("edit-mode") === "true") setEditMode(true);
    if (RegExp("/app?l(?:y|ica)").test(window.location.href)) {
      setShowUpcoming(false);
    }
  }, []);
  const data = useStaticQuery(graphql`
    query SiteTitleQuery($lang: String) {
      allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
        edges {
          node {
            city
            meta_info {
              slug
            }
            fields {
              lang
            }
            button {
              apply_button_text
            }
            country_shortname
            breathecode_location_slug
            custom_bar {
              active
              message
              discounts
              button {
                label
                path
              }
            }
          }
        }
      }
      allFooterYaml {
        edges {
          node {
            newsletter {
              heading
              paragraph
              button_text
              thankyou
              privacy_checkbox_prefix
              privacy_checkbox_link
              privacy_required
              form_errors
            }
            footer {
              heading
              width
              items {
                name
                link
              }
            }
            socials {
              name
              icon
              link
            }
            we_accept
            policy {
              name
              link
            }
            fields {
              lang
            }
          }
        }
      }
      allNavbarYaml {
        edges {
          node {
            navbar {
              name
              link
              sub_menu {
                icon
                title
                link
                paragraph
                width
                links {
                  title
                  level
                  paragraph
                  icon
                  buttons {
                    text
                    link
                  }
                  sub_links {
                    title
                    link_to
                  }
                }
              }
            }
            language_button {
              text
              link
            }
            button {
              apply_button_text
              button_link
              button_type
              button_color_text
              button_background_color
              next_cohort
              other_dates
            }
            fields {
              lang
            }
          }
        }
      }
      cookiebotYaml {
        domain_ID {
          id
        }
      }
      allDoubleActionCtaYaml(filter: { fields: { lang: { eq: $lang } } }) {
        edges {
          node {
            fields {
              lang
            }
            cta {
              title
              description
              primary {
                title
                description
                benefits
                footer_text
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                      width: 800
                      placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    )
                  }
                }
                action_text
                action_url
              }
              secondary {
                title
                description
                benefits
                footer_text
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                      width: 800
                      placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    )
                  }
                }
                action_text
                action_url
              }
              newsletter_form {
                placeholder_email
                error_email
                button_submit
                button_loading
                status_idle
                status_error
                status_correct_errors
                success_message
              }
            }
          }
        }
      }
    }
  `);
  let myFooter = data.allFooterYaml.edges.find(
    (item) => item.node.fields.lang === context.lang
  );
  let myNavbar = data.allNavbarYaml.edges.find(
    (item) => item.node.fields.lang === context.lang
  );
  let myLocations = data.allLocationYaml.edges.filter(
    (item) => item.node.fields.lang === context.lang
  );

  let myDoubleActionCTA = data.allDoubleActionCtaYaml.edges.find(
    (item) => item.node.fields?.lang === context.lang
  );
  return (
    <>
      {editMode && (
        <div style={{ background: "yellow", padding: "15px" }}>
          <span>You are reviewing the website on edit mode</span>
          <button
            style={{
              border: "1px solid black",
              float: "right",
              padding: "5px",
            }}
            onClick={() => {
              localStorage.setItem("edit-mode", "false");
              setEditMode(false);
            }}
          >
            {" "}
            ❌ Clear edit mode
          </button>
        </div>
      )}
      <SEO {...seo} context={{ ...context, locations: myLocations }} />
      <Navbar
        myLocations={myLocations}
        currentURL={context.pagePath}
        onLocationChange={(slug) => setLocation(slug)}
        menu={myNavbar.node.navbar}
        languageButton={myNavbar.node.language_button}
        button={myNavbar.node.button}
        lang={context.lang}
      />
      <NavbarMobile
        myLocations={myLocations}
        currentURL={context.pagePath}
        onLocationChange={(slug) => setLocation(slug)}
        menu={myNavbar.node.navbar}
        languageButton={myNavbar.node.language_button}
        button={myNavbar.node.button}
        lang={context.lang}
      />
      <GlobalStyle />
      {/* Manually inject CookieBot script only if not disabled for this page */}
      {!(context && context.disableCookieBot) && (
        <Helmet>
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js?cbid=0dd80df5-30f5-4a4e-9410-55e586915d04"
            data-cbid="0dd80df5-30f5-4a4e-9410-55e586915d04"
            type="text/javascript"
            async
          />
        </Helmet>
      )}
      <PageWrapper
        pageContext={context}
        doubleActionCTA={myDoubleActionCTA?.node.cta}
        hideGlobalCTA={metaInfo?.hideGlobalCTA || false}
      >
        {children}
      </PageWrapper>
      <Footer yml={myFooter.node} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seo: PropTypes.object,
};

export default Layout;
