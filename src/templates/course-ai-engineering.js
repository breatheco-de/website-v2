import React, { useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import BaseRender from "./_baseLayout.js";
import { Header, Div } from "../components/Sections/index.js";
import { H3, H2, H5, H4, Paragraph } from "../components/Heading/index.js";
import { Button, Colors, Img } from "../components/Styling/index.js";
import { requestSyllabus, isCustomBarActive } from "../actions.js";
import { SessionContext } from "../session.js";
import PricesAndPayment from "../components/PricesAndPayment/index.js";
import UpcomingDates from "../components/UpcomingDates/index.js";
import Modal from "../components/Modal/index.js";
import LeadForm from "../components/LeadForm/index.js";
import Badges from "../components/Badges/index.js";
import JobGuaranteeSmall from "../components/JobGuaranteeSmall/index.js";
import OurPartners from "../components/OurPartners/index.js";
import Icon from "../components/Icon/index.js";
import Loc from "../components/Loc/index.js";
import DoubleActionCTA from "../components/DoubleActionCTA/index.js";
import TwoColumn from "../components/TwoColumn/index.js";
import Iconogram from "../components/Iconogram/index.js";
import ScholarshipSuccessCases from "../components/ScholarshipSuccessCases/index.js";
import Milestones from "../components/Milestones/index.js";
import StarRating from "../components/StarRating/index.js";
import ProgramDetails from "../components/ProgramDetails/index.js";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Program = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const courseDetails = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;
  const landingHiring = yml.partners;
  const doubleActionCTA = data.allDoubleActionCtaYaml.edges[0].node.cta;

  const defaultCourse = "ai-engineering";
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
      {/* 1. Hero section */}
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

      {/* 2. Badges */}
      <Badges
        lang={pageContext.lang}
        short_link={true}
        short_text="12px"
        margin="0 0 40px 0"
        paragraph={yml.badges.paragraph}
      />

      {/* 3. Why AI Engineering Now - Iconogram */}
      {yml.why_ai_engineering_now && (
        <Iconogram
          yml={{
            ...yml.why_ai_engineering_now,
            background: yml.why_ai_engineering_now.background || "#FFFFFF",
          }}
          index={0}
        />
      )}

      {/* 4. Why 4Geeks stands out - What Sets 4Geeks Apart */}
      {yml.what_sets_4geeks_apart && (
        <TwoColumn
          left={{
            image: yml.what_sets_4geeks_apart?.image,
          }}
          right={{
            heading: yml.what_sets_4geeks_apart?.heading,
            bullets: yml.what_sets_4geeks_apart?.bullets,
            button: yml.what_sets_4geeks_apart?.button,
          }}
          proportions={yml.what_sets_4geeks_apart?.proportions}
          session={session}
        />
      )}

      {/* 5. Program Details Component */}
      <ProgramDetails
        details={courseDetails.details}
        lang={pageContext.lang}
        withoutAnimation={true}
      />

      {/* 6. Milestones Component */}
      <Milestones
        milestones={courseDetails.milestones}
        lang={pageContext.lang}
      />

      {/* 7. Rating Reviews Component */}
      {yml.rating_reviews && (
        <Div
          background={
            Colors[yml.rating_reviews.background] ||
            yml.rating_reviews.background
          }
          padding="0 20px"
          padding_tablet="0 40px"
        >
          <Div
            padding="60px 0 60px 0"
            display="flex"
            flexDirection="column"
            margin="auto"
            width="100%"
            maxWidth="1280px"
          >
            {yml.rating_reviews.heading && (
              <H2 type="h2" padding="10px 0 60px 0">
                {yml.rating_reviews.heading}
              </H2>
            )}
            <Div
              display="flex"
              flexDirection="column"
              flexDirection_tablet="row "
              justifyContent="center"
              gap="45px"
              gap_tablet="24px"
            >
              {yml.rating_reviews.rating_list?.map((item, index) => {
                const imageData =
                  courseDetails.rating_reviews?.rating_list?.[index]?.image;
                return (
                  <Div
                    key={`rating-component-${item.alt || index}`}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    borderRadius="4px"
                    background="white"
                    width="100%"
                    padding="10px"
                  >
                    {imageData?.childImageSharp?.gatsbyImageData ? (
                      <GatsbyImage
                        style={{
                          height: "50px",
                          minWidth: "135px",
                          width: "135px",
                        }}
                        imgStyle={{ objectFit: "contain" }}
                        loading="eager"
                        alt={item.alt}
                        image={getImage(
                          imageData.childImageSharp.gatsbyImageData
                        )}
                      />
                    ) : (
                      <Img
                        src={item.image}
                        alt={item.alt}
                        style={{
                          height: "50px",
                          minWidth: "135px",
                          width: "135px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                    <StarRating rating={item.rating} />
                    <Paragraph
                      padding="6px 0"
                      fontSize="9px"
                      color={Colors.darkGray3}
                      fontWeight="bold"
                      textTransform="lowercase"
                    >
                      {`${item.rating} ${
                        pageContext.lang === "us" ? "On Reviews" : "En reseñas"
                      }`}
                    </Paragraph>
                  </Div>
                );
              })}
            </Div>
          </Div>
        </Div>
      )}

      {/* 8. How It Works - Iconogram */}
      {courseDetails.how_it_works && (
        <Iconogram
          yml={{
            ...courseDetails.how_it_works,
            background: courseDetails.how_it_works.background || "#0084FF",
          }}
          index={0}
        />
      )}

      {/* 9. Scholarship Success Cases */}
      <ScholarshipSuccessCases
        content={data.allScholarshipSuccessCasesYaml.edges[0].node}
      />

      {/* 7. Job Guarantee Small */}
      <JobGuaranteeSmall
        content={data.allJobGuaranteeSmallYaml.edges[0].node}
      />

      <UpcomingDates
        lang={pageContext.lang}
        message={courseDetails.upcoming?.no_dates_message}
        actionMessage={courseDetails.upcoming?.actionMessage}
        locations={data.allLocationYaml.edges}
        defaultCourse={defaultCourse}
        showMoreRedirect
      />

      {/* 10. Payment Component */}
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

      {/* 11. Two Column Right */}
      <TwoColumn
        right={{
          image: yml.two_column_program?.image,
          video: yml.two_column_program?.video,
        }}
        left={{
          heading: yml.two_column_program?.heading,
          sub_heading: yml.two_column_program?.sub_heading,
          bullets: yml.two_column_program?.bullets,
          content: yml.two_column_program?.content,
          button: yml.two_column_program?.button,
        }}
        proportions={yml.two_column_program?.proportions}
        session={session}
      />

      {/* 12. Who's Hiring - OurPartners */}
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

      {/* 13. Loc Component */}
      <Loc lang={pageContext.lang} allLocationYaml={data.allLocationYaml} />

      {/* 14. Footer - handled by Layout wrapper */}
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
                  layout: CONSTRAINED
                  width: 500
                  placeholder: NONE
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
          badges {
            paragraph
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
          milestones {
            title
            sub_title
            items {
              id
              title
              content
              bullets {
                items {
                  text
                }
              }
            }
          }
          how_it_works {
            background
            heading {
              text
              font_size
              style
            }
            icons {
              icon
              title
              content
              color
            }
          }
          why_ai_engineering_now {
            background
            swipable
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
            icons {
              icon
              title
              content
              color
            }
          }
          two_column_program {
            proportions
            image {
              style
              src
              shadow
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
            bullets {
              items {
                text
              }
            }
            button {
              text
              color
              background
              path
            }
          }
          rating_reviews {
            position
            heading
            background
            rating_list {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 1200
                    placeholder: NONE
                  )
                }
              }
              rating
              url
            }
          }
          what_sets_4geeks_apart {
            proportions
            image {
              style
              src
            }
            heading {
              text
              font_size
            }
            bullets {
              items {
                text
              }
            }
            button {
              text
              color
              background
              path
            }
          }
          upcoming {
            no_dates_message
            actionMessage
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
        }
      }
    }
    allScholarshipSuccessCasesYaml(
      filter: { fields: { lang: { eq: $lang } } }
    ) {
      edges {
        node {
          title
          subtitle
          contributor
          cases {
            name
            img {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 700
                  quality: 100
                  placeholder: NONE
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
                    layout: CONSTRAINED
                    width: 350
                    placeholder: NONE
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
                    layout: CONSTRAINED
                    width: 300
                    placeholder: NONE
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
                    layout: CONSTRAINED
                    width: 300
                    placeholder: NONE
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
                    layout: CONSTRAINED
                    width: 100
                    placeholder: NONE
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
                  layout: CONSTRAINED
                  width: 800
                  placeholder: NONE
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
              action_text
              action_url
              benefits
              footer_text
            }
            secondary {
              title
              description
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
