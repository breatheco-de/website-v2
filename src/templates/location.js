import React, { useState, useEffect, useRef, lazy } from "react";
import { graphql, Link } from "gatsby";
import process from "process";
import ChooseProgram from "../components/ChooseProgram";
import Badges from "../components/Badges";
import Loc from "../components/Loc";
import { isCustomBarActive } from "../actions";
import ChooseYourProgram from "../components/ChooseYourProgram";
import UpcomingDates from "../components/UpcomingDates";
import Staff from "../components/Staff";
import "dayjs/locale/de";
import { Div, GridContainer } from "../components/Sections";
import { H1, H2, H3, Paragraph } from "../components/Heading";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import BaseRender from "./_baseLayout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from "../components/Icon";
import { SessionContext } from "../session";
import JobGuaranteeSmall from "../components/JobGuaranteeSmall";
import RelatedPosts from "../components/RelatedPosts";
import FaqCard from "../components/FaqCard";
import TwoColumn from "../components/TwoColumn/index.js";
import GeeksInfo from "../components/GeeksInfo";
import MosaicImages from "../components/MosaicImages/index.js";
import OurPartners from "../components/OurPartners";
import Gallery from "../components/Gallery/index.js";

const MapFrame = lazy(() => import("../components/MapFrame"));

const Location = ({ data, pageContext, yml }) => {
  const { lang } = pageContext;
  const { session } = React.useContext(SessionContext);
  // const hiring = data.allPartnerYaml.edges[0].node;
  const hiring = yml.our_partners;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    process.nextTick(() => {
      if (globalThis.window ?? false) {
        setReady(true);
      }
    });
    // setTimeout(() => { setReady(true) }, 3000
  }, []);
  const chooseProgramRef = useRef(null);

  const showJobGuarantee =
    data.allJobGuaranteeSmallYaml.edges[0]?.node?.locations?.includes(
      yml.breathecode_location_slug
    );
  const slugsWithStaffPlacement = ["orlando", "downtown-miami", "tampa-usa"];
  const shouldPlaceUnderStaff = slugsWithStaffPlacement.includes(
    yml.breathecode_location_slug
  );

  const goToChooseProgram = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: chooseProgramRef.current?.offsetTop,
      behavior: "smooth",
    });
  };

  const open = {
    us: "Open on Maps",
    es: "Abrir Mapa",
  };
  const chooseButton = {
    us: "CHOOSE PROGRAM",
    es: "SELECCIONAR PROGRAMA",
  };

  return (
    <>
      <GridContainer
        padding="40px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px"
        columns_tablet="14"
        margin_md={
          isCustomBarActive(session)
            ? "120px auto 30px auto"
            : "72px auto 30px auto"
        }
        childMargin="auto"
        childMaxWidth="1280px"
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          padding_tablet="70px 0 0 0"
          padding={isCustomBarActive(session) ? "50px 25px 0 25px" : "0 25px"}
          gridColumn_tablet="1 / 7"
        >
          <H1 type="h1" textAlign="left" margin="0 0 11px 0" color="#606060">
            {yml.seo_title}
          </H1>
          <H2
            textAlign="left"
            fontSize="50px"
            lineHeight="60px"
            color={Colors.black}
          >
            {`${yml.header.tagline}`}
          </H2>
          <H3 textAlign="left" type="h3" margin="15px 0 25px 0">
            {yml.header.sub_header}
            <span style={{ color: Colors.blue }}>
              {yml.header.sub_header_highlighted}
            </span>
            {yml.header.paragraph}
          </H3>
          <ChooseProgram
            goTo={goToChooseProgram}
            right="15px"
            top="40px"
            textAlign="center"
            textAlign_tablet="left"
            openLabel={chooseButton[lang]}
            closeLabel={chooseButton[lang]}
          />
          {yml.address && (
            <Div
              alignItems="flex-start"
              margin="15px 0 0 0"
              margin_tablet="26px 0 0 0"
            >
              <Icon
                icon="location"
                style={{ marginRight: "10px", flexShrink: 0 }}
              />
              <Paragraph
                textAlign="left"
                opacity="1"
                fontWeight="700"
                lineHeight="22px"
                width="100%"
              >
                {yml.address}
                {!yml.address.includes("Only remotely") && (
                  <Link
                    target="_blank"
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      yml.address
                    )}`}
                    style={{ marginLeft: "5px", display: "inline" }}
                  >
                    {open[lang]}
                  </Link>
                )}
              </Paragraph>
            </Div>
          )}
          <Div
            display_tablet="flex"
            display="block"
            margin_tablet="0"
            margin="0 0 20px 0"
          >
            {(yml.phone || yml.info_box.whatsapp) && (
              <Paragraph
                textAlign_tablet="left"
                margin="15px 10px 0 0"
                margin_tablet="26px 10px 0 0"
                opacity="1"
                display="flex"
                alignItems="center"
                fontWeight="700"
                lineHeight="22px"
                maxWidth="255px"
                flexShrink="0"
              >
                {yml.info_box.whatsapp && yml.info_box.whatsapp_link ? (
                  <>
                    <Icon
                      icon="whatsapp"
                      width="20px"
                      style={{ marginRight: "10px", flexShrink: 0 }}
                    />
                    <a
                      href={yml.info_box.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      {yml.info_box.whatsapp}
                    </a>
                  </>
                ) : (
                  <>
                    <Icon
                      icon="phone"
                      style={{ marginRight: "10px", flexShrink: 0 }}
                    />
                    {yml.phone || yml.info_box.whatsapp}
                  </>
                )}
              </Paragraph>
            )}
            {yml.info_box.email && (
              <Paragraph
                textAlign_tablet="left"
                margin="15px 0 0 0"
                margin_tablet="26px 0 0 0"
                opacity="1"
                display="flex"
                alignItems="center"
                fontWeight="700"
                lineHeight="22px"
              >
                <Icon
                  icon="mail"
                  style={{ marginRight: "10px", flexShrink: 0 }}
                />
                {yml.info_box.email}
              </Paragraph>
            )}
          </Div>
        </Div>
        <Div
          height="auto"
          // width="100%"
          gridColumn_tablet="7 / 15"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height_tablet="495px"
            height_sm="280px"
            height="180px"
            image={yml.header.image.childImageSharp.gatsbyImageData}
            bgSize="contain"
            alt={yml.header.alt}
          />
        </Div>
      </GridContainer>

      <Badges
        lang={pageContext.lang}
        short_link={true}
        short_text="15px"
        margin="40px auto"
        paragraph={yml.badges.paragraph}
        bottom_paragraph
        maxWidth="1280px"
        paddingText_tablet="0 10% 55px 10%"
      />

      {yml.divider && (
        <Div
          flexDirection="column"
          background={Colors.blue}
          padding="20px 0"
          alignItems="center"
          margin="10px 0"
        >
          {yml.divider.heading && yml.divider.heading.text && (
            <Paragraph
              fontSize={yml.divider.heading.font_size[4] || "18px"}
              fontSize_xl={yml.divider.heading.font_size[0]}
              fontSize_md={yml.divider.heading.font_size[2]}
              fontSize_sm={yml.divider.heading.font_size[3]}
              color={Colors.white}
              textAlign="center"
              margin="0"
              maxWidth="80%"
              padding="0 20px"
              lineHeight="1.5"
            >
              {yml.divider.heading.text}
            </Paragraph>
          )}
        </Div>
      )}

      {showJobGuarantee && !shouldPlaceUnderStaff && (
        <JobGuaranteeSmall
          content={data.allJobGuaranteeSmallYaml.edges[0].node}
        />
      )}

      <TwoColumn
        left={{ image: yml.two_columns?.image, video: yml.two_columns?.video }}
        right={{
          heading: yml.two_columns?.heading,
          sub_heading: yml.two_columns?.sub_heading,
          bullets: yml.two_columns?.bullets,
          content:
            yml.two_columns?.content ||
            (yml.two_columns?.paragraph
              ? { text: yml.two_columns?.paragraph }
              : undefined),
          button: yml.two_columns?.button,
        }}
        proportions={yml.two_columns?.proportions}
        session={session}
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

      {/* GEEKSINFO IS A TWOCOLUMN WITH TITLE */}
      <GeeksInfo lang={pageContext.lang} />

      {yml?.images_box?.layout_horizontal ? (
        <Gallery
          images={yml?.images_box?.images}
          heading={yml?.images_box?.heading}
          paragraph={yml?.images_box?.content}
          widthImage="315px"
          heightImage="347px"
          previousArrow
          nextArrow
          //customSettingsCarousel={}
        />
      ) : (
        <MosaicImages
          images={yml?.images_box?.images}
          heading={yml?.images_box?.heading}
          paragraph={yml?.images_box?.content}
        />
      )}

      <ChooseYourProgram
        id="choose-program"
        chooseProgramRef={chooseProgramRef}
        lang={pageContext.lang}
        programs={data.allChooseYourProgramYaml.edges[0].node.programs}
      />
      <UpcomingDates
        lang={pageContext.lang}
        location={yml.breathecode_location_slug}
        locations={data.allLocationYaml.edges}
        message={yml.upcoming.no_dates_message}
        actionMessage={yml.upcoming.actionMessage}
        showMoreRedirect
      />

      <Staff lang={pageContext.lang} heading={yml?.staff?.heading} />

      {showJobGuarantee && shouldPlaceUnderStaff && (
        <JobGuaranteeSmall
          content={data.allJobGuaranteeSmallYaml.edges[0].node}
        />
      )}

      {/* IFRAME map
      <Div>
        {!ready ? (
          <H1>Loading Map...</H1>
        ) : (
          <Suspense fallback={<H1>Loading Map...</H1>}>
            {yml.info_box.iframeMapUrl === "" ? null : (
              <MapFrame
                src={ready ? yml.info_box.iframeMapUrl : "about:blank"}
                width="100%"
                height="492px"
              />
            )}
          </Suspense>
        )}
      </Div> */}

      {hiring && (
        <OurPartners
          images={hiring.images}
          variant="carousel"
          title={hiring.tagline}
          paragraph={hiring.sub_heading}
        />
      )}

      <FaqCard
        faqs={data.allFaqYaml.edges[0].node.faq}
        // topicSlug="enrollment"
        minPriority="1"
        locationSlug={yml.breathecode_location_slug}
      />

      <RelatedPosts
        lang={pageContext.lang}
        posts={data.allMarkdownRemark.edges}
        relatedClusters={yml.meta_info.related_clusters}
      />
      <Loc lang={pageContext.lang} allLocationYaml={data.locations} />
    </>
  );
};

export const query = graphql`
  query LocationQuery(
    $file_name: String!
    $lang: String!
    $related_clusters: [String]
  ) {
    allLocationYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          active_campaign_location_slug
          name
          breathecode_location_slug
          latitude
          longitude
          phone
          address
          header {
            tagline
            paragraph
            sub_heading
            sub_header
            sub_header_highlighted
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
          }
          button_header {
            button_text
            button_link
          }
          button {
            apply_button_link
            apply_button_text
            cohort_more_details_text
            syllabus_button_text
            syllabus_submit_text
          }
          badges {
            title
            paragraph
          }
          divider {
            heading {
              text
              font_size
              style
            }
          }
          our_partners {
            tagline
            images {
              name
              link
              follow
              featured
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 200
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }
          news {
            title
          }
          upcoming {
            no_dates_message
            actionMessage
          }
          info_box {
            heading
            map_url
            address
            iframeMapUrl
            phone
            email
            contact_heading
            whatsapp
            whatsapp_link
            open_on_maps
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
          }
          meta_info {
            slug
            title
            description
            image
            keywords
            related_clusters
          }
          images_box {
            heading
            content
            layout_horizontal
            images {
              path {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
            }
          }
          staff {
            heading
            sub_heading
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
            content {
              text
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
                icon
                icon_color
              }
            }
          }
        }
      }
    }
    locations: allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          city
          name
          meta_info {
            slug
            title
            description
            visibility
            position
            image
            keywords
            region
            cohort_exclude_regex
            cohort_include_regex
          }
          seo_title
          online_available
          active_campaign_location_slug
          breathecode_location_slug
        }
      }
    }
    allMarkdownRemark(
      limit: 3
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
    allFaqYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          faq {
            topic
            slug
            questions {
              locations
              priority
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
            link
            sub_title
            title
            description
            icon
            text_link
          }
        }
      }
    }
    allJobGuaranteeSmallYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          locations
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
                    width: 150
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

export default BaseRender(Location);
