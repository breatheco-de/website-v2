import React, { useState, useContext, useRef, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { H1, H2, H3, H4, H5, Paragraph, Span } from "../components/Heading";
import { Container, Row, Col, Divider, Div } from "../components/Sections";
import { Button, Colors } from "../components/Styling";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SimpleCards from "../components/SimpleCards";
import Icon from "../components/Icon";

const Prework = (props) => {
  const { session } = useContext(SessionContext);
  const { data, pageContext, yml } = props;
  const image = getImage(
    yml.header?.image && yml.header?.image?.childImageSharp?.gatsbyImageData
  );

  return (
    <>
      {/* Hero Section */}
      <Div
        maxWidth="1280px"
        display="flex"
        flexDirection="column"
        margin_tablet="11rem auto 6rem auto"
        margin="60px auto"
        flexDirection_tablet="row"
        alignItems="center"
        padding="0 20px"
        gap="60px"
        position="relative"
        zIndex="2"
      >
        <Div flex="1" flexDirection="column" gap="2rem">
          <Div
            background="rgba(255,255,255,0.2)"
            backdropFilter="blur(10px)"
            padding="0"
            borderRadius="50px"
            border="1px solid rgba(255,255,255,0.3)"
            flexDirection="column"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <H1 type="h1" textAlign="left">
              {yml.seo_title}
            </H1>
            <H2
              margin="0"
              type="h2"
              fontFamily="Archivo-Black"
              color={Colors.black}
              textAlign="left"
              fontSize="46px"
              fontSize_tablet="50px"
              lineHeight="54px"
              textWrap="balance"
            >
              {yml.header.title}
            </H2>
          </Div>

          <Paragraph
            fontSize="21px"
            lineHeight="1.35"
            color={Colors.darkGray}
            margin="0"
            maxWidth="650px"
            textAlign="left"
            display="flex"
            flexDirection="column"
            gap="16px"
            dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
          />
        </Div>

        <Div display="none" display_tablet="block" position="relative">
          <Div position="relative" overflow="hidden" maxWidth="85rem">
            <GatsbyImage image={image} alt={yml.header.alt} />
          </Div>
        </Div>
      </Div>

      {/* What You'll Learn Section */}
      {yml.what_you_will_learn && (
        <Div
          background="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
          padding="6rem 0"
          maxWidth="1280px"
          margin="0 auto"
          position="relative"
          overflow="hidden"
        >
          {/* Background decorative elements */}
          <Div
            position="absolute"
            top="-50px"
            right="-50px"
            width="200px"
            height="200px"
            borderRadius="50%"
            background="rgba(59, 130, 246, 0.05)"
            zIndex="0"
          />
          <Div
            position="absolute"
            bottom="-30px"
            left="-30px"
            width="150px"
            height="150px"
            borderRadius="50%"
            background="rgba(16, 185, 129, 0.05)"
            zIndex="0"
          />

          <Div
            padding="0 20px"
            flexDirection="column"
            position="relative"
            width="100%"
            zIndex="1"
          >
            <Div
              display="flex"
              width="100%"
              flexDirection="column"
              flexDirection_tablet="row"
              alignItems="center"
              gap="60px"
            >
              {/* Content Column */}
              <Div flex="1" width="100%" flexDirection="column">
                <H2
                  type="h2"
                  textAlign="left"
                  textAlign_tablet="left"
                  margin="0 0 30px 0"
                  fontSize="40px"
                  fontSize_tablet="48px"
                  fontWeight="800"
                  color={Colors.black}
                  lineHeight="1.2"
                >
                  {yml.what_you_will_learn.title}
                </H2>
                <Paragraph
                  textAlign="left"
                  margin="0 0 50px 0"
                  fontSize="20px"
                  color={Colors.darkGray}
                  lineHeight="1.7"
                  dangerouslySetInnerHTML={{
                    __html: yml.what_you_will_learn.paragraph,
                  }}
                />
                <Div
                  display="grid"
                  gridTemplateColumns="1fr"
                  gridTemplateColumns_tablet="repeat(2, 1fr)"
                  gap="25px"
                >
                  {yml.what_you_will_learn.bullets?.map((bullet, index) => (
                    <Div
                      key={index}
                      display="flex"
                      alignItems="flex-start"
                      gap="20px"
                      background="white"
                      padding="25px"
                      borderRadius="12px"
                      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
                      border="1px solid rgba(59, 130, 246, 0.1)"
                      transition="all 0.3s ease"
                      hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      }}
                    >
                      <Icon
                        icon="check-circle"
                        width="22px"
                        height="22px"
                        fill={Colors.green2}
                        style={{
                          position: "relative",
                          bottom: "-2px",
                        }}
                      />
                      <Paragraph
                        as="ul"
                        fontSize="16px"
                        lineHeight="1.6"
                        color={Colors.darkGray}
                        margin="0"
                        textAlign="left"
                        fontWeight="500"
                        dangerouslySetInnerHTML={{ __html: bullet.text }}
                      />
                    </Div>
                  ))}
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      )}

      {/* How It Works Section */}
      {yml.how_it_works && (
        <Div
          background="white"
          maxWidth="1280px"
          margin="0 auto"
          padding="120px 20px"
          position="relative"
        >
          <Div
            width="100%"
            flexDirection="column"
            position="relative"
            zIndex="1"
          >
            {/* Image and Content Layout */}
            <Div
              display="flex"
              flexDirection="column"
              flexDirection_tablet="row"
              alignItems="center"
              gap="40px"
              margin="0 0 50px 0"
            >
              {/* Image Column */}
              <Div flex="1" maxWidth="600px" width="100%">
                {yml.how_it_works.image && (
                  <GatsbyImage
                    image={getImage(yml.how_it_works.image)}
                    alt={yml.how_it_works.title}
                    style={{
                      borderRadius: "15px",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                )}
              </Div>

              {/* Content Column */}
              <Div
                flex="1"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <H2
                  type="h2"
                  fontSize="40px"
                  fontSize_tablet="48px"
                  fontWeight="800"
                  color={Colors.black}
                  lineHeight="1.2"
                  margin="0 0 20px 0"
                  textAlign="left"
                >
                  {yml.how_it_works.title}
                </H2>
                <Paragraph
                  as="ul"
                  fontSize="20px"
                  display="flex"
                  flexDirection="column"
                  lineHeight="1.4"
                  color={Colors.darkGray}
                  textAlign="left"
                  gap="12px"
                  dangerouslySetInnerHTML={{ __html: yml.how_it_works.content }}
                />
              </Div>
            </Div>

            {/* Content Column */}
            <Div flex="1" flexDirection="column">
              {yml.how_it_works.schedule && (
                <Div
                  background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  padding="40px 0"
                  borderRadius="20px"
                  margin="0 0 40px 0"
                  flexDirection="column"
                  gap="30px"
                  boxShadow="0 20px 40px rgba(102, 126, 234, 0.3)"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Decorative elements */}
                  <Div
                    position="absolute"
                    top="-20px"
                    right="-20px"
                    width="100px"
                    height="100px"
                    borderRadius="50%"
                    background="rgba(255,255,255,0.1)"
                  />

                  <H3
                    type="h3"
                    fontSize="28px"
                    fontWeight="700"
                    lineHeight="normal"
                    padding="0 10px"
                    color={Colors.darkGray}
                    margin="0 0 30px 0"
                    textAlign="center"
                    position="relative"
                    zIndex="1"
                  >
                    {yml.how_it_works.schedule.title}
                  </H3>

                  <Div
                    display="grid"
                    gridTemplateColumns="1fr"
                    gridTemplateColumns_tablet="repeat(auto-fit, minmax(250px, 1fr))"
                    gap="25px"
                    position="relative"
                    zIndex="1"
                  >
                    {yml.how_it_works.schedule.classes?.map(
                      (classItem, index) => (
                        <Div
                          key={index}
                          background="rgba(255,255,255,0.15)"
                          backdropFilter="blur(10px)"
                          padding="25px"
                          borderRadius="15px"
                          border="1px solid rgba(255,255,255,0.2)"
                          flexDirection="column"
                          gap="10px"
                          transition="all 0.3s ease"
                          alignItems="center"
                          hover={{
                            background: "rgba(255,255,255,0.25)",
                            transform: "translateY(-2px)",
                          }}
                        >
                          <Icon
                            icon={classItem.icon}
                            width="100%"
                            height="70px"
                          />
                          <H4
                            type="h4"
                            fontSize="20px"
                            fontWeight="600"
                            color={Colors.darkGray}
                            margin="0"
                          >
                            {classItem.program}
                          </H4>
                          <Paragraph
                            fontSize="16px"
                            color={Colors.darkGray}
                            margin="0"
                            lineHeight="1.5"
                          >
                            {classItem.schedule}
                          </Paragraph>
                        </Div>
                      )
                    )}
                  </Div>
                </Div>
              )}

              <Div
                background={`linear-gradient(135deg, #fef3c7 0%, ${Colors.blue2} 100%)`}
                padding="0.5rem 1.5rem"
                borderRadius="15px"
                border={`2px solid ${Colors.blue2}`}
                display="flex"
                alignItems="center"
                gap="20px"
                boxShadow="0 10px 25px rgba(11, 66, 245, 0.2)"
              >
                <Div
                  width="38px"
                  height="38px"
                  borderRadius="50%"
                  background={Colors.blue2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink="0"
                >
                  <Icon
                    icon="mail"
                    width="24px"
                    height="24px"
                    color={Colors.white}
                  />
                </Div>
                <Paragraph
                  fontSize="16px"
                  lineHeight="1.6"
                  color={Colors.darkGray}
                  textAlign="left"
                  margin="0"
                  fontWeight="500"
                >
                  {yml.how_it_works.note}
                </Paragraph>
              </Div>
            </Div>
          </Div>
        </Div>
      )}

      {/* Why Prework Matters Section */}
      {yml.why_prework_matters && (
        <Div
          background="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
          padding="4rem 20px 12rem 20px"
          position="relative"
          maxWidth="1280px"
          margin="0 auto"
        >
          {/* Background decorative elements */}
          <Div
            position="absolute"
            top="10%"
            left="5%"
            width="200px"
            height="200px"
            borderRadius="50%"
            background="linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)"
            zIndex="0"
          />
          <Div
            position="absolute"
            bottom="15%"
            right="8%"
            width="150px"
            height="150px"
            borderRadius="50%"
            background="linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)"
            zIndex="0"
          />

          <Div flexDirection="column" position="relative" zIndex="1">
            <Div textAlign="center" margin="0 0 2rem 0">
              <H2
                type="h2"
                textAlign="center"
                margin="0 0 20px 0"
                fontSize="40px"
                fontSize_tablet="48px"
                fontWeight="800"
                color={Colors.black}
                lineHeight="1.2"
              >
                {yml.why_prework_matters.title}
              </H2>
              <Div
                width="80px"
                height="4px"
                background="linear-gradient(90deg, #10b981 0%, #059669 100%)"
                margin="0 auto"
                borderRadius="2px"
              />
            </Div>

            <Div
              display="grid"
              gridTemplateColumns="1fr"
              gridTemplateColumns_tablet="repeat(2, 1fr)"
              gap="40px"
              // maxWidth="1200px"
              alignSelf="center"
            >
              {yml.why_prework_matters.bullets?.map((bullet, index) => {
                return (
                  <Div
                    key={index}
                    background="white"
                    padding="30px 30px"
                    borderRadius="20px"
                    flexDirection="column"
                    gap="25px"
                    boxShadow={`0 20px 40px ${bullet.style.shadow}`}
                    border="1px solid rgba(0,0,0,0.05)"
                    position="relative"
                    overflow="hidden"
                    transition="all 0.3s ease"
                    hover={{
                      transform: "translateY(-8px)",
                      boxShadow: `0 30px 60px ${bullet.style.shadow}`,
                    }}
                  >
                    <Div display="flex" alignItems="center" gap="20px">
                      <Div
                        width="60px"
                        height="60px"
                        borderRadius="15px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink="0"
                        boxShadow={`0 8px 20px ${bullet.style.shadow}`}
                      >
                        <Icon
                          icon={bullet.icon}
                          width="28px"
                          height="28px"
                          color={Colors.darkGray}
                        />
                      </Div>
                      <Paragraph
                        fontSize="17px"
                        lineHeight="1.7"
                        textAlign="left"
                        color={Colors.darkGray}
                        margin="0"
                        dangerouslySetInnerHTML={{ __html: bullet.text }}
                      />
                    </Div>

                    {/* Bottom accent */}
                    <Div
                      position="absolute"
                      bottom="-40px"
                      right="-40px"
                      width="80px"
                      height="80px"
                      borderRadius="50%"
                      style={{
                        background: `${bullet.style.background.replace(
                          "100%)",
                          "100%), rgba(255,255,255,0.8)"
                        )}`,
                        opacity: "0.1",
                      }}
                    />
                  </Div>
                );
              })}
            </Div>
          </Div>
        </Div>
      )}

      {/* CTA Section */}
      {yml.cta && (
        <Div
          padding="100px 20px"
          textAlign="center"
          position="relative"
          overflow="hidden"
          style={{
            background: `linear-gradient(135deg, ${Colors.lightYellow2} 0%, ${Colors.lightYellow} 100%)`,
          }}
        >
          {/* Decorative background elements */}
          <Div
            position="absolute"
            top="-100px"
            right="-100px"
            width="300px"
            height="300px"
            borderRadius="50%"
            background="rgba(255, 183, 24, 0.1)"
            zIndex="0"
          />
          <Div
            position="absolute"
            bottom="-80px"
            left="-80px"
            width="250px"
            height="250px"
            borderRadius="50%"
            background="rgba(255, 183, 24, 0.15)"
            zIndex="0"
          />

          <Div
            maxWidth="900px"
            margin="0 auto"
            flexDirection="column"
            gap="40px"
            position="relative"
            zIndex="1"
          >
            <Div
              background="rgba(255, 255, 255, 0.9)"
              backdropFilter="blur(10px)"
              padding="40px 30px"
              borderRadius="20px"
              border="1px solid rgba(255, 183, 24, 0.3)"
              boxShadow="0 20px 40px rgba(255, 183, 24, 0.2)"
              flexDirection="column"
              gap="25px"
            >
              <H2
                type="h2"
                fontSize="38px"
                fontSize_tablet="46px"
                fontWeight="800"
                color={Colors.black}
                margin="0"
                lineHeight="1.2"
                textAlign="center"
              >
                {yml.cta.title}
              </H2>

              <Paragraph
                fontSize="20px"
                lineHeight="1.6"
                color={Colors.darkGray}
                margin="0"
                maxWidth="36rem"
                alignSelf="center"
                textAlign="center"
                fontWeight="500"
              >
                {yml.cta.subtitle}
              </Paragraph>

              <Div
                display="flex"
                flexDirection="column"
                flexDirection_tablet="row"
                gap="20px"
                justifyContent="center"
                alignItems="center"
                margin="30px 0 0 0"
                maxWidth="600px"
                alignSelf="center"
                width="100%"
              >
                {yml.cta.primary_button && (
                  <Link
                    to={yml.cta.primary_button.link}
                    style={{ width: "100%", maxWidth: "280px" }}
                  >
                    <Button
                      background={Colors.black}
                      color="white"
                      padding="18px 32px"
                      padding_xs="0 24px"
                      padding_tablet="0 32px"
                      fontSize="17px"
                      fontWeight="700"
                      justifyContent="center"
                      borderRadius="12px"
                      height="57px"
                      width="100%"
                      boxShadow="0 8px 25px rgba(0, 0, 0, 0.15)"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      {yml.cta.primary_button.text}
                    </Button>
                  </Link>
                )}

                {yml.cta.secondary_button && (
                  <Link
                    to={yml.cta.secondary_button.link}
                    style={{ width: "100%", maxWidth: "280px" }}
                  >
                    <Button
                      background="transparent"
                      color={Colors.black}
                      border={`2px solid ${Colors.black}`}
                      padding="18px 32px"
                      padding_xs="0 24px"
                      padding_tablet="0 32px"
                      fontSize="17px"
                      fontWeight="700"
                      height="57px"
                      width="100%"
                      justifyContent="center"
                      borderRadius="12px"
                      boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      {yml.cta.secondary_button.text}
                    </Button>
                  </Link>
                )}
              </Div>
            </Div>
          </Div>
        </Div>
      )}
    </>
  );
};
export const query = graphql`
  query PreworkQuery($file_name: String!, $lang: String!) {
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
            hideGlobalCTA
          }
          seo_title
          header {
            title
            paragraph
            tagline
            button
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1600
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
            sub_heading
          }
          what_you_will_learn {
            title
            paragraph
            bullets {
              text
            }
          }
          how_it_works {
            title
            content
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1100
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            schedule {
              title
              classes {
                program
                schedule
                icon
              }
            }
            note
          }
          why_prework_matters {
            title
            bullets {
              text
              icon
              style {
                background
                shadow
              }
            }
          }
          cta {
            title
            subtitle
            primary_button {
              text
              link
            }
            secondary_button {
              text
              link
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(Prework);
