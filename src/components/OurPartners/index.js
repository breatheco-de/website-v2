import React from "react";
import { Div, GridContainer, Grid } from "../Sections";
import { Colors } from "../Styling";
import { H1, H2, Paragraph, SubTitle } from "../Heading";
import { Link } from "gatsby";
import { smartRedirecting } from "../../utils/utils.js";
import Fragment from "../Fragment";
import Marquee from "../Marquee";
import CarouselV2 from "../CarouselV2/index.js";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Display centered TITLE + PARAGRAPH
const Title_Paragraph = (props) => {
  return (
    <>
      <Grid
        maxWidth="1280px"
        margin="0 auto 20px auto"
        background={props.background}
        gridTemplateColumns_tablet="1fr repeat(12, 1fr) 1fr"
      >
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin_tablet="0px"
          margin_xxs="0 20px"
          gridColumn_tablet="1 / 15"
        >
          {/*<H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">{title}</H2>*/}
          <H2
            type="h2"
            letterSpacing="0.05em"
            width="100%"
            margin="0 0 23px 0"
            textTransform="uppercase"
            style={{ fontStyle: "normal" }}
          >
            {props.title}
          </H2>

          {/*<Paragraph>{paragraph}</Paragraph>*/}
          <SubTitle
            fontSize={props.fontSize}
            padding="0"
            padding_tablet="0px 10%"
            letterSpacing="0.06em"
            width="100%"
            margin="0 0 15px 0"
            dangerouslySetInnerHTML={{
              __html: props.paragraph,
            }}
          />
        </Div>
      </Grid>
    </>
  );
};

//Images in slider
const Images_With_Slider = (props) => {
  return (
    <>
      <Div
        className="badge-slider"
        justifyContent="between"
        margin="0 0 50px 0"
      >
        {props.images.map((l, i) => {
          return (
            <GatsbyImage
              key={i}
              style={{
                height: "80px",
                minWidth: "120px",
                maxWidth: "150px",
                margin: "0 15px",
              }}
              imgStyle={{ objectFit: "contain" }}
              alt={l.name}
              image={getImage(l.image.childImageSharp.gatsbyImageData)}
            />
          );
        })}
      </Div>
    </>
  );
};

//Images in marquee
const Images_With_Marquee = (props) => {
  let imgs = [];
  props.images.map((l, i) => {
    let follow = l.follow;
    if (typeof l.follow === "string" && l.follow === "false") follow = false;
    imgs.push(
      l.link ? (
        <a href={l.link} rel={!follow ? "nofollow" : ""}>
          <GatsbyImage
            key={i}
            style={{
              minWidth: "120px",
              maxWidth: "150px",
              border: 0,
              cursor: "pointer",
            }}
            height="80px"
            objectFit="contain"
            alt={l.name}
            image={getImage(l.image.childImageSharp.gatsbyImageData)}
            onClick={(e) => {
              if (l.link) smartRedirecting(e, l.link);
            }}
          />
        </a>
      ) : (
        <GatsbyImage
          key={i}
          style={{ minWidth: "120px", maxWidth: "150px", border: 0 }}
          height="80px"
          objectFit="contain"
          alt={l.name}
          image={getImage(l.image.childImageSharp.gatsbyImageData)}
        />
      )
    );
  });

  return <Marquee config={{ duration: 180, images: imgs }} />;
};

//Funcion que muestra las imagenes en columna y centradas
const Images_Centered = (props) => {
  return (
    <Div
      display="flex"
      flexDirection="row"
      borderRadius="3px"
      style={{ flexWrap: "wrap" }}
      // columnGap="70px"
      justifyContent="center"
      background={Colors.white}
      padding="0 0 0 0"
      margin="0 0 50px 0"
    >
      {props.images?.map((l, i) => {
        return (
          <Div
            key={`${i}-${l.name}`}
            margin="0 20px 40px 20px"
            margin_tablet={`0 ${i >= 4 ? "32px" : "42px"} 30px ${
              i >= 4 ? "32px" : "42px"
            }`}
          >
            <GatsbyImage
              key={i}
              style={
                props.gray
                  ? {
                      filter: "grayscale(100%)",
                      height: "60px",
                      minWidth: "90px",
                      maxWidth: "150px",
                    }
                  : { height: "60px", minWidth: "90px", maxWidth: "150px" }
              }
              imgStyle={{ objectFit: "contain" }}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
              image={getImage(l.image.childImageSharp.gatsbyImageData)}
            />
          </Div>
        );
      })}
    </Div>
  );
};

