import React, { useState, useEffect } from "react";
import ReactPlayer from "../ReactPlayer";
import { H2, Paragraph, H3 } from "../Heading";
import Icon from "../Icon";
import { Div } from "../Sections";
import { Button, Colors, Img, StyledBackgroundSection } from "../Styling";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";
import { transferQuerystrings, smartRedirecting } from "../../utils/utils";
import BackgroundWrapper from "../BackgroundWrapper";

const Side = ({
  video,
  videoHeight,
  videoWidth,
  image,
  header,
  heading,
  sub_heading,
  content,
  disclosure,
  button,
  bullets,
  boxes,
  session,
  padding_tablet,
  side,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const utm = session && session.utm;
  if (video)
    return (
      <ReactPlayer
        thumb={image && image.src}
        image_thumb={image}
        id={video}
        videoHeight={videoHeight ? videoHeight : "360px"}
        margin_tablet="0px"
        width={videoWidth}
        style={{
          width: videoWidth ? videoWidth : "100%",
          margin: "auto",
        }}
      />
    );
  if (image) {
    const imgStyles = image.style ? JSON.parse(image.style) : null;
    const [img_h_lg, img_h_md, img_h_tablet, img_h_sm, img_h_xs] =
      imgStyles && imgStyles.height
        ? Array.isArray(imgStyles.height)
          ? imgStyles.height
          : [imgStyles.height]
        : ["100%"];
    return image?.src ? (
      <Img
        src={image.src}
        onClick={() => {
          if (image.link) {
            if (image.link.indexOf("http") > -1) window.open(image.link);
            else navigate(image.link);
          }
        }}
        style={imgStyles}
        alt="4Geeks Academy Section"
        margin="0px"
        height_lg={img_h_lg || "100%"}
        height_md={img_h_md || "100%"}
        height_tablet={img_h_tablet || "100%"}
        height_sm={img_h_sm}
        height_xxs={img_h_xs || "270px"}
        minHeight="auto"
        width={imgStyles ? imgStyles.width || "100%" : "100%"}
        backgroundSize={image.shadow ? "cover" : "contain"}
        position={side}
        //border={image.shadow && "3px solid black"}
        boxShadow={image.shadow && "20px 15px 0px 0px rgba(0,0,0,1)"}
      />
    ) : (
      <GatsbyImage
        height_xxs="450px"
        image={getImage(image.childImageSharp.gatsbyImageData)}
        alt="geekforce image"
      />
    );
  }

  const [h_xl, h_lg, h_md, h_sm, h_xs] =
    heading && heading.font_size ? heading.font_size : [];
  const [sh_xl, sh_lg, sh_md, sh_sm, sh_xs] =
    sub_heading && Array.isArray(sub_heading.font_size)
      ? sub_heading.font_size
      : [];
  const [c_xl, c_lg, c_md, c_sm, c_xs] = content?.font_size
    ? content.font_size
    : [];

  return (
    <Div
      flexDirection_tablet="column"
      flexDirection="column"
      padding_tablet={padding_tablet || "10px 0px 0px 0px"}
    >
      {header && (
        <Div
          margin="0 0 30px 0"
          justifyContent="center"
          justifyContent_md="start"
        >
          {Array.isArray(header) &&
            header.map((item, index) => {
              return (
                <RoundImage
                  key={index}
                  url={item.image}
                  bsize="contain"
                  height="20px"
                  width="130px"
                  position="left"
                />
              );
            })}
        </Div>
      )}
      {heading && (
        <Div alignItems="center" gap="12px">
          {heading.heading_image && (
            <Img
              src={heading.heading_image.src}
              margin="0px"
              width="60px"
              height="60px"
              backgroundSize="contain"
            />
          )}
          <H2
            type="h2"
            textAlign_tablet="left"
            fontSize={h_xs}
            fontSize_xxs={h_xs}
            fontSize_md={h_md}
            fontSize_sm={h_sm}
            fontSize_tablet={h_lg}
            fontSize_lg={h_xl}
            margin="30px 0 20px 0"
            style={heading.style ? JSON.parse(heading.style) : null}
          >
            {heading.text.includes("\n")
              ? heading.text.split("\n").map((line, idx, arr) =>
                  idx < arr.length - 1 ? (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ) : (
                    line
                  )
                )
              : heading.text}
          </H2>
        </Div>
      )}
      {sub_heading &&
        (/<\/?[a-z0-9]+>/g.test(sub_heading.text) ? (
          <Paragraph
            textAlign_tablet="left"
            fontFamily="Archivo"
            fontWeight="600"
            textAlign="left"
            margin="0"
            fontSize={sh_xs || sh_xl || "21px"}
            fontSize_xs={sh_xs}
            fontSize_sm={sh_sm}
            fontSize_tablet={sh_md}
            fonSize_md={sh_lg}
            style={sub_heading.style ? JSON.parse(sub_heading.style) : null}
            dangerouslySetInnerHTML={{ __html: sub_heading.text }}
          />
        ) : (
          <Paragraph
            textAlign_tablet="left"
            fontFamily="Archivo"
            fontWeight="600"
            textAlign="left"
            margin="0"
            fontSize={sh_xs || sh_xl || "21px"}
            fontSize_xs={sh_xs}
            fontSize_sm={sh_sm}
            fontSize_tablet={sh_md}
            fonSize_md={sh_lg}
            style={sub_heading.style ? JSON.parse(sub_heading.style) : null}
          >
            {sub_heading.text && sub_heading.text.includes("\n")
              ? sub_heading.text.split("\n").map((line, idx, arr) =>
                  idx < arr.length - 1 ? (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ) : (
                    line
                  )
                )
              : sub_heading.text}
          </Paragraph>
        ))}

      {Array.isArray(bullets?.items) && (
        <Div
          flexDirection="column"
          margin={sub_heading ? "16px 0 16px 0" : "0 0 16px 0"}
          gap="5px"
        >
          {bullets.items?.map((bullet, index) => {
            return (
              <Div
                key={index}
                height="auto"
                alignItems="center"
                margin="12px 0 0 0"
                display="flex"
                flexDirection="row"
                gap="8px"
                style={
                  bullets.item_style ? JSON.parse(bullets.item_style) : null
                }
              >
                {/* Icon always on the left */}
                {bullet.icon && (
                  <Icon
                    icon={bullet.icon || "check"}
                    width="18px"
                    display="inline"
                    color={bullet.icon_color || Colors.blue}
                    fill={Colors.yellow}
                    style={{ strokeWidth: "2px", minWidth: "18px" }}
                  />
                )}
                <Div display="flex" flexDirection="column" style={{ flex: 1 }}>
                  {/* Heading if present */}
                  {bullet.heading && (
                    <H3
                      as="h3"
                      textAlign="left"
                      fontSize="16px"
                      fontWeight="900"
                      lineHeight="16px"
                      textTransform="uppercase"
                      margin="0"
                    >
                      {bullet.heading}
                    </H3>
                  )}
                  {/* Text if present */}
                  {bullet.text && (
                    <Paragraph
                      textAlign="left"
                      margin="0"
                      dangerouslySetInnerHTML={{ __html: bullet.text }}
                    />
                  )}
                </Div>
              </Div>
            );
          })}
        </Div>
      )}

      {content && /<\/?[a-z0-9]+>/g.test(content.text) ? (
        <Paragraph
          textAlign="left"
          textAlign_tablet="left"
          margin="10px 0"
          fontSize={c_xs || c_xl}
          fontSize_xs={c_xs}
          fontSize_sm={c_sm}
          fontSize_tablet={c_md}
          fontSize_md={c_lg}
          fontSize_lg={c_xl}
          style={content.style ? JSON.parse(content.style) : null}
          onClick={(e) => {
            if (e.target.tagName === "A" && content.path)
              smartRedirecting(e, content.path);
          }}
          {...(isClient
            ? { dangerouslySetInnerHTML: { __html: content.text } }
            : { children: content.text })}
        />
      ) : (
        content &&
        content.text.split("\n").map((p, i) => (
          <Paragraph
            key={`${i}-${p}`}
            textAlign="left"
            textAlign_tablet="left"
            margin="10px 0"
            fontSize={c_xs || c_xl}
            fontSize_xs={c_xs}
            fontSize_sm={c_sm}
            fontSize_tablet={c_md}
            fontSize_md={c_lg}
            fontSize_lg={c_xl}
            style={content.style ? JSON.parse(content.style) : null}
            onClick={(e) => {
              if (e.target.tagName === "A" && content.path)
                smartRedirecting(e, content.path);
            }}
          >
            {p}
          </Paragraph>
        ))
      )}

      {disclosure && /<\/?[a-z0-9]+>/g.test(disclosure.text) ? (
        <Paragraph
          textAlign="left"
          textAlign_tablet="left"
          margin="10px 0"
          fontSize="13px"
          style={disclosure.style ? JSON.parse(disclosure.style) : null}
          {...(isClient
            ? { dangerouslySetInnerHTML: { __html: disclosure.text } }
            : { children: disclosure.text })}
          onClick={(e) => {
            if (e.target.tagName === "A" && disclosure.path)
              smartRedirecting(e, disclosure.path);
          }}
        />
      ) : (
        disclosure &&
        disclosure.text.split("\n").map((p, i) => (
          <Paragraph
            key={`${i}-${p}`}
            textAlign="left"
            textAlign_tablet="left"
            margin="10px 0"
            fontSize="13px"
            style={disclosure.style ? JSON.parse(disclosure.style) : null}
            onClick={(e) => {
              if (e.target.tagName === "A" && disclosure.path)
                smartRedirecting(e, disclosure.path);
            }}
          >
            {p}
          </Paragraph>
        ))
      )}

      {button && (
        <Button
          outline
          colorHoverText={button.hover_color || ""}
          background={Colors[button.background] || button.background}
          lineHeight="26px"
          textColor={Colors.black}
          textTransform="none"
          color={Colors[button.color] || button.color}
          fontSize="21px"
          height="auto"
          textAlign="left"
          margin="1rem 0"
          padding="10px 20px"
          borderRadius="4px"
          onClick={() => {
            if (button.path && button.path.indexOf("http") > -1)
              window.open(transferQuerystrings(button.path, utm));
            else navigate(button.path);
          }}
        >
          {button.text}
        </Button>
      )}

      {boxes && (
        <Div
          margin_xxs="15px 0 30px 0"
          margin_tablet="15px 0 0 0"
          justifyContent_tablet="between"
          gap="15px"
          flexDirection="column"
          flexDirection_tablet="row"
        >
          {boxes.map((box) => (
            <Div
              key={box.title}
              background="#FFF"
              border="3px solid #000"
              width="100%"
              width_md="320px"
              minHeight_md="260px"
              width_tablet="200px"
              height_tablet="200px"
              boxShadow="6px 6px 0px 0px rgba(0,0,0,1)"
              boxShadow_tablet="9px 8px 0px 0px rgba(0,0,0,1)"
              flexDirection_tablet="column"
              justifyContent_tablet="center"
              padding="15px"
              alignItems="center"
              alignItems_tablet="normal"
            >
              <Icon icon={box.icon} width="89px" height="89px" color={null} />
              <Div
                margin="0 0 0 15px"
                margin_tablet="30px 0 0 0"
                display="flex"
                flexDirection="column"
                display_tablet="block"
              >
                <H3
                  textAlign="left"
                  fontSize="30px"
                  fontSize_tablet="65px"
                  fontFamily="Archivo-Black"
                  margin="0 0 30px 0"
                >
                  {box.title}
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
      )}
    </Div>
  );
};

const TwoColumn = ({
  left,
  right,
  proportions,
  session,
  alignment,
  background,
  bg_full,
}) => {
  const [left_size, right_size] = proportions ? proportions : [];
  return (
    <BackgroundWrapper
      bg_full={bg_full}
      flexDirection="column"
      gap={left?.gap || right?.gap || "0px"}
      gap_tablet={left?.gap_tablet || right?.gap_tablet || "20px"}
      flexDirection_tablet="row"
      alignItems_tablet={alignment}
      m_sm="0px auto 100px auto"
      margin_tablet="0 auto"
      margin_xxs="0"
      margin="auto"
      padding="40px 20px"
      padding_md="40px 80px"
      padding_lg="40px 0px"
      padding_tablet="40px 40px"
      width_tablet="100%"
      maxWidth_md="1280px"
      background={Colors[background] || background}
    >
      <Div
        justifyContent={
          left?.justify
            ? left.justify
            : left?.video
            ? "center"
            : left?.image
            ? "start"
            : "end"
        }
        flexDirection="column"
        size_tablet={left_size || 6}
        size="12"
        padding_xs="0"
        padding_md={right?.image?.shadow ? "0 20px 0 0 " : "0px"}
        // maxHeight="300px"
        textAlign="center"
      >
        <Side session={session} {...left} side="left" />
      </Div>
      <Div
        justifyContent={
          right?.justify
            ? right.justify
            : right?.video
            ? "center"
            : right?.image
            ? "end"
            : "start"
        }
        flexDirection="column"
        size_tablet={right_size || 6}
        padding_xs="0"
        padding_md={left?.image?.shadow ? "0 0 0 20px" : "0px"}
        size="12"
        textAlign="center"
      >
        <Side session={session} {...right} side="right" />
      </Div>
    </BackgroundWrapper>
  );
};
TwoColumn.defaultProps = {
  proportions: [],
  left: null,
  right: null,
};

export default TwoColumn;

export const SingleColumn = ({ column }) => {
  return (
    <Div flexDirection="row" m_sm="0px 0px 100px 0">
      <Div flexDirection="column" size={12} size_sm="12" align_sm="center">
        <Side {...column} />
      </Div>
    </Div>
  );
};
TwoColumn.defaultProps = {
  column: null,
};

// export default SingleColumn;
