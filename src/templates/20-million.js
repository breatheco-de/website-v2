import React, { useEffect, useState, useRef } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { isCustomBarActive } from "../actions";
import BaseRender from "./_baseLayout";
import { Div, HR, GridContainer } from "../components/Sections";
import { H2, Paragraph, SubTitle } from "../components/Heading";
import { Button, Colors } from "../components/Styling";
import { beHiringPartner } from "../actions";
import { SessionContext } from "../session";
import LeadForm from "../components/LeadForm";
import { Circle } from "../components/BackgroundDrawing";
import Testimonials from "../components/Testimonials";
import OurPartners from "../components/OurPartners";
import ScholarshipProjects from "../components/ScholarshipProjects";
import ScholarshipSuccessCases from "../components/ScholarshipSuccessCases";
import BenefitsAndCharts from "../components/BenefitsAndCharts";
import TwoColumn from "../components/TwoColumn/index.js";

const TwentyMillion = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const partnersData = data.allPartnerYaml.edges[0].node;

  const [applyButtonText, setApplyButtonText] = useState("");
  const joinPartnersRef = useRef(null);
  const goToForm = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: joinPartnersRef.current?.offsetTop - 200,
      behavior: "smooth",
    });
  };

  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(
    (loc) => loc.node?.city === city
  );

  useEffect(() => {
    if (currentLocation !== undefined) {
      setApplyButtonText(currentLocation.node.button.apply_button_text);
    }
  }, [currentLocation]);

  const ymlTwoColumn = yml?.two_column_left;

  return (
    <>
      <Div
        margin={
          isCustomBarActive(session)
            ? "138px auto 30px auto"
            : "72px auto 30px auto"
        }
        margin_md={
          isCustomBarActive(session)
            ? "120px auto 30px auto"
            : "72px auto 30px auto"
        }
        padding="90px 20px 42px 20px"
        padding_tablet="72px 130px 72px 130px"
        position="relative"
        background={Colors.veryLightBlue2}
        display="block"
      >
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="87px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="172px"
          left="74px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="17px"
          height="17px"
          top="216px"
          left="74px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="298px"
          left="74px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="106px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="145px"
          left="106px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="182px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="246px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="30px"
          height="30px"
          top="120px"
          right="83px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="170px"
          right="50px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="170px"
          right="89px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="170px"
          right="128px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="10px"
          right="320px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="32px"
          right="61px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="15px"
          height="15px"
          top="92px"
          left="9px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="white"
          width="15px"
          height="15px"
          top="130px"
          left="10px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="darkGray"
          width="15px"
          height="15px"
          top="195px"
          left="5px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Div display="block">
          <H2
            type="h2"
            color={Colors.black}
            textAlign="center"
            textAlign_tablet="center"
            fontSize="40px"
            fontSize_tablet="50px"
            lineHeight="38px"
            lineHeight_tablet="60px"
            margin_tablet="40px 0 40px 0"
          >
            {yml.header.title}
          </H2>
          <SubTitle
            color={Colors.black}
            margin="20px 0"
            padding="0"
            width="auto"
            letterSpacing="0.05em"
            textAlign="center"
            textAlign_tablet="center"
          >
            {yml.header.paragraph}
          </SubTitle>
          <Div
            flexDirection_tablet="row"
            flexDirection="column"
            justifyContent="start"
            justifyContent_tablet="center"
            alignItems="center"
            margin_tablet="0 0 50px 0"
          >
            <Div width="100%" width_tablet="fit-content">
              <Link to={yml.button.apply_button_link} style={{ width: "100%" }}>
                <Button
                  variant="full"
                  justifyContent="center"
                  width="100%"
                  width_tablet="fit-content"
                  color={Colors.black}
                  margin_tablet="10px 24px 10px 0"
                  textColor="white"
                >
                  {applyButtonText}
                </Button>
              </Link>
            </Div>
            <Div width="100%" width_tablet="fit-content">
              <Link to="#fake_bottom" style={{ width: "100%" }}>
                <Button
                  display="block"
                  width="100%"
                  width_tablet="fit-content"
                  variant="outline"
                  color={Colors.black}
                  margin="10px 0 50px 0"
                  margin_tablet="0"
                  textColor={Colors.black}
                  textAlign="center"
                >
                  {yml.button.btn_label}
                </Button>
              </Link>
            </Div>
          </Div>
        </Div>
      </Div>
      <OurPartners margin="0" images={partnersData.partners.images} marquee />
      <ScholarshipProjects
        content={data.allScholarshipProjectsYaml.edges[0].node}
        lang={pageContext.lang}
      />
      <ScholarshipSuccessCases
        content={data.allScholarshipSuccessCasesYaml.edges[0].node}
      />
      <BenefitsAndCharts data={partnersData} goToForm={goToForm} />

      <Div
        id="two_column_left"
        flexDirection="column"
        margin="0 auto"
        maxWidth="1280px"
      >
        <TwoColumn
          left={{ image: ymlTwoColumn.image }}
          right={{
            heading: ymlTwoColumn.heading,
            sub_heading: ymlTwoColumn.sub_heading,
            bullets: ymlTwoColumn.bullets,
            content: ymlTwoColumn.content,
            button: ymlTwoColumn.button,
            padding_tablet: "20px",
            gap_tablet: "40px",
          }}
          proportions={ymlTwoColumn.proportions}
          session={session}
        />
      </Div>

      <Testimonials
        categories={["scolarships", "price", "outcomes"]}
        lang={data.allTestimonialsYaml.edges}
        margin_tablet="75px 0 0 0"
        margin="45px 0 0 0"
      />

      <HR
        background={Colors.verylightGray}
        width="100%"
        height="5px"
        margin="40px 0"
        id="fake_bottom"
      />

      <GridContainer
        columns_tablet="12"
        containerColumns_tablet="none"
        padding="30px 20px"
        padding_tablet="40px 40px"
        padding_md="60px 80px"
        padding_lg="80px 0"
        margin_tablet="0 auto 81px auto"
        style={{ maxWidth: "1280px" }}
        containerGridGap="0px"
      >
        <Div
          ref={joinPartnersRef}
          gridColumn_tablet="1 / 7"
          flexDirection="column"
        >
          <H2 textAlign_tablet="start" margin="0 0 30px 0">
            {yml.form.title}
          </H2>
          {yml.form.paragraph.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              margin="7px 0"
              textAlign_tablet="start"
              dangerouslySetInnerHTML={{ __html: m }}
            />
          ))}
        </Div>
        <Div flexDirection="column" gridColumn_tablet="7 / 13" id="bottom">
          <LeadForm
            formHandler={beHiringPartner}
            // handleClose={handleClose}
            enableAreaCodes={false}
            lang={pageContext.lang}
            inputBgColor={Colors.white}
            fields={["full_name", "email", "phone"]}
          />
        </Div>
      </GridContainer>
    </>
  );
};