//Imagenes con propiedad featured==true
const Images_Featured = (props) => {
  const imagesFiltered = props.images.filter((f) => f.featured === true);
  return (
    <>
      <GridContainer
        justifyItemsChild="center"
        display_xxs="none"
        display_xs="none"
        displayChild_xs="none"
        display_sm="none"
        //display_tablet="block"
        justifyContentChild="center"
        maxWidth="1280px"
        margin="0 auto"
        columns_tablet={
          imagesFiltered.length <= 4 ? imagesFiltered.length : "3"
        }
        padding_tablet={props.paddingFeatured || "0"}
      >
        {(props.featuredImages ? props.featuredImages : imagesFiltered).map(
          (m, i) => {
            return (
              <GatsbyImage
                key={i}
                style={{
                  height: "55px",
                  minWidth: "100px",
                  width: "200px",
                  margin: "23px 15px",
                }}
                imgStyle={{ objectFit: "contain" }}
                alt={m.name}
                image={getImage(m.image.childImageSharp.gatsbyImageData)}
              />
            );
          }
        )}
        {/* </Div> */}
      </GridContainer>
      {!props.withoutLine && (
        <GridContainer>
          <Div
            height="1px"
            background={Colors.lightGray}
            margin="30px 0"
            margin_tablet="60px 0"
          />
        </GridContainer>
      )}
    </>
  );
};

const SquareBoxPartner = ({ border, elem, width, height }) => {
  let follow = elem.follow;
  if (typeof elem.follow === "string" && elem.follow === "false")
    follow = false;
  return (
    <Div
      display="flex"
      flexDirection="column"
      justifyContent="center"
      border={border}
      background={Colors.white}
      borderRadius="4px"
      height={height}
      width={width}
      margin="auto"
    >
      {elem.link ? (
        <a href={elem.link} rel={!follow ? "nofollow" : ""} target="__blank">
          <GatsbyImage
            style={{
              cursor: "pointer",
              margin: "auto",
              width: "60%",
              display: "block",
            }}
            height="112px"
            objectFit="contain"
            alt={elem.name}
            image={getImage(elem.image.childImageSharp.gatsbyImageData)}
          />
        </a>
      ) : (
        <GatsbyImage
          style={{
            margin: "auto",
            height: "112px",
            width: "60%",
          }}
          objectFit="contain"
          alt={elem.name}
          image={getImage(elem.image.childImageSharp.gatsbyImageData)}
        />
      )}
    </Div>
  );
};

const VariantCarousel = ({
  title,
  paragraph,
  images,
  background,
  multiLine,
  ...rest
}) => {
  const multiLineImages = multiLine
    ? images.reduce(
        (rows, key, index) =>
          (index % 2 == 0
            ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows,
        []
      )
    : [];

  return (
    <CarouselV2
      background={background || "#FBFCFC"}
      padding="40px 0"
      heading={title}
      content={paragraph}
      settings={{
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1124,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 780,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              dots: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            },
          },
        ],
      }}
      {...rest}
    >
      {multiLine
        ? multiLineImages.map((group, i) => (
            <Div key={`${i}-partners`}>
              <Div flexDirection="column" gap="24px">
                {group.map((elem) => (
                  <SquareBoxPartner
                    key={elem.name}
                    elem={elem}
                    border={!background && "1px solid #C4C4C4"}
                    height="236px"
                    width="260px !important"
                  />
                ))}
              </Div>
            </Div>
          ))
        : images.map((elem) => (
            <Div key={elem.name}>
              <SquareBoxPartner
                elem={elem}
                border={!background && "1px solid #C4C4C4"}
                height="236px"
                width="260px !important"
              />
            </Div>
          ))}
    </CarouselV2>
  );
};

//Punto de entrada al componente
const OurPartners = ({
  title,
  borderBottom,
  paragraph,
  margin,
  padding,
  paddingFeatured,
  background,
  link,
  showFeatured,
  featuredImages,
  images,
  withoutLine,
  slider,
  marquee,
  fontSize,
  width,
  gridColumn,
  maxWidth,
  gray,
  variant,
  ...rest
}) => {
  let FragmentStyle = {
    background: background,
    margin: `${margin || "40px 0 0 0"}`,
    padding: `${padding || "75px 0"}`,
    borderBottom: borderBottom,
    width: width,
    maxWidth: maxWidth,
  };

  if (variant === "carousel")
    return (
      <VariantCarousel
        images={images}
        title={title}
        paragraph={paragraph}
        background={background}
        margin={margin}
        {...rest}
      />
    );
  //Renderized...
  return (
    <Fragment github="/components/partner" style={FragmentStyle}>
      {title && (
        <Title_Paragraph
          gridColumn={gridColumn}
          fontSize={fontSize}
          title={title}
          paragraph={paragraph}
          background={background}
        />
      )}
      {showFeatured && (
        <Images_Featured
          images={images}
          featuredImages={featuredImages}
          withoutLine={withoutLine}
          paddingFeatured={paddingFeatured}
        />
      )}
      {slider ? (
        <Images_With_Slider images={images} />
      ) : marquee ? (
        <Images_With_Marquee images={images} />
      ) : (
        <Images_Centered images={images} gray={gray} />
      )}
      {link && (
        <Div gridArea_md="2/3/2/11" justifyContent="center" margin="50px 0 0 0">
          <Link to={rest.props.footer_link}>
            <Paragraph color={Colors.blue}>
              {rest.props.footer_button}
            </Paragraph>
          </Link>
        </Div>
      )}
    </Fragment>
  );
};

export default OurPartners;
