import React from "react";
import { H2, H3, Paragraph, SubTitle } from "../Heading";
import Icon from "../Icon";
import { Div } from "../Sections";
import { Colors } from "../Styling";

const WeTrust = ({ we_trust, background, titleProps, paragraphProps }) => {
  const backgroundColor = background || Colors.lightBlue;
  const isBgFull = !!we_trust?.bg_full;

  return (
    <Div
      id="we-trust"
      display="block"
      margin="0 auto"
      padding="0"
      padding_lg="0"
      background={isBgFull && backgroundColor}
      padding_tablet="40px 40px"
      width="100%"
    >
      <Div
        padding="50px 30px"
        padding_md="40px 90px"
        padding_lg="40px"
        padding_tablet="40px 0"
        margin="0 auto"
        background={!isBgFull && backgroundColor}
        display="block"
        maxWidth="1280px"
      >
        <Div display="block" padding="0 0 32px 0">
          <H2 textAlign="left" {...titleProps}>
            {we_trust.title}
          </H2>
          <SubTitle
            textAlign="left"
            margin="22px 0 0 0"
            dangerouslySetInnerHTML={{ __html: we_trust.text }}
            {...paragraphProps}
          />
        </Div>
        <Div
          margin="15px 0 0 0"
          justifyContent_tablet="between"
          gap="15px"
          flexDirection="column"
          flexDirection_tablet="row"
        >
          {we_trust.boxes.map((box) => (
            <Div
              key={box.title}
              background="#FFF"
              border="3px solid #000"
              width="100%"
              width_md="320px"
              height_md="320px"
              width_tablet="200px"
              height_tablet="auto"
              boxShadow="6px 6px 0px 0px rgba(0,0,0,1)"
              boxShadow_tablet="9px 8px 0px 0px rgba(0,0,0,1)"
              flexDirection_tablet="column"
              justifyContent_tablet="center"
              padding="15px"
              alignItems="center"
              alignItems_tablet="normal"
              overflow="hidden"
            >
              <Icon
                style={{ flexShrink: 0 }}
                icon={box.icon}
                width="89px"
                height="89px"
                color={null}
              />
              <Div
                margin="0 0 0 15px"
                margin_tablet="30px 0 0 0"
                display="flex"
                flexDirection="column"
                display_tablet="block"
              >
                <H3
                  textAlign="left"
                  width="auto"
                  fontSize="35px"
                  fontSize_tablet="65px"
                  fontFamily="Archivo-Black"
                  margin="0 0 30px 0"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0",
                    alignItems: "baseline",
                    lineHeight: "1.2",
                  }}
                >
                  <span>{box.title}</span>
                  {box?.label && (
                    <Paragraph
                      color="currentColor"
                      fontSize="24px"
                      width="auto"
                      fontWeight="700"
                      lineHeight="1.3"
                      position="relative"
                      top="-1px"
                      letterSpacing="0.05em"
                      style={{
                        flex: "0 0 auto",
                        whiteSpace: "nowrap",
                        minWidth: "0",
                      }}
                    >
                      {box.label}
                    </Paragraph>
                  )}
                </H3>
                <Paragraph
                  textAlign="left"
                  color="#000"
                  opacity="1"
                  fontSize="21px"
                >
                  {box.text}
                </Paragraph>
              </Div>
            </Div>
          ))}
        </Div>
      </Div>
    </Div>
  );
};
export default WeTrust;
// export default SingleColumn;
