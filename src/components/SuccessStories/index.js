import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Div } from "../Sections";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors, Button } from "../Styling";
import TestimonialCard from "../TestimonialCard";
import TestimonialCardSmall from "../TestimonialCardSmall";
import FeaturedTestimonialSection from "./FeaturedTestimonialSection";
import SessionContext from "../../session";
import { smartSlicing } from "../../utils/utils";

const SuccessStoriescomponent = ({ filterIndexes, lang, variant }) => {
  const data = useStaticQuery(graphql`
    {
      allTestimonialsYaml {
        edges {
          node {
            heading
            button_text
            button_link
            source_url_text
            title
            paragraph
            testimonials {
              student_name
              slug
              featured
              highlighted
              testimonial_date
              rating
              hidden
              featured_on_section
              thumbnail_video {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    height: 600
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
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
                    width: 800
                    height: 600
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              student_video
              short_content
              content
              source_url
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);

  const data_ = data.allTestimonialsYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  )?.node;

  const filteredData = data_?.testimonials;

  const [testimonials, setTestimonials] = useState([]);

  // Find featured testimonial and split the list
  const featuredTestimonial = filteredData?.find(
    (t) => t.featured_on_section === true
  );
  const regularTestimonials =
    filteredData?.filter(
      (t) => t.featured_on_section !== true && t.hidden == false
    ) || [];

  // Split regular testimonials in half for rendering around the featured section only if there's a featured testimonial
  const midPoint = featuredTestimonial
    ? Math.ceil(regularTestimonials.length / 2)
    : regularTestimonials.length;
  const firstHalf = regularTestimonials.slice(0, midPoint);
  const secondHalf = featuredTestimonial
    ? regularTestimonials.slice(midPoint)
    : [];

  let position = 0;

  useEffect(() => {
    filteredData.forEach((_, ind, arr) => {
      arr[ind].isExpanded = false;
    });
    if (filterIndexes) {
      setTestimonials([
        ...filteredData.filter(
          (testimonial) =>
            filterIndexes.includes(testimonial.slug) &&
            testimonial.hidden == false
        ),
      ]);
    } else {
      setTestimonials([...filteredData.filter((f) => f.hidden == false)]);
    }
  }, []);

  const Card = variant === "small" ? TestimonialCardSmall : TestimonialCard;

  const renderTestimonials = (testimonialsToRender) => {
    return testimonialsToRender.map((m, i) => {
      const studentThumb = m.student_thumb && m.student_thumb;
      const thumbnailVideo = m.thumbnail_video && m.thumbnail_video;
      i == 0
        ? (position = 0)
        : position == 2
        ? (position = 0)
        : (position += 1);
      return (
        i < 30 && (
          <Card
            key={`${m.student_name}-${i}`}
            studentRating={m.rating}
            image={thumbnailVideo || studentThumb}
            //minHeight="400px"
            background={
              position == 0
                ? Colors.white
                : position == 1
                ? Colors.lightYellow2
                : Colors.veryLightBlue
            }
            // background={m.highlighted && Colors.darkYellow}
            name={m.student_name}
            short_content={m.short_content}
            // description={m.content.length > 500 && !m.isExpanded ? m.content.substring(0, 500) + "..." : m.content}
            description={m.content}
            video={m.student_video}
            starRating={true}
            stories={true}
            style={{
              height: "39px",
              maxWidth: "39px",
              backgroundSize: "contain",
            }}
            lang={lang}
            linkedin_url={m.linkedin_url}
            url={m.source_url}
            textUrl={data_.source_url_text}
          />
        )
      );
    });
  };

  return (
    <>
      <Div flexDirection="column" alignItems="center" gap="8px">
        <H2 type="h2">{data_.title}</H2>
        <Paragraph fontSize="22px">{data_.paragraph}</Paragraph>
      </Div>

      {/* First half of testimonials */}
      <Div
        display="column"
        columns="3"
        columnCount="3"
        gap="20px"
        style={{ gridAutoFlow: "dense" }}
        padding="0 20px"
        padding_tablet="50px 40px"
        padding_md="50px 80px"
        padding_lg="50px 0"
        margin="0px auto"
        columnCount_sm="1"
        columnCount_xxs="1"
        columnCount_tablet="3"
        maxWidth="1280px"
      >
        {renderTestimonials(firstHalf)}
      </Div>

      {/* Featured testimonial section */}
      {featuredTestimonial && (
        <FeaturedTestimonialSection
          testimonial={featuredTestimonial}
          lang={lang}
        />
      )}

      {/* Second half of testimonials */}
      {secondHalf.length > 0 && (
        <Div
          display="column"
          columns="3"
          columnCount="3"
          gap="20px"
          style={{ gridAutoFlow: "dense" }}
          padding="0 20px"
          padding_tablet="50px 40px"
          padding_md="50px 80px"
          padding_lg="50px 0"
          margin="0px auto"
          columnCount_sm="1"
          columnCount_xxs="1"
          columnCount_tablet="3"
          maxWidth="1280px"
        >
          {renderTestimonials(secondHalf)}
        </Div>
      )}
    </>
  );
};

export default SuccessStoriescomponent;
