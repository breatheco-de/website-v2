import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Break } from "../Responsive";
import { Devices } from "../Responsive";
import BackgroundImage from "gatsby-background-image";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import { getImage } from "gatsby-plugin-image";

const getBgImageType = (imageData) =>
  imageData.layout === "fixed" ? "fixed" : "fluid";
const getAspectRatio = (imageData) => imageData.width / imageData.height;
const getPlaceholder = (imageData) => {
  if (imageData.placeholder) {
    return imageData.placeholder.fallback.includes(`base64`)
      ? { base64: imageData.placeholder.fallback }
      : { tracedSvg: imageData.placeholder.fallback };
  }
  return {};
};

const convertToBgImage = (imageData) => {
  if (imageData && imageData.layout) {
    const returnBgObject = {};
    const bgType = getBgImageType(imageData);
    const aspectRatio = getAspectRatio(imageData);
    const placeholder = getPlaceholder(imageData);
    returnBgObject[bgType] = {
      ...imageData.images.fallback,
      ...placeholder,
      aspectRatio,
    };
    return returnBgObject;
  }
  return {};
};

export const Colors = {
  blue: "#0084FF",
  blue2: "#00698F",
  lightBlue: "#BBEAFC",
  lightBlue2: "rgba(199, 243, 253, 0.5)",
  darkBlue: "#2E2E38",
  veryLightBlue: "#C7F3FD",
  veryLightBlue2: "#E3F9FE",
  veryLightBlue3: "#F4F9FF",
  grayBrown: "#333333",
  gray2: "#A4A4A466",
  gray: "#898a8b",
  gray3: "#828282",
  verylightGray: "#F5F5F5",
  verylightGray2: "#FBFBFB",
  verylightGray3: "#F9F9F9",
  lightGray: "#ebebeb",
  lightGray2: "#C4C4C4",
  lightGray3: "oklch(.556 0 0)",
  lightGreen: "#c4f7b7",
  green: "#20630d",
  green2: "#10b981",
  darkGray: "#3A3A3A",
  darkGray2: "#606060",
  darkGray3: "#4D4D5C",
  borderGray: "#ececec",
  yellow: "#FFC718",
  lightYellow: "rgba(255, 183, 24, 0.1)",
  lightYellow2: "rgba(255, 183, 24, 0.2)",
  darkYellow: "#FFECBF",
  black: "#000000",
  white: "#FFFFFF",
  red: "red",
  lightRed: "#ffcdc9",
  whitePink: "#FFF1D1",
  pink: "#EB5757",
  shadow: "0px 0px 16px rgba(0, 0, 0, 0.15)",
};

export const Select = styled.select`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  appearance: none;
  width: ${(props) => props.width};
  text-align-last: center;
  border: ${(props) => props.border};
  font-family: lato, sans-serif;
  padding: 5px;
`;
export const Option = styled.option`
  background: green;
  color: black;
`;
export const Tooltip = styled.div`
  position: absolute;
  left: 30px;
  bottom: 0;
  transform: translateY(50%);
  height: auto;
  z-index: 1;
  width: 300px;
  opacity: 1;
  border-radius: 0.25rem;
  margin-bottom: 1em;
  padding: 1em;
  background-color: rgba(137, 138, 139, 1);
  color: white;
  font-size: 1em;
  line-height: 1.2;
  text-align: center;
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
`;
export const RoundImage = styled.div`
  display: ${(props) => props.display || "block"};
  position: ${(props) => props.pos};
  background-image: url(${(props) => props.url});
  margin-bottom: ${(props) => props.mb};
  background-repeat: no-repeat;
  background-size: ${(props) => props.bsize};
  border-radius: ${(props) => props.border};
  margin: ${(props) => props.margin};
  background-position: ${(props) => props.position};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  :hover {
    opacity: ${(props) => props.opacity};
  }

  ${(props) =>
    props.move &&
    css`
      transform: translateY(-${(props) => props.up});
    `}
  @media ${Break.lg} {
    width: ${(props) => props.w_lg};
    height: ${(props) => props.h_lg};
    border-radius: ${(props) => props.br_lg};
  }
  @media ${Break.md} {
    height: ${(props) => props.h_md};
    width: ${(props) => props.w_md};
    border-radius: ${(props) => props.br_md};
  }
  @media ${Break.sm} {
    height: ${(props) => props.h_sm};
    width: ${(props) => props.w_sm};
    border-radius: ${(props) => props.br_sm};
  }
  @media ${Break.xs} {
    height: ${(props) => props.h_xs};
    width: ${(props) => props.w_xs};
    border-radius: ${(props) => props.br_xs};
  }

  @media ${Devices.tablet} {
    width: ${(props) => props.width_tablet};
    height: ${(props) => props.height_tablet};
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
  }
  @media ${Devices.lg} {
    width: ${(props) => props.width_lg};
  }
`;
export const Span = styled.div`
  color: ${(props) => props.color};
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  ${Tooltip}:hover {
    opacity: ${(props) => props.opacity};
  }
`;

