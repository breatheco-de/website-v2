import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Button, Colors } from "../Styling";
import { Div } from "../Sections";
import { H4, H3, H2, Paragraph, SubTitle } from "../Heading";
import Icon from "../Icon";

const ChooseYourProgram = ({
  lang,
  programs,
  title,
  paragraph,
  chooseProgramRef,
  landingTemplate,
  id,
  background,
  containerStyles,
  hideEmptyContent = false,
}) => {
  const data = useStaticQuery(graphql`
    {
      allChooseYourProgramYaml {
        edges {
          node {
            programs {
              title
              sub_title
              description
              description_mobile
              link
              icon
            }
            title
            paragraph
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let info = data.allChooseYourProgramYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );

  if (info) info = info.node;
  return (
    <Div
      id={id}
      ref={chooseProgramRef}
      background={background}
      padding="40px"
      {...containerStyles}
    >
      <Div
        display="block"
        background_tablet={landingTemplate ? Colors.white : "transparent"}
        maxWidth_tablet="1280px"
        margin_tablet="0 auto"
        margin_lg="0 auto"
      >
        {(!hideEmptyContent || title || paragraph) && (
          <Div
            textAlign="center"
            flexDirection="column"
            width="100%"
            zIndex="1"
          >
            {(!hideEmptyContent || title) && (
              <H2 padding="0 0 32px 0">{title || info.title}</H2>
            )}
            {(!hideEmptyContent || paragraph) && (
              <SubTitle padding="0 0 32px 0">
                {paragraph || info.paragraph}
              </SubTitle>
            )}
          </Div>
        )}
        <Div
          gap="15px"
          flexWrap="wrap"
          flexWrap_md="nowrap"
          zIndex="1"
          margin="0px auto"
        >
          {Array.isArray(programs) &&
            programs.map((program, index) => {
              return (
                <Div
                  key={`${index}-program`}
                  display="flex"
                  padding="20px"
                  border={!background && "1px solid black"}
                  borderRadius="4px"
                  flexDirection="column"
                  justifyContent="between"
                  background="#ffffff"
                  zIndex="1"
                  width="100%"
                >
                  <Div display="block">
                    <Div
                      display="flex"
                      justifyContent="between"
                      gap="5px"
                      width="100%"
                    >
                      <Div display="block">
                        <H4
                          textTransform="uppercase"
                          textAlign="left"
                          fontSize="14px"
                          lineHeight="16.8px"
                          letterSpacing="0.05em"
                          color={Colors.darkGray}
                          margin="0 0 5px 0"
                        >
                          {program.sub_title}
                        </H4>
                        {program.title.split("\n").map((title, index) => (
                          <Link key={index} to={program.link}>
                            <H3 textAlign="left">{title}</H3>
                          </Link>
                        ))}
                      </Div>
                      <Div maxWidth="68px">
                        <Icon
                          className="choose-your-program-icon"
                          icon={program.icon}
                          height="75px"
                          width="100%"
                        />
                      </Div>
                    </Div>
                    {(!hideEmptyContent ||
                      program.description ||
                      program.description_mobile) && (
                      <Div
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        alignContent="flex-start"
                        // margin_tablet={landingTemplate ? "0 0 50px 0" : "0"}
                        // margin_xs={landingTemplate ? "0 0 50px 0" : "0"}
                        padding="20px 0px 30px 0px"
                      >
                        {program.description &&
                          program.description
                            .split("\n")
                            .map((paragraph, index) => (
                              <Paragraph
                                key={index}
                                letterSpacing="0.05em"
                                display_tablet="inline"
                                display_xs="inline"
                                textAlign="left"
                                fontSize="14px"
                                lineHeight="22px"
                                dangerouslySetInnerHTML={{ __html: paragraph }}
                              />
                            ))}

                        {program.description_mobile && (
                          <Paragraph
                            letterSpacing="0.05em"
                            display="block"
                            display_tablet="none"
                            textAlign="left"
                            fontSize="15px"
                            lineHeight="19px"
                            fontWeight="400"
                            opacity="1"
                          >
                            {program.description_mobile}
                          </Paragraph>
                        )}
                      </Div>
                    )}
                  </Div>

                  <Div
                    margin="10px auto 0 auto"
                    width="100%"
                    // width_tablet="150px"
                  >
                    {!program.comming_soon ? (
                      <Link
                        to={program.link}
                        style={{
                          width: landingTemplate && "100%",
                          margin: "auto",
                        }}
                      >
                        {landingTemplate ? (
                          <Button
                            display="block"
                            background={Colors.blue}
                            colorHover={Colors.blue}
                            color={Colors.white}
                            width="100%"
                            borderRadius="4px"
                            textAlign="center"
                            fontSize="21px"
                            height="auto"
                          >
                            {program.text_link}
                          </Button>
                        ) : (
                          <Button
                            background="none"
                            colorHover="none"
                            color={Colors.blue}
                            justifyContent="center"
                            width="auto"
                            width_tablet="150px"
                            borderRadius="4px"
                            margin="auto"
                          >
                            {program.text_link}
                          </Button>
                        )}
                      </Link>
                    ) : (
                      <Link to={program.link}>
                        <Button
                          variant="outline"
                          color="black"
                          font='"Lato", sans-serif'
                          width="fit-content"
                          pointer
                          textColor={Colors.black}
                          fontSize="13px"
                          padding="10px"
                          bottom="24px"
                          borderRadius="4px"
                          right="24px"
                        >
                          {program.text_link}
                        </Button>
                      </Link>
                    )}
                  </Div>
                </Div>
              );
            })}
        </Div>
      </Div>
    </Div>
  );
};

export default ChooseYourProgram;
