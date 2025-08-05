import React from "react";
import { H2, H3, H4, Paragraph, SubTitle } from "../Heading";
import { Div, HR, Grid } from "../Sections";
import { StyledBackgroundSection } from "../Styling";
import { Colors } from "../Styling";
import Icon from "../Icon";
import Marquee from "react-fast-marquee";

const ScholarshipSuccessCases = ({ content, maxWidth }) => {
  return (
    <Div height="auto" display="block" margin="60px 0 60px 0">
      <H2 margin="30px 0">{content.title}</H2>
      <SubTitle
        fontSize="18px"
        padding="0"
        padding_tablet="0px 10%"
        letterSpacing="0.06em"
        width="100%"
        margin="0 0 15px 0"
        dangerouslySetInnerHTML={{
          __html: content.subtitle,
        }}
      />

      <Marquee speed={30} pauseOnHover>
        <Div height="500px">
          {content?.cases.map((student, i) => (
            <Div
              key={`${student.name}-${i}`}
              display="flex"
              flexDirection="column"
              width="282px"
              minWidth="282px"
              borderRadius="4px"
              border={`2px solid ${Colors.lightGray}`}
              margin="0 20px 0 0"
            >
              <Div width="100%">
                <StyledBackgroundSection
                  borderRadius="4px 4px 0 0"
                  height="162px"
                  width="100%"
                  image={
                    student.img && student.img.childImageSharp.gatsbyImageData
                  }
                  bgSize="cover"
                />
              </Div>
              <Div
                display="block"
                padding="17px"
                height="100%"
                position="relative"
              >
                <Div justifyContent="between">
                  <H4 fontWeight="700" textAlign="left">
                    {student.name}
                  </H4>
                  <Div
                    alignItems="center"
                    padding="3px"
                    background={Colors.lightYellow}
                  >
                    <Icon
                      icon="graduation"
                      width="19px"
                      height="16px"
                      fill={Colors.yellow}
                    />
                    <Paragraph fontSize="10px" color={Colors.yellow}>
                      {student.status}
                    </Paragraph>
                  </Div>
                </Div>
                <Div margin="10px 0 0 0" alignItems="center">
                  <Div
                    className="react-tel-input"
                    margin="0"
                    style={{ width: "25px" }}
                  >
                    <div className={`flag ${student.country.iso}`} />
                  </Div>
                  <Paragraph
                    margin="0 0 0 10px"
                    textAlign="left"
                    opacity="1"
                    color={Colors.black}
                  >
                    {student.country.name}
                  </Paragraph>
                </Div>
                <Div display="block" margin="10px 0">
                  <Paragraph
                    margin="5px 0 0 0"
                    textAlign="left"
                    opacity="1"
                    color={Colors.black}
                  >
                    {`${content.contributor}: ${student.contributor}`}
                  </Paragraph>
                  <HR background={Colors.lightGray} width="100%" height="1px" />
                </Div>
                <Div>
                  <Paragraph textAlign="left" color={Colors.black} opacity="1">
                    {student.description.length > 280
                      ? student.description.substring(0, 280) + "..."
                      : student.description}
                  </Paragraph>
                </Div>
                <Div
                  alignItems="center"
                  width="fit-content"
                  padding="3px 5px"
                  background={Colors.veryLightBlue}
                  position="absolute"
                  bottom="17px"
                  right="17px"
                >
                  <Icon icon="flag-check" color={Colors.blue} />
                  <Paragraph
                    margin="0 0 0 5px"
                    fontSize="9px"
                    color={Colors.blue}
                  >
                    {student.achievement}
                  </Paragraph>
                </Div>
              </Div>
            </Div>
          ))}
        </Div>
      </Marquee>
    </Div>
  );
};

export default ScholarshipSuccessCases;
