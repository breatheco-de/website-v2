import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Div, GridContainer } from "../Sections";
import DraggableDiv from "../DraggableDiv";
import { Paragraph, H2, SubTitle } from "../Heading";
import { Colors } from "../Styling";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SquaresVariant = ({
  id,
  title,
  paragraph,
  background,
  padding,
  padding_tablet,
  margin,
  maxWidth,
  content,
  imageBackground,
  imageBorder,
}) => {
  return (
    <>
      <Div
        id={id}
        width="100%"
        margin_tablet="0 auto"
        justifyContent="center"
        background={background}
        padding_xxs="0 20px"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0px"
      >
        <GridContainer
          containerColumns_tablet="repeat(12, 1fr)"
          gridColumn_tablet="1/ span 12"
          background={background}
          padding={padding}
          padding_tablet={padding_tablet}
          rows={paragraph && "3"}
          margin={margin}
          maxWidth={maxWidth}
          childMaxWidth="1280px"
        >
          {title && (
            <H2 type="h2">
              {title.split("\n").map((line, idx) => (
                <span key={idx} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </H2>
          )}
          {paragraph && (
            <Div margin="15px 0">
              <SubTitle dangerouslySetInnerHTML={{ __html: paragraph }} />
            </Div>
          )}
          <Div width="100%" style={{ overflowX: "auto" }}>
            <DraggableDiv gap="20px">
              {content.badges.slice(0, 5).map((l) => {
                return (
                  <Div
                    width="240px"
                    height="140px"
                    background={imageBackground || Colors.white}
                    flexDirection="column"
                    justifyContent="center"
                    borderRadius="4px"
                    flexShrink="0"
                    flexShrink_tablet="0"
                    border={imageBorder}
                  >
                    <GatsbyImage
                      key={l.name}
                      style={{
                        height: "65px",
                        minWidth: "80px",
                        margin: "auto",
                      }}
                      imgStyle={{ objectFit: "contain" }}
                      loading="eager"
                      alt={l.name}
                      draggable={false}
                      image={getImage(l.image.childImageSharp.gatsbyImageData)}
                    />
                  </Div>
                );
              })}
            </DraggableDiv>
          </Div>
        </GridContainer>
      </Div>
    </>
  );
};

const Badges = ({
  id,
  lang,
  link,
  short_link,
  short_text,
  title,
  paragraph,
  background,
  padding,
  paddingText,
  paddingText_tablet,
  padding_tablet,
  margin,
  wrapped_images,
  maxWidth,
  badges,
  bottom_paragraph,
  imageBackground,
  imageBorder,
  paragraphStyles,
  bg_full = false,
  variant,
}) => {
  const data = useStaticQuery(graphql`
    query myNewQueryBadges {
      allBadgesYaml {
        edges {
          node {
            paragraph
            badges {
              name
              url
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    height: 150 # --> maxHeight
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    # transformOptions: {fit: COVER}

                    # More Options
                    # https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options
                  )
                }
              }
            }
            link_text
            link_to
            short_link_text
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  let content = data.allBadgesYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );

  content = badges || content.node || null;

  if (variant === "squares")
    return (
      <SquaresVariant
        id={id}
        title={title}
        imageBorder={imageBorder}
        paragraph={paragraph}
        background={background}
        padding={padding}
        padding_tablet={padding_tablet}
        margin={margin}
        maxWidth={maxWidth}
        imageBackground={imageBackground}
        content={content}
      />
    );

  return (
    <>
      <Div
        width="100%"
        margin_tablet="0 auto"
        justifyContent="center"
        background={background}
        padding_xxs="0 20px"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0px"
      >
        <GridContainer
          id={id}
          containerColumns_tablet="repeat(12, 1fr)"
          gridColumn_tablet="1/ span 12"
          background={bg_full ? "transparent" : background}
          padding={padding}
          padding_tablet={padding_tablet}
          rows={paragraph && "3"}
          margin={margin}
          maxWidth={maxWidth}
          childMaxWidth="1280px"
        >
          {!bottom_paragraph && paragraph && (
            <Div className="badge-slider" justifyContent="between">
              <Paragraph
                fontFamily="Lato-Light"
                padding={paddingText || "0 10px 45px 10px"}
                padding_tablet={paddingText_tablet || "0 5% 55px 5%"}
                lineHeight={short_link || short_text ? "29px" : "38px"}
                color={Colors.darkGray}
                dangerouslySetInnerHTML={{ __html: paragraph }}
                margin="15px 0 0 0"
                {...paragraphStyles}
              />
            </Div>
          )}

          {wrapped_images === true ? (
            <Div
              className="badge-slider hideOverflowX__"
              justifyContent="center"
              rowGap="3rem"
              flexWrap="wrap"
              columnGap="0rem"
            >
              {content.badges.map((l) => {
                return (
                  <GatsbyImage
                    key={l.name}
                    style={{
                      height: "65px",
                      minWidth: "150px",
                      width: "min-content",
                      margin: "0 20px",
                    }}
                    imgStyle={{ objectFit: "contain" }}
                    loading="eager"
                    alt={l.name}
                    image={getImage(l.image.childImageSharp.gatsbyImageData)}
                  />
                );
              })}
            </Div>
          ) : (
            <Div width="100%" style={{ overflowX: "auto" }}>
              <Div className="badge-slider hideOverflowX__" margin="auto">
                {short_link
                  ? content.badges.map((l, i) => {
                      return (
                        i < 4 && (
                          <GatsbyImage
                            key={l.name}
                            style={{
                              height: "65px",
                              minWidth: "80px",
                              margin: "0 20px",
                            }}
                            imgStyle={{ objectFit: "contain" }}
                            loading="eager"
                            alt={l.name}
                            image={getImage(
                              l.image.childImageSharp.gatsbyImageData
                            )}
                          />
                        )
                      );
                    })
                  : content.badges.map((l) => {
                      return (
                        <GatsbyImage
                          key={l.name}
                          style={{
                            height: "85px",
                            minWidth: "150px",
                            margin: "0 14px",
                          }}
                          imgStyle={{ objectFit: "contain" }}
                          loading="eager"
                          draggable={false}
                          alt={l.name}
                          image={getImage(
                            l.image.childImageSharp.gatsbyImageData
                          )}
                        />
                      );
                    })}

                {short_link && (
                  <Link to={content.link_to}>
                    <Paragraph width="150px" color={Colors.blue}>
                      {`${content.short_link_text} >`}
                    </Paragraph>
                  </Link>
                )}
              </Div>
            </Div>
          )}

          {bottom_paragraph && (
            <Div className="badge-slider" justifyContent="between">
              <Paragraph
                fontFamily="Lato"
                padding={paddingText || "0 10px 45px 10px"}
                padding_tablet={paddingText_tablet || "0 5% 55px 5%"}
                color={Colors.black}
                dangerouslySetInnerHTML={{ __html: paragraph }}
                margin="15px 0 0 0"
              />
            </Div>
          )}

          {link && (
            <Div justifyContent="center" margin="50px 0 0 0">
              <Link to={content.link_to}>
                <Paragraph color={Colors.blue}>{content.link_text}</Paragraph>
              </Link>
            </Div>
          )}
        </GridContainer>
      </Div>
    </>
  );
};

export default Badges;
