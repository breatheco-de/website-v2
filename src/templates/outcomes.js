import React, { useState } from "react";
import { graphql } from "gatsby";
import { Div, Header, GridContainer, Grid } from "../components/Sections";
import { H2, H3, H4, Paragraph } from "../components/Heading";
import { Colors, Button } from "../components/Styling";
import { Charts } from "../components/Chart";
import Badges from "../components/Badges";
import DraggableDiv from "../components/DraggableDiv";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import BaseRender from "./_baseLayout";
import { StyledBackgroundSection } from "../components/Styling";
import Modal from "../components/Modal";
import LeadForm from "../components/LeadForm";
import { outcomesReport } from "../actions";
import { SessionContext } from "../session";
import { isCustomBarActive } from "../actions";
import ScrollSpy from "../components/ScrollSpy";

const SVGImage = () => (
  <svg
    width="510"
    height="295"
    viewBox="0 0 510 295"
    fill="none"
    xmlns="https:://www.w3.org/2000/svg"
  >
    <path
      d="M73.5 280L179.5 136L226 187L393 17.5L473 111"
      stroke="#0097CD"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M33 44V294H509" stroke="#A4A4A4" strokeLinecap="round" />
    <circle cx="58" cy="194" r="58" fill="#FFB718" />
    <circle cx="228" cy="128" r="14" fill="#FFB718" />
    <circle cx="177.5" cy="55.5" r="26.5" fill="#0097CD" />
    <circle cx="316.5" cy="8.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="348.5" cy="63.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle
      cx="426.5"
      cy="27.5"
      r="8.5"
      transform="rotate(90 426.5 27.5)"
      fill="#FFB718"
      fillOpacity="0.2"
    />
    <circle cx="316.5" cy="43.5" r="8.5" fill="black" />
    <circle cx="348.5" cy="98.5" r="8.5" fill="black" />
    <circle
      cx="500.5"
      cy="276.5"
      r="8.5"
      transform="rotate(90 500.5 276.5)"
      fill="black"
    />
    <circle cx="316.5" cy="98.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="348.5" cy="141.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle
      cx="348.5"
      cy="27.5"
      r="8.5"
      transform="rotate(90 348.5 27.5)"
      fill="#FFB718"
      fillOpacity="0.2"
    />
    <circle cx="316.5" cy="141.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="348.5" cy="178.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="316.5" cy="243.5" r="8.5" fill="#0097CD" />
    <circle cx="348.5" cy="277.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <rect
      x="398"
      y="76"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 398 76)"
      fill="black"
    />
    <rect
      x="278"
      y="209"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 278 209)"
      fill="black"
    />
    <rect
      x="183"
      y="209"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 183 209)"
      fill="black"
    />
    <rect
      x="398"
      y="167"
      width="119"
      height="11"
      rx="5.5"
      transform="rotate(90 398 167)"
      fill="black"
    />
    <rect
      x="433"
      y="167"
      width="119"
      height="11"
      rx="5.5"
      transform="rotate(90 433 167)"
      fill="black"
    />
    <rect
      x="470"
      y="220"
      width="66"
      height="11"
      rx="5.5"
      transform="rotate(90 470 220)"
      fill="black"
    />
    <circle cx="392.5" cy="17.5" r="13.5" fill="#CD0000" />
  </svg>
);

