import React from "react";
import { Div } from "../Sections";
import { Button, Colors } from "../Styling";
import { H2, H3, Paragraph } from "../Heading";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import StarRating from "../StarRating";
import ReactPlayer from "../ReactPlayer";
import Icon from "../Icon";

const FeaturedTestimonialSection = ({ testimonial, lang }) => {
  if (!testimonial) return null;

  return (
    <Div
      width="100%"
      maxWidth="1280px"
      margin="60px auto"
      padding="40px 20px"
      padding_tablet="60px 40px"
      padding_md="2.5rem 80px"
      background={Colors.lightGray}
      borderRadius="12px"
      position="relative"
      justifyContent="center"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Div
        position="absolute"
        top="-20px"
        right="-20px"
        width="100px"
        height="100px"
        background={Colors.yellow}
        borderRadius="50%"
        opacity="0.1"
        zIndex="0"
      />
      <Div
        position="absolute"
        bottom="-30px"
        left="-30px"
        width="80px"
        height="80px"
        background={Colors.blue}
        borderRadius="50%"
        opacity="0.1"
        zIndex="0"
      />

      <Div
        display="flex"
        flexDirection="column"
        // flexDirection_tablet="row"
        alignItems="center"
        gap="40px"
        position="relative"
        zIndex="1"
      >
        {/* Content */}
        <Div flex="1" textAlign="center" flexDirection="column">
          <H2
            type="h2"
            fontSize="28px"
            fontSize_tablet="32px"
            color={Colors.black}
            margin="0 0 10px 0"
            fontFamily="Archivo-Black"
          >
            {testimonial.student_name || testimonial.full_name}
          </H2>

          {(testimonial.short_content || testimonial.job_title) && (
            <H3
              type="h3"
              fontSize="18px"
              fontSize_tablet="20px"
              color={Colors.darkGray}
              margin="0 0 20px 0"
              fontWeight="600"
            >
              {testimonial.short_content || testimonial.job_title}
            </H3>
          )}

          {testimonial.rating && (
            <Div
              margin="0 0 20px 0"
              justifyContent="center"
              justifyContent_tablet="flex-start"
            >
              <StarRating rating={testimonial.rating} />
            </Div>
          )}

          {testimonial.student_video && (
            <Div
              width="100%"
              maxWidth="600px"
              margin="0 auto 0 auto"
              position="relative"
              zIndex="1"
            >
              <ReactPlayer
                // With_Modal
                className="react-player-testimonials-featured"
                thumb={testimonial.thumbnail_video || testimonial.student_thumb}
                margin_tablet="0 7% 20px 7%"
                id={testimonial.student_video}
                width="100%"
                videoHeight="300px"
                // videoHeight_tablet="300px"
              />
            </Div>
          )}

          <Paragraph
            fontSize="16px"
            fontSize_tablet="18px"
            lineHeight="1.6"
            color={Colors.darkGray2}
            fontStyle="italic"
            maxWidth="600px"
            margin="0 auto"
            margin_tablet="0"
          >
            "{testimonial.content}"
          </Paragraph>

          {testimonial.linkedin_url && (
            <Div
              margin="20px 0 0 0"
              justifyContent="center"
              justifyContent_tablet="flex-start"
            >
              <Button
                as="a"
                className="link"
                href={testimonial.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap="8px"
                color={Colors.blue}
                textDecoration="none"
                fontSize="14px"
                fontWeight="600"
                transition="color 0.3s ease"
              >
                <Icon
                  icon="linkedin-new"
                  width="22px"
                  height="22px"
                  fill="#2867b2"
                  stroke="#2867b2"
                />
                {testimonial.linkedin_text || "View LinkedIn Profile"}
              </Button>
            </Div>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default FeaturedTestimonialSection;