const StyledImage = styled.div`
  display: ${(props) => props.display};
  position: ${(props) => props.position};
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: ${(props) => props.backgroundSize || "cover"};
  border-radius: ${(props) => props.borderRadius};
  background-position: ${(props) => props.position || "center center"};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight || "none"};
  min-width: ${(props) => props.minWidth};
  margin: ${(props) => props.margin};
  box-shadow: ${(props) => props.boxShadow};
  padding: ${(props) => props.padding};
  z-index: ${(props) => props.zIndex};
  @media ${Break.sm} {
    height: ${(props) => props.h_sm};
    min-height: ${(props) => props.minHeight_sm};
    width: ${(props) => props.w_sm};
  }
  @media ${Devices.xxs} {
    padding: ${(props) => props.padding_xxs};
    display: ${(props) => props.display_xxs};
    height: ${(props) => props.height_xxs};
    right: ${(props) => props.right_xxs};
    bottom: ${(props) => props.bottom_xxs};
    left: ${(props) => props.left_xxs};
  }
  @media ${Devices.xs} {
    display: ${(props) => props.display_xs};
    height: ${(props) => props.height_xs};
    left: ${(props) => props.left_xs};
    right: ${(props) => props.right_xs};
    top: ${(props) => props.top_xs};
    bottom: ${(props) => props.bottom_xs};
  }
  @media ${Devices.sm} {
    width: ${(props) => props.width_sm};
    height: ${(props) => props.height_sm};
  }
  @media ${Devices.tablet} {
    padding: ${(props) => props.padding_tablet};
    display: ${(props) => props.display_tablet};
    height: ${(props) => props.height_tablet};
    width: ${(props) => props.width_tablet};
    min-height: ${(props) => props.minHeight_tablet};
    left: ${(props) => props.left_tablet};
    right: ${(props) => props.right_tablet};
    top: ${(props) => props.top_tablet};
    bottom: ${(props) => props.bottom_tablet};
  }
  @media ${Devices.md} {
    display: ${(props) => props.display_md};
    left: ${(props) => props.left_md};
    right: ${(props) => props.right_md};
    top: ${(props) => props.top_md};
    bottom: ${(props) => props.bottom_md};
    height: ${(props) => props.height_md};
    width: ${(props) => props.width_md};
  }
  @media ${Devices.lg} {
    display: ${(props) => props.display_lg};
    left: ${(props) => props.left_lg};
    right: ${(props) => props.right_lg};
    top: ${(props) => props.top_lg};
    bottom: ${(props) => props.bottom_lg};
    height: ${(props) => props.height_md};
  }
`;
export const Img = React.memo(StyledImage);

const StyledImageV2 = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: ${(props) => props.backgroundSize || "cover"};
  border-radius: ${(props) => props.borderRadius};
  background-position: ${(props) => props.position || "center center"};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "none")};
  min-width: ${(props) => props.minWidth};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  rotate: ${(props) => props.rotate};
  @media ${Break.xs} {
    height: ${(props) => props.height_xs};
    min-height: ${(props) => props.minHeight_xs};
    width: ${(props) => props.with_xs};
    top: ${(props) => props.top_xs};
    left: ${(props) => props.left_xs};
  }
  @media ${Devices.tablet} {
    height: ${(props) => props.height_tablet};
    min-height: ${(props) => props.minHeight_tablet};
    width: ${(props) => props.width_tablet};
    top: ${(props) => props.top_tablet};
    left: ${(props) => props.left_tablet};
    rotate: ${(props) => props.rotate_tablet};
  }
  @media ${Devices.md} {
    height: ${(props) => props.height_md};
    min-height: ${(props) => props.minHeight_md};
    width: ${(props) => props.width_md};
    top: ${(props) => props.top_md};
    left: ${(props) => props.left_md};
  }