const Outcomes = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const [open, setOpen] = useState(false);

  // Get badges data from the separate query
  const badgesData = data.allBadgesYaml.edges.find(
    ({ node }) => node.fields.lang === pageContext.lang
  )?.node;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertToSlug = (convertText) => {
    return convertText
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <>
      <Div
        background={Colors.lightYellow}
        padding="40px 20px"
        padding_tablet="0px"
        padding_xxs="20px 20px"
        margin_md="70px auto 0 auto"
      >
        <Header
          hideArrowKey
          textAlign_tablet="left"
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          svg_image={<SVGImage />}
          margin_tablet="0px auto 0 auto"
          margin_xxs="0px auto 0 auto"
          maxWidth="1280px"
        />
      </Div>
      <Div
        padding="40px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px"
        flexDirection="column"
      >
        <Div
          display="flex"
          display_tablet="none"
          margin="0 0 0 -20px"
          background={Colors.white}
          style={{
            borderBottom: "1px solid #EBEBEB",
            overflowX: "auto",
            zIndex: "999",
            position: "sticky",
            top: `${isCustomBarActive(session) ? "115px" : "115px"}`,
          }}
          padding="0 35px"
          alignItems="center"
          flexDirection="row"
          gap="40px"
          width="100vw"
          height="70px"
          className="scroll-spy-container"
        >
          <ScrollSpy offsetTop={140} autoScrollOffsetTop={-140} id="Scroll">
            {yml.sections
              .filter((i) => i.title !== "")
              .map((m) => (
                <button
                  key={convertToSlug(m.title)}
                  width="auto"
                  padding="0 20px"
                  href={`#${convertToSlug(m.title)}`}
                  ref={React.createRef()}
                >
                  <Paragraph textTransform="uppercase" width="max-content">
                    {m.title}
                  </Paragraph>
                </button>
              ))}
          </ScrollSpy>
        </Div>

        <Grid
          gridTemplateColumns_tablet="repeat(12, 1fr)"
          gridArea_tablet="1/1/1/15"
          maxWidth="1280px"
          margin="auto"
        >
          <Div gridArea="1/1/1/12" flexDirection="column" padding="0 0 0 20px">
            {yml.sections
              .filter((section) => section.title !== "")
              .map((section, i) => {
                return (
                  <React.Fragment key={i}>
                    <Div>
                      <H2
                        id={convertToSlug(section.title)}
                        type="h2"
                        padding="10px 0"
                        margin="54px 0 0 0 "
                        textAlign="left"
                      >
                        {section.title}
                      </H2>
                    </Div>
                    <Div
                      style={{
                        margin: "20px 0",
                        height: "1px",
                        background: "#c4c4c4",
                      }}
                    />
                    {section.paragraph &&
                      section.paragraph
                        .split("\n")
                        .map((m, i) => (
                          <Paragraph
                            key={i}
                            letterSpacing="0.05em"
                            textAlign="left"
                            margin="10px 0"
                            fontSize="20px"
                            dangerouslySetInnerHTML={{ __html: m }}
                          />
                        ))}
                    {/* Conditionally render stats only if they exist */}
                    {Array.isArray(section.stats) &&
                      section.stats.length > 0 && (
                        <GridContainer
                          justifyContent="between"
                          gridGap_tablet="30px"
                          containerColumns_tablet="0fr repeat(12, 1fr) 1fr"
                          columns_tablet={section.stats.length}
                          margin="41px 0 0 0"
                        >
                          {section.stats.map((m, i) => {
                            return (
                              <Div
                                key={i}
                                gap="0"
                                gridColumnGap="40px"
                                flexDirection="column"
                                margin="0 0 38px 0"
                              >
                                <H2
                                  type="h2"
                                  textAlign_tablet="left"
                                  color={Colors.blue}
                                  margin="0 0 10px 0"
                                  fontSize="27px"
                                  lineHeight="28px"
                                >
                                  {m.stat}
                                </H2>
                                <H3
                                  type="h3"
                                  textAlign_tablet="left"
                                  lineHeight="28px"
                                >
                                  {m.content}
                                </H3>
                              </Div>
                            );
                          })}
                        </GridContainer>
                      )}
                    {/* Render charts as independent component if section.charts is true */}
                    {section.charts &&
                      yml.charts &&
                      Array.isArray(yml.charts.chart_list) && (
                        <GridContainer
                          columns_tablet="3"
                          justifyContent="center"
                          justifyContent_tablet="center"
                          gridTemplateColumns_tablet="3"
                          gridGap="40px"
                          gridGap_tablet="60px"
                          margin="30px 0"
                        >
                          {yml.charts.chart_list.map((c, k) => {
                            return (
                              <Div flexDirection="column" key={k}>
                                <H4 textTransform="uppercase">{c.title}</H4>
                                <Charts dataArray={c.data} />
                              </Div>
                            );
                          })}
                        </GridContainer>
                      )}

                    {/* Render badges as independent component if section.badges is true */}
                    {section.badges &&
                      badgesData &&
                      Array.isArray(badgesData.badges) && (
                        <Div margin="30px 0">
                          {/* Desktop Grid Layout - Only for large screens */}
                          <Div
                            width="100%"
                            background={Colors.white}
                            padding="20px 0"
                            margin="0"
                            display="none"
                            display_tablet="block"
                          >
                            <Div
                              width="100%"
                              maxWidth="800px"
                              margin="0 auto"
                              padding="0"
                            >
                              <Div width="100%" style={{ overflowX: "auto" }}>
                                <DraggableDiv gap="15px">
                                  {badgesData.badges
                                    .slice(0, 5)
                                    .map((badge, index) => {
                                      return (
                                        <Div
                                          key={badge.name}
                                          width="140px"
                                          height="100px"
                                          background={Colors.white}
                                          flexDirection="column"
                                          justifyContent="center"
                                          borderRadius="4px"
                                          flexShrink="0"
                                          border="1px solid #e5e5e5"
                                        >
                                          <GatsbyImage
                                            style={{
                                              height: "49px",
                                              minWidth: "60px",
                                              margin: "auto",
                                              width: "100%",
                                            }}
                                            imgStyle={{
                                              objectFit: "contain",
                                            }}
                                            loading="eager"
                                            alt={badge.name}
                                            draggable={false}
                                            image={getImage(
                                              badge.image.childImageSharp
                                                .gatsbyImageData
                                            )}
                                          />
                                        </Div>
                                      );
                                    })}
                                </DraggableDiv>
                              </Div>
                            </Div>
                          </Div>

                          {/* Mobile Swipable Layout */}
                          <Div
                            width="100%"
                            background={Colors.white}
                            padding="20px 0"
                            margin="0"
                            display="block"
                            display_tablet="none"
                          >
                            <Div width="100%" style={{ overflowX: "auto" }}>
                              <DraggableDiv gap="15px">
                                {badgesData.badges
                                  .slice(0, 5)
                                  .map((badge, index) => {
                                    return (
                                      <Div
                                        key={badge.name}
                                        width="140px"
                                        height="90px"
                                        background={Colors.white}
                                        flexDirection="column"
                                        justifyContent="center"
                                        borderRadius="4px"
                                        flexShrink="0"
                                        border="1px solid #e5e5e5"
                                      >
                                        <GatsbyImage
                                          style={{
                                            height: "38px",
                                            minWidth: "45px",
                                            margin: "auto",
                                            width: "100%",
                                          }}
                                          imgStyle={{
                                            objectFit: "contain",
                                          }}
                                          loading="eager"
                                          alt={badge.name}
                                          draggable={false}
                                          image={getImage(
                                            badge.image.childImageSharp
                                              .gatsbyImageData
                                          )}
                                        />
                                      </Div>
                                    );
                                  })}
                              </DraggableDiv>
                            </Div>
                          </Div>
                        </Div>
                      )}

                    {/* Conditionally render sub_sections only if they exist */}
                    {Array.isArray(section.sub_sections) &&
                      section.sub_sections
                        .filter((subSection) => subSection.title !== "")
                        .map((m, i) => {
                          return (
                            <React.Fragment key={i}>
                              <H4
                                type="h4"
                                textAlign="left"
                                textTransform="uppercase"
                                fontWeight="700"
                                margin="42px 0 13px 0"
                              >
                                {m.title}
                              </H4>
                              <Paragraph
                                letterSpacing="0.05em"
                                textAlign="left"
                                margin_md="10px 0"
                                fontSize="18px"
                                dangerouslySetInnerHTML={{ __html: m.content }}
                              />
                              {Array.isArray(m.image_section) &&
                                m.image_section.map((imageItem, j) => {
                                  return (
                                    <React.Fragment key={j}>
                                      {/* Only render image if it exists */}
                                      {imageItem.image && (
                                        <Div
                                          margin="30px 0"
                                          minHeight="100px"
                                          height="255px"
                                          width="100%"
                                          backgroundImage={`url(${imageItem.image})`}
                                          backgroundSize="contain"
                                          backgroundRepeat="no-repeat"
                                          backgroundPosition="center"
                                        />
                                      )}

                                      {/* Only render paragraph if it exists */}
                                      {imageItem.image_paragraph && (
                                        <Paragraph
                                          justifyContent="center"
                                          padding="50px 0 0"
                                          display="none"
                                          display_tablet="flex"
                                          textAlign="left"
                                        >
                                          {imageItem.image_paragraph}
                                        </Paragraph>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                            </React.Fragment>
                          );
                        })}
                  </React.Fragment>
                );
              })}
          </Div>
          <Div
            gridArea="1/9/1/13"
            gridColumn_tablet="1 â€‹/ span 1"
            margin="54px 0 0 0"
            display="none"
            display_md="flex"
            style={{ position: "relative" }}
          >
            <Div
              flexDirection="column"
              position={!open ? "sticky" : "inherit"}
              style={{
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                top: `${isCustomBarActive(session) ? "150px" : "90px"}`,
              }}
              borderRadius="3px"
              border="1px solid #e5e5e5"
              width="266px"
              height="fit-content"
            >
              <Div
                className="container-sidebar-content"
                margin="25px 0px 0"
                flexDirection="column"
                justifyContent="space-around"
                gap="8px"
              >
                <ScrollSpy offsetTop={120} autoScrollOffsetTop={-120}>
                  {yml.sections
                    .filter((i) => i.title !== "")
                    .map((m, i) => {
                      return (
                        <button
                          key={convertToSlug(m.title)}
                          href={`#${convertToSlug(m.title)}`}
                          ref={React.createRef()}
                        >
                          <Paragraph
                            cursor="pointer"
                            fontSize="13"
                            transitionSec="3"
                            textAlign="center"
                            textAlign_tablet="left"
                            textTransform="uppercase"
                          >
                            {m.title}
                          </Paragraph>
                        </button>
                      );
                    })}
                </ScrollSpy>
              </Div>

              <Button
                alignSelf="center"
                onClick={handleOpen}
                variant="full"
                width="80%"
                width_tablet="fit-content"
                color={Colors.blue}
                padding="0 16%"
                margin="20px 0 25px 0"
                textColor="white"
              >
                {yml.download.button_text}
              </Button>
              <Modal
                // top="58%"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
              >
                <LeadForm
                  titleTextAlign="center"
                  style={{ marginTop: "50px" }}
                  heading={yml.download.button_text}
                  motivation={yml.download.motivation}
                  sendLabel={yml.download.label}
                  formHandler={outcomesReport}
                  handleClose={handleClose}
                  lang={pageContext.lang}
                  data={{
                    course: {
                      type: "hidden",
                      value: yml.download_slug,
                      valid: true,
                    },
                  }}
                />
              </Modal>
            </Div>
          </Div>
        </Grid>
      </Div>
    </>
  );
};
export const query = graphql`
  query OutcomesQuery($file_name: String!, $lang: String!) {
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
          seo_title
          header {
            title
            paragraph
          }
          sections {
            title
            ref
            paragraph
            badges
            charts
            stats {
              stat
              content
            }
            sub_sections {
              title
              content
              image_section {
                image_paragraph
              }
            }
          }
          charts {
            chart_list {
              title
              data
            }
          }
          download {
            button_text
            label
            motivation
          }
        }
      }
    }
    allBadgesYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          paragraph
          badges {
            name
            url
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  height: 150
                  quality: 100
                  placeholder: NONE
                )
              }
            }
          }
          link_text
          link_to
          short_link_text
          fields {
            lang
          }
        }
      }
    }
  }
`;
export default BaseRender(Outcomes);
