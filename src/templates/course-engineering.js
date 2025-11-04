import React, { useState, useEffect } from "react";
import { isCustomBarActive } from "../actions";
import { graphql, Link } from "gatsby";
import { GridContainer, Header, Div } from "../components/Sections";
import { Button, Colors, Img } from "../components/Styling";
import UpcomingDates from "../components/UpcomingDates";
import ProgramDetails from "../components/ProgramDetails";
import ProgramDetailsMobile from "../components/ProgramDetailsMobile";
import TechsWeTeach from "../components/TechsWeTeach";
import GeeksInfo from "../components/GeeksInfo";
import OurPartners from "../components/OurPartners";
import BaseRender from "./_baseLayout";
import Icon from "../components/Icon";
import { requestSyllabus } from "../actions";
import { SessionContext } from "../session";
import ScholarshipProjects from "../components/ScholarshipProjects";
import Badges from "../components/Badges";
import PricesAndPayment from "../components/PricesAndPayment";
import { Circle } from "../components/BackgroundDrawing";
import LeadForm from "../components/LeadForm";
import Modal from "../components/Modal";
import TwoColumn from "../components/TwoColumn/index.js";
import Overlaped from "../components/Overlaped";
import JobGuaranteeSmall from "../components/JobGuaranteeSmall";
import Loc from "../components/Loc";

const CourseEngineering = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const geek = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);

  const defaultCourse = "software-engineering";
  const program_schedule = yml.meta_info.slug.includes("full-time")
    ? "full_time"
    : "part_time";
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hiring = data.allPartnerYaml.edges[0].node;
  const landingHiring = yml.partners;

  const [applyButtonText, setApplyButtonText] = useState("");
  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(
    (loc) => loc.node?.city === city
  );

  const syllabus_button_text = yml.button.syllabus_heading;
  const apply_button_text = yml.button.apply_button_text;

  useEffect(() => {
    if (currentLocation !== undefined) {
      setApplyButtonText(currentLocation.node.button.apply_button_text);
    }
  }, [currentLocation]);

  return (
    <>
      <Header
        margin={
          isCustomBarActive(session) ? "120px auto 0 auto" : "90px auto 0 auto"
        }
        paragraphMargin="26px 20px"
        paragraphMargin_Tablet="26px 16%"
        paddingParagraph_tablet="0 40px"
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_xxs="40px 20px 0 20px"
        padding_md="40px 80px 0 80px"
        padding_lg="40px 0px 0 0px"
        padding_tablet="40px 40px 0 40px"
        position="relative"
        fontSize_title="40px"
        fontSizeTitle_tablet="60px"
        fontFamily_title="Archivo-Black"
        fontSize_paragraph="21px"
        gridTemplateColumns_tablet="repeat(14, 1fr)"
        maxWidth="1280px"
        uppercase
      >
        <Img
          src="/images/landing/group-3.png"
          width="49px"
          height="286px"
          style={{
            position: "absolute",
            zIndex: "-1",
          }}
          display_xxs="none"
          display_tablet="flex"
          left_tablet="72px"
          top_tablet="13%"
          left_lg="0%"
          top_lg="13%"
        />
        <Div
          flexDirection_tablet="row"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin_tablet="0 0 50px 0"
        >
          <Link
            to={yml.button.apply_button_link}
            state={{ course: yml.meta_info.bc_slug }}
          >
            <Button
              variant="full"
              justifyContent="center"
              width="200px"
              width_tablet="fit-content"
              color={Colors.blue}
              margin_tablet="10px 24px 10px 0"
              textColor="white"
            >
              {applyButtonText || apply_button_text}
              {/* {applyButtonText} */}
            </Button>
          </Link>
          <Button
            onClick={handleOpen}
            width="200px"
            width_tablet="fit-content"
            variant="outline"
            icon={
              <Icon
                icon="download"
                stroke={Colors.black}
                style={{ marginRight: "10px" }}
                width="46px"
                height="46px"
              />
            }
            color={Colors.black}
            margin="10px 0 50px 0"
            margin_tablet="0"
            textColor={Colors.black}
          >
            {syllabus_button_text}
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
            sendLabel={syllabus_button_text}
            formHandler={requestSyllabus}
            handleClose={handleClose}
            lang={pageContext.lang}
            redirect={
              pageContext.lang === "us" ? "/us/thank-you" : "/es/gracias"
            }
            data={{
              course: {
                type: "hidden",
                value: yml.meta_info.bc_slug,
                valid: true,
              },
            }}
          />
        </Modal>
      </Header>
      <Badges
        lang={pageContext.lang}
        padding_tablet="0px 64px"
        padding="0px"
        short_link={true}
        short_text="12px"
        paragraphStyles={{
          fontSize: "16px",
          fontSize_tablet: "16px",
          padding_tablet: "0px 64px 40px 64px",
          padding: "0px 47px 0 47px",
        }}
        paragraph={yml.badges.paragraph}
      />

      {/* <TechsWeTeach
        lang={pageContext.lang}
        data={data.allSoftwareEngineeringTechsYaml}
      /> */}

      <JobGuaranteeSmall
        content={data.allJobGuaranteeSmallYaml.edges[0].node}
      />
      <ProgramDetails
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_schedule}
        background={Colors.white}
      />
      <ProgramDetailsMobile
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_schedule}
      />

      {/* OVERLAPED CREAR EN EL YML*/}
      <Overlaped
        heading={yml.overlaped?.heading}
        content={yml.overlaped?.paragraph}
        button={yml.overlaped?.button}
        image={yml.overlaped?.image}
      />

      {/* GEEKSINFO IS A TWOCOLUMN WITH TITLE */}
      <GeeksInfo lang={pageContext.lang} />

      {/* TWO COLUMN CREAR EN EL YML*/}
      <TwoColumn
        left={{ image: yml.two_columns?.image, video: yml.two_columns?.video }}
        right={{
          heading: yml.two_columns?.heading,
          sub_heading: yml.two_columns?.sub_heading,
          bullets: yml.two_columns?.bullets,
          content: yml.two_columns?.content,
          button: yml.two_columns?.button,
        }}
        proportions={yml.two_columns?.proportions}
        session={session}
      />

      <UpcomingDates
        lang={pageContext.lang}
        message={courseDetails.upcoming?.no_dates_message}
        actionMessage={courseDetails.upcoming?.actionMessage}
        locations={data.allLocationYaml.edges}
        showMoreRedirect
      />

      <PricesAndPayment
        type={pageContext.slug}
        lang={pageContext.lang}
        locations={data.allLocationYaml.edges}
        defaultCourse={defaultCourse}
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
      />

      <ScholarshipProjects
        content={data.allScholarshipProjectsYaml.edges[0].node}
        lang={pageContext.lang}
      />

      <OurPartners
        images={hiring.partners.images}
        margin="0"
        padding="50px 0"
        marquee
        paddingFeatured="0 0 50px 0"
        featuredImages={landingHiring?.featured}
        showFeatured
        withoutLine
        title={landingHiring ? landingHiring.heading : hiring.partners.tagline}
        paragraph={
          landingHiring
            ? landingHiring.sub_heading
            : hiring.partners.sub_heading
        }
      />

      <Loc lang={pageContext.lang} allLocationYaml={data.allLocationYaml} />
    </>
  );
};

