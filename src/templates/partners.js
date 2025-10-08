import React, { useState, useRef } from "react";
import { graphql } from "gatsby";
import { GridContainer, Header, Div, Grid } from "../components/Sections";
import { H2, H3, H4, Paragraph } from "../components/Heading";
import { Button, Colors } from "../components/Styling";
import OurPartners from "../components/OurPartners";
import Icon from "../components/Icon";
import BaseRender from "./_baseLayout";
import { beHiringPartner } from "../actions";
import LeadForm from "../components/LeadForm/index.js";
import PartnersCarousel from "../components/PartnersCarousel";
import BenefitsAndCharts from "../components/BenefitsAndCharts";
import WorkTogether from "../components/WorkTogether";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import TwoColumn from "../components/TwoColumn/index.js";
import ScholarshipProjects from "../components/ScholarshipProjects/index.js";

const Partners = (props) => {
  const { data, pageContext, yml } = props;
  const [open, setOpen] = useState(false);
  const joinPartnersRef = useRef(null);

  const goToForm = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: joinPartnersRef.current?.offsetTop - 200,
      behavior: "smooth",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const partnersData = data.allPartnerYaml.edges[0].node;

  const ButtonPartner = () => (
    <Div
      flexDirection_tablet="row"
      flexDirection="column"
      justifyContent="left"
      alignItems="center"
    >
      <Button
        onClick={goToForm}
        variant="full"
        color={Colors.blue}
        margin="0 auto"
        margin_tablet="10px 24px 10px 0"
        textColor="white"
        borderRadius="4px"
      >
        {yml.button_section.button_text}
      </Button>
    </Div>
  );
  return (
    <>
      <GridContainer
        margin="20px auto 0 auto"
        margin_tablet="auto"
        padding_tablet="0"
        padding_md="10rem 0 4rem"
        containerColumns_tablet="1fr repeat(12,1fr) 1fr"
        columns_tablet="2"
        maxWidth="1280px"
        gridColumn_tablet="1 / span 14"
      >
        <Header
          hideArrowKey
          textAlign_tablet="left"
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          fontSize_paragraph="21px"
          padding_tablet="60px 40px"
          padding="0 10px"
          margin="0"
          paddingTitle="0"
          paddingParagraph="0"
          position="relative"
        >
          <ButtonPartner />
        </Header>

        <Div width="100%" height="100%">
          <GatsbyImage
            style={{
              height: "390px",
              minWidth: "150px",
              width: "auto",
              margin: "0 20px",
            }}
            imgStyle={{
              objectFit: "contain",
              WebkitUserDrag: "none",
            }}
            alt={yml.header.image_alt}
            image={getImage(yml.header.image.childImageSharp.gatsbyImageData)}
          />
        </Div>
      </GridContainer>
      <WorkTogether
        title={partnersData.work_together.title}
        description={partnersData.work_together.description}
        imageList={partnersData.work_together.image_list}
        features={partnersData.work_together.features}
        showImages={false}
        showDescription={true}
      />
      <PartnersCarousel data={partnersData.partners_carousel} />

      <BenefitsAndCharts data={partnersData} goToForm={goToForm} />

      {/* <OurPartners
        marquee
        padding="30px 0 75px 0px"
        images={partnersData.partners.images}
        title={partnersData.partners.tagline}
        paragraph={partnersData.partners.sub_heading}
        showFeatured
        props={partnersData.partners}
      /> */}

      <ScholarshipProjects
        content={{
          ...data.allScholarshipProjectsYaml.edges[0].node,
          title: partnersData.partnership_in_action.tagline,
          description: partnersData.partnership_in_action.sub_heading,
        }}
        lang={pageContext.lang}
      />

      <Div flexDirection="column" background={Colors.verylightGray}>
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding_tablet="4em"
          padding="4em 2em"
          margin_tablet="0 0 0 0"
          margin="0 0 0 0"
        >
          <H3
            type="h3"
            fontSize="20px"
            lineHeight="19px"
            letterSpacing="0.05em"
            width="100%"
            margin="0 0 15px 0"
            textTransform="uppercase"
            style={{ fontStyle: "normal" }}
          >
            {partnersData.coding.tagline}
          </H3>
          <Paragraph
            padding="0 10px"
            padding_tablet="0 24%"
            letterSpacing="0.05em"
            width="100%"
            margin="0 0 15px 0"
            style={{ fontStyle: "normal" }}
          >
            {partnersData.coding.sub_heading}
          </Paragraph>
        </Div>
        <OurPartners
          marquee
          duration="45"
          padding="0 0 4em 0"
          margin="0"
          images={partnersData.coding.images}
          // showFeatured
          props={partnersData.coding}
        />
      </Div>

      <OurPartners
        margin="4.5rem auto 80px auto"
        borderBottom={`5px solid ${Colors.verylightGray}`}
        padding="0"
        maxWidth="1280px"
        images={partnersData.financials.images.filter(
          (i) => i.featured === false
        )}
        featuredImages={partnersData.financials.images.filter(
          (i) => i.featured
        )}
        withoutLine
        title={partnersData.financials.tagline}
        paragraph={partnersData.financials.sub_heading}
        props={partnersData.financials}
        showFeatured
      />

      <GridContainer
        columns_tablet="12"
        padding="0 17px 40px 17px"
        padding_tablet="0"
        margin_tablet="0 auto 81px auto"
        gridColumn_tablet="1 / span 14"
        maxWidth="1280px"
        id="partner-form"
      >
        <Div
          ref={joinPartnersRef}
          gridColumn_tablet="1 / 7"
          flexDirection="column"
        >
          <H2 textAlign_md="left" margin="0 0 30px 0">
            {yml.form.title}
          </H2>
          {yml.form.paragraph.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              margin="7px 0"
              textAlign_md="left"
              dangerouslySetInnerHTML={{ __html: m }}
            />
          ))}
        </Div>
        <Div flexDirection="column" gridColumn_tablet="7 / 13">
          <LeadForm
            formHandler={beHiringPartner}
            handleClose={handleClose}
            enableAreaCodes={false}
            lang={pageContext.lang}
            inputBgColor={Colors.white}
            fields={["full_name", "email", "phone", "client_comments"]}
          />
        </Div>
      </GridContainer>
    </>
  );
};
export const query = graphql`
  query PartnersQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            slug
            title
            description
            image
            keywords
          }
          seo_title
          header {
            title
            htmlTitle
            paragraph
            image_alt
            button
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
          }
          form {
            title
            paragraph
          }
          footer_data {
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1600
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          button_section {
            button_text
            button_link
          }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          credentials {
            title
            icon
            value
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partnership_in_action {
            tagline
            sub_heading
          }
          partners {
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
              link
            }
            tagline
            sub_heading
            footer_button
            footer_link
          }
          coding {
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
            tagline
            sub_heading
          }
          influencers {
            images {
              name
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
            tagline
            sub_heading
          }
          financials {
            tagline
            sub_heading
            images {
              name
              featured
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }

          work_together {
            title
            description
            image_list {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
            features {
              title
              icon
              description
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
          partners_in_education {
            title
            description
            image_list {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }
          partners_carousel {
            title
            see_full
            partners {
              fist_name
              last_name
              sub_header
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              paragraph
              linkedin
              pdf
            }
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
  }
`;
export default BaseRender(Partners);
