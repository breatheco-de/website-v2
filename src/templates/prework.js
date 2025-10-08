import React, { useContext } from "react";
import { graphql, Link } from "gatsby";
import { H1, H2, Paragraph } from "../components/Heading";
import { Div } from "../components/Sections";
import { Colors, Button } from "../components/Styling";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session";
import SimpleCards from "../components/SimpleCards";
import TwoColumn from "../components/TwoColumn";
import Icon from "../components/Icon";
import WeTrust from "../components/WeTrust";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Prework = (props) => {
  const { session } = useContext(SessionContext);
  const { data, pageContext, yml } = props;
  const image = getImage(
    yml.header?.image && yml.header?.image?.childImageSharp?.gatsbyImageData
  );

  const scheduleYml = yml.how_it_works.schedule;

  const filterByLocation = (dataYml) => {
    const locations = Array.isArray(dataYml?.locations)
      ? dataYml.locations
          .filter((s) => typeof s === "string" && s.trim() !== "")
          .map((s) => s.trim())
      : [];

    const candidates = [
      session?.location?.breathecode_location_slug,
      session?.location?.meta_info?.slug,
      session?.location?.active_campaign_location_slug,
    ].filter((s) => typeof s === "string" && s.length > 0);

    if (candidates.length === 0) return locations.length > 0;

    for (const id of candidates) {
      if (locations.includes(id) || locations.includes("all")) return true;
    }
    return false;
  };

  return (
    <>
      {/* Hero Section */}
      <Div
        maxWidth="1280px"
        display="flex"
        flexDirection="column"
        margin_tablet="11rem auto 6rem auto"
        margin="60px auto"
        flexDirection_tablet="row"
        alignItems="center"
        padding="0 20px"
        gap="60px"
        position="relative"
        zIndex="2"
      >
        <Div flex_tablet="1" flexDirection="column" gap="2rem">
          <Div
            background="rgba(255,255,255,0.2)"
            backdropFilter="blur(10px)"
            padding="0"
            borderRadius="50px"
            border="1px solid rgba(255,255,255,0.3)"
            flexDirection="column"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <H1 type="h1" textAlign="left">
              {yml.seo_title}
            </H1>
            {yml?.header?.title && (
              <H2
                margin="0"
                type="h2"
                fontFamily="Archivo-Black"
                color={Colors.black}
                textAlign="left"
                fontSize="46px"
                fontSize_tablet="50px"
                lineHeight="54px"
                textWrap="balance"
                display="flex"
                flexDirection="column"
              >
                {yml.header.title.split("\n").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </H2>
            )}
          </Div>

          <Paragraph
            fontSize="21px"
            lineHeight="1.35"
            color={Colors.darkGray}
            margin="0"
            maxWidth="650px"
            textAlign="left"
            display="flex"
            flexDirection="column"
            gap="16px"
            dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
          />

          {yml.cta.primary_button && (
            <Link to={yml.cta.primary_button.link}>
              <Button
                color={Colors.white}
                background={Colors.black}
                height="42px"
                fontSize="20px"
                borderRadius="3px"
              >
                {yml.cta.primary_button.text}
              </Button>
            </Link>
          )}
        </Div>

        <Div
          flex_tablet="1"
          display="none"
          display_tablet="block"
          position="relative"
        >
          <Div position="relative" overflow="hidden" maxWidth="85rem">
            <GatsbyImage image={image} alt={yml.header.alt} />
          </Div>
        </Div>
      </Div>

      {/* What You'll Learn Section */}
      {yml.what_you_will_learn && (
        <Div
          background={Colors.verylightGray}
          padding="clamp(3rem, 10vw, 4rem) 0"
          flexDirection="column"
          alignItems="center"
        >
          <Div
            width="100%"
            maxWidth="1280px"
            flexDirection="column"
            margin="0 auto"
          >
            <SimpleCards
              heading={{
                text: yml.what_you_will_learn.title,
                as: "h2",
                style: {
                  fontSize: "40px",
                  fontFamily: "Lato",
                  width: "100%",
                  margin: "0 auto 30px auto",
                },
              }}
              sub_heading={{
                text: yml.what_you_will_learn.paragraph,
                style: { textAlign: "center", fontSize: "25px" },
              }}
              cards={yml.what_you_will_learn.bullets.map((bullet, index) => ({
                content: bullet.text,
                icon: "check-circle",
              }))}
              cardStyle={{
                background: Colors.white,
                borderRadius: "12px",
                width: "100%",
                width_tablet: "20rem",
                height: "auto",
                border: `1px solid ${Colors.borderGray}`,
                flexDirection: "row",
                gap: "10px",
                textAlign: "left",
                alignItems: "center",
              }}
              cardContainerStyle={{
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              containerStyle={{
                flexDirection_tablet: "column",
              }}
            />
          </Div>
        </Div>
      )}

      {/* How It Works Section */}
      {yml.how_it_works && (
        <Div padding="5rem 20px" flexDirection="column" alignItems="center">
          <TwoColumn
            width="100%"
            maxWidth="1280px"
            containerStyle={{
              padding_tablet: "20px 0 0",
              padding_md: "20px 0 0",
            }}
            left={{
              image: yml.how_it_works.image,
              alt: "How it works",
              gap: "1.5rem",
              gap_tablet: "2rem",
            }}
            right={{
              heading: {
                text: yml.how_it_works.title,
                as: "h2",
                style: { fontSize: "40px" },
              },
              content: {
                text: yml.how_it_works.content,
                style: {
                  margin: "0 auto",
                  fontSize: "21px",
                  letterSpacing: "0.05em",
                  margin_tablet: "0 0 0 30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                },
              },
            }}
          />
          {scheduleYml && filterByLocation(scheduleYml) && (
            <Div
              margin="0rem 0 0 0"
              width="100%"
              maxWidth="1280px"
              justifyContent="center"
            >
              <SimpleCards
                containerStyle={{
                  flexDirection_tablet: "column",
                  width: "100%",
                  padding_md: "3.5rem 0 0 0",
                  padding_tablet: "3.5rem 0 0 0",
                }}
                heading={{
                  text: scheduleYml.title,
                  as: "h2",
                  style: {
                    fontSize: "40px",
                    width: "100%",
                    margin: "0 auto 1.5rem auto",
                  },
                }}
                cards={scheduleYml.classes.map((classItem) => ({
                  icon: classItem.icon,
                  content: classItem.program,
                  text: classItem.schedule,
                  iconWidth: "80px",
                }))}
                background={Colors.white}
                headingProps={{ color: Colors.white }}
                cardContainerStyle={{
                  gap: "2rem",
                  padding_tablet: "0 10px 20px 0",
                  width: "100%",
                }}
                cardStyle={{
                  alignItems: "center",
                  width: "100%",
                  width_tablet: "100%",
                  border: "1px solid",
                  boxShadow: "9px 8px 0px 0px rgba(0,0,0,1)",
                }}
              />
            </Div>
          )}
        </Div>
      )}

      {/* Why Prework Matters Section */}
      {yml.why_prework_matters && (
        <WeTrust
          boxTitleProps={{
            fontSize: "25px",
            fontSize_tablet: "35px",
          }}
          we_trust={{
            ...yml.why_prework_matters,
            bg_full: true,
          }}
          background={Colors.veryLightBlue3}
        />
      )}

      {/* CTA Section */}
      {yml.cta && (
        <Div
          background={Colors.white}
          margin="0"
          padding="clamp(3rem,10vw,8rem) 20px"
          flexDirection="column"
          alignItems="center"
        >
          <Div
            textAlign="center"
            maxWidth="800px"
            margin="0 auto"
            flexDirection="column"
            alignItems="center"
          >
            <H2 fontSize="2.5rem" color={Colors.black} margin="0 0 1rem 0">
              {yml.cta.title}
            </H2>
            <Paragraph
              fontSize="1.25rem"
              color={Colors.darkGray}
              margin="0 0 2rem 0"
            >
              {yml.cta.subtitle}
            </Paragraph>
            <Div
              display="flex"
              flexDirection_tablet="row"
              flexDirection="column"
              gap="1rem"
              justifyContent="center"
            >
              {yml.cta.primary_button && (
                <Link to={yml.cta.primary_button.link}>
                  <Button
                    color={Colors.white}
                    background={Colors.black}
                    height="42px"
                    fontSize="20px"
                    borderRadius="3px"
                    justifyContent="center"
                    width="100%"
                  >
                    {yml.cta.primary_button.text}
                  </Button>
                </Link>
              )}
              {yml.cta.secondary_button && (
                <Link to={yml.cta.secondary_button.link}>
                  <Button
                    color={Colors.black}
                    variant="outline"
                    borderColor={Colors.black}
                    colorHover="transparent"
                    colorHoverText="black"
                    height="42px"
                    fontSize="20px"
                    borderRadius="3px"
                  >
                    {yml.cta.secondary_button.text}
                  </Button>
                </Link>
              )}
            </Div>
          </Div>
        </Div>
      )}
    </>
  );
};
export const query = graphql`
  query PreworkQuery($file_name: String!, $lang: String!) {
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
            tagline
            button
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
            alt
            sub_heading
          }
          what_you_will_learn {
            title
            paragraph
            bullets {
              text
            }
          }
          how_it_works {
            title
            content
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1100
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            schedule {
              title
              locations
              classes {
                program
                schedule
                icon
              }
            }
          }
          why_prework_matters {
            title
            text
            boxes {
              title
              text
              icon
              color
            }
          }
          cta {
            title
            subtitle
            primary_button {
              text
              link
            }
            secondary_button {
              text
              link
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(Prework);
