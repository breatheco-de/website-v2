import React, { useEffect, useState, useContext } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import {
  isCustomBarActive,
  requestSyllabus,
  beHiringPartner,
} from "../actions";
import BaseRender from "./_baseLayout";
import { Container, Div, HR, GridContainer } from "../components/Sections";
import { H2, H4, Paragraph, SubTitle } from "../components/Heading";
import {
  Anchor,
  Button,
  Colors,
  Img,
  ImgV2,
  StyledBackgroundSection,
} from "../components/Styling";
import { SessionContext } from "../session";
import Modal from "../components/Modal";
import LeadForm from "../components/LeadForm";
import { Circle } from "../components/BackgroundDrawing";
import Icon from "../components/Icon";
import ScholarshipSuccessCases from "../components/ScholarshipSuccessCases";
import TwoColumnCarousel from "../components/TwoColumnCarousel";
import TwoColumn from "../components/TwoColumn/index.js";
import WeTrust from "../components/WeTrust/index.js";
import FaqCard from "../components/FaqCard";
import ChooseYourProgram from "../components/ChooseYourProgram";

const JobGuarantee = ({ data, pageContext, yml }) => {
  const { session } = useContext(SessionContext);
  const [applyButtonText, setApplyButtonText] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(
    (loc) => loc.node?.city === city
  );

  useEffect(() => {
    if (currentLocation !== undefined) {
      setApplyButtonText(currentLocation.node.button.apply_button_text);
    }
  }, [currentLocation]);

  const programs = data.allCourseYaml.edges
    .filter(
      ({ node }) =>
        !["unlisted", "hidden"].includes(node.meta_info.visibility) &&
        node.meta_info.show_in_apply
    )
    .map(({ node }) => ({
      label: node.apply_form.label,
      value: node.meta_info.bc_slug,
    }));

  const ymlTwoColumn = yml?.two_column_left;

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const testimonials =
    data.allTestimonialsYaml.edges[0].node.testimonials.filter((elem) =>
      yml.successful_stories.testimonials.includes(elem.slug)
    );

  // Build list of course slugs that have job guarantee enabled
  const jobGuaranteeSlugs = data.allCourseYaml.edges
    .filter(({ node }) => node.meta_info?.job_guarantee)
    .map(({ node }) => node.meta_info.slug);

  return (
    <>
      <Div
        margin={isCustomBarActive(session) ? "40px 0 0 0" : "0"}
        padding="10px 15px 0 15px"
        padding_sm="10px 20px 0 20px"
        padding_tablet="120px 130px 72px 130px"
        padding_lg="120px 0 72px 0"
        position="relative"
        display="block"
      >
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="87px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="172px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="17px"
          height="17px"
          top="216px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="298px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="145px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="182px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="246px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="10px"
          right="320px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          opacity="0.2"
          width="300px"
          height="300px"
          top="100px"
          right="-40px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="30px"
          height="30px"
          top="370px"
          right="150px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="15px"
          height="15px"
          top="92px"
          left="14px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="grey"
          width="15px"
          height="15px"
          top="130px"
          left="15px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="darkGray"
          width="15px"
          height="15px"
          top="195px"
          left="10px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="yellow"
          opacity="0.2"
          width="300px"
          height="300px"
          top="150px"
          right="-220px"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="yellow"
          width="30px"
          height="30px"
          top="370px"
          right="40px"
          display="inline"
          display_tablet="none"
        />
        <Container display="block">
          <H2
            type="h2"
            color={Colors.black}
            textAlign="center"
            fontSize="32px"
            fontSize_tablet="46px"
            fontSize_sm="32px" /* Ajuste para pantallas pequeñas */
            fontSize_xs="32px" /* Ajuste para móviles muy pequeños */
            lineHeight="38px"
            lineHeight_tablet="46px"
            lineHeight_sm="30px" /* Ajuste para pantallas pequeñas */
            lineHeight_xs="30px" /* Ajuste para móviles muy pequeños */
            margin="20px 0 20px 0"
            margin_sm="15px 0 15px 0" /* Ajuste de margen en pantallas pequeñas */
            margin_xs="10px 0 10px 0" /* Ajuste de margen en móviles pequeños */
            margin_tablet="40px 0 40px 0"
            textTransform="uppercase"
            fontFamily="Archivo, Lato, sans-serif"
          >
            {yml.header.title}
          </H2>

          <SubTitle
            color={Colors.black}
            margin="10px auto"
            margin_sm="8px auto"
            margin_xs="5px auto"
            margin_tablet="15px auto"
            padding="0"
            width="auto"
            letterSpacing="0.05em"
            textAlign="center"
            maxWidth="760px"
            fontFamily="Lato, sans-serif"
            fontWeight="400"
            marginBottom="16px"
            fontSize="26px"
            fontSize_tablet="30px" /* Reducción en tablets */
            fontSize_sm="20px" /* Reducción en pantallas pequeñas */
            fontSize_xs="22px" /* Para móviles pequeños */
            lineHeight="32px"
            lineHeight_tablet="28px"
            lineHeight_sm="26px"
            lineHeight_xs="24px"
          >
            {yml.header.sub_title}
          </SubTitle>

          <Paragraph
            color={Colors.black}
            margin="10px auto"
            margin_sm="8px auto"
            margin_xs="5px auto"
            margin_tablet="15px auto"
            padding="0"
            width="auto"
            textAlign="center"
            justifyItems="center"
            justifyContent_tablet="center"
            justifyContent_sm="left"
            justifyContent_xs="left"
            maxWidth="760px"
            fontSize="16px" /* Un poco menor que el SubTitle */
            fontSize_tablet="16px"
            fontSize_sm="16px"
            fontSize_xs="15px"
            lineHeight="17px"
            lineHeight_tablet="20px"
            lineHeight_sm="18px"
            lineHeight_xs="18px"
            dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
          />

          <Div
            flexDirection_tablet="row"
            flexDirection="column"
            justifyContent="start"
            justifyContent_tablet="center"
            alignItems="center"
            margin="20px 0 30px 0"
            margin_sm="15px 0 25px 0"
            margin_xs="10px 0 20px 0"
            margin_tablet="0 0 50px 0"
          >
            <Div width="100%" width_tablet="fit-content">
              <Link to={yml.button.apply_button_link} style={{ width: "100%" }}>
                <Button
                  variant="full"
                  justifyContent="center"
                  width="100%"
                  width_tablet="fit-content"
                  background="#0085ff"
                  color="#ffffff"
                  margin_tablet="10px 24px 10px 0"
                  textColor="white"
                  style={{
                    transition:
                      "transform 250ms ease-in-out, background-color 250ms ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#ffb718";
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = Colors.blue;
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {applyButtonText}
                </Button>
              </Link>
            </Div>

            <Button
              onClick={handleOpen}
              display="block"
              width="100%"
              width_tablet="fit-content"
              variant="outline"
              background="#FFF"
              color={Colors.blue}
              margin="10px 0 0 0"
              margin_tablet="0"
              textColor={Colors.blue}
              textAlign="center"
              style={{
                transition:
                  "transform 250ms ease-in-out, border-color 250ms ease-in-out, color 250ms ease-in-out",
                border: `2px solid ${Colors.blue}`,
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#ffb718";
                e.target.style.borderColor = "#ffb718";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = Colors.blue;
                e.target.style.borderColor = Colors.blue;
                e.target.style.transform = "scale(1)";
              }}
            >
              {yml.button.btn_label}
            </Button>
          </Div>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <LeadForm
              style={{ marginTop: "50px" }}
              heading={yml.button.syllabus_heading}
              motivation={yml.button.syllabus_motivation}
              sendLabel={yml.button.syllabus_heading}
              formHandler={requestSyllabus}
              handleClose={handleClose}
              lang={pageContext.lang}
              redirect={
                pageContext.lang === "us" ? "/us/thank-you" : "/es/gracias"
              }
              selectProgram={programs}
              data={{
                course: {
                  type: "hidden",
                  value: yml.meta_info?.utm_course,
                  valid: true,
                },
              }}
            />
          </Modal>
        </Container>
        {/* Moved the video section outside this Div to place WeTrust first */}
      </Div>
      {/* WeTrust: 1. Does JG Deliver Results You can count on */}
      <div>
        <WeTrust
          id="we-trust-section"
          margin="0"
          padding="0"
          padding_md="0"
          padding_lg="0"
          padding_tablet="0 !important"
          width="100%"
          width_md="100%"
          width_tablet="100%"
          maxWidth="1280px"
          we_trust={yml.we_trust_section}
        />
      </div>
      {/* Video: 2. See How one graduate turned our JG into a real career */}
      <Container
        id="two_column_right"
        flexDirection="column"
        margin="0"
        padding="40px 0"
        padding_sm="50px 0"
        padding_tablet="0"
        padding_md="0 50px"
        padding_lg="0"
      >
        <TwoColumn
          left={{
            image: yml.two_columns_video?.image,
            video: yml.two_columns_video?.video,
          }}
          right={{
            heading: yml.two_columns_video?.heading,
            sub_heading: yml.two_columns_video?.sub_heading,
            bullets: yml.two_columns_video?.bullets,
            content: yml.two_columns_video?.content,
            disclosure: yml.two_columns_video?.disclosure,
            button: yml.two_columns_video?.button,
          }}
          proportions={yml.two_columns_video?.proportions}
          session={session}
        />
      </Container>
      {/* Eligibility: 3. Who's Eligible? */}
      <TwoColumn
        padding="30px 20px"
        padding_sm="40px 30px"
        padding_md="60px 80px"
        padding_lg="60px 80px"
        right={{ image: ymlTwoColumn.image }}
        left={{
          heading: ymlTwoColumn.heading,
          sub_heading: ymlTwoColumn.sub_heading,
          bullets: ymlTwoColumn.bullets,
          content: ymlTwoColumn.content,
          button: ymlTwoColumn.button,
        }}
        proportions={ymlTwoColumn.proportions}
        session={session}
      />

      {/* Programs: 4. Job Guarantee Available for our top tech programs */}
      <ChooseYourProgram
        id="choose-program"
        lang={pageContext.lang}
        programs={data.allChooseYourProgramYaml.edges[0].node.programs.filter(
          (p) => {
            const linkSlug = p.link?.split("/").filter(Boolean).pop();
            return jobGuaranteeSlugs.includes(linkSlug);
          }
        )}
        title={yml.choose_program?.title}
        paragraph={yml.choose_program?.paragraph}
        background={Colors.veryLightBlue3}
        padding="0"
      />
      {/* Removed original WeTrust placement to avoid duplication */}
      {/*
      <div>
        <WeTrust
          id="we-trust-section"
          margin="0"
          padding="0"
          padding_md="0"
          padding_lg="0"
          padding_tablet="0 !important"
          width="100%"
          width_md="100%"
          width_tablet="100%"
          maxWidth="1280px"
          we_trust={yml.we_trust_section}
        />
      </div>
      */}

      {/* Why Confidence: 5. Why we have the confidence to offer a Job Guarantee */}
      <Container
        id="two_column_right_section"
        flexDirection="column"
        margin="0"
        padding="40px 0"
        padding_sm="50px 0"
        padding_tablet="0"
        padding_md="0 50px"
        padding_lg="0"
      >
        <TwoColumn
          left={{
            image: yml.two_column_right?.image,
          }}
          right={{
            heading: yml.two_column_right?.heading,
            sub_heading: yml.two_column_right?.sub_heading,
            content: yml.two_column_right?.content,
            button: yml.two_column_right?.button,
          }}
          proportions={yml.two_column_right?.proportions}
          session={session}
        />
      </Container>

      {/* Commented out: Not in requested order */}
      {/**
      <ScholarshipSuccessCases
        content={data.allScholarshipSuccessCasesYaml.edges[0].node}
      />

      <HR
        background={Colors.verylightGray}
        width="70%"
        height="1px"
        margin="20px"
      />

      <Container
        id="two_column_geek_section"
        flexDirection="column"
        margin="0"
        padding="40px 0"
        padding_sm="50px 0"
        padding_tablet="0"
        padding_md="0 50px"
        padding_lg="0"
      >
        <TwoColumn
          left={{
            image: yml.two_column_geek?.image,
          }}
          right={{
            heading: yml.two_column_geek?.heading,
            sub_heading: yml.two_column_geek?.sub_heading,
            bullets: yml.two_column_geek?.bullets,
            button: yml.two_column_geek?.button,
          }}
          proportions={yml.two_column_geek?.proportions}
          session={session}
        />
      </Container>
      */}

      {/* Refund: 6. How the refund works */}
      <Container
        display="block"
        margin="20px auto"
        margin_sm="15px auto"
        margin_xs="10px auto"
        margin_tablet="40px auto"
        padding="20px 10px"
        padding_sm="30px 20px"
        padding_tablet="40px 90px"
        padding_md="40px 130px"
        padding_lg="40px 0"
      >
        <Div
          display="block"
          margin="0px auto 20px 0"
          margin_sm="0px auto 15px 0"
          margin_xs="0px auto 10px 0"
          margin_tablet="0px auto 40px 0"
          padding="20px 0"
          padding_sm="30px 0"
          padding_tablet="42px 0"
        >
          <H2 margin="0 0 15px 0">{yml.how_it_works.title}</H2>
          <SubTitle>{yml.how_it_works.text}</SubTitle>
        </Div>
        <Div
          margin="auto"
          margin_lg="auto"
          marginBottom="30px"
          marginBottom_sm="25px"
          marginBottom_xs="20px"
          marginBottom_tablet="50px"
          width="300px"
          width_tablet="fit-content"
          width_md="auto"
          gap_tablet="60px"
          gap_md="60px"
          flexDirection="column"
          flexDirection_tablet="row"
          justifyContent="center"
        >
          {yml.how_it_works.steps.map((step, i) => (
            <Div
              width="100%"
              width_tablet="120px"
              width_md="160px"
              height_tablet="350px"
              position="relative"
            >
              {i !== yml.how_it_works.steps.length - 1 && (
                <ImgV2
                  src="/images/dotted-line.png"
                  position="absolute"
                  left_tablet="50%"
                  left="90px"
                  top_md={i % 2 === 0 ? "40px" : "15px"}
                  top_tablet="40px"
                  top="80px"
                  rotate_tablet={i % 2 !== 0 && "123deg"}
                  rotate={i % 2 !== 0 && "-45deg"}
                  alt="Dashed line"
                  width_tablet="180px"
                  width_md="240px"
                  width="150px"
                  height="69px"
                  height_tablet="69px"
                  height_md="119px"
                  backgroundSize="contain"
                />
              )}
              <Div
                flexDirection={i % 2 === 0 ? "row" : "row-reverse"}
                justifyContent="between"
                justifyContent_tablet="start"
                flexDirection_tablet="column"
                alignItems="center"
                position_tablet="absolute"
                top={i % 2 !== 0 && "90px"}
                zIndex="5"
                width="100%"
                width_tablet="auto"
              >
                <Div
                  flexDirection="column"
                  justifyContent="center"
                  width="140px"
                  width_tablet="110px"
                  width_md="100px"
                  height="140px"
                  height_tablet="110px"
                  height_md="100px"
                  border={`4px solid #FFB718`}
                  background="#FFF1D1"
                  borderRadius="70px"
                >
                  <Icon
                    style={{ margin: "auto" }}
                    color="#FFB718"
                    icon={step.icon}
                    width="60px"
                    height="60px"
                  />
                </Div>
                <Paragraph
                  fontSize={step.highlight ? "16px" : "14px"}
                  fontSize_tablet={step.highlight ? "22px" : "20px"}
                  fontSize_md={step.highlight ? "22px" : "20px"}
                  color={step.highlight ? "#FFB718" : "#000"}
                  opacity="1"
                  maxWidth="100px"
                  maxWidth_tablet="120px"
                  maxWidth_md="180px"
                  margin="15px 0 0 0"
                >
                  {`${i + 1}. ${step.title}`}
                </Paragraph>
              </Div>
            </Div>
          ))}
        </Div>

        {yml.how_it_works.link && (
          <Paragraph
            margin="30px 0 0 0"
            color={Colors.black}
            textDecoration="underline"
          >
            <Anchor
              color={`${Colors.black} !important`}
              to={yml.how_it_works.link.url}
            >
              {yml.how_it_works.link.label}
            </Anchor>
          </Paragraph>
        )}
      </Container>
      <Container
        margin="0"
        padding="0"
        padding_tablet="0"
        id="faq-card-section"
      >
        <FaqCard
          faqs={data.allFaqYaml.edges[0].node.faq}
          topicSlug="job_guarantee"
        />
      </Container>
    </>
  );
};

export const query = graphql`
  query JobGuaranteeQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            utm_course
          }
          seo_title
          header {
            title
            sub_title
            paragraph
          }
          button {
            btn_label
            apply_button_link
            syllabus_heading
            syllabus_motivation
          }
          two_column_left {
            proportions
            image {
              style
              src
            }
            heading {
              text
              font_size
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
            button {
              text
              color
              background
              hover_color
              path
            }
          }

          two_column_right {
            proportions
            image {
              style
              src
            }
            heading {
              text
              font_size
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
            button {
              text
              color
              background
              hover_color
              path
            }
          }

          two_columns_video {
            proportions
            image {
              style
              src
              shadow
            }

            video
            heading {
              text
              font_size
            }
            sub_heading {
              text
              font_size
              style
            }
            button {
              text
              color
              background
              path
            }
          }

          two_column_geek {
            proportions
            image {
              style
              src
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
            bullets {
              item_style
              items {
                heading
                text
                icon
              }
            }
            button {
              text
              color
              background
              hover_color
              path
            }
          }

          we_trust_section {
            title
            bg_full
            text
            boxes {
              icon
              title
              label
              text
            }
          }
          how_it_works {
            title
            text
            steps {
              icon
              title
              highlight
            }
            link {
              url
              label
            }
          }
          successful_stories {
            title
            text
            testimonials
          }
          choose_program {
            title
            paragraph
          }
        }
      }
    }
    allCourseYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          meta_info {
            slug
            title
            bc_slug
            visibility
            show_in_apply
            job_guarantee
          }
          apply_form {
            label
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
    allLocationYaml(
      filter: {
        fields: { lang: { eq: $lang } }
        meta_info: { visibility: { nin: ["hidden", "unlisted"] } }
      }
    ) {
      edges {
        node {
          id
          city
          country
          name
          active_campaign_location_slug
          breathecode_location_slug
          fields {
            lang
            file_name
          }
          button {
            apply_button_text
          }
          meta_info {
            slug
            description
            image
            position
            visibility
            keywords
            redirects
          }
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          heading
          button_text
          button_link
          testimonials {
            student_name
            slug
            country {
              iso
              name
            }
            featured
            highlighted
            testimonial_date
            rating
            hidden
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
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            student_video
            short_content
            content
            source_url
            source_url_text
          }
        }
      }
    }
    allFaqYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          faq {
            topic
            slug
            questions {
              question
              answer
            }
          }
          fields {
            lang
          }
        }
      }
    }
    allChooseYourProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            title
            sub_title
            description
            description_mobile
            link
            icon
            text_link
          }
        }
      }
    }
  }
`;

export default BaseRender(JobGuarantee);