export const query = graphql`
  query CourseEngineeringQuery($file_name: String!, $lang: String!) {
    allSoftwareEngineeringTechsYaml(
      filter: { fields: { lang: { eq: $lang } } }
    ) {
      edges {
        node {
          title
          sub_title
          button {
            label
            url
          }
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 390
                height: 289
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
              )
            }
          }
          tech_list {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 100
                  height: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
          }
          fields {
            lang
          }
        }
      }
    }
    allCourseYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          course_instructors {
            header {
              title
              paragraph
            }
            instructors {
              name
              bio
              job
              degree
              github
              linkedin
              sub_title
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 500
                    placeholder: NONE
                    quality: 100
                    breakpoints: [200, 340, 420, 490]
                  )
                }
              }
            }
          }
          header {
            title
            paragraph
            image_alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
          }
          button {
            syllabus_heading
            syllabus_btn_label
            syllabus_motivation
            apply_button_link
            apply_button_text
          }
          meta_info {
            title
            description
            image
            keywords
            slug
            bc_slug
          }
          geek_data {
            heading
            geek_force
            geek_pal
          }
          badges {
            paragraph
          }
          credentials {
            heading
            paragraph
          }
          details {
            about {
              title
              sub_title
              list {
                label
                content
              }
            }
            heading
            sub_heading
            weeks
            week_unit
            left_labels {
              description
              projects
              duration
              skills
            }
            details_modules {
              title
              projects
              slug
              module_name
              duration
              description
              step
            }
          }
          syllabus {
            heading
            button_label
          }
          potential_companies {
            tagline
            sub_heading
            companies {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }
          two_columns {
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
            }
            button {
              text
              color
              background
              path
            }
            bullets {
              items {
                text
              }
            }
          }
          overlaped {
            heading
            paragraph
            button {
              text
              color
            }
            image {
              src
            }
          }
          geeks_vs_others {
            heading
            sub_heading
            sub_heading_link
          }
          prices {
            heading
            sub_heading
          }
          typical {
            heading
            sub_heading
            schedule {
              title
              time
              icon
              content
            }
          }
          alumni {
            heading
            sub_heading
          }
          sidebar {
            membership
            program
            geeks_vs_other
            pricing
            alumni
          }
        }
      }
    }
    allScholarshipProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          description
          project_name
          project_details
          total_cost
          geeks_benefited
          institutions
          press
          see_project
          projects {
            name
            image {
              alt
              src {
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
            }
            description
            details {
              cost
              geeks_benefited
            }
            institutions {
              name
              logo {
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
            }
            press {
              name
              link
            }
            pdf
          }
          fields {
            lang
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partners {
            tagline
            sub_heading
            footer_tagline
            footer_button
            footer_link
            images {
              name
              link
              follow
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 350
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
          }
          coding {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 300
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          influencers {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 300
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          financials {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 300
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
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
            testimonial_date
            include_in_marquee
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
                  height: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            short_content
            content
            source_url
            source_url_text
          }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          credentials {
            title
            icon
            value
          }
        }
      }
    }
    allJobGuaranteeSmallYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          icons {
            title
            icon
          }
          link {
            url
            label
          }
          text
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
            title
            image
            position
            visibility
            keywords
            redirects
            region
            cohort_exclude_regex
            cohort_include_regex
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
          chart_section {
            data {
              percentage
              color
              description
            }
          }
          button {
            apply_button_link
            apply_button_text
            cohort_more_details_text
            syllabus_button_text
            syllabus_submit_text
          }
        }
      }
    }
  }
`;
export default BaseRender(CourseEngineering);
