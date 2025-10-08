import React from "react";
import { graphql, Link } from "gatsby";
import BaseRender from "./_baseLayout";

// components
import Stepper from "../components/Stepper";
import { Div } from "../components/Sections";
import { Header } from "../components/Sections";
import { Button, Colors, Img } from "../components/Styling";
import Iconogram from "../components/Iconogram";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import DoubleActionCTA from "../components/DoubleActionCTA";
import { tagManager } from "../actions";

const ApplicationProcess = ({ data, pageContext, yml }) => {
  const { header, stepper, apply_button } = yml;
  return (
    <>
      <Header
        position="relative"
        margin="3rem 0 0 0"
        padding_tablet="2rem 40px 60px 40px"
        padding_md="2rem 40px 60px 40px"
        padding_l="60px 0 60px 0"
        fontFamily="Archivo-Black"
        seo_title={yml.seo_title}
        title={header.title}
        fontWeight_title="700"
        textAlign_tablet="left"
        paragraphMargin="26px auto 0 auto"
        containerStyle={{ alignItems: "center" }}
        paragraph={
          <>
            {header?.paragraph && (
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#000",
                  lineHeight: "1.5",
                  fontSize: "22px",
                }}
                dangerouslySetInnerHTML={{ __html: header.paragraph }}
              />
            )}
          </>
        }
        svg_image={
          <>
            <GatsbyImage
              image={getImage(
                header.image && header.image.childImageSharp.gatsbyImageData
              )}
              style={{
                height: "100%",
                backgroundSize: `cover`,
              }}
              alt={header.alt}
            />
            <Img
              src="/images/Vector-right-large.png"
              width="66px"
              height="91px"
              style={{
                position: "absolute",
                left: "4.4%",
                top: "4%",
                zIndex: "1",
              }}
            />
            <Img
              src="/images/landing/vector-stroke.png"
              width="62px"
              height="91px"
              style={{
                position: "absolute",
                left: "8%",
                top: "4%",
                zIndex: "1",
              }}
            />
            <Img
              src="/images/landing/vector-stroke2.png"
              width="66px"
              height="91px"
              style={{
                position: "absolute",
                left: "11%",
                top: "4%",
                zIndex: "1",
                transform: "rotate(180deg)",
              }}
            />
            <Img
              src="/images/Group-6594-e.png"
              width="42px"
              height="250px"
              style={{
                position: "absolute",
                zIndex: "1",
                transform: "rotate(90deg)",
              }}
              right_lg="12%"
              right_tablet="12%"
              bottom_tablet="-2%"
              bottom_md="-2%"
              display_xxs="none"
              display_tablet="flex"
            />
          </>
        }
      />

      {stepper && (
        <Div
          className="steps-section"
          display="flex"
          flexDirection="column"
          maxWidth="64rem"
          margin="0 auto"
        >
          <Stepper lang={pageContext.lang} steps={stepper.steps} />
        </Div>
      )}

      <Div
        width="100%"
        maxWidth="64rem"
        margin="0 auto 4rem auto"
        justifyContent="center"
      >
        <Link to={apply_button.path}>
          <Button
            onClick={() => {
              tagManager("application_process_apply_click", {
                button_text: apply_button.text,
                button_path: apply_button.path,
                page_location:
                  typeof window !== "undefined" ? window.location.pathname : "",
              });
            }}
            display="block"
            color="#000"
            background={Colors.white}
            border="3px solid #000"
            borderRadius="8px"
            height="auto"
            padding="18px 2.46rem"
            letterSpacing="0.07em"
            padding_tablet="18px 2.46rem"
            fontSize="22px"
            textTransform="uppercase"
            boxShadow="10px 10px 0px 0px rgba(0,0,0,1)"
          >
            {apply_button.text}
          </Button>
        </Link>
      </Div>

      <Iconogram yml={yml.iconogram} background={Colors.veryLightBlue3} />

      <DoubleActionCTA
        lang={pageContext.lang}
        title={yml.double_action_cta?.title}
        description={yml.double_action_cta?.description}
        primary={yml.double_action_cta?.primary}
        secondary={yml.double_action_cta?.secondary}
        newsletter_form={yml.double_action_cta?.newsletter_form}
      />
    </>
  );
};

export const query = graphql`
  query ApplicationProcessQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
          }
          seo_title
          header {
            title
            paragraph
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 900
                  quality: 100
                  placeholder: NONE
                )
              }
            }
            alt
          }
          apply_button {
            text
            path
          }
          stepper {
            title
            sub_title
            steps {
              title
              description
              sub_items
            }
          }
          iconogram {
            heading {
              text
              style
            }
            sub_heading {
              text
            }
            swipable
            background
            icons {
              icon
              title
              content
              color
              content_style
            }
          }
        }
      }
    }
    allDoubleActionCtaYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          cta {
            title
            description
            primary {
              title
              description
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 900
                    quality: 100
                    placeholder: NONE
                  )
                }
              }
              action_text
              action_url
              benefits
              footer_text
            }
            secondary {
              title
              description
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 900
                    quality: 100
                    placeholder: NONE
                  )
                }
              }
              action_text
              action_url
              benefits
              footer_text
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
`;

export default BaseRender(ApplicationProcess);