export const query = graphql`
  query TwentyMillionQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          header {
            title
            paragraph
          }
          button {
            btn_label
            apply_button_link
          }
          two_column_left {
            proportions
            image {
              style
              src
            }
            heading {
              text
              font_size
            }
            sub_heading {
              text
              font_size
            }
            content {
              text
              font_size
            }
            button {
              text
              color
              background
              hover_color
              path
            }
          }
          form {
            title
            paragraph
          }
        }
      }
    }
    allScholarshipProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          description
          project_name
          project_details
          total_cost
          geeks_benefited
          institutions
          press
          see_project
          projects {
            name
            image {
              alt
              src {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 700
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    breakpoints: [200, 340, 520, 890]
                  )
                }
              }
            }
            description
            details {
              cost
              geeks_benefited
            }
            institutions {
              name
              logo {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 700
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    breakpoints: [200, 340, 520, 890]
                  )
                }
              }
            }
            press {
              name
              link
            }
            pdf
          }
          fields {
            lang
          }
        }
      }
    }
    allScholarshipSuccessCasesYaml(
      filter: { fields: { lang: { eq: $lang } } }
    ) {
      edges {
        node {
          title
          contributor
          cases {
            name
            img {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 700
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
            status
            country {
              iso
              name
            }
            contributor
            description
            achievement
          }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          heading
          button_text
          button_link
          testimonials {
            student_name
            related_features
            testimonial_date
            include_in_marquee
            hidden
            linkedin_url
            linkedin_text
            linkedin_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 14
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            student_thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            short_content
            content
            source_url
            source_url_text
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partners {
            tagline
            sub_heading
            footer_tagline
            footer_button
            footer_link
            images {
              name
              link
              follow
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
          }
          benefits_and_charts {
            title
            description
            bullets
            button_section {
              button_text
              button_link
            }
            charts {
              title
              list {
                description
                icon
              }
            }
          }
        }
      }
    }
    allLocationYaml(
      filter: {
        fields: { lang: { eq: $lang } }
        meta_info: { visibility: { nin: ["hidden", "unlisted"] } }
      }
    ) {
      edges {
        node {
          id
          city
          country
          name
          active_campaign_location_slug
          breathecode_location_slug
          fields {
            lang
            file_name
          }
          button {
            apply_button_text
          }
          meta_info {
            slug
            description
            image
            position
            visibility
            keywords
            redirects
          }
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(TwentyMillion);
