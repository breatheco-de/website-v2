import React from "react";
import { Link, navigate } from "gatsby";
import { Button, Colors, Img, StyledBackgroundSection } from "../Styling";
import { Grid, Div } from "../Sections";
import { H2, Paragraph } from "../Heading";
import { transferQuerystrings } from "../../utils/utils";

const Overlaped = ({
  heading,
  subtitle,
  content,
  button,
  background,
  image,
  headingStyle,
}) => {
  return (
    <Div maxWidth_tablet="1280px" margin_tablet="50px auto" width="100%">
      {/* Desktop Version */}
      <Grid
        display_xxs="none"
        display="grid"
        position="relative"
        justifyContent="center"
        padding_tablet={content?.length > 200 ? "0px 40px 30px 40px" : "0 40px"}
        padding_md="0 80px"
        padding_lg="0"
        width="100%"
        flexDirection="column"
        gridTemplateColumns_tablet="repeat(16, 1fr)"
      >
        <Div gridColumn_tablet="1 / 9" gridColumn_md="0 / 9" margin="0">
          {image?.src ? (
            <Img src={image?.src} width="33.3em" height="533px" />
          ) : (
            <StyledBackgroundSection
              width_tablet="33.3em"
              height_tablet="533px"
              margin="0px"
              image={image}
              bgSize="contain"
              justify_content="flex-start"
              alt="geekforce image"
            />
          )}
        </Div>

        <Div gridColumn_tablet="9 / 17" position="relative">
          <Div width="100%">
            <Img
              src="/images/landing/vector-stroke.png"
              width="114px"
              height="162px"
              style={{
                position: "absolute",
                right: "0%",
                top: "20px",
              }}
            />
            <Img
              src="/images/landing/vector-stroke1.png"
              width="70px"
              height="181px"
              style={{
                position: "absolute",
                right: "11.25em",
                top: "20px",
              }}
            />
            <Img
              src="/images/landing/vector-stroke2.png"
              width="106px"
              height="151px"
              style={{
                position: "absolute",
                left: "0%",
                bottom: "0.8em",
              }}
            />
          </Div>

          <Img
            src="/images/landing/group-2.png"
            width="49px"
            height="286px"
            style={{
              position: "absolute",
              right: "0%",
              bottom: "0%",
              zIndex: "1",
            }}
          />
        </Div>

        <Div
          border="3px solid black"
          flexWrap="wrap"
          position="absolute"
          top_tablet="6.5em"
          right_tablet="15%"
          left_tablet="45%"
          top_lg="6.5em"
          right_lg="11%"
          left_lg="50%"
          zIndex="1"
          padding="20px"
          margin_lg="0 0 0 0"
          background={Colors.white}
          boxShadow="20px 15px 0px 0px rgba(0,0,0,1)"
        >
          <H2
            textAlign="start"
            margin="0 0 12px 0"
            fontSize="35px"
            lineHeight="38.08px"
            fontWeight="400"
            fontFamily="Archivo"
            color="#2E2E38"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          {subtitle && (
            <Paragraph
              textAlign="start"
              margin="0 0 12px 0"
              fontFamily="Lato, sans-serif"
              fontSize="18px"
              color="#3A3A3A"
              style={{ fontStyle: "italic" }}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
          {content && (
            <Paragraph
              textAlign="start"
              margin="12px 0 0 0"
              fontFamily="Lato, sans-serif"
              fontSize="16px"
              color="#3A3A3A"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {button?.text && (
            <Link to={button.path}>
              <Button
                background={Colors[button.color]}
                color={Colors.white}
                margin="20px 0 0 0"
                fontSize="12px"
                width="fit-content"
                borderRadius="0px"
                display="flex"
                alignItems="center"
                onClick={() => {
                  if (button.path && button.path.indexOf("http") > -1)
                    window.open(transferQuerystrings(button.path, utm));
                  else navigate(button.path);
                }}
              >
                {button.text}
              </Button>
            </Link>
          )}
        </Div>
      </Grid>

      {/* Mobile Version */}
      <Div
        display_xxs="flex"
        display_tablet="none"
        position="relative"
        flexDirection="column"
        width="100%"
        margin="45px 20px 400px 20px"
        margin_xxs="45px 20px 450px 20px"
      >
        {image?.src ? (
          <Img
            src={image?.src}
            width_xxs="280px"
            width_xs="335px"
            width_sm="385px"
            height_xxs="450px"
          />
        ) : (
          <StyledBackgroundSection
            width_xxs="280px"
            width_xs="335px"
            width_sm="385px"
            height_xxs="450px"
            image={image}
            alt="geekforce image"
          />
        )}
        <Img
          src="/images/landing/vector-stroke2.png"
          width="106px"
          height="151px"
          style={{
            position: "absolute",
            left: "10%",
            bottom: "5%",
          }}
        />

        <Img
          src="/images/landing/group-2.png"
          width="49px"
          height="286px"
          style={{
            position: "absolute",
            right: "10%",
            bottom: "5%",
          }}
        />

        <Div
          border="3px solid black"
          flexWrap="wrap"
          position="absolute"
          top="50%"
          zIndex="1"
          width_xxs="90%"
          width_xs="88%"
          width_sm="89%"
          padding="20px"
          margin="0 auto"
          left="0"
          right="0"
          background={Colors.white}
          boxShadow="20px 10px 0px 0px rgba(0,0,0,1)"
        >
          <H2
            textAlign="start"
            margin="0 0 12px 0"
            fontSize="35px"
            lineHeight="38.08px"
            fontWeight="400"
            fontFamily="Archivo"
            color="#2E2E38"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          {subtitle && (
            <Paragraph
              textAlign="start"
              margin="0 0 12px 0"
              fontFamily="Lato, sans-serif"
              fontSize="18px"
              color="#3A3A3A"
              style={{ fontStyle: "italic" }}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
          {content && (
            <Paragraph
              textAlign="start"
              margin="12px 0 0 0"
              fontFamily="Lato, sans-serif"
              fontSize="16px"
              color="#3A3A3A"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {button?.text && (
            <Link to={button.path}>
              <Button
                background={Colors[button.color]}
                color={Colors.white}
                margin="20px 0 0 0"
                fontSize="12px"
                width="fit-content"
                borderRadius="0px"
                display="flex"
                alignItems="center"
              >
                {button.text}
              </Button>
            </Link>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default Overlaped;
