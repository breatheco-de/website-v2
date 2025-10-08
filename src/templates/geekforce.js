import React, { useEffect } from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
import { landingSections } from "../components/Landing";

//new components
import Icon from "../components/Icon";
import { Colors, VerticalVideoHolder } from "../components/Styling";
import ReactPlayer from "../components/ReactPlayer";
import { Div, Grid, HR } from "../components/Sections";
import { Paragraph } from "../components/Heading";
import { Img } from "../components/Styling";
import { StyledBackgroundSection } from "../components/Styling";
import ScholarshipSuccessCases from "../components/ScholarshipSuccessCases";

const GeekForce = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  const partnersData = data.allPartnerYaml.edges[0].node;
  const content = data.allPageYaml.edges[0].node;
  const [components, setComponents] = React.useState({});

  const bulletIcons = [
    {
      icon: "elderly-fill",
      background: "#0097CF",
      transform: "rotate(180deg)",
    },
    {
      icon: "square-bracket-fill",
      background: "#000",
    },
    {
      icon: "curly-bracket-fill",
      background: "#FFB718",
    },
  ];

  useEffect(() => {
    let _components = {};
    if (yml.components)
      yml.components.forEach(({ name, ...rest }) => {
        _components[name] = rest;
      });
    setComponents({ ...yml, ..._components });
  }, [yml]);

  return (
    <>
      <Grid
        padding="24px 20px"
        padding_tablet="100px 40px 40px 40px"
        padding_md="100px 80px 40px 80px"
        padding_lg="100px 0px 40px 0px"
        columns_tablet="18"
        margin={"70px auto 24px auto"}
        maxWidth="1280px"
        position="relative"
        gridTemplateColumns_tablet="repeat(21, 1fr)"
        gridGap="0px"
      >
        <Img
          src="/images/Ellipse-7-pink.png"
          width="450px"
          height="300px"
          backgroundSize="contain"
          style={{
            position: "absolute",
            right: "-150px",
            top: "-100px",
          }}
          // display_xs="none"
          // display_tablet="flex"
        />
        <Img
          src="/images/vector-stroke-light.png"
          width="120px"
          height="165px"
          style={{
            position: "absolute",
            left: "48%",
            top: "20%",
          }}
        />
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          gridColumn_tablet="1 / 11"
          position="relative"
        >
          <Paragraph
            fontSize="50px"
            lineHeight="54px"
            //fontFamily="Archivo"
            padding_xs="10px 0"
            padding_md="0px"
            margin="0"
            textAlign_xs="center"
            textAlign_tablet="left"
            color="black"
            fontSize_xs="40px"
            lineHeight_xs="38px"
            fontSize_tablet="50px"
            lineHeight_tablet="54px"
            dangerouslySetInnerHTML={{ __html: yml.header.title }}
          />
          <Paragraph
            fontSize="24px"
            fontFamily="Lato-Bold"
            lineHeight="29px"
            fontWeight="500"
            padding_xs="10px 0px"
            textAlign_xs="center"
            textAlign_tablet="left"
            padding_md="30px 0px 10px 0"
            color="black"
            dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
          />

          {Array.isArray(yml.header.bullets) &&
            yml.header.bullets.map((bullet, index) => (
              <Paragraph
                zIndex="2"
                fontFamily="Lato-Bold"
                key={index}
                fontSize="21px"
                fontWeight="500"
                margin="8px 0"
                padding="0"
                textAlign="left"
                color="black"
              >
                <Icon
                  style={{
                    background:
                      bulletIcons[index % bulletIcons.length].background,
                    padding: "5px",
                    transform:
                      bulletIcons[index % bulletIcons.length]?.transform,
                    fontWeight: "bolder",
                  }}
                  width="20px"
                  height="20px"
                  icon={bulletIcons[index % bulletIcons.length].icon}
                  color="white"
                />
                {" " + bullet}
              </Paragraph>
            ))}
          <Img
            src="/images/vector-stroke-left.png"
            width="89px"
            height="119px"
            backgroundSize="contain"
            style={{
              position: "absolute",
              left: "-62px",
              bottom: "21px",
              zIndex: "-1",
            }}
          />
        </Div>
        <Div
          height="auto"
          width="80%"
          width_tablet="80%"
          width_md="75%"
          width_xs="100%"
          padding_xs="40px 0 0 0"
          padding_tablet="15% 0 0 0"
          padding_md="0% 16px 0 5%"
          padding_lg="0 15px 0 5%"
          gridColumn_tablet="11 / 22"
          position="relative"
          margin="0 auto"
        >
          <Img
            src="/images/Group-6400.png"
            width="193px"
            height="10px"
            style={{
              position: "absolute",
              // bottom: "0px",
            }}
            left_xs="0"
            bottom_tablet="20%"
            left_md="10%"
            bottom_md="10%"
            bottom_lg="0%"
          />
          <VerticalVideoHolder>
            {yml.geekForce.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item.videoId === "" ? (
                    <StyledBackgroundSection
                      height="500px"
                      image={item.image.childImageSharp.gatsbyImageData}
                      bgSize="contain"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      alt="geekforce image"
                    />
                  ) : (
                    <Div
                      width="100%"
                      height="500px"
                      margin="0"
                      overflow="hidden"
                    >
                      <ReactPlayer
                        id={item.videoId}
                        thumb={item.image}
                        margin_tablet="0px"
                        videoHeight="500px"
                        videoHeight_tablet="450px"
                        videoHeight_md="450px"
                        bgSize="contain"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        margin="0"
                      />
                    </Div>
                  )}
                </React.Fragment>
              );
            })}
          </VerticalVideoHolder>
        </Div>
      </Grid>

      {/* Dynamic Components */}
      {Object.keys(components)
        .filter(
          (name) =>
            components[name] &&
            (landingSections[name] || landingSections[components[name].layout])
        )
        .sort((a, b) =>
          components[b].position > components[a].position ? -1 : 1
        )
        .map((name, index) => {
          const layout = components[name].layout || name;
          return landingSections[layout]({
            ...props,
            yml: components[name],
            session,
            course: yml.meta_info?.utm_course,
            location: components.meta_info?.utm_location,
            index: index,
          });
        })}
      {data.allScholarshipSuccessCasesYaml?.edges?.[0]?.node && (
        <ScholarshipSuccessCases
          content={data.allScholarshipSuccessCasesYaml.edges[0].node}
        />
      )}
      <HR
        background={Colors.verylightGray}
        width="70%"
        height="1px"
        margin="20px"
      />
    </>
  );
};
export const query = graphql`
  query GeekForceQuery($file_name: String!, $lang: String!) {
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
            slug
          }
          seo_title
          header {
            title
            paragraph
            bullets
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                )
              }
            }
            image_alt
            image_logo
          }
          geekForce {
            videoId
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                )
              }
            }
          }

          who_is_hiring {
            position
            heading
            sub_heading
            featured {
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
            }
          }

          components {
            name
            position
            layout
            background
            proportions
            icons {
              icon
              content
              color
              title
            }
            image {
              style
              src
              shadow
            }
            heading {
              text
              font_size
              style
            }
            sub_heading {
              text
              font_size
              style
            }
            content {
              text
              font_size
              style
            }
            bullets {
              item_style
              items {
                heading
                text
                icon
                icon_color
              }
            }
            button {
              text
              color
              path
              background
            }
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
          subtitle
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
          testimonials {
            student_name
            testimonial_date
            hidden
            linkedin_url
            linkedin_text
            student_thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: FIXED
                  width: 200
                  height: 200
                  placeholder: NONE
                )
              }
            }
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
            footer_button
            footer_link
          }
        }
      }
    }
  }
`;
export default BaseRender(GeekForce);