`;
export const ImgV2 = React.memo(StyledImageV2);

// Cropped iframe to mask third-party UI (e.g., VideoAsk controls/banners)
export const MaskedIframe = styled.iframe`
  border: none;
  width: 100%;
  height: 120%;
  transform: translateY(-10%);
  border-radius: 0;

  @media (max-width: 425px) {
    height: 145%;
    transform: translateY(-16%);
  }
  @media (max-width: 390px) {
    height: 155%;
    transform: translateY(-18%);
  }
`;

export const BackgroundSection = ({
  id,
  children,
  alt,
  className,
  image,
  height,
  width,
  bgSize,
  borderRadius,
  margin,
  withOverlay,
  style,
}) => {
  const thisImage = getImage(image);

  // Use like this:
  const bgImage = convertToBgImage(thisImage);

  return (
    <BackgroundImage
      id={id}
      alt={alt}
      Tag="section"
      loading="eager"
      // fadeIn={false}
      className={className}
      borderRadius={borderRadius}
      {...bgImage}
      preserveStackingContext
      style={style}
    >
      {children}
    </BackgroundImage>
  );
};

export const StyledBackgroundSection = styled(BackgroundSection)`
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.align};
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) => props.boxShadow};
  position: ${(props) => props.position};
  background-repeat: no-repeat;
  margin: ${(props) => props.margin || "auto"};
  z-index: ${(props) => props.zIndex || 1};
  opacity: 1;
  background-size: ${(props) => props.bgSize || "cover"};
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  flex-shrink: ${(props) => props.flexShrink};
  display: ${(props) => props.display};
  &:before {
    background-size: ${(props) => props.bgSize};
  }
  &:after {
    min-height: ${(props) => props.minHeight};
    border-radius: ${(props) => props.borderRadius};
    filter: ${(props) => props.filter};
    height: ${(props) => props.h_sm};
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    background-color: ${(props) => props.backgroundColor};
    background-position: ${(props) => props.backgroundPosition} !important;
  }
  @media ${Devices.xxs} {
    height: ${(props) => props.height_xxs};
    width: ${(props) => props.width_xxs};
    margin: ${(props) => props.margin_xxs};
    &:before,
    &:after {
      filter: ${(props) => props.filter_xxs};
    }
  }
  @media ${Devices.xs} {
    height: ${(props) => props.height_xs};
    margin: ${(props) => props.margin_xs};
    width: ${(props) => props.width_xs || "100%"};
  }
  @media ${Devices.sm} {
    height: ${(props) => props.height_sm};
    width: ${(props) => props.width_sm};
  }
  @media ${Devices.tablet} {
    border-radius: ${(props) => props.borderRadius_tablet};
    height: ${(props) => props.height_tablet};
    width: ${(props) => props.width_tablet || "100%"};
    display: ${(props) => props.display_tablet};
    margin: ${(props) => props.margin_tablet};
    &:before,
    &:after {
      border-radius: ${(props) => props.borderRadius_tablet};
    }
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
    height: ${(props) => props.height_md};
  }
  @media ${Devices.lg} {
    height: ${(props) => props.height_lg};
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;
// @media ${Break.lg}{
//     &:before, &:after {
//         background-position: ${props => props.bp_lg} !important;
//     }
// }
// @media ${Break.md}{
//     &:before, &:after {
//         background-position: ${props => props.bp_md} !important;
//     }
// }
// @media ${Break.sm}{
//     height: ${props => props.h_sm};
//     width: ${props => props.w_sm};
//     &:before, &:after {
//         border-radius: ${props => props.borderRadius_sm};
//         background-position: ${props => props.bp_sm} !important;
//     }
// }
// @media ${Break.xs}{
//     width: ${props => props.w_xs};
//     &:before, &:after {
//         background-position: ${props => props.bp_xs} !important;
//     }
// }

export const Small = styled.small`
  display: ${(props) => props.display};
`;

/* Fix variant handling in Button component */
const getVariant = (props) => ({
  outline: {
    border: `1px solid ${props.color}`,
    background: props.background || "initial",
    color: props.color,
  },
  full: {
    border: "none",
    background: props.background || props.color,
    color: props.textColor || "white",
  },
  empty: {
    border: "none",
    background: "none",
    color: "#0097CD",
    textTransform: "capitalize",
  },
});

const SmartButton = ({ children, onClick, type, icon, variant, ...rest }) => {
  return (
    <button
      type={type || "button"}
      onClick={(e) => onClick && onClick(e)}
      className={rest.className}
      style={{ ...rest.style }}
      variant={variant}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};

export const ButtonText = styled.h3`
  text-align: left;
  width: fit-content;
  font-size: 15px;
  line-height: 22px;
  font-weight: 400;
  margin: 10px 5px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${Colors.black};
  font-family: "Lato", sans-serif;

  &:hover {
    color: ${Colors.blue};
  }
`;

export const Button = styled(SmartButton)`
  font-size: ${(props) => props.fontSize};
  font-family: "Lato", sans-serif;
  text-transform: ${(props) => props.textTransform};
  gap: ${(props) => props.gap};
  text-decoration: ${(props) => props.textDecoration || "none"};
  text-decoration-line: ${(props) => props.textDecorationLine || "none"};
  font-weight: ${(props) => props.fontWeight || "700"};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding || "12px 24px"};
  transform: ${(props) => props.transform};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border: ${(props) => props.border};
  border-left: ${(props) => props.borderLeft};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  border-right: ${(props) => props.borderRight};
  height: ${(props) => props.height || "40px"};
  cursor: ${(props) => props.cursor || "pointer"};
  text-align: ${(props) => props.textAlign || "center"};
  letter-spacing: ${(props) => props.letterSpacing || "0px"};
  line-height: ${(props) => props.lineHeight};
  vertical-align: middle;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  justify-self: ${(props) => props.justifySelf};
  justify-content: ${(props) => props.justifyContent};
  box-shadow: ${(props) => props.boxShadow};
  transition: ${(props) =>
    props.transition || "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"};

  /* Apply variant styles */
  ${(props) => {
    const styles = getVariant(props)[props.variant];
    return styles
      ? Object.entries(styles)
          .map(([key, value]) => `${key}: ${value};`)
          .join("\n")
      : "";
  }}

  &:hover {
    ${(props) => {
      if (props.boxShadow) {
        const transform = props.transform
          ? `${props.transform} translateY(-2px)`
          : "translateY(-2px)";
        return `transform: ${transform};`;
      }
      return props.transform ? `transform: ${props.transform};` : "";
    }}
    ${(props) => {
      if (props.boxShadow) {
        const currentShadow = props.boxShadow;
        // Detect if it's a solid shadow (format: Xpx Ypx 0px 0px color)
        const solidShadowMatch = currentShadow.match(
          /(\d+)px\s+(\d+)px\s+0px\s+0px\s+(.+)/
        );
        if (solidShadowMatch) {
          const [, x, y, color] = solidShadowMatch;
          const newX = Math.min(parseInt(x) + 2, parseInt(x) * 1.2);
          const newY = Math.min(parseInt(y) + 2, parseInt(y) * 1.2);
          return `box-shadow: ${newX}px ${newY}px 0px 0px ${color};`;
        }
        // For other shadows, add a soft additional shadow
        return `box-shadow: ${currentShadow}, 0 4px 12px rgba(0, 0, 0, 0.15);`;
      }
      return "";
    }}
    ${(props) =>
      props.variant === "outline"
        ? css`
            background-color: ${props.colorHover || props.color};
            color: ${props.colorHoverText || "white"};
          `
        : css`
            ${props.colorHover ? `background-color: ${props.colorHover};` : ""}
            ${props.colorHoverText ? `color: ${props.colorHoverText};` : ""}
          `}
  }

  &:active {
    ${(props) => {
      if (props.boxShadow) {
        const transform = props.transform
          ? `${props.transform} translateY(1px)`
          : "translateY(1px)";
        return `transform: ${transform};`;
      }
      return props.transform ? `transform: ${props.transform};` : "";
    }}
    ${(props) => {
      if (props.boxShadow) {
        const currentShadow = props.boxShadow;
        // Detect if it's a solid shadow (format: Xpx Ypx 0px 0px color)
        const solidShadowMatch = currentShadow.match(
          /(\d+)px\s+(\d+)px\s+0px\s+0px\s+(.+)/
        );
        if (solidShadowMatch) {
          const [, x, y, color] = solidShadowMatch;
          const newX = Math.max(parseInt(x) - 2, parseInt(x) * 0.8);
          const newY = Math.max(parseInt(y) - 2, parseInt(y) * 0.8);
          return `box-shadow: ${newX}px ${newY}px 0px 0px ${color};`;
        }
        // For other shadows, reduce the intensity
        return "box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);";
      }
      return "";
    }}
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:focus {
    outline: none;
    box-shadow: ${(props) => {
      const focusShadow = "0 0 0 3px rgba(0, 132, 255, 0.3)";
      if (props.boxShadow) {
        return `${props.boxShadow}, ${focusShadow}`;
      }
      return focusShadow;
    }};
  }
  @media ${Devices.xxs} {
    padding: ${(props) => props.padding_xxs};
  }
  @media ${Devices.xs} {
    width: ${(props) => props.width_xs};
    height: ${(props) => props.height_xs};
    text-align: ${(props) => props.textAlign_xs || "center"};
    padding: ${(props) => props.padding_xs || "12px 24px"};
    max-width: ${(props) => props.maxWidth_xs};
    top: ${(props) => props.top_xs};
    bottom: ${(props) => props.bottom_xs};
    left: ${(props) => props.left_xs};
    right: ${(props) => props.right_xs};
  }
  @media ${Devices.sm} {
    width: ${(props) => props.width_sm};
    height: ${(props) => props.height_sm};
    max-width: ${(props) => props.maxWidth_sm};
    margin: ${(props) => props.margin_sm};
    font-size: ${(props) => props.fontSize_sm};
    top: ${(props) => props.top_sm};
    bottom: ${(props) => props.bottom_sm};
    left: ${(props) => props.left_sm};
    right: ${(props) => props.right_sm};
  }
  @media ${Devices.tablet} {
    width: ${(props) => props.width_tablet};
    height: ${(props) => props.height_tablet};
    margin: ${(props) => props.margin_tablet};
    padding: ${(props) => props.padding_tablet || "12px 24px"};
    max-width: ${(props) => props.maxWidth_tablet};
    display: ${(props) => props.display_tablet};
    top: ${(props) => props.top_tablet};
    bottom: ${(props) => props.bottom_tablet};
    left: ${(props) => props.left_tablet};
    right: ${(props) => props.right_tablet};
    position: ${(props) => props.position_tablet};
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
    font-size: ${(props) => props.fontSize_md};
    margin: ${(props) => props.margin_md};
    top: ${(props) => props.top_md};
    bottom: ${(props) => props.bottom_md};
    left: ${(props) => props.left_md};
    right: ${(props) => props.right_md};
  }
  @media ${Devices.lg} {
    font-size: ${(props) => props.fontSize_lg};
    width: ${(props) => props.width_lg};
    left: ${(props) => props.left_lg};
    right: ${(props) => props.right_lg};
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;

Button.defaultProps = {
  fontSize: "12px",
  width: "fit-content",
  type: "button",
  colorHover: null,
  borderRadius: "0px",
  outline: false,
  onClick: null,
  display: "flex",
  alignItems: "center",
};

export const Toggle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.b_radius};
  cursor: pointer;
  vertical-align: middle;
  display: inline-block;
  font-family: lato, sans-serif;
`;

RoundImage.defaultProps = {
  width: "100%",
};
Select.defaultProps = {
  background: Colors.white,
  color: Colors.black,
  border: "none",
};

const SmartLink = ({ children, state, ...rest }) => (
  <Location>
    {({ location }) => (
      //make sure user's state is not overwritten
      <Link {...rest} state={{ prevUrl: location.href, ...state }}>
        {children}
      </Link>
    )}
  </Location>
);

export { SmartLink as Link };

const linkRegex = new RegExp("(tel:|http)");
const StyledLink = ({ children, ...rest }) => {
  let Comp = Link;
  let props = {};
  if (linkRegex.test(rest.to)) {
    props.href = rest.to;
    props.target = "_blank";
    props.rel = "noopener noreferrer nofollow";
    Comp = "a";
  } else if (!rest.to || rest.to.charAt(0) === "#" || rest.to === "") {
    Comp = "label";
  }
  return <Comp {...Object.assign(props, rest)}>{children}</Comp>;
};
export const Anchor = styled(StyledLink)`
  display: ${(props) => props.display || "block"};
  font-family: Lato, sans-serif;
  text-align: ${(props) => props.textAlign};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  letter-spacing: 0.05em;
  text-transform: ${(props) => props.textTransform};
  max-width: ${(props) => props.maxWidth};
  cursor: ${(props) => props.cursor};
  margin: ${(props) => props.margin};
  max-width: ${(props) => props.maxWidth};
  padding: ${(props) => props.padding};
  padding-right: ${(props) => props.paddingRight || "innitial"};
  text-shadow: ${(props) => props.textShadow};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
  &:hover {
    text-decoration: underline;
  }
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
  }
  @media ${Devices.md} {
  }
  @media ${Devices.lg} {
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;

export const Spinner = styled.div`
  border: ${(props) => `16px solid ${props.color || Colors.blue}`};
  border-radius: 50%;
  border-top-color: #3498db;
  width: 120px;
  height: 120px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const PhoneText = styled.p`
  text-decoration: none;
  text-align: center;
  margin-top: 6px;
  font-size: 15px;

  @media ${Break.xs} {
    font-size: 12px;
  }
`;

export const PhoneTextDesktop = styled.p`
  text-decoration: none;
  text-align: right;
  margin-top: 3px;
  margin-right: 10px;
  font-size: 15px;

  @media ${Break.xs} {
    font-size: 12px;
  }
`;

export const VerticalVideoHolder = styled.div`
  border: 3px solid black;
  box-shadow: 13px 13px 0px 1px rgba(0, 0, 0, 1);
  z-index: 1;
  height: 500px;
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  background: white;
  position: relative;
`;

export const OfferTag = styled.div`
  position: absolute;
  top: -12px;
  right: 16px;
  background: ${Colors.pink};
  color: ${Colors.white};

  @media ${Devices.tablet} {
    right: 100px;
  }
  @media ${Devices.md} {
    right: 100px;
  }
  padding: 4px 24px;
  border-radius: 4px;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
  pointer-events: ${(props) => (props.isHidden ? "none" : "auto")};

  &:before {
    content: "🔥";
    font-size: 16px;
  }

  @media ${Devices.tablet} {
    font-size: 12px;
    padding: 3px 10px;
    top: -10px;
    right: 45px;
  }
`;

// Chart Components
export const ChartWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media ${Break.sm} {
    padding: 0;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const FloatingLabels = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

export const FloatingLabel = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
  padding: 4px 8px;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${Colors.grayBrown};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  transform: translate(-50%, -50%);

  /* Position based on angle calculation */
  ${(props) => {
    const x = 50 + 30 * Math.cos(props.angle);
    const y = 50 + 30 * Math.sin(props.angle);
    return css`
      left: ${x}%;
      top: ${y}%;
    `;
  }}

  @media ${Break.sm} {
    padding: 3px 6px;
    font-size: 10px;

    /* Adjust position for mobile */
    ${(props) => {
      const x = 50 + 35 * Math.cos(props.angle);
      const y = 50 + 35 * Math.sin(props.angle);
      return css`
        left: ${x}%;
        top: ${y}%;
      `;
    }}
  }
`;
