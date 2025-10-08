import React, { useState } from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import {
  Header,
  Div,
  Grid,
  GridContainer,
  GridContainerWithImage,
} from "../components/Sections";
import {
  Title,
  H1,
  H2,
  H3,
  H4,
  H5,
  Span,
  Paragraph,
} from "../components/Heading";
import { Button, Colors, StyledBackgroundSection } from "../components/Styling";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
import ProgramDetails from "../components/ProgramDetails";
import PricesAndPayment from "../components/PricesAndPayment";
import UpcomingDates from "../components/UpcomingDates";
import GeeksInfo from "../components/GeeksInfo";
import Testimonials from "../components/Testimonials";
import OurPartners from "../components/OurPartners";
import Icon from "../components/Icon";
import ScrollSpy from "../components/ScrollSpy";
import Card from "../components/Card";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const CodingBootcamp = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const pageDetails = data.allPageYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;

  const defaultCourse = "full-stack";

  const [toggleIndex, setToggleIndex] = useState();

  const [buttonToggle, setButtonToggle] = useState(false);

  return (
    <>
      <GridContainerWithImage
        id="bottom"
        background={Colors.veryLightBlue2}
        imageSide="right"
        padding={
          isCustomBarActive(session)
            ? "180px 12px 72px 12px"
            : "140px 12px 72px 12px"
        }
        columns_tablet="14"
        margin="0"
        margin_tablet="0"
      >
        <Div
          flexDirection="column"
          margin="0"
          justifyContent_tablet="start"
          padding_tablet="0 30px"
          gridArea_tablet="1/1/1/6"
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
            <H1
              type="h1"
              margin="0 0 11px 0"
              textAlign_tablet="left"
              color="#606060"
            >
              {yml.seo_title}
            </H1>
            <H2
              type="h2"
              padding="0"
              textAlign_tablet="left"
              fontSize="40px"
              fontSize_tablet="50px"
              lineHeight="60px"
            >
              {yml.header.title}
            </H2>
            <Paragraph
              padding="0"
              textAlign_tablet="left"
              letterSpacing="0.05em"
              margin="26px 0"
            >
              {yml.header.paragraph}
            </Paragraph>
          </Div>
        </Div>
        <Div
          height="auto"
          width="100%"
          gridArea_tablet="1/7/1/13"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height={`350px`}
            borderRadius={`3px`}
            image={yml.header.image}
            bgSize="contain"
            alt={yml.header.image_alt}
          />
        </Div>
      </GridContainerWithImage>

      <Div
        display="flex"
        background={Colors.white}
        style={{
          borderBottom: "1px solid #EBEBEB",
          overflowX: "auto",
          zIndex: "999",
          position: "sticky",
          top: isCustomBarActive(session) ? 50 : 0,
        }}
        padding="0 35px"
        alignItems="center"
        flexDirection="row"
        gap="40px"
        width="100%"
        height="70px"
        className="scroll-spy-container"
      >
        <ScrollSpy offsetTop={80} autoScrollOffsetTop={-70}>
          {yml.sticky_nav.map((nav, i) => (
            <button
              key={`${i}-${nav.href}`}
              width="auto"
              padding="0 20px"
              href={nav.href}
              ref={React.createRef()}
            >
              <Paragraph textTransform="uppercase" width="max-content">
                {nav.title}
              </Paragraph>
            </button>
          ))}
        </ScrollSpy>
      </Div>

      <ProgramDetails
        id="about_the_program"
        withoutAnimation
        background={Colors.white}
        details={pageDetails.details}
        lang={pageContext.lang}
        course={"part-time"}
      />

      <GridContainerWithImage
        id="what_will_you_learn"
        background={Colors.lightYellow}
        imageSide="left"
        padding="82px 0"
        columns_tablet="14"
        margin="0"
        margin_tablet="0"
      >
        <Div
          height="auto"
          width="100%"
          gridArea_tablet="1/1/1/6"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height={`350px`}
            borderRadius={`3px`}
            image={yml.what_will_you_learn.image}
            bgSize="contain"
            alt={yml.what_will_you_learn.image_alt}
          />
        </Div>
        <Div
          flexDirection="column"
          margin="0"
          justifyContent_tablet="start"
          padding_tablet="0 30px"
          gridArea_tablet="1/7/1/13"
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
            <H2
              type="h2"
              padding="0 0 14px 0"
              textAlign_tablet="left"
              fontSize="30px"
              fontSize_tablet="30px"
              lineHeight="60px"
            >
              {yml.what_will_you_learn.heading}
            </H2>
            {yml.what_will_you_learn.sub_title.split("\n").map((m, i) => (
              <Paragraph
                key={i}
                padding="0"
                textAlign_tablet="left"
                letterSpacing="0.05em"
                margin="10px 0"
              >
                {m}
              </Paragraph>
            ))}
          </Div>
        </Div>
      </GridContainerWithImage>

      <GridContainerWithImage
        id="what_does_it_mean_full_stack_developer"
        background={Colors.white}
        imageSide="right"
        padding="82px 0"
        columns_tablet="14"
        margin="0"
        margin_tablet="0"
      >
        <Div
          flexDirection="column"
          margin="0"
          justifyContent_tablet="start"
          padding_tablet="0 30px"
          gridArea_tablet="1/1/1/7"
        >
          <Div
            flexDirection="column"
            size="12"
            size_tablet="12"
            width="100%"
            width_tablet="100%"
            margin="0"
            padding="0 10px"
            textAlign_sm="center"
          >
            <H2
              type="h2"
              padding="0 0 14px 0"
              textAlign_tablet="left"
              fontSize="22px"
              fontSize_tablet="22px"
              lineHeight="60px"
            >
              {yml.content_with_subtitle_and_image.heading}
            </H2>
            {yml.content_with_subtitle_and_image.list.map((m, i) => (
              <React.Fragment key={i}>
                {m.label && (
                  <H3
                    type="h3"
                    width="fit-content"
                    lineHeight="22px"
                    padding="0 4px"
                    margin="20px 0 8px 0"
                    background={Colors.yellow}
                    textAlign_tablet="left"
                    fontSize="15px"
                  >
                    {m.label}
                  </H3>
                )}
                {m.content.split("\n").map((content, i) => (
                  <Paragraph
                    key={i}
                    padding="0"
                    textAlign="left"
                    letterSpacing="0.05em"
                    margin="10px 0"
                  >
                    {/* Text without <strong> tag */}
                    {content.split("<strong>")[0] || ""}

                    {/* Extracts the <strong> tag and render a text with font weight: bold  */}
                    {content.match("<strong>(.*?)</strong>") && (
                      <H3
                        display="initial"
                        color={Colors.black}
                        padding="0"
                        fontSize="15px"
                        fontWeight="900"
                        textAlign="left"
                        letterSpacing="0.05em"
                        margin="10px 0"
                      >
                        {content.match("<strong>(.*?)</strong>")[1]}
                      </H3>
                    )}
                  </Paragraph>
                ))}
              </React.Fragment>
            ))}
          </Div>
        </Div>
        <Div
          height="auto"
          width="100%"
          gridArea_tablet="1/8/1/13"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height={`800px`}
            borderRadius={`3px`}
            image={yml.content_with_subtitle_and_image.image}
            bgSize="contain"
            alt={yml.content_with_subtitle_and_image.image_alt}
          />
        </Div>
        <Div
          display="none"
          display_tablet="block"
          style={{ right: "0", position: "absolute" }}
        >
          <svg
            width="525"
            style={{ zIndex: "99", right: "0", position: "absolute" }}
            height="762"
            viewBox="0 0 525 762"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="422.5"
              cy="619.5"
              r="142.5"
              fill="#FFB718"
              fillOpacity="0.2"
            />
            <circle cx="41" cy="542" r="41" fill="#FFB718" />
            <circle
              cx="414.5"
              cy="308.5"
              r="8.5"
              transform="rotate(-180 414.5 308.5)"
              fill="black"
            />
            <circle cx="356.5" cy="26.5" r="26.5" fill="#0097CD" />
            <circle cx="177.5" cy="24.5" r="6.5" fill="#CD0000" />
          </svg>
        </Div>
      </GridContainerWithImage>

      <GridContainer
        id="tools_and_tech"
        padding="60px 4%"
        gridGap="0px"
        padding_tablet="80px 20%"
        github={`/page/faq.${pageContext.lang}.yml`}
        background={Colors.verylightGray}
      >
        {yml.tools_and_tech.map((item, i) => (
          <React.Fragment key={`${i}-${item.topic}`}>
            <H3
              type="h3"
              fontSize="20px"
              borderBottom="1px solid #C4C4C4"
              padding="0 30px 30px 30px"
            >
              {item.topic}
            </H3>
            {item.list.map((tech, i) => (
              <Card
                key={`${i}-${tech.title}`}
                // color={buttonToggle && tech.title == toggleIndex}
                height="auto"
                width="100%"
                borders="0"
                color="verylightGray"
                borderBottom="1px solid #C4C4C4"
                padding="20px 10px"
                onClick={() =>
                  toggleIndex === tech.title
                    ? (setToggleIndex(undefined),
                      setButtonToggle(!buttonToggle))
                    : (setToggleIndex(tech.title), setButtonToggle(true))
                }
              >
                <Div display="block" height="100%">
                  <Div
                    onClick={() => {
                      setButtonToggle(!buttonToggle),
                        setToggleIndex(
                          toggleIndex != undefined ? undefined : tech.title
                        );
                    }}
                    display="flex"
                    width="100%"
                    align={`center`}
                    alignSelf="center"
                  >
                    <GatsbyImage
                      style={{
                        height: "20px",
                        minWidth: "20px",
                        width: "min-content",
                        margin: "0 20px 0 0",
                      }}
                      imgStyle={{ objectFit: "contain" }}
                      loading="eager"
                      draggable={false}
                      alt={tech.title}
                      image={getImage(
                        tech.image.childImageSharp.gatsbyImageData
                      )}
                    />
                    <H4
                      type="h4"
                      textAlign="left"
                      fontSize="14px"
                      align="left"
                      align_sm="left"
                      color={Colors.black}
                      paddingRight="5%"
                      textTransform="uppercase"
                      fontWeight="700"
                    >
                      {tech.title}
                    </H4>
                    {buttonToggle === false ? (
                      toggleIndex !== tech.title && (
                        <Icon icon="plus" width="24" />
                      )
                    ) : buttonToggle === true && toggleIndex === tech.title ? (
                      <Icon icon="minus" width="24" />
                    ) : (
                      <Icon icon="plus" width="24" />
                    )}
                  </Div>
                  <Div size="12" size_sm="12" alignSelf="center">
                    {buttonToggle === true && toggleIndex === tech.title && (
                      <Paragraph
                        textAlign="left"
                        letterSpacing="0.05em"
                        lineHeight="22px"
                        fontWeight="normal"
                        dangerouslySetInnerHTML={{ __html: tech.description }}
                        margin={`20px 0 0 0`}
                        align_sm="left"
                        fontFamily="Lato, sans-serif"
                      ></Paragraph>
                    )}
                  </Div>
                </Div>
              </Card>
            ))}
          </React.Fragment>
        ))}
      </GridContainer>

      <GridContainer
        id="what_includes"
        padding="60px 10px"
        gridGap="0px"
        padding_tablet="80px 0"
        github={`/page/faq.${pageContext.lang}.yml`}
        background={Colors.white}
      >
        {yml?.what_includes.map((l, i) => (
          <React.Fragment key={`${i}-${l.title}`}>
            <H3 type="h3" fontSize="20px" padding="0 30px 30px 30px">
              {l.title}
            </H3>
            <Paragraph
              textAlign="center"
              letterSpacing="0.05em"
              lineHeight="22px"
              fontWeight="normal"
              margin="20px 0"
              padding="0 4%"
              padding_tablet="0 16%"
              fontFamily="Lato, sans-serif"
            >
              {l.description}
            </Paragraph>
            <GridContainer
              padding_tablet="0"
              containerColumns_tablet="1fr repeat(12, 1fr) 1fr"
              margin_tablet="3% 0 6% 0"
              margin="5% 0"
            >
              <Div
                height="2px"
                background="#ACACAC"
                style={{ opacity: "0.5" }}
              ></Div>
            </GridContainer>
            <Grid
              gap="25px"
              gridTemplateColumns_tablet="repeat(2, 1fr)"
              style={{ columnGap: "2.25rem", boxSizing: "border-box" }}
              justifyContent="center"
              padding="0 6%"
            >
              {l.list.map((item, i) => (
                <Div
                  key={`${i}-${item.title}`}
                  display="flex"
                  flexDirection="row"
                  style={{ position: "relative" }}
                  gap="12px"
                  width="100%"
                  width_tablet="100%"
                >
                  <Div height="100%">
                    <Icon icon={item.icon} width="70px" height="54px" />
                  </Div>
                  <Div height="100%" display="flex" flexDirection="column">
                    <H4
                      type="h4"
                      textAlign="left"
                      fontSize="14px"
                      align="left"
                      align_sm="left"
                      color={Colors.black}
                      textTransform="uppercase"
                      fontWeight="700"
                    >
                      {item.title}
                    </H4>
                    <Paragraph
                      textAlign="left"
                      letterSpacing="0.05em"
                      lineHeight="22px"
                      fontWeight="normal"
                      margin="20px 0"
                      align_sm="left"
                      fontFamily="Lato, sans-serif"
                    >
                      {item.description}
                    </Paragraph>
                  </Div>
                </Div>
              ))}
            </Grid>
          </React.Fragment>
        ))}
      </GridContainer>
      <GridContainer padding_tablet="0" margin_tablet="0 0 62px 0">
        <Div height="1px" background="#EBEBEB"></Div>
      </GridContainer>
      <UpcomingDates
        style={{
          padding: "40px 0",
        }}
        id="upcoming_dates"
        lang={pageContext.lang}
        message={pageDetails.upcoming.no_dates_message}
        locations={data.allLocationYaml.edges}
        showMoreRedirect
      />
      <GridContainer padding_tablet="0" margin_tablet="0 0 62px 0">
        <Div height="1px" background="#EBEBEB"></Div>
      </GridContainer>

      <Div id="prices_and_payment" display="block" height="auto">
        <PricesAndPayment
          // id="prices_and_payment"
          background={`linear-gradient(to bottom,
          ${Colors.white} 0%,
          ${Colors.white} 50%,
          ${Colors.lightYellow} 50%,
          ${Colors.lightYellow} 100%
        )`}
          type={pageContext.slug}
          lang={pageContext.lang}
          locations={data.allLocationYaml.edges}
          defaultCourse={defaultCourse}
          title={yml.prices.heading}
          paragraph={yml.prices.sub_heading}
        />
      </Div>

      <Testimonials
        id="testimonials"
        categories={["full-stack", "content-and-syllabus", "job-guarantee"]}
        lang={data.allTestimonialsYaml.edges}
        background={Colors.white}
      />
    </>
  );
};

export const query = graphql`
  query ProgrammingCourseQuery($file_name: String!, $lang: String!) {
    allFullStackTechsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          sub_title
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
    allPageYaml(
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
          what_will_you_learn {
            heading
            sub_title
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
            image_alt
          }
          sticky_nav {
            title
            href
          }
          content_with_subtitle_and_image {
            heading
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
            image_alt
            list {
              label
              content
            }
          }
          tools_and_tech {
            topic
            list {
              title
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 30
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    quality: 100
                    # breakpoints:	[200, 340, 520, 890]
                  )
                }
              }
              description
            }
          }
          what_includes {
            title
            description
            list {
              title
              icon
              description
            }
          }
          button {
            syllabus_heading
            syllabus_btn_label
            syllabus_motivation
            apply_button_link
          }
          meta_info {
            title
            description
            image
            keywords
            slug
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
              }
            }
            heading
            weeks
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
            related_features
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
                    width: 150
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
          influencers {
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
            image
            position
            visibility
            keywords
            redirects
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

export default BaseRender(CodingBootcamp);
