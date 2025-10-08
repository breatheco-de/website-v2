import React from "react";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import Icon from "../Icon";

const SimpleCards = ({
  heading,
  cardStyle,
  sub_heading,
  containerStyle,
  cardContainerStyle,
  cards,
  background,
  defaultIcon,
}) => {
  return (
    <Div
      background={Colors[background] || background}
      width={containerStyle?.width || ""}
    >
      <Div
        display="flex"
        flexDirection="column"
        flexDirection_tablet="row"
        alignItems="center"
        margin="0 auto"
        padding="40px 20px"
        padding_lg="80px 0"
        padding_md="40px 80px"
        padding_tablet="40px 40px"
        width="100%"
        maxWidth="1280px"
        {...containerStyle}
      >
        <Div display="block" width_tablet={heading?.style?.width || "30%"}>
          {heading.text && (
            <H2
              type="h2"
              lineHeight="35px"
              lineHeight_tablet="48px"
              fontSize_tablet="35px"
              fontSize="35px"
              margin="30px auto"
              fontWeight="400"
              textAlign="left"
              textAlign_sm="center"
              textAlign_tablet="left"
              style={
                typeof heading?.style === "string"
                  ? { ...JSON.parse(heading.style) }
                  : { textAlign: "center", ...heading.style }
              }
            >
              {heading.text}
            </H2>
          )}
          {sub_heading?.text && (
            <Paragraph
              margin="15px auto"
              fontSize="16px"
              textAlign="left"
              textAlign_sm="center"
              textAlign_tablet="left"
              dangerouslySetInnerHTML={{ __html: sub_heading.text }}
              style={
                typeof sub_heading?.style === "string"
                  ? { ...JSON.parse(sub_heading.style) }
                  : sub_heading?.style
              }
            />
          )}
        </Div>
        <Div
          display="flex"
          flexDirection="column"
          flexDirection_tablet="row"
          justifyContent="center"
          maxWidth="1280px"
          margin="20px auto 0 auto"
          padding_tablet="0 40px 10px 40px"
          gap="15px"
          overflow="hidden"
          className="badge-slider hideOverflowX__"
          {...cardContainerStyle}
        >
          {Array.isArray(cards) &&
            cards?.map((item, index) => {
              return (
                <Div
                  background={item.background}
                  key={index}
                  padding="20px"
                  flexDirection="column"
                  justifyContent="center"
                  width="240px"
                  widt_tablet="280px"
                  height="240px"
                  {...cardStyle}
                >
                  {defaultIcon && (
                    <Icon icon={defaultIcon} width="30px" height="30px" />
                  )}
                  {item?.icon && (
                    <Icon
                      icon={item.icon}
                      width={item.iconWidth || "30px"}
                      height="auto"
                    />
                  )}
                  {item?.content && (
                    <H3
                      textAlign={cardStyle?.textAlign}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}
                  {item?.heading?.text && (
                    <H3 textAlign={cardStyle?.textAlign}>
                      {item?.heading?.text}
                    </H3>
                  )}
                  {item?.text && (
                    <Paragraph
                      textAlign={cardStyle?.textAlign}
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  )}
                </Div>
              );
            })}
        </Div>
      </Div>
    </Div>
  );
};

export default SimpleCards;
