import React from "react";
import PropTypes from "prop-types";
import { Navbar } from "../components/NavbarDesktop";
import { NavbarMobile } from "../components/NavbarMobile";
import Footer from "../components/Footer";
import LandingFooter from "../components/Footer/landing";
import { SessionContext } from "../session";
import "../assets/css/style.css";
import { useStaticQuery, graphql } from "gatsby";
import GlobalStyle from "./GlobalStyle";
import SEO from "./SEO";

const Layout = ({ children, seo, context, landingFooter, landingNavbar }) => {
  const { session } = React.useContext(SessionContext);
  const data = useStaticQuery(graphql`
    query LandingLayoutQuery($lang: String) {
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
            custom_bar {
              active
              message
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

  if (!myNavbar || myNavbar == undefined)
    throw Error("Navbar not found, yml is missing language information?");
  let _btnInfo = myNavbar.node.button;
  if (session && session.location)
    _btnInfo = { ..._btnInfo, ...session.location.button };

  return (
    <>
      <SEO {...seo} context={{ ...context, locations: myLocations }} />
      {landingNavbar === true ? null : (
        <>
          <Navbar
            myLocations={myLocations}
            onLocationChange={(slug) => setLocation(slug)}
            menu={myNavbar.node.navbar}
            languageButton={myNavbar.node.language_button}
            button={myNavbar.node.button}
            lang={context.lang}
          />
          <NavbarMobile
            myLocations={myLocations}
            onLocationChange={(slug) => setLocation(slug)}
            menu={myNavbar.node.navbar}
            languageButton={myNavbar.node.language_button}
            button={myNavbar.node.button}
            lang={context.lang}
          />
        </>
      )}
      <GlobalStyle />
      <>{children}</>

      {landingFooter === true ? (
        <LandingFooter
          contenxt={context}
          yml={myFooter.node}
          session={session}
        />
      ) : (
        <Footer yml={myFooter.node} session={session} />
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seo: PropTypes.object,
};

export default Layout;
