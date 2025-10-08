import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2, H3, H4, Paragraph } from "../Heading";
import { GridContainer, Div } from "../Sections";
import { Colors } from "../Styling";
import { Link } from "gatsby";
import Fragment from "../Fragment";
import CarouselV2 from "../CarouselV2";
import Marquee_v2 from "../Marquee_v2";
import Icon from "../Icon";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const VariantCarousel = ({
  testimonialsArray,
  testimonialsFiltered,
  ...props
}) => {
  return (
    <CarouselV2
      heading={props.heading || testimonialsArray.heading}
      content={props.content}
      background={props.background}
      padding="40px 0"
      settings={{
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
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
      {...props}
    >
      {testimonialsFiltered.map((item, i) => {
        return (
          <Div key={`${i}-${item.student_name}`}>
            <Div
              display="flex"
              gap="9px"
              background="#ffffff"
              minWidth="245px"
              width="270px"
              width_tablet="300px"
              height="230px"
              padding="20px 24px 30px 20px"
              border={!props.background && "1px solid #C4C4C4"}
              borderRadius="4px"
              flexDirection="column"
              justifyContent="between"
              alignItems="center"
              margin="auto"
            >
              <Div width="59px" height="59px" position="relative">
                <Div
                  borderRadius="100%"
                  background="#FFB718"
                  position="absolute"
                  zIndex="10"
                  right="0"
                >
                  <Icon
                    width="18px"
                    height="18px"
                    icon="graduation"
                    color="#FFF1D1"
                  />
                </Div>

                <GatsbyImage
                  image={getImage(
                    item.student_thumb.childImageSharp.gatsbyImageData
                  )}
                  alt={item.student_name}
                  style={{
                    height: "59px",
                    minWidth: "59px",
                    width: "59px",
                    borderRadius: "100%",
                    backgroundSize: "cover",
                    margin: "auto",
                  }}
                />
              </Div>
              <Div
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                height="100%"
                padding="0 9px 0 9px"
                gap="10px"
                style={{ position: "relative" }}
              >
                <H3 fontSize="16px" lineHeight="19px">
                  {item.student_name}
                </H3>
                <H4 fontSize="14px" lineHeight="22px">
                  {item.short_content}
                </H4>
              </Div>
              {item.linkedin_url != "" && item.linkedin_image != null && (
                <a
                  href={item.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ margin: "auto" }}
                >
                  <Icon icon="linkedin-new" style={{ margin: "auto" }} />
                </a>
              )}
            </Div>
          </Div>
        );
      })}
    </CarouselV2>
  );
};

// Function to filter and prioritize testimonials by categories
const filterTestimonialsByCategories = (testimonials, categories) => {
  if (!categories || categories.length === 0 || !Array.isArray(categories)) {
    return testimonials;
  }

  // Filter testimonials that have at least one matching related_feature
  const matchingTestimonials = testimonials.filter((item) => {
    return (
      Array.isArray(item.related_features) &&
      item.related_features.some((feature) => categories.includes(feature))
    );
  });

  // If no testimonials match the categories, return empty array
  if (matchingTestimonials.length === 0) {
    return [];
  }

  // Create priority scores for each testimonial based on feature order
  const testimonialsWithPriority = matchingTestimonials.map((testimonial) => {
    let highestPriority = Infinity;

    // Find the highest priority (lowest index) among matching categories
    categories.forEach((category, categoryIndex) => {
      const featureIndex = testimonial.related_features?.indexOf(category);
      if (featureIndex !== -1) {
        // Priority score combines category priority and feature position in testimonial
        const priorityScore = categoryIndex * 1000 + featureIndex;
        if (priorityScore < highestPriority) {
          highestPriority = priorityScore;
        }
      }
    });

    return {
      ...testimonial,
      priority: highestPriority,
    };
  });

  // Sort by priority (lower numbers = higher priority)
  return testimonialsWithPriority
    .sort((a, b) => a.priority - b.priority)
    .map(({ priority, ...testimonial }) => testimonial);
};

const Testimonials = (props) => {
  let testimonialsArray = props.lang[0].node;

  // First apply the existing filter for hidden/marquee logic
  let baseFilteredTestimonials = testimonialsArray.testimonials.filter(
    (item) => item.hidden !== true || item.include_in_marquee === true
  );

  // Then apply category filtering and prioritization if categories are provided
  let testimonialsFiltered = props.categories
    ? filterTestimonialsByCategories(baseFilteredTestimonials, props.categories)
    : baseFilteredTestimonials;

  // Safety check: if no testimonials match the categories, fall back to base filtered testimonials
  if (testimonialsFiltered.length === 0) {
    testimonialsFiltered = baseFilteredTestimonials;
  }

  if (props.variant === "carousel")
    return (
      <VariantCarousel
        testimonialsArray={testimonialsArray}
        testimonialsFiltered={testimonialsFiltered}
        {...props}
      />
    );

  return (
    <Fragment github="/components/testimonials">
      <GridContainer
        id={props.id}
        fluid
        background={props.background || "linear-gradient(#f5f5f5, white)"}
        height={props.noMove ? "580px" : "520px"}
        height_tablet={props.noMove ? "500px" : "450px"}
        //childHeight="540px"
        margin={props.margin}
        margin_tablet={props.margin_tablet}
        padding="30px 20px 0 20px"
        padding_tablet="48px 0 36px 0"
      >
        <Div
          id="AQUI"
          flexDirection="column"
          padding_lg="0px"
          padding_md="10px 80px"
          padding_tablet="10px 40px"
          padding_xxs="0 20px"
        >
          <H2 lineHeight_tablet="40px" lineHeight_xxs="30px">
            {testimonialsArray.heading}
          </H2>
          <Link to={testimonialsArray.button_link}>
            <Paragraph margin="25px 0 36px 0" color={Colors.blue}>
              {testimonialsArray.button_text}
            </Paragraph>
          </Link>
        </Div>
        {/* MARQUEE_V2 

                    Optional atrributes:
                        speed: number <int | dec>
                        reversed: boolean
                        containerstyle
                */}
        <Marquee_v2
          speed={props.noMove ? 0 : 0.5} // false == no movement
          reversed={false}
          containerstyle={{ height: "210px" }}
          showSlider={props.noMove ? true : false}
        >
          <Div
            className="testimonial-slider"
            display="flex"
            height="auto"
            padding="0 0 50px 0"
          >
            {testimonialsFiltered.map((item, i) => {
              return (
                <Div
                  key={`${i}-${item.student_name}`}
                  display="flex"
                  background="#ffffff"
                  minWidth="245px"
                  boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
                  width="320px"
                  height="150px"
                  margin="0 12px 0 0"
                  padding="20px 24px 30px 20px"
                  border="1px solid #EBEBEB"
                  alignItems="flex-start"
                >
                  <GatsbyImage
                    // fluid={item.student_thumb.childImageSharp.fluid}
                    image={getImage(
                      item.student_thumb.childImageSharp.gatsbyImageData
                    )}
                    alt={item.student_name}
                    style={{
                      height: "39px",
                      minWidth: "39px",
                      width: "39px",
                      backgroundSize: "cover",
                    }}
                  />
                  <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    width="100%"
                    height="100%"
                    padding="0 9px 0 9px"
                    style={{ position: "relative" }}
                  >
                    <H3 fontSize="15px" lineHeight="19px" textAlign="left">
                      {item.student_name}
                    </H3>
                    <H4 fontSize="14px" lineHeight="22px" textAlign="left">
                      {item.short_content}
                    </H4>
                    {item.linkedin_url != "" && item.linkedin_image != null && (
                      <a
                        href={item.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        <GatsbyImage
                          // fluid={item.linkedin_image.childImageSharp.fluid}
                          image={getImage(
                            item.linkedin_image.childImageSharp.gatsbyImageData
                          )}
                          alt={`Linkedin - ${item.student_name}`}
                          style={{
                            height: "14px",
                            width: "59px",
                            margin: "auto",
                            backgroundSize: "cover",
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                          }}
                        />
                      </a>
                    )}
                  </Div>
                </Div>
              );
            })}
          </Div>
        </Marquee_v2>
      </GridContainer>
    </Fragment>
  );
};

export default Testimonials;
