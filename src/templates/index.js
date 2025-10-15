import React, { useRef, useState, useContext, useEffect } from "react";
import { graphql, navigate } from "gatsby";
import { H1, H2, Paragraph } from "../components/Heading";
import { GridContainerWithImage, Div } from "../components/Sections";
import {
  Button,
  Colors,
  StyledBackgroundSection,
  MaskedIframe,
} from "../components/Styling";
import { Circle } from "../components/BackgroundDrawing";
import Iconogram from "../components/Iconogram";
import News from "../components/News";
import Icon from "../components/Icon";
import GeeksVsOthers from "../components/GeeksVsOthers";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session.js";
import Loc from "../components/Loc";
import With4Geeks from "../components/With4Geeks";
import TwoColumnCarousel from "../components/TwoColumnCarousel";
import ReactPlayer from "../components/ReactPlayer";
import OurPartners from "../components/OurPartners";
import ChooseYourProgram from "../components/ChooseYourProgram";
import Testimonials from "../components/Testimonials";
import TwoColumn from "../components/TwoColumn/index.js";
import Badges from "../components/Badges";

const Home = (props) => {
  const { data, pageContext, yml } = props;

  const hiring = data.allPartnerYaml.edges[0].node;
  const landingHiring = yml.partners;
  const { session } = useContext(SessionContext);
  const [city, setCity] = useState("");

  const applyButton = session?.location?.button?.apply_button_text;

  useEffect(() => {
    console.log("HASH: ", window.location);

    if (
      session.language === "es" &&
      window.location.hash === "" &&
      !RegExp("/es/inicio").test(window.location.href)
    )
      navigate("/es/inicio");

    if (session?.language && window && window.location.pathname === "/")
      navigate(
        `${
          props.pageContext.translations[
            session.language === "en" ? "us" : session.language
          ]
        }`
      );

    // It returns the 4Geeks Academy campus closest to the user's country
    setCity(session.location ? session.location.city : "");
  }, [session]);

  const chooseProgramRef = useRef(null);

  const isContentBarActive = true;

  const indexVideo = yml && yml.header_data && yml.header_data.video;
  const sessionVideo =
    session &&
    session.location &&
    session.location.meta_info &&
    session.location.meta_info.home_video;
  // Prioritize the page YML video over the location video
  const video = indexVideo && indexVideo !== "" ? indexVideo : sessionVideo;

  return (
    <>
      <Div
        flexDirection="column"
        margin_md={
          isContentBarActive ? "120px auto 108px auto" : "72px auto 108px auto"
        }
        maxWidth="1280px"
        padding_xxs="0px 0px"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0px"
      >
        <GridContainerWithImage
          padding="30px 0 0 0"
          padding_tablet="0"
          columns_tablet="2"
          margin_tablet="30px 0 20px 0"
          position="relative"
          gridColumn_tablet="1/15"
        >
          {(indexVideo || sessionVideo) && (
            <Div
              position="absolute"
              zIndex="5"
              left="74%"
              left_tablet="47%"
              top="0px"
              top_tablet="1%"
              width="70px"
              height="70px"
              width_tablet="160px"
              height_tablet="152px"
            >
              <Icon icon="logo-badge" width="100%" height="100%" />
            </Div>
          )}
          <Div
            flexDirection="column"
            alignItems="start"
            alignItems_tablet="start"
            margin_xxs="0 20px"
            margin_tablet="0px"
          >
            <Div
              flexDirection="column"
              alignItems="start"
              padding_tablet="0"
              margin_tablet="0"
              margin_sm="0 0 20px 0"
            >
              <H1
                type="h1"
                textAlign_tablet="start"
                textAlign_xxs="start"
                fontSize="40px"
                fontSize_tablet="55px"
                margin="20px 0 12px 0"
                lineHeight_xxs="45px"
                lineHeight_tablet="60px"
                width_tablet="100%"
                fontFamily="Archivo-Black"
                color={Colors.black}
                dangerouslySetInnerHTML={{ __html: yml.header_data.title }}
              />
              <H2
                type="h2"
                textAlign="left"
                textShadow="none"
                fontSize="21px"
                lineHeight="22.85px"
                fontWeight="400"
                color={Colors.black}
              >
                {yml.header_data.tagline}
              </H2>

              {yml.header_data.sub_heading && (
                <Paragraph
                  textAlign="left"
                  color={Colors.black}
                  fontSize="16px"
                  margin="10px 0 0 0"
                  dangerouslySetInnerHTML={{
                    __html: yml.header_data.sub_heading,
                  }}
                />
              )}

              <Div display="block" margin="20px 0">
                {yml.header_data.bullets.map((bullet) => (
                  <Div alignItems="center" margin="0 0 15px 0" gap="5px">
                    <Icon
                      icon="check"
                      fill={Colors.blue}
                      color={Colors.blue}
                      width="20px"
                      height="15px"
                    />
                    <Paragraph
                      textAlign="left"
                      padding_tablet="0 20% 0 0"
                      color={Colors.black}
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    />
                  </Div>
                ))}
              </Div>
              <Div
                width="100%"
                justifyContent_tablet="start"
                justifyContent="center"
              >
                <Button
                  variant="full"
                  justifyContent="center"
                  width="100%"
                  width_tablet="fit-content"
                  color={Colors.blue}
                  margin="0 10px 0 0"
                  textColor="white"
                  textTransform="none"
                  fontSize="17px"
                  borderRadius="4px"
                  onClick={() => {
                    if (
                      yml.header_data.join_button_path &&
                      yml.header_data.join_button_path.indexOf("http") > -1
                    )
                      window.open(
                        transferQuerystrings(
                          yml.header_data.join_button_path,
                          utm
                        )
                      );
                    else navigate(yml.header_data.join_button_path);
                  }}
                >
                  {yml.header_data.join_button_text}
                </Button>
              </Div>
            </Div>
          </Div>
          <Div display="flex" height="auto" width="100%">
            {indexVideo || sessionVideo ? (
              <Div
                height_tablet="623px"
                width="100%"
                className="wrapper-container"
                position="relative"
                padding_tablet="50px 0 0 0"
                padding="0"
                overflow="hidden"
              >
                <Circle
                  color="black"
                  width="119px"
                  height="11px"
                  border="10px"
                  bottom="60px"
                  right="-30px"
                  zIndex="1"
                  display="none"
                  display_tablet="inline"
                />
                <Circle
                  color="black"
                  width="50px"
                  height="11px"
                  border="10px"
                  bottom="60px"
                  right="100px"
                  zIndex="1"
                  display="none"
                  display_tablet="inline"
                />
                <Circle
                  color="yellow"
                  opacity="0.2"
                  width="200px"
                  height="200px"
                  bottom="100px"
                  right="-80px"
                  zIndex="1"
                  display="none"
                  display_tablet="inline"
                />
                <Div
                  width="90%"
                  width_sm="335px"
                  width_tablet="368px"
                  height="427px"
                  height_tablet="469px"
                  margin="0 auto"
                  margin_tablet="0"
                  margin_lg="0 auto"
                  margin_md="0 auto"
                  zIndex="2"
                  overflow="hidden"
                  borderRadius="24px"
                >
                  <MaskedIframe
                    src={video}
                    allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                    title="VideoAsk"
                  />
                </Div>
              </Div>
            ) : (
              <StyledBackgroundSection
                height_tablet="533px"
                display_tablet="block"
                display="none"
                height="390px"
                width="100%"
                image={
                  yml.header_data.image &&
                  yml.header_data.image.childImageSharp.gatsbyImageData
                }
                alt="Hero image"
                bgSize="contain"
              />
            )}
          </Div>
        </GridContainerWithImage>

        <Div
          margin="70px auto 0 auto"
          margin_tablet="30px auto 0 auto"
          width="100%"
          className="badge-slider hideOverflowX__"
        >
          <News
            lang={pageContext.lang}
            limit={yml.news.limit}
            height="45px"
            margin="0"
            justifyContent="between"
          />
        </Div>
      </Div>
      <Div
        margin="0 auto"
        padding="80px 0 40px 0"
        margin_tablet="0 auto"
        width="100%"
        className="badge-slider hideOverflowX__"
        background={Colors.veryLightBlue3}
      >
        <Badges
          variant="squares"
          lang={pageContext.lang}
          short_text="15px"
          margin="0 auto"
          title={yml.badges.title}
          paragraph={yml.badges.paragraph}
          maxWidth="1280px"
          paddingText_tablet="0 10% 5px 10%"
        />
      </Div>
      <Div background={Colors.veryLightBlue3} display="block">
        <TwoColumn
          left={{ image: yml.why_4geeks?.image }}
          right={{
            heading: yml.why_4geeks?.heading,
            sub_heading: yml.why_4geeks?.sub_heading,
            content: yml.why_4geeks?.content,
            bullets: yml.why_4geeks?.bullets,
            button: {
              ...yml.why_4geeks?.button,
              text: applyButton || yml.why_4geeks?.button?.text,
            },
          }}
          proportions={yml.why_4geeks?.proportions}
          session={session}
        />
      </Div>
      <Iconogram yml={yml.iconogram} background={Colors.veryLightBlue3} />

      {/* Two Columns Rigo */}
      <Div background={Colors.veryLightBlue3} display="block">
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
          }}
          proportions={yml.two_columns_rigo?.proportions}
          session={session}
        />
      </Div>

      {yml.choose_program && (
        <ChooseYourProgram
          chooseProgramRef={chooseProgramRef}
          id="choose-program"
          lang={pageContext.lang}
          programs={data.allChooseYourProgramYaml.edges[0].node.programs}
          title={yml.choose_program.title}
          paragraph={yml.choose_program.paragraph}
          background={Colors.veryLightBlue3}
        />
      )}

      <GeeksVsOthers
        lang={pageContext.lang}
        mainBackround={Colors.white}
        limit={5}
        style={{
          background: Colors.veryLightBlue3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "20px 40px",
          margin: "0 auto",
        }}
        title={yml.geeks_vs_others.heading}
        paragraph={yml.geeks_vs_others.sub_heading}
        link
      />
      {yml.two_column_carousel && (
        <TwoColumnCarousel
          title={
            <div
              style={{ padding: "0 10px" }}
              dangerouslySetInnerHTML={{
                __html: yml.two_column_carousel.title,
              }}
            />
          }
          text={
            <div
              style={{ padding: "0 10px", textAlign: "justify" }}
              dangerouslySetInnerHTML={{ __html: yml.two_column_carousel.text }}
            />
          }
          background={Colors.veryLightBlue3}
          carouselProps={{
            margin: "0px",
            margin_tablet: "0px",
          }}
        >
          {yml.two_column_carousel.videos.map((elem) => (
            <Div
              key={elem.video}
              borderRadius="4px"
              border={`1px solid ${Colors.black}`}
            >
              <ReactPlayer
                margin_tablet="0px 0px"
                thumb={elem.src}
                id={elem.video}
                width="100%"
                width_tablet="100%"
                style={{ height: "400px", width: "100%" }}
                videoHeight="400px"
              />
            </Div>
          ))}
        </TwoColumnCarousel>
      )}

      {/* TWO COLUMN CREAR EN EL YML*/}
      <Div display="block" background={Colors.veryLightBlue3} padding="40px 0">
        <H2 type="h2" textAlign_tablet="center">
          {yml.two_columns.section_heading.text}
        </H2>
        <TwoColumn
          right={{ image: yml.two_columns?.image }}
          left={{
            heading: yml.two_columns?.heading,
            sub_heading: yml.two_columns?.sub_heading,
            button: yml.two_columns?.button,
            content: yml.two_columns?.content,
            justify: yml.two_columns?.justify,
            // Removed boxes
            padding_tablet: "0",
          }}
          proportions={yml.two_columns?.proportions}
          session={session}
        />
      </Div>
      <With4Geeks
        lang={pageContext.lang}
        background={Colors.veryLightBlue3}
        sessionLocation={
          session &&
          session.location &&
          session.location.breathecode_location_slug
        }
        playerHeight="600px"
        title={yml.with_4geeks.title}
        subtitle={yml.with_4geeks.sub_title}
      />

      <OurPartners
        multiLine
        background={Colors.veryLightBlue3}
        images={hiring.partners.images}
        featuredImages={landingHiring?.featured}
        variant="carousel"
        title={landingHiring ? landingHiring.heading : hiring.partners.tagline}
        paragraph={
          landingHiring
            ? landingHiring.sub_heading
            : hiring.partners.sub_heading
        }
      />
      <Loc
        background={Colors.veryLightBlue3}
        lang={pageContext.lang}
        allLocationYaml={data.allLocationYaml}
        hideHeading
      />
    </>
  );
};
export const query = graphql`
  query HomeBackupQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
          }
          header_data {
            tagline
            title
            sub_heading
            bullets
            join_button_text
            join_button_path
            free_button_text
            free_button_path
            video
            image {
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
          }
          badges {
            title
            paragraph
          }
          news {
            limit
            heading
          }
          button {
            button_text
            button_link
          }
          choose_program {
            title
            paragraph
          }
          why_4geeks {
            proportions
            image {
              style
              src
              shadow
            }
            heading {
              text
              style
            }
            sub_heading {
              text
            }
            content {
              text
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
                icon
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
            section_heading {
              text
            }
            heading {
              text
              style
            }
            content {
              text
              path
            }
            button {
              text
              color
              background
              path
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
            }
            content {
              text
              style
            }
          }
          geeks_vs_others {
            heading
            sub_heading
          }
          iconogram {
            heading {
              text
              style
            }
            swipable
            background
            icons {
              icon
              color
              content
              content_style
            }
          }
          with_4geeks {
            title
            sub_title
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
              locations
              link
              follow
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    width: 200
                    placeholder: NONE
                  )
                }
              }
              featured
            }
          }
        }
      }
    }
    allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          active_campaign_location_slug
          breathecode_location_slug
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
          }
          fields {
            lang
            file_name
          }
          seo_title
          online_available
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
                  layout: CONSTRAINED
                  height: 14
                  placeholder: NONE
                )
              }
            }
            student_thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  height: 200
                  placeholder: NONE
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
    allChooseYourProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            link
            sub_title
            title
            description
            description_mobile
            icon
            text_link
          }
        }
      }
    }
  }
`;

export default BaseRender(Home);
