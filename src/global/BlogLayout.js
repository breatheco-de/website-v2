import React from "react";
import PropTypes from "prop-types";
import "../assets/css/style.css";
import "../assets/css/utils.css";
import { Navbar } from "../components/NavbarDesktop";
import { NavbarMobile } from "../components/NavbarMobile";
import { useStaticQuery, graphql } from "gatsby";
import Footer from "../components/Footer";

import GlobalStyle from "./GlobalStyle";
import SEO from "./SEO";

const BlogLayout = ({ children, seo, context, wordCount }) => {
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
    query SiteTitleBlogQuery($lang: String) {
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
      allCustomBarYaml {
        edges {
          node {
            bar_content {
              heading
              link_to
              button_text
              sub_heading
            }
            fields {
              lang
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
    }
  `);
  let myFooter = data.allFooterYaml.edges.find(
    (item) => item.node.fields.lang === context.lang
  );
  let myNavbar = data.allNavbarYaml.edges.find(
    (item) => item.node.fields.lang === context.lang
  );
  let myCustomBar = data.allCustomBarYaml.edges.find(
    (item) => item.node.fields.lang === context.lang
  );
  let myLocations = data.allLocationYaml.edges.filter(
    (item) => item.node.fields.lang === context.lang
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
      <SEO
        {...seo}
        context={{ ...context, locations: myLocations }}
        wordCount={wordCount}
      />
      {myNavbar && (
        <>
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
        </>
      )}
      <GlobalStyle />
      <>{children}</>
      {myFooter && <Footer yml={myFooter.node} />}
    </>
  );
};

BlogLayout.propTypes = {
  children: PropTypes.node.isRequired,
  seo: PropTypes.object,
};

export default BlogLayout;
