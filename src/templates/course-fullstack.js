import React, { useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import BaseRender from "./_baseLayout.js";
import { Header, Div } from "../components/Sections/index.js";
import { H3, H2, H5, H4, Paragraph } from "../components/Heading/index.js";
import { Button, Colors, Img } from "../components/Styling/index.js";
import { requestSyllabus, isCustomBarActive } from "../actions.js";
import { SessionContext } from "../session.js";
import ProgramDetails from "../components/ProgramDetails/index.js";
import ProgramDetailsMobile from "../components/ProgramDetailsMobile/index.js";
import PricesAndPayment from "../components/PricesAndPayment/index.js";
import Modal from "../components/Modal/index.js";
import LeadForm from "../components/LeadForm/index.js";
import Badges from "../components/Badges/index.js";
import UpcomingDates from "../components/UpcomingDates/index.js";
import JobGuaranteeSmall from "../components/JobGuaranteeSmall/index.js";
import GeeksInfo from "../components/GeeksInfo/index.js";
import OurPartners from "../components/OurPartners/index.js";
import Icon from "../components/Icon/index.js";
import Overlaped from "../components/Overlaped/index.js";
import Loc from "../components/Loc/index.js";
import TwoColumn from "../components/TwoColumn/index.js";

const Program = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;
  const landingHiring = yml.partners;

  const defaultCourse = "full-stack";
  const program_schedule = yml.meta_info.slug.includes("full-time")
    ? "full_time"
    : "part_time";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          isCustomBarActive(session) ? "120px auto 0 auto" : "40px auto 0 auto"
        }
        paragraphMargin="26px 20px"
        paragraphMargin_Tablet="26px 22%"
        paddingParagraph_tablet="0 40px"
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        padding_xxs="40px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px"
        position="relative"
        fontSize_title="40px"
        fontSize_xxs="32px"
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
        <Badges
          lang={pageContext.lang}
          short_link={true}
          short_text="12px"
          margin="0 0 40px 0"
          paragraph={yml.badges.paragraph}
        />
      </Header>
      <JobGuaranteeSmall
        content={data.allJobGuaranteeSmallYaml.edges[0].node}
      />
      <ProgramDetails
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_schedule}
      />
      <ProgramDetailsMobile
        details={courseDetails.details}
        lang={pageContext.lang}
        course={program_schedule}
      />

      {/* Two Columns Rigo */}
      <TwoColumn
        right={{
          image: yml.two_columns_rigo?.image,
          video: yml.two_columns_rigo?.video,
        }}
        left={{
          heading: yml.two_columns_rigo?.heading,
          heading_image: yml.two_columns_rigo?.heading_image,
          sub_heading: yml.two_columns_rigo?.sub_heading,
          bullets: yml.two_columns_rigo?.bullets,
          content: yml.two_columns_rigo?.content,
          button: yml.two_columns_rigo?.button,
        }}
        proportions={yml.two_columns_rigo?.proportions}
        session={session}
      />

      {/* OVERLAPED CREAR EN EL YML*/}
      <Overlaped
        heading={yml.overlaped?.heading}
        subtitle={yml.overlaped?.subtitle}
        content={yml.overlaped?.paragraph}
        button={yml.overlaped?.button}
        image={yml.overlaped?.image}
      />

      {/* GEEKSINFO Twocolumns Info*/}

      {yml.two_columns_info?.section_heading?.text && (
        <H2
          type="h2"
          textAlign_tablet="center"
          lineHeight="38px"
          lineHeight_tablet="38px"
          fontSize="35px"
          margin="80px 0 0px 0"
          style={
            yml.two_columns_info.section_heading.style
              ? JSON.parse(yml.two_columns_info.section_heading.style)
              : null
          }
        >
          {yml.two_columns_info.section_heading.text}
        </H2>
      )}

      <TwoColumn
        right={{
          image: yml.two_columns_info?.image,
          video: yml.two_columns_info?.video,
        }}
        left={{
          heading: yml.two_columns_info?.heading,
          sub_heading: yml.two_columns_info?.sub_heading,
          bullets: yml.two_columns_info?.bullets,
          content: yml.two_columns_info?.content,
          button: yml.two_columns_info?.button,
        }}
        proportions={yml.two_columns_info?.proportions}
        session={session}
      />

      {/* TWO COLUMN CREAR EN EL YML*/}
      <TwoColumn
        left={{ image: yml.two_columns?.image, video: yml.two_columns?.video }}
        right={{
          heading: {
            ...yml.two_columns?.heading,
            text:
              yml.two_columns?.heading?.text_by_location &&
              session?.location?.city?.toLowerCase() === "miami"
                ? yml.two_columns.heading.text_by_location.miami
                : yml.two_columns.heading.text_by_location?.default ||
                  yml.two_columns.heading.text,
          },
          sub_heading: {
            ...yml.two_columns?.sub_heading,
            text:
              yml.two_columns?.sub_heading?.text_by_location &&
              session?.location?.city?.toLowerCase() === "miami"
                ? yml.two_columns.sub_heading.text_by_location.miami
                : yml.two_columns.sub_heading.text_by_location?.default ||
                  yml.two_columns.sub_heading.text,
          },
          bullets: yml.two_columns?.bullets,
          content: yml.two_columns?.content,
          button: yml.two_columns?.button,
        }}
        proportions={yml.two_columns?.proportions}
        session={session}
      />

      <UpcomingDates
        lang={pageContext.lang}
        message={courseDetails.upcoming.no_dates_message}
        actionMessage={courseDetails.upcoming.actionMessage}
        locations={data.allLocationYaml.edges}
        defaultCourse={defaultCourse}
        showMoreRedirect
      />

      <PricesAndPayment
        background={`linear-gradient(to bottom, ${Colors.white} 50%, ${Colors.lightYellow2} 50%)`}
        type={pageContext.slug}
        lang={pageContext.lang}
        locations={data.allLocationYaml.edges}
        defaultCourse={defaultCourse}
        defaultSchedule={program_schedule}
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
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
      <DoubleActionCTA />
    </>
  );
};

