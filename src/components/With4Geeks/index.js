import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { H2, H4, H3, Paragraph, SubTitle } from "../Heading";
import { Div } from "../Sections";
import { RoundImage, Colors } from "../Styling";
import ReactPlayer from "../ReactPlayer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const With4Geeks = ({
  lang,
  title,
  subtitle,
  stories,
  paragraph,
  sessionLocation,
  background,
  headerProps,
}) => {
  const data = useStaticQuery(graphql`
    query With4Geeks {
      allWith4GeeksYaml {
        edges {
          node {
            fields {
              lang
            }
            header {
              title
              paragraph
            }
            with {
              name
              title
              open_in_modal
              description
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
              icon
              video
              video_height
              location
              footer {
                is_image
                image
                image_link
                text
                text_link
              }
            }
          }
        }
      }
    }
  `);
  let info = data.allWith4GeeksYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (info) info = info.node;

  let locationFiltered;

  if (sessionLocation)
    locationFiltered = info.with.filter(
      (n) =>
        n.location === "all" ||
        n.location.includes("all") ||
        !sessionLocation ||
        n.location.includes(sessionLocation)
    );
  else locationFiltered = stories || info.with;

  return (
    <Div display="block" background={background} padding="40px 0">
      {(info?.header || title) && (
        <Div
          maxWidth="1280px"
          display="block"
          margin="0 auto"
          padding="0 20px 32px 20px"
          padding_tablet="0 40px 32px 40px"
          width="100%"
          {...headerProps}
        >
          <H2 margin_tablet="0 0 15px 0" margin_xs="0px" textAlign="center">
            {title || info?.header?.title}
          </H2>
          {subtitle && (
            <Paragraph
              textAlign="center"
              color={Colors.darkGray}
              fontSize="16px"
              fontSize_tablet="18px"
              fontSize_md="20px"
              margin="16px auto 0 auto"
              margin_tablet="16px auto 0 auto"
              margin_md="16px auto 0 auto"
              lineHeight="1.4"
              lineHeight_tablet="1.5"
              width="100%"
              maxWidth="100%"
            >
              {subtitle}
            </Paragraph>
          )}
        </Div>
      )}
      {locationFiltered && (
        <Div
          padding="0 20px"
          padding_tablet="0 40px"
          padding_lg="0"
          margin_tablet="0 auto"
          maxWidth="1280px"
          width="100%"
          className="badge-slider hideOverflowX__"
          gap="0px 20px"
          gap_tablet="0px 20px"
        >
          {locationFiltered.slice(0, 3).map((element, index) => {
            return (
              <Div
                key={`${element.name}_${index}`}
                display="flex"
                flexDirection="column"
                flexDirection_tablet="column"
                justifyContent="start"
                borderRadius="4px"
                minWidth="250px"
                width="100%"
                border={!background && "1px solid #C4C4C4"}
                background={Colors.white}
              >
                <Div
                  padding_xs="0 0 0 0px"
                  //padding="20px 0"
                  width_tablet="100%"
                  height_tablet={element.video_height || "173px"}
                  height={element.video_height || "173px"}
                  alignSelf="baseline"
                  style={{ borderRadius: `0px` }}
                >
                  {element.video && element.image && (
                    <ReactPlayer
                      withModal={element.open_in_modal}
                      margin_tablet="0px"
                      imageWidth="100%"
                      imageHeight={element.video_height || "auto"}
                      //height="100%"
                      className="react-player-with4geeks"
                      thumb={element.image}
                      id={element.video}
                      width="100%"
                      width_tablet="100%"
                      videoHeight={element.video_height}
                      style={{ borderRadius: "0px" }}
                    />
                  )}
                  {!element.video && element.image && (
                    <GatsbyImage
                      //className={className}
                      height="173px"
                      image={getImage(
                        element?.image?.childImageSharp?.gatsbyImageData
                      )}
                      alt="Image"
                    />
                  )}
                </Div>
                <Div
                  //marginTop="20px"
                  style={{ padding: "20px 32px" }}
                  padding_tablet="20px 32px"
                  padding_xxs="20px 16px"
                  display="flex"
                  //height="100%"
                  height={stories ? "fit-content" : "100%"}
                  flexDirection="column"
                  gap="16px 0px"
                >
                  {element.footer.image_link && (
                    <Link to={element.footer.image_link}>
                      <RoundImage
                        url={element.footer.image}
                        bsize="contain"
                        height="20px"
                        position="left"
                      />
                    </Link>
                  )}

                  {element.name && (
                    <H4
                      textAlign="left"
                      width="100%"
                      margin="0 0 10px 0"
                      uppercase
                      fontSize="15px"
                      fontWeight="900"
                      lineHeight="19px"
                      color={Colors.darkGray}
                    >
                      {element.name}
                    </H4>
                  )}
                  {element.title && (
                    <H3
                      textAlign="left"
                      width="100%"
                      fontWeight="400"
                      fontFamily="Archivo"
                      margin="0"
                    >
                      {`"${element.title}"`}
                    </H3>
                  )}
                  {element.description && (
                    <Paragraph
                      color={Colors.darkGray}
                      textAlign="left"
                      margin="10px 0 10px 0"
                      fontWeight="400"
                      fontSize="14px"
                      lineHeight="15px"
                    >
                      {element.description}
                    </Paragraph>
                  )}

                  {element.footer.text_link != "" && (
                    <Link to={element.footer.text_link}>
                      <H4
                        display="flex"
                        fontWeigth="700"
                        color={Colors.blue}
                        // textDecoration="underline"
                      >
                        {element.footer.text}
                      </H4>
                    </Link>
                  )}
                </Div>
              </Div>
            );
          })}
        </Div>
      )}
    </Div>
  );
};

export default With4Geeks;
