import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Div } from "../Sections";
import CarouselV2 from "../CarouselV2";
import { Paragraph } from "../Heading";
import { Colors } from "../Styling";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SquaresVariant = ({
  id,
  title,
  paragraph,
  background,
  padding,
  padding_tablet,
  padding_md,
  margin,
  maxWidth,
  content,
  imageBackground,
  imageBorder,
}) => {
  return (
    <CarouselV2
      id={id}
      background={background}
      padding={padding || "80px 20px 40px 20px"}
      padding_tablet={padding_tablet || "80px 40px 40px 40px"}
      padding_md={padding_md || "80px 80px 40px 80px"}
      margin={margin}
      heading={title}
      content={paragraph}
      headingProps={{
        fontSize: "30px",
        fontSize_tablet: "34px",
        textAlign: "center",
      }}
      contentProps={{
        textAlign: "center",
      }}
      settings={{
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 1124,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              dots: true,
              arrows: true,
            },
          },
          {
            breakpoint: 780,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              dots: true,
              arrows: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 0,
              dots: true,
              arrows: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              dots: true,
              arrows: true,
              centerMode: false,
            },
          },
        ],
      }}
    >
      {content.badges.slice(0, 5).map((l) => (
        <Div key={l.name} padding="0 10px">
          <Div
            width="240px"
            height="140px"
            background={imageBackground || Colors.white}
            flexDirection="column"
            justifyContent="center"
            borderRadius="4px"
            border={imageBorder}
            margin="0 auto"
          >
            <GatsbyImage
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
        </Div>
      ))}
    </CarouselV2>
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
  padding_md,
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
        padding_md={padding_md}
        margin={margin}
        maxWidth={maxWidth}
        imageBackground={imageBackground}
        content={content}
      />
    );

  // Wrapped images variant - using CarouselV2 as top container
  if (wrapped_images === true) {
    return (
      <CarouselV2
        id={id}
        background={background}
        padding={padding || "40px 20px"}
        padding_tablet={padding_tablet || "40px 40px"}
        margin={margin}
        content={!bottom_paragraph ? paragraph : null}
        contentProps={{
          fontFamily: "Lato-Light",
          lineHeight: short_link || short_text ? "29px" : "38px",
          color: Colors.darkGray,
          ...paragraphStyles,
        }}
        settings={{
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 1124,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: true,
                arrows: true,
              },
            },
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 0,
                dots: true,
                arrows: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0,
                dots: true,
                arrows: true,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                dots: true,
                arrows: true,
                centerMode: true,
                centerPadding: "40px",
              },
            },
          ],
        }}
      >
        {content.badges.map((l) => (
          <Div key={l.name} padding="0 10px">
            <Div margin="0 auto" width="fit-content">
              <GatsbyImage
                style={{
                  height: "65px",
                  minWidth: "150px",
                  width: "min-content",
                  margin: "0 auto",
                }}
                imgStyle={{ objectFit: "contain" }}
                loading="eager"
                alt={l.name}
                image={getImage(l.image.childImageSharp.gatsbyImageData)}
              />
            </Div>
          </Div>
        ))}
      </CarouselV2>
    );
  }

  // Default carousel mode - using CarouselV2 as top container
  return (
    <>
      <CarouselV2
        id={id}
        background={background}
        padding={padding || "40px 20px"}
        padding_tablet={padding_tablet || "40px 40px"}
        margin={margin}
        content={!bottom_paragraph ? paragraph : null}
        contentProps={{
          fontFamily: "Lato-Light",
          lineHeight: short_link || short_text ? "29px" : "38px",
          color: Colors.darkGray,
          ...paragraphStyles,
        }}
        settings={{
          slidesToShow: short_link ? 4 : 5,
          slidesToScroll: short_link ? 4 : 5,
          infinite: false,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 1124,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true,
                arrows: true,
              },
            },
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0,
                dots: true,
                arrows: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0,
                dots: true,
                arrows: true,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                dots: true,
                arrows: true,
                centerMode: true,
                centerPadding: "40px",
              },
            },
          ],
        }}
      >
        {short_link
          ? content.badges.slice(0, 4).map((l) => (
              <Div key={l.name} padding="0 10px">
                <Div margin="0 auto" width="fit-content">
                  <GatsbyImage
                    style={{
                      height: "65px",
                      minWidth: "80px",
                      margin: "0 auto",
                    }}
                    imgStyle={{ objectFit: "contain" }}
                    loading="eager"
                    alt={l.name}
                    image={getImage(l.image.childImageSharp.gatsbyImageData)}
                  />
                </Div>
              </Div>
            ))
          : content.badges.map((l) => (
              <Div key={l.name} padding="0 10px">
                <Div margin="0 auto" width="fit-content">
                  <GatsbyImage
                    style={{
                      height: "85px",
                      minWidth: "150px",
                      margin: "0 auto",
                    }}
                    imgStyle={{ objectFit: "contain" }}
                    loading="eager"
                    draggable={false}
                    alt={l.name}
                    image={getImage(l.image.childImageSharp.gatsbyImageData)}
                  />
                </Div>
              </Div>
            ))}
      </CarouselV2>

      {short_link && (
        <Div
          justifyContent="center"
          margin="60px 0 20px 0"
          margin_tablet="20px 0 20px 0"
        >
          <Link to={content.link_to}>
            <Paragraph width="auto" color={Colors.blue}>
              {`${content.short_link_text} >`}
            </Paragraph>
          </Link>
        </Div>
      )}

      {bottom_paragraph && paragraph && (
        <Div
          background={background}
          padding="0 20px 20px 20px"
          padding_tablet="0 40px 40px 40px"
        >
          <Div maxWidth="1280px" margin="0 auto">
            <Paragraph
              fontFamily="Lato"
              padding={paddingText || "0 10px 45px 10px"}
              padding_tablet={paddingText_tablet || "0 5% 55px 5%"}
              color={Colors.black}
              dangerouslySetInnerHTML={{ __html: paragraph }}
              margin="15px 0 0 0"
            />
          </Div>
        </Div>
      )}

      {link && (
        <Div
          background={background}
          padding="0 20px 20px 20px"
          padding_tablet="0 40px 40px 40px"
        >
          <Div maxWidth="1280px" margin="0 auto" justifyContent="center">
            <Link to={content.link_to}>
              <Paragraph color={Colors.blue}>{content.link_text}</Paragraph>
            </Link>
          </Div>
        </Div>
      )}
    </>
  );
};

export default Badges;