export const query = graphql`
  query CourseQuery(
    $file_name: String!
    $lang: String!
    $related_clusters: [String]
  ) {
    allFullStackTechsYaml(filter: { fields: { lang: { eq: $lang } } }) {
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
    allMarkdownRemark(
      limit: 4
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { cluster: { in: $related_clusters } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            type
            pagePath
          }
          frontmatter {
            author
            date
            image
            slug
            title
            excerpt
            featured
            status
            cluster
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
            related_clusters
          }
          geek_data {
            heading
            geek_force
            geek_pal
          }
          details {
            about {
              title
              sub_title
              list {
                label
                content
                link
                link_text
                icon
              }
            }
            heading
            weeks
            week_unit
            sub_heading
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
          badges {
            paragraph
          }
          upcoming {
            no_dates_message
            actionMessage
          }
          credentials {
            heading
            paragraph
          }
          geeks_vs_others {
            heading
            sub_heading
            sub_heading_link
          }
          overlaped {
            heading
            subtitle
            paragraph
            button {
              text
              color
            }
            image {
              src
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
              text_by_location {
                miami
                default
              }
            }
            sub_heading {
              text
              font_size
              text_by_location {
                miami
                default
              }
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
            content {
              text
              style
            }
          }
          two_columns_rigo {
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
              style
              heading_image {
                src
              }
            }
            sub_heading {
              text
              font_size
              style
            }
            content {
              text
              style
            }
            bullets {
              items {
                heading
                text
              }
            }
          }
          two_columns_info {
            proportions
            image {
              style
              src
              shadow
            }
            section_heading {
              text
            }
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
                heading
                text
              }
            }
          }
          prices {
            heading
            sub_heading
            selector {
              top_label
              placeholder
            }
            button {
              text
              link
            }
          }
          typical {
            heading
            sub_heading
            schedule {
              title
              time
              icon
              content
              step
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
                  width: 200
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
                    width: 100
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
    allDoubleActionCtaYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          cta {
            title
            description
            primary {
              title
              description
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 900
                    quality: 100
                    placeholder: NONE
                  )
                }
              }
              action_text
              action_url
              benefits
              footer_text
            }
            secondary {
              title
              description
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 900
                    quality: 100
                    placeholder: NONE
                  )
                }
              }
              action_text
              action_url
              benefits
              footer_text
            }
            newsletter_form {
              placeholder_email
              error_email
              button_submit
              button_loading
              status_idle
              status_error
              status_correct_errors
              success_message
            }
          }
        }
      }
    }
  }
`;
export default BaseRender(Program);
