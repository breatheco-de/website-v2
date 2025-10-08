import React, { useEffect } from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session";
import { landingSections } from "../components/Landing";
import { VerticalVideoHolder } from "../components/Styling";
import ReactPlayer from "../components/ReactPlayer";
import { Div, Grid } from "../components/Sections";
import { Paragraph } from "../components/Heading";
import { Img, StyledBackgroundSection, Colors } from "../components/Styling";
import Icon from "../components/Icon";
import { isCustomBarActive } from "../actions";

const GeekPal = (props) => {
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
      {/* Header Section with decorative elements */}
      <Grid
        padding="24px 20px"
        padding_tablet="100px 40px 40px 40px"
        padding_md="100px 80px 40px 80px"
        padding_lg="100px 0px 40px 0px"
        columns_tablet="18"
        margin="70px auto 24px auto"
        maxWidth="1280px"
        position="relative"
        gridTemplateColumns_tablet="repeat(21, 1fr)"
        gridGap="0px"
      >
        {/* Header decorative elements */}
        <Img
          src="/images/Ellipse-7.png"
          width="450px"
          height="300px"
          backgroundSize="contain"
          style={{
            position: "absolute",
            right: "-150px",
            top: "-100px",
          }}
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
            lineHeight="29px"
            fontFamily="Lato-Bold"
            padding_xs="10px 0px"
            textAlign_xs="center"
            textAlign_tablet="left"
            padding_md="30px 0px 10px 0"
            color="black"
            dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
          />

          {/* Vector decorativo para el texto */}
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
          width="100%"
          padding_xs="40px 0 0 0"
          padding_tablet="15% 0 0 0"
          padding_md="0% 16px 0 10%"
          padding_lg="0 15px 0 10%"
          gridColumn_tablet="12 / 22"
          position="relative"
        >
          <Img
            src="/images/Group-6400.png"
            width="193px"
            height="10px"
            style={{
              position: "absolute",
            }}
            left_xs="0"
            bottom_tablet="10%"
            left_md="-40%"
            bottom_md="10%"
            bottom_lg="0%"
          />
          <VerticalVideoHolder>
            {yml.geekPal.map((item, i) => {
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
    </>
  );
};

export const query = graphql`
  query GeekPalQuery($file_name: String!, $lang: String!) {
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
          geekPal {
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
          components {
            name
            position
            layout
            background
            proportions
            video
            icons {
              icon
              title
              color
              content
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
                  layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 200
                  height: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
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

export default BaseRender(GeekPal);
