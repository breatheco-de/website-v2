import React from "react";
import { Div } from "../Sections";
import { H2, Paragraph } from "../Heading";
import { Colors, Anchor } from "../Styling";
import IconsBanner from "../IconsBanner";

const Iconogram = ({ yml, index }) => {
  const { heading, sub_heading, icons, button, swipable, background } = yml;

  return (
    <Div
      key={index}
      display="block"
      margin="0 auto"
      padding="40px 20px"
      padding_lg="40px 0"
      padding_md="40px 80px"
      padding_tablet="40px 40px"
      width="100%"
      background={Colors[background] || background}
    >
      {heading.text && (
        <H2
          type="h2"
          maxWidth="1280px"
          margin="0 auto"
          style={
            heading?.style
              ? { ...JSON.parse(heading.style) }
              : { textAlign: "center" }
          }
        >
          {heading.text}
        </H2>
      )}
      {sub_heading && sub_heading.text && (
        <Paragraph
          padding_xs={heading?.text ? "0 10%" : "20px 10%"}
          padding_tablet={heading?.text ? "0 10%" : "20px 10%"}
          padding_md={heading?.text ? "0 10%" : "20px 10%"}
          margin="15px auto"
          maxWidth="1280px"
          dangerouslySetInnerHTML={{ __html: sub_heading.text }}
          style={sub_heading?.style ? { ...JSON.parse(sub_heading.style) } : {}}
        />
      )}
      <Div
        display="flex"
        flexDirection="column"
        flexDirection_xs="row"
        flexDirection_tablet="row "
        flexWrap_xs="wrap"
        flexWrap_tablet="nowrap"
        justifyContent="center"
        gap_tablet={icons.length > 4 ? "0px" : "3%"}
        maxWidth="1280px"
        margin="0 auto "
        padding="32px 0 10px 0"
        className={swipable && "badge-slider hideOverflowX__"}
      >
        {Array.isArray(icons) &&
          icons?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <IconsBanner
                  icon={item.icon}
                  color={item.color}
                  title={item.title}
                  content={item.content}
                  content_mobile={item.content_mobile}
                  {...item}
                />
              </React.Fragment>
            );
          })}
      </Div>
      {button && (
        <Paragraph
          margin="30px 0 0 0"
          fontSize="18px"
          color={Colors.black}
          textDecoration="underline"
        >
          <Anchor color={`${Colors.black} !important`} to={button.path}>
            {button.text}
          </Anchor>
        </Paragraph>
      )}
    </Div>
  );
};

export default Iconogram;
