import React, { useEffect, useMemo } from "react";
import { graphql } from "gatsby";
import { landingSections } from "../components/Landing";
import FollowBar from "../components/FollowBar";
import LeadForm from "../components/LeadForm";
import { Paragraph } from "../components/Heading";
import { GridContainerWithImage, Div, Grid } from "../components/Sections";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import BaseRender from "./_baseLandingLayout";
import { processFormEntry } from "../actions";
import { SessionContext } from "../session.js";
import LandingNavbar from "../components/NavbarDesktop/landing";
import LandingHeader from "../components/LandingHeader";

const Landing = (props) => {
  const { session } = React.useContext(SessionContext);
  const { data, pageContext, yml, filteredPrograms } = props;
  const [components, setComponents] = React.useState({});

  const applySchollarship =
    data.allLandingYaml.edges.length !== 0
      ? data.allLandingYaml.edges[0].node?.apply_schollarship
      : data.allDownloadableYaml.edges[0].node?.apply_schollarship;

  const programs = filteredPrograms.map((p) => ({
    label: p.apply_form.label,
    value: p.meta_info.bc_slug,
  }));

  const locations =
    (session &&
      session.locations
        ?.filter((loc) =>
          yml.meta_info.utm_location?.includes(loc.breathecode_location_slug)
        )
        .map((loc) => ({
          label: loc.name,
          value: loc.breathecode_location_slug,
        }))) ||
    [];

  useEffect(() => {
    let _components = {};
    if (yml.components)
      yml.components.forEach(({ name, ...rest }) => {
        _components[name] = rest;
      });
    setComponents({ ...yml, ..._components });
  }, [yml]);

  // data sent to the form already prefilled
  const preData = useMemo(() => {
    return {
      course: {
        type: "hidden",
        value:
          programs.length <= 1 ? programs[0].value : yml.meta_info?.utm_course,
        valid: true,
      },
      utm_location: {
        type: "hidden",
        value:
          locations.length <= 1
            ? locations[0]?.value
            : yml.meta_info.utm_location || null,
        valid: true,
      },
      utm_language: { type: "hidden", value: pageContext.lang, valid: true },
      automation: {
        type: "hidden",
        value: yml.meta_info.automation,
        valid: true,
      },
      tag: { type: "hidden", value: yml.meta_info.tag, valid: true },
      current_download: {
        type: "hidden",
        value: yml.meta_info.current_download,
        valid: true,
      },
      form_type: { type: "hidden", value: pageContext.type, valid: true },
    };
  }, []);

  // const landingLocation =
  //   session &&
  //   session.locations?.find(
  //     (l) => l.breathecode_location_slug === yml.meta_info.utm_location[0]
  //   );

  const landingLocation =
    session &&
    (yml.meta_info.utm_location?.length > 1
      ? session.locations?.find(
          (l) =>
            l.breathecode_location_slug ===
            yml.meta_info.utm_location?.find(
              (loc) => loc === session.location?.breathecode_location_slug
            )
        )
      : session.locations?.find(
          (l) =>
            Array.isArray(yml.meta_info.utm_location) &&
            l.breathecode_location_slug === yml.meta_info.utm_location[0]
        ));

  return (
    <>
      <LandingNavbar
        buttonText={
          yml.navbar
            ? yml.navbar.buttonText
            : pageContext.lang === "us"
            ? "Apply"
            : "¡Postúlate Ahora!"
        }
        buttonUrl={yml.navbar?.buttonUrl}
        logoUrl={yml.navbar?.logoUrl}
        lang={pageContext.lang}
      />
      <FollowBar
        position={yml.follow_bar.position}
        showOnScrollPosition={400}
        buttonText={yml.follow_bar.button.text}
        phone={
          yml.follow_bar.phone.number ||
          (landingLocation && landingLocation.phone)
        }
        phoneText={yml.follow_bar.phone.text}
        link={yml.follow_bar.button.path}
      >
        <Paragraph
          margin="0"
          fontWeight="800"
          alignSelf="center"
          color={Colors.black}
          textAlign="left"
          fontSize_tablet={yml.follow_bar.content.font_size[0]}
          fontSize={yml.follow_bar.content.font_size[4]}
        >
          {yml.follow_bar.content.text.split("\n").map((c, i) => (
            <span key={i} className="d-block d-xs-none w-100">
              {c}
            </span>
          ))}
          {yml.follow_bar.content.text_mobile &&
            yml.follow_bar.content.text_mobile.split("\n").map((c, i) => (
              <span key={i} className="d-none d-xs-block w-100">
                {c}
              </span>
            ))}
        </Paragraph>
      </FollowBar>
      <LandingHeader
        pageContext={pageContext}
        yml={yml}
        preData={preData}
        locations={locations}
        programs={programs}
        hideForm={yml.form.hide_form}
      />

      {Object.keys(components)
        .filter(
          (name) =>
            components[name] &&
            (landingSections[name] || landingSections[components[name].layout])
        )
        .sort((a, b) =>
          components[b].position > components[a].position ? -1 : 1
        )
        .map((name, index) => {
          const layout = components[name].layout || name;
          return landingSections[layout]({
            ...props,
            yml: components[name],
            session,
            course: yml.meta_info?.utm_course,
            location: components.meta_info?.utm_location,
            index: index,
          });
        })}
      <div id="bottom"></div>
      {!yml.form.hide_form && (
        <Grid
          id="bottom"
          imageSide={applySchollarship?.imageSide}
          padding="0"
          padding_tablet="50px 40px 90px 40px"
          padding_md="50px 80px 90px 80px"
          padding_lg="50px 0 90px 0"
          margin="0"
          margin_tablet="auto"
          gridTemplateColumns_tablet="repeat(16, 1fr)"
          maxWidth_tablet="1280px"
        >
          <Div
            //height="auto"
            width="100%"
            padding_tablet="0"
            style={{ position: "relative" }}
            gridColumn_tablet={
              applySchollarship?.imageSide === "right" ? "9/17" : "1/9"
            }
            // gridColumn_lg={
            //   applySchollarship?.imageSide === "right" ? "8/15" : "1/8"
            // }
            gridRow_tablet="1/1"
          >
            {applySchollarship?.imageSide === "right" ? (
              <>
                <Div
                  display="none"
                  display_md="none"
                  style={{
                    position: "absolute",
                    background: Colors.yellow,
                    width: "280px",
                    height: "480px",
                    bottom: "-10px",
                    right: "-16px",
                    borderRadius: "3px",
                  }}
                />
              </>
            ) : (
              <>
                <Div
                  display="none"
                  display_md="none"
                  style={{
                    position: "absolute",
                    background: "transparent",
                    width: "101%",
                    height: "282px",
                    top: "40px",
                    left: "-30px",
                    borderRadius: "3px",
                  }}
                />
              </>
            )}
            <StyledBackgroundSection
              height="450px"
              borderRadius="3px"
              image={
                applySchollarship
                  ? applySchollarship?.image.childImageSharp.gatsbyImageData
                  : data.allLandingYaml.edges[0].node.list?.[0]?.image
                      ?.childImageSharp?.gatsbyImageData
              }
              bgSize="contain"
              alt="geekforce image"
            />
          </Div>
          <Div
            flexDirection="column"
            margin="0"
            justifyContent_tablet="start"
            padding="0"
            padding_tablet="0"
            // gridArea_tablet={
            //   applySchollarship?.imageSide === "right" ? "1/1/1/6" : "1/7/1/14"
            // }
            gridColumn_tablet={
              applySchollarship?.imageSide === "right" ? "1/9" : "9/17"
            }
            //gridColumn_lg={applySchollarship?.imageSide === "right" ? "8/15" : "1/8"}
            gridRow_tablet="1/1"
          >
            <Div
              flexDirection="column"
              size="12"
              size_tablet="12"
              width="100%"
              width_tablet="100%"
              margin="0"
              textAlign_sm="center"
            >
              <LeadForm
                landingTemplate
                titleMargin="20px 0px 15px 0px"
                titleMargin_tablet="20px 0px 15px 0px"
                textPadding_tablet="6px 0px 20px 0px"
                textPadding="6px 0px 20px 0px"
                selectProgram={programs}
                selectLocation={locations}
                layout="block"
                background="#FFFFFF"
                margin="0"
                formHandler={processFormEntry}
                heading={yml.form.heading}
                style={{ minHeight: "350px" }}
                motivation={yml.form.motivation}
                sendLabel={yml.form.button_label}
                redirect={yml.form.redirect}
                inputBgColor="#FFFFFF"
                lang={pageContext.lang}
                fields={yml.form.fields}
                data={preData}
                justifyContentButton="center"
                widthButton="fit-content"
                //marginButton="15px auto 30px auto"
                marginButton_tablet={
                  applySchollarship?.imageSide === "right"
                    ? "15px auto 30px 0"
                    : "15px 0 30px auto"
                }
              />
            </Div>
          </Div>
        </Grid>
      )}
    </>
  );
};
export const query = graphql`
  query LandingNonavQuery(
    $file_name: String!
    $lang: String! # $utm_course: String
  ) {
    allLandingYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
            utm_course
            utm_location
            automation
            tag
          }
          follow_bar {
            position
            content {
              text
              text_mobile
              font_size
            }
            button {
              text
              path
            }
            phone {
              text
              number
            }
          }
          navbar {
            logoUrl
            buttonText
            buttonUrl
          }
          form {
            hide_form
            side_image
            heading
            motivation
            redirect
            fields
            button_label
          }
          features {
            marginTop
            text
            bullets
            styles
          }
          badges {
            position
            heading
          }
          short_badges {
            name
            url
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 120 # --> maxHeight
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          about4Geeks {
            position
            heading
            sub_heading
            list {
              title
            }
            paragraph
            button_text
            button_link
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            image_mobile {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }

          in_the_news {
            heading
            position
          }
          rating_reviews {
            position
            heading
            rating_list {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 1200
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              rating
              url
            }
          }
          program_details {
            position
            heading
            background
            sub_heading
          }
          why_4geeks {
            position
            heading
            sub_heading
            footer {
              text
              text_link
            }
          }
          alumni_projects {
            position
            heading
            sub_heading
          }
          who_is_hiring {
            position
            heading
            sub_heading
            featured {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }
          why_python {
            position
            heading
            sub_heading
          }
          apply_schollarship {
            imageSide
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 800
                  placeholder: NONE
                  quality: 100
                )
              }
            }
          }
          components {
            name
            position
            background
            swipable
            proportions
            layout
            justify
            videoHeight
            videoWidth
            text_link
            icons {
              icon
              title
              content
            }
            image {
              src
              style
              link
              shadow
            }
            programs {
              title
              sub_title
              icon
              description
              text_link
              link
            }
            video
            height
            button {
              text
              color
              path
              background
              hover_color
            }
            heading {
              text
              font_size
              style
            }
            sub_heading {
              text
              style
              font_size
            }
            bullets {
              item_style
              items {
                heading
                text
                icon
                icon_color
              }
            }
            background
            content {
              text
              style
              font_size
              path
            }
            cards {
              image {
                src
                style
              }
              heading {
                text
                font_size
              }
            }
            columns {
              size
              content {
                text
                font_size
              }
              image {
                src
                style
              }
            }
          }
          header_data {
            background
            tagline
            tagline_color
            sub_heading
            image_filter
            partner_logo_url {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 70
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            background_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            badge {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          geeks_vs_others {
            position
            heading
            paragraph

            total_rows
          }
        }
      }
    }
    allDownloadableYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
            automation
            tag
            current_download
          }
          follow_bar {
            position
            content {
              text
              text_mobile
              font_size
            }
            button {
              text
              path
            }
            phone {
              text
              number
            }
          }
          navbar {
            logoUrl
            buttonText
            buttonUrl
          }
          form {
            heading
            motivation
            redirect
            fields
            button_label
          }
          features {
            marginTop
            text
            bullets
            styles
          }
          badges {
            position
            heading
          }
          about4Geeks {
            position
            heading
            sub_heading
            list {
              title
            }
            paragraph
            button_text
            button_link
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            image_mobile {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }

          in_the_news {
            heading
            position
            filter
          }
          rating_reviews {
            position
            heading
            rating_list {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 1200
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              rating
              url
            }
          }
          program_details {
            position
            heading
            background
            sub_heading
          }
          why_4geeks {
            position
            heading
            sub_heading
            footer {
              text
              text_link
            }
          }
          alumni_projects {
            position
            heading
            sub_heading
          }
          who_is_hiring {
            position
            heading
            sub_heading
            featured {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }
          why_python {
            position
            heading
            sub_heading
          }
          apply_schollarship {
            imageSide
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 800
                  placeholder: NONE
                  quality: 100
                )
              }
            }
          }
          components {
            name
            position
            background
            proportions
            layout
            text_link
            icons {
              icon
              title
              content
            }
            image {
              src
              style
              link
            }
            programs {
              title
              sub_title
              icon
              description
              text_link
              link
            }
            video
            height
            button {
              text
              color
              path
            }
            heading {
              text
              font_size
            }
            sub_heading {
              text
              font_size
            }
            bullets {
              heading
              text
              icon
            }
            content {
              text
              font_size
            }
            columns {
              size
              content {
                text
                font_size
              }
              image {
                src
                style
              }
            }
          }
          header_data {
            tagline
            sub_heading
            image_filter
            partner_logo_url {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            background_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            badge {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          geeks_vs_others {
            position
            heading
            paragraph
            sub_heading
            total_rows
          }
          testimonial {
            position
            heading
            sub_heading
            students {
              name
              sub_heading
              comment
              video
            }
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
    allCourseYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          meta_info {
            slug
            title
            bc_slug
            visibility
            show_in_apply
          }
          apply_form {
            label
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
          details {
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
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          testimonials {
            student_name
            related_features
            testimonial_date
            hidden
            include_in_marquee
            student_thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            content
            source_url
            source_url_text
          }
        }
      }
    }
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          header {
            tagline
            sub_heading
          }
          project
          made_by
          description
          projects {
            project_name
            slug
            project_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            project_content
            project_video
            live_link
            github_repo
            alumni {
              first_name
              last_name
              job_title
              github
              linkedin
              twitter
            }
          }
          button_section {
            button_text
            button_link
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
                    width: 600
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(Landing, {
  landingNavbar: true,
  landingFooter: true,
});
