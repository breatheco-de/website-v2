import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Colors, StyledBackgroundSection } from "../Styling";
import { H1, H2, Paragraph, SubTitle } from "../Heading";
import { Break } from "../Responsive";
import { Devices } from "../Responsive";
import Fragment from "../Fragment";
import { Carousel } from "react-responsive-carousel";
import MosaicImages from "../MosaicImages";
import Gallery from "../Gallery";

const containerVariants = {
  fluid: {
    width: "100%",
  },
  fixed: {
    width: "inherit",
  },
};
export const Container = styled(Fragment)`
  width: ${(props) => containerVariants[props.variant || "fixed"]};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin || "auto"};
  padding: ${(props) => props.padding || "0"};
  transform: ${(props) => props.transform};
  flex: ${(props) =>
    props.flex || props.size ? `0 0 ${(props.size / 12) * 100}%` : null};
  max-width: ${(props) =>
    props.size ? `${(props.size / 12) * 100}%` : props.maxWidth || "1280px"};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "none")};
  overflow: ${(props) => props.overflow};
  overflow-wrap: ${(props) => props.overflowWrap};
  overflow-x: ${(props) => props.overflowX};
  grid-area: ${(props) => props.gridArea};
  place-self: ${(props) => props.placeSelf};
  grid-column: ${(props) => props.gridColumn};
  flex-flow: ${(props) => props.flexFlow};
  grid-row: ${(props) => props.gridRow};
  gap: ${(props) => props.gap};
  row-gap: ${(props) => props.rowGap};
  column-count: ${(props) => props.columnCount};
  grid-auto-flow: ${(props) => props.gridAutoFlow};
  grid-template-columns: ${(props) => props.gridTemplateColumns};
  grid-auto-rows: ${(props) => props.gridAutoRows};
  column-gap: ${(props) => props.columnGap};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  direction: ${(props) => props.direction};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  background: ${(props) =>
    props.isActive ? props.backgroundActive : props.background};
  background-image: url(${(props) => props.bgImage});
  background-size: ${(props) => props.bgSize};
  background-repeat: ${(props) => props.bgRepeat};
  border-left: ${(props) =>
    props.isActive ? props.borderLeftActive : props.borderLeft};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  border-right: ${(props) => props.borderRight};
  justify-content: ${(props) => justifyContentOptions[props.justifyContent]};
  order: ${(props) => props.order};
  text-align: ${(props) => props.textAlign};
  justify-self: ${(props) => props.justifySelf};
  box-shadow: ${(props) =>
    props.isActive ? props.boxShadowActive : props.boxShadow};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  flex-grow: ${(props) => props.flexGrow || "0"};
  flex-shrink: ${(props) => props.flexShrink};
  align-content: ${(props) => props.alignContent};
  cursor: ${(props) => props.cursor};
  z-index: ${(props) => props.zIndex};
  place-items: ${(props) => props.placeItems};
  font-size: ${(props) => props.fontSize};
  &:after {
    content: ${(props) => props.contentAfter};
    display: ${(props) => props.displayAfter || "block"};
    background-color: ${(props) => props.backgroundColorAfter};
    height: ${(props) => props.heightAfter};
    width: ${(props) => props.widthAfter};
    margin-left: ${(props) => props.marginLeftAfter};
    position: ${(props) => props.positionAfter};
    top: ${(props) => props.topAfter};
    bottom: ${(props) => props.bottomAfter};
    left: ${(props) => props.leftAfter};
    right: ${(props) => props.rightAfter};
  }
  &:hover {
    background: ${(props) => props.backgroundHover};
    border-bottom: ${(props) => props.borderBottomHover};
  }
  @media ${Devices.xxs} {
    column-count: ${(props) => props.columnCount_xxs};
    padding: ${(props) => props.padding_xxs};
    background: ${(props) => props.background_xxs};
    display: ${(props) => props.display_xxs};
    top: ${(props) => props.top_xxs};
    left: ${(props) => props.left_xxs};
    margin: ${(props) => props.margin_xxs || "0 auto"};
    display: ${(props) => props.display_xxs};
    justify-content: ${(props) => props.justifyContent_xxs};
    width: ${(props) => props.width_xxs};
  }
  @media ${Devices.xs} {
    padding: ${(props) => props.padding_xs};
    column-count: ${(props) => props.columnCount_xs};
    flex-direction: ${(props) => props.flexDirection_xs};
    flex-wrap: ${(props) => props.flexWrap_xs};
    width: ${(props) => props.width_xs};
    max-width: ${(props) => props.maxWidth_xs};
    height: ${(props) => props.height_xs};
    order: ${(props) => props.order_xs};
    margin: ${(props) => props.margin_xs || "0 auto"};
    display: ${(props) => props.display_xs};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_xs]};
    order: ${(props) => props.order_xs};
    border: ${(props) => props.border_xs};
    border-top: ${(props) => props.borderTop_xs};
    border-right: ${(props) => props.borderRight_xs};
    border-bottom: ${(props) => props.borderBottom_xs};
    border-left: ${(props) => props.borderLeft_xs};
    align-content: ${(props) => props.alignContent_xs};
    top: ${(props) => props.top_xs};
    right: ${(props) => props.right_xs};
    left: ${(props) => props.left_xs};
    background: ${(props) => props.background_xs};
  }
  @media ${Devices.sm} {
    padding: ${(props) => props.padding_sm};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_sm]};
    height: ${(props) => props.height_sm};
    position: ${(props) => props.position_sm};
    margin: ${(props) => props.margin_sm || "0 auto"};
    display: ${(props) => props.display_sm};
    column-count: ${(props) => props.columnCount_sm};
    flex-direction: ${(props) => props.flexDirection_sm};
    flex-wrap: ${(props) => props.flexWrap_sm};
    order: ${(props) => props.order_sm};
    top: ${(props) => props.top_sm};
    right: ${(props) => props.right_sm};
    border-radius: ${(props) => props.borderRadius_sm};
    max-width: ${(props) => props.maxWidth_sm};
    width: ${(props) => props.width_sm};
    background: ${(props) => props.background_sm};
  }
  @media ${Devices.tablet} {
    flex: ${(props) =>
      props.flex_tablet || props.size_tablet
        ? `0 0 ${(props.size_tablet / 12) * 100}%`
        : null};
    flex-flow: ${(props) => props.flexFlow_tablet};
    max-width: ${(props) =>
      props.size_tablet ? `${(props.size_tablet / 12) * 100}%` : null};
    max-width: ${(props) =>
      props.maxWidth_tablet
        ? props.maxWidth_tablet
        : props.size_tablet
        ? `${(props.size_tablet / 12) * 100}%`
        : null};
    align-self: ${(props) => props.alignSelf_tablet};
    order: ${(props) => props.order_tablet};
    gap: ${(props) => props.gap_tablet};
    column-count: ${(props) => props.columnCount_tablet};
    place-self: ${(props) => props.placeSelf_tablet};
    grid-template-columns: ${(props) => props.gridTemplateColumns_tablet};
    background: ${(props) => props.background_tablet};
    display: ${(props) => props.display_tablet};
    position: ${(props) => props.position_tablet};
    flex-direction: ${(props) => props.flexDirection_tablet};
    text-align: ${(props) => props.textAlign_tablet};
    align-content: ${(props) => props.alignContent_tablet};
    height: ${(props) => props.height_tablet};
    align-items: ${(props) => props.alignItems_tablet};
    padding: ${(props) => props.padding_tablet};
    margin: ${(props) => props.margin_tablet || "0 auto"};
    width: ${(props) => props.width_tablet};
    min-width: ${(props) => props.minWidth_tablet};
    min-height: ${(props) => props.minHeight_tablet};
    height: ${(props) => props.height_tablet};
    flex: ${(props) => props.flex_tablet};
    flex-shrink: ${(props) =>
      props.flexShrink_tablet ? props.flexShrink_tablet : 1};
    flex-wrap: ${(props) => props.flexWrap_tablet};
    border: ${(props) => props.border_tablet};
    border-top: ${(props) => props.borderTop_tablet};
    top: ${(props) => props.top_tablet};
    right: ${(props) => props.right_tablet};
    left: ${(props) => props.left_tablet};
    border-right: ${(props) => props.borderRight_tablet};
    border-bottom: ${(props) => props.borderBottom_tablet};
    border-radius: ${(props) => props.borderRadius_tablet};
    box-shadow: ${(props) => props.boxShadow_tablet};
    border-left: ${(props) => props.borderLeft_tablet};
    transform: ${(props) => props.transform_tablet};
    grid-area: ${(props) => props.gridArea_tablet};
    grid-column: ${(props) => props.gridColumn_tablet};
    grid-row: ${(props) => props.gridRow_tablet};
    justify-self: ${(props) => props.justifySelf_tablet};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_tablet]};
    z-index: ${(props) => props.zIndex_tablet};
    top: ${(props) => props.top_tablet};
    bottom: ${(props) => props.bottom_tablet};
    right: ${(props) => props.right_tablet};
    left: ${(props) => props.left_tablet};
    &:after {
      display: ${(props) => props.displayAfter_tablet};
    }
  }
  @media ${Devices.md} {
    flex: ${(props) =>
      props.size_md ? `0 0 ${(props.size_md / 12) * 100}%` : null};
    max-width: ${(props) =>
      props.maxWidth_md
        ? props.maxWidth_md
        : props.size_md
        ? `${(props.size_md / 12) * 100}%`
        : null};
    min-width: ${(props) => props.minWidth_md};
    min-height: ${(props) => props.minHeight_md};
    grid-area: ${(props) => props.gridArea_md};
    display: ${(props) => props.display_md};
    flex-direction: ${(props) => props.flexDirection_md};
    gap: ${(props) => (props) => props.gap_md};
    flex-wrap: ${(props) => props.flexWrap_md};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_md]};
    text-align: ${(props) => props.textAlign_md};
    align-items: ${(props) => props.alignItems_md};
    margin: ${(props) => props.margin_md || "0 auto"};
    padding: ${(props) => props.padding_md};
    width: ${(props) => props.width_md};
    height: ${(props) => props.height_md};
    border: ${(props) => props.border_md};
    border-top: ${(props) => props.borderTop_md};
    border-right: ${(props) => props.borderRight_md};
    border-left: ${(props) => props.borderLeft_md};
    place-items: ${(props) => props.placeItems_md};
    grid-column: ${(props) => props.gridColumn_md};
    grid-row: ${(props) => props.gridRow_md};
    position: ${(props) => props.position_md};
    top: ${(props) => props.top_md};
    bottom: ${(props) => props.bottom_md};
    right: ${(props) => props.right_md};
    left: ${(props) => props.left_md};
  }
  @media ${Devices.lg} {
    display: ${(props) => props.display_lg};
    width: ${(props) => props.width_lg};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_lg]};
    padding: ${(props) => props.padding_lg};
    gap: ${(props) => props.gap_lg};
    max-width: ${(props) => props.maxWidth_lg};
    min-width: ${(props) => props.minWidth_lg};
    right: ${(props) => props.right_lg};
    left: ${(props) => props.left_lg};
    margin: ${(props) => props.margin_lg || "0 auto"};
    transform: ${(props) => props.transform_lg};
    grid-column: ${(props) => props.gridColumn_lg};
    top: ${(props) => props.top_lg};
    bottom: ${(props) => props.bottom_lg};
    right: ${(props) => props.right_lg};
    left: ${(props) => props.left_lg};
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;

const justifyContentOptions = {
  around: "space-around",
  center: "center",
  between: "space-between",
  evenly: "space-evenly",
  end: "flex-end",
  start: "flex-start",
};

export const HR = styled.hr`
  background: ${(props) => props.background || "#000000"};
  height: ${(props) => props.height || "7px"};
  border: ${(props) => props.border || "0px"};
  margin: ${(props) => props.margin || "0px"};
  padding: ${(props) => props.padding || "0px"};
  width: ${(props) => props.width || "100%"};
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
    margin: ${(props) => props.margin_tablet};
    width: ${(props) => props.width_tablet};
    height: ${(props) => props.height_tablet};
  }
  @media ${Devices.md} {
    width: ${(props) => props.width_md};
    height: ${(props) => props.height_md};
    margin: ${(props) => props.margin_md};
  }
  @media ${Devices.lg} {
  }
  @media ${Devices.xl} {
  }
`;

export const Div = styled.div`
  mask: ${(props) => props.mask};
  flex: ${(props) =>
    props.flex || props.size ? `0 0 ${(props.size / 12) * 100}%` : null};
  max-width: ${(props) =>
    props.size ? `${(props.size / 12) * 100}%` : props.maxWidth || null};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "none")};
  overflow: ${(props) => props.overflow};
  box-shadow: ${(props) => props.boxShadow};
  overflow-wrap: ${(props) => props.overflowWrap};
  overflow-x: ${(props) => props.overflowX};
  grid-area: ${(props) => props.gridArea};
  place-self: ${(props) => props.placeSelf};
  grid-column: ${(props) => props.gridColumn};
  flex-flow: ${(props) => props.flexFlow};
  grid-row: ${(props) => props.gridRow};
  padding: ${(props) => props.padding};
  gap: ${(props) => props.gap};
  row-gap: ${(props) => props.rowGap};
  column-count: ${(props) => props.columnCount};
  grid-auto-flow: ${(props) => props.gridAutoFlow};
  grid-template-columns: ${(props) => props.gridTemplateColumns};
  grid-auto-rows: ${(props) => props.gridAutoRows};
  column-gap: ${(props) => props.columnGap};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  direction: ${(props) => props.direction};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  margin: ${(props) => props.margin};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  background: ${(props) =>
    props.isActive ? props.backgroundActive : props.background};
  background-image: url(${(props) => props.bgImage});
  background-size: ${(props) => props.bgSize};
  background-repeat: ${(props) => props.bgRepeat};
  border-left: ${(props) =>
    props.isActive ? props.borderLeftActive : props.borderLeft};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  border-right: ${(props) => props.borderRight};
  justify-content: ${(props) => justifyContentOptions[props.justifyContent]};
  order: ${(props) => props.order};
  text-align: ${(props) => props.textAlign};
  justify-self: ${(props) => props.justifySelf};
  box-shadow: ${(props) =>
    props.isActive ? props.boxShadowActive : props.boxShadow};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  flex-grow: ${(props) => props.flexGrow || "0"};
  flex-shrink: ${(props) => props.flexShrink};
  align-content: ${(props) => props.alignContent};
  cursor: ${(props) => props.cursor};
  transform: ${(props) => props.transform};
  z-index: ${(props) => props.zIndex};
  place-items: ${(props) => props.placeItems};
  font-size: ${(props) => props.fontSize};
  transform: ${(props) => props.transform};
  &:after {
    content: ${(props) => props.contentAfter};
    display: ${(props) => props.displayAfter || "block"};
    background-color: ${(props) => props.backgroundColorAfter};
    height: ${(props) => props.heightAfter};
    width: ${(props) => props.widthAfter};
    margin-left: ${(props) => props.marginLeftAfter};
    position: ${(props) => props.positionAfter};
    top: ${(props) => props.topAfter};
    bottom: ${(props) => props.bottomAfter};
    left: ${(props) => props.leftAfter};
    right: ${(props) => props.rightAfter};
  }
  &:hover {
    background: ${(props) => props.backgroundHover};
    border-bottom: ${(props) => props.borderBottomHover};
    color: ${(props) => props.colorHover};
  }
  @media ${Devices.xxs} {
    column-count: ${(props) => props.columnCount_xxs};
    padding: ${(props) => props.padding_xxs};
    background: ${(props) => props.background_xxs};
    display: ${(props) => props.display_xxs};
    top: ${(props) => props.top_xxs};
    left: ${(props) => props.left_xxs};
    margin: ${(props) => props.margin_xxs};
    display: ${(props) => props.display_xxs};
    justify-content: ${(props) => props.justifyContent_xxs};
    width: ${(props) => props.width_xxs};
  }
  @media ${Devices.xs} {
    padding: ${(props) => props.padding_xs};
    column-count: ${(props) => props.columnCount_xs};
    flex-direction: ${(props) => props.flexDirection_xs};
    flex-wrap: ${(props) => props.flexWrap_xs};
    width: ${(props) => props.width_xs};
    max-width: ${(props) => props.maxWidth_xs};
    height: ${(props) => props.height_xs};
    order: ${(props) => props.order_xs};
    margin: ${(props) => props.margin_xs};
    display: ${(props) => props.display_xs};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_xs]};
    order: ${(props) => props.order_xs};
    border: ${(props) => props.border_xs};
    border-top: ${(props) => props.borderTop_xs};
    border-right: ${(props) => props.borderRight_xs};
    border-bottom: ${(props) => props.borderBottom_xs};
    border-left: ${(props) => props.borderLeft_xs};
    align-content: ${(props) => props.alignContent_xs};
    top: ${(props) => props.top_xs};
    right: ${(props) => props.right_xs};
    left: ${(props) => props.left_xs};
    background: ${(props) => props.background_xs};
  }
  @media ${Devices.sm} {
    padding: ${(props) => props.padding_sm};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_sm]};
    height: ${(props) => props.height_sm};
    position: ${(props) => props.position_sm};
    margin: ${(props) => props.margin_sm};
    display: ${(props) => props.display_sm};
    column-count: ${(props) => props.columnCount_sm};
    flex-direction: ${(props) => props.flexDirection_sm};
    flex-wrap: ${(props) => props.flexWrap_sm};
    order: ${(props) => props.order_sm};
    margin: ${(props) => props.margin_sm};
    top: ${(props) => props.top_sm};
    right: ${(props) => props.right_sm};
    border-radius: ${(props) => props.borderRadius_sm};
    max-width: ${(props) => props.maxWidth_sm};
    width: ${(props) => props.width_sm};
    background: ${(props) => props.background_sm};
  }
  @media ${Devices.tablet} {
    flex: ${(props) =>
      props.flex_tablet || props.size_tablet
        ? `0 0 ${(props.size_tablet / 12) * 100}%`
        : null};
    flex-flow: ${(props) => props.flexFlow_tablet};
    max-width: ${(props) =>
      props.size_tablet ? `${(props.size_tablet / 12) * 100}%` : null};
    max-width: ${(props) =>
      props.maxWidth_tablet
        ? props.maxWidth_tablet
        : props.size_tablet
        ? `${(props.size_tablet / 12) * 100}%`
        : null};
    align-self: ${(props) => props.alignSelf_tablet};
    order: ${(props) => props.order_tablet};
    gap: ${(props) => props.gap_tablet};
    column-count: ${(props) => props.columnCount_tablet};
    place-self: ${(props) => props.placeSelf_tablet};
    background: ${(props) => props.background_tablet};
    display: ${(props) => props.display_tablet};
    position: ${(props) => props.position_tablet};
    flex-direction: ${(props) => props.flexDirection_tablet};
    text-align: ${(props) => props.textAlign_tablet};
    align-content: ${(props) => props.alignContent_tablet};
    height: ${(props) => props.height_tablet};
    align-items: ${(props) => props.alignItems_tablet};
    padding: ${(props) => props.padding_tablet};
    margin: ${(props) => props.margin_tablet};
    width: ${(props) => props.width_tablet};
    min-width: ${(props) => props.minWidth_tablet};
    min-height: ${(props) => props.minHeight_tablet};
    height: ${(props) => props.height_tablet};
    flex: ${(props) => props.flex_tablet};
    flex-shrink: ${(props) =>
      props.flexShrink_tablet ? props.flexShrink_tablet : 1};
    flex-wrap: ${(props) => props.flexWrap_tablet};
    border: ${(props) => props.border_tablet};
    border-top: ${(props) => props.borderTop_tablet};
    top: ${(props) => props.top_tablet};
    right: ${(props) => props.right_tablet};
    left: ${(props) => props.left_tablet};
    border-right: ${(props) => props.borderRight_tablet};
    border-bottom: ${(props) => props.borderBottom_tablet};
    border-radius: ${(props) => props.borderRadius_tablet};
    box-shadow: ${(props) => props.boxShadow_tablet};
    border-left: ${(props) => props.borderLeft_tablet};
    transform: ${(props) => props.transform_tablet};
    grid-area: ${(props) => props.gridArea_tablet};
    grid-column: ${(props) => props.gridColumn_tablet};
    grid-row: ${(props) => props.gridRow_tablet};
    justify-self: ${(props) => props.justifySelf_tablet};
    grid-template-columns: ${(props) => props.gridTemplateColumns_tablet};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_tablet]};
    z-index: ${(props) => props.zIndex_tablet};
    top: ${(props) => props.top_tablet};
    bottom: ${(props) => props.bottom_tablet};
    right: ${(props) => props.right_tablet};
    left: ${(props) => props.left_tablet};
    &:after {
      display: ${(props) => props.displayAfter_tablet};
    }
  }
  @media ${Devices.md} {
    flex: ${(props) =>
      props.size_md ? `0 0 ${(props.size_md / 12) * 100}%` : null};
    max-width: ${(props) =>
      props.maxWidth_md
        ? props.maxWidth_md
        : props.size_md
        ? `${(props.size_md / 12) * 100}%`
        : null};
    min-width: ${(props) => props.minWidth_md};
    min-height: ${(props) => props.minHeight_md};
    grid-area: ${(props) => props.gridArea_md};
    display: ${(props) => props.display_md};
    flex-direction: ${(props) => props.flexDirection_md};
    gap: ${(props) => props.gap_md};
    flex-wrap: ${(props) => props.flexWrap_md};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_md]};
    text-align: ${(props) => props.textAlign_md};
    align-items: ${(props) => props.alignItems_md};
    margin: ${(props) => props.margin_md};
    padding: ${(props) => props.padding_md};
    width: ${(props) => props.width_md};
    height: ${(props) => props.height_md};
    border: ${(props) => props.border_md};
    border-top: ${(props) => props.borderTop_md};
    border-right: ${(props) => props.borderRight_md};
    border-left: ${(props) => props.borderLeft_md};
    place-items: ${(props) => props.placeItems_md};
    grid-column: ${(props) => props.gridColumn_md};
    grid-row: ${(props) => props.gridRow_md};
    position: ${(props) => props.position_md};
    top: ${(props) => props.top_md};
    bottom: ${(props) => props.bottom_md};
    right: ${(props) => props.right_md};
    left: ${(props) => props.left_md};
  }
  @media ${Devices.lg} {
    display: ${(props) => props.display_lg};
    width: ${(props) => props.width_lg};
    justify-content: ${(props) =>
      justifyContentOptions[props.justifyContent_lg]};
    padding: ${(props) => props.padding_lg};
    gap: ${(props) => props.gap_lg};
    max-width: ${(props) => props.maxWidth_lg};
    min-width: ${(props) => props.minWidth_lg};
    right: ${(props) => props.right_lg};
    left: ${(props) => props.left_lg};
    margin: ${(props) => props.margin_lg};
    transform: ${(props) => props.transform_lg};
    grid-column: ${(props) => props.gridColumn_lg};
    top: ${(props) => props.top_lg};
    bottom: ${(props) => props.bottom_lg};
    right: ${(props) => props.right_lg};
    left: ${(props) => props.left_lg};
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;

export const Grid = styled(Div)`
  border-radius: ${(props) => props.borderRadius};
  overflow: ${(props) => props.overflow};
  display: ${(props) => props.display || "grid"};
  direction: ${(props) => props.direction};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  grid-template-columns: ${(props) =>
    props.gridTemplateColumns
      ? `repeat(${props.gridTemplateColumns})`
      : `repeat(1, 1fr)`};
  grid-template-rows: ${(props) =>
    props.gridTemplateRows ? `repeat(${props.gridTemplateRows})` : null};
  grid-gap: ${(props) => props.gridGap || "15px"};
  column-gap: ${(props) => props.columnGap};
  grid-auto-rows: ${(props) => props.gridAutoRows};
  grid-column: ${(props) => props.gridColumn};
  justify-items: ${(props) => props.justifyItems};
  justify-content: ${(props) => props.justifyContent};
  grid-template-areas: ${(props) => props.gridTemplateAreas};
  @media ${Devices.xxs} {
    grid-gap: ${(props) => props.gridGap_xxs};
    grid-template-columns: ${(props) =>
      props.columns_xxs ? `repeat(${props.columns_xxs}, 1fr)` : null};
    padding: ${(props) => props.padding_xxs};
    width: ${(props) => props.width_xxs};
    margin: ${(props) => props.margin_xxs};
    display: ${(props) => props.display_xxs || "grid"};
  }
  @media ${Devices.xs} {
    grid-template-columns: ${(props) =>
      props.columns_xs ? `repeat(${props.columns_xs}, 1fr)` : null};
    width: ${(props) => props.width_xs};
    display: ${(props) => props.display_xs};
  }
  @media ${Devices.sm} {
    grid-template-columns: ${(props) =>
      props.gridTemplateColumns_sm
        ? `repeat(${props.gridTemplateColumns_sm}, 1fr)`
        : null};
    width: ${(props) => props.width_sm};
    display: ${(props) => props.display_sm};
  }
  @media ${Devices.tablet} {
    margin: ${(props) => props.margin_tablet};
    border-radius: ${(props) => props.borderRadius_tablet};
    display: ${(props) => props.display_tablet || "grid"};
    width: ${(props) => props.width_tablet};
    grid-template-columns: ${(props) =>
      props.gridTemplateColumns_tablet
        ? `${props.gridTemplateColumns_tablet}`
        : "2fr repeat(12, 1fr) 2fr"};
    grid-template-rows: ${(props) =>
      props.gridTemplateRows_tablet
        ? `repeat(${props.gridTemplateRows_tablet})`
        : null};
    grid-gap: ${(props) => props.gridGap_tablet};
    grid-auto-rows: ${(props) => props.gridAutoRows_tablet};
    grid-column: ${(props) => props.gridColumn_tablet};
    grid-row: ${(props) => props.gridRow_tablet};
    justify-content: ${(props) => props.justifyContent_tablet};
    grid-template-areas: ${(props) => props.gridTemplateAreas_tablet};
    maxwidth: ${(props) => props.maxWidth_tablet};
    padding: ${(props) => props.padding_tablet};
  }
  @media ${Devices.md} {
    margin: ${(props) => props.margin_md};
    padding: ${(props) => props.padding_md};
    grid-template-columns: ${(props) => props.gridTemplateColumns_md};
    grid-template-rows: ${(props) =>
      props.gridTemplateRows_md
        ? `repeat(${props.gridTemplateRows_md})`
        : null};
    grid-gap: ${(props) => props.gridGap_md};
    grid-column: ${(props) => props.gridColumn_md};
    display: ${(props) => props.display_md || "grid"};
  }
  @media ${Devices.lg} {
    grid-template-columns: ${(props) => props.gridTemplateColumns_lg};
    padding: ${(props) => props.padding_lg};
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;

export const Old_Grid = styled.div`
  display: ${(props) => props.display || "grid"};
  grid-template-columns: ${(props) =>
    props.columns ? `repeat(${props.columns}, 1fr)` : null};
  grid-template-rows: ${(props) =>
    props.rows ? `repeat(${props.rows || "auto"})` : `repeat(auto)`};
  grid-gap: ${(props) => props.gridGap || "15px"};
  width: ${(props) => props.width};
  justify-self: ${(props) => props.justifySelf};
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  @media ${Devices.xxs} {
    grid-template-columns: ${(props) =>
      props.columns_xxs ? `repeat(${props.columns_xxs}, 1fr)` : null};
  }
  @media ${Devices.xs} {
    grid-template-columns: ${(props) =>
      props.columns_xs ? `repeat(${props.columns_xs}, 1fr)` : null};
  }
  @media ${Devices.sm} {
    grid-template-columns: ${(props) =>
      props.columns_sm ? `repeat(${props.columns_sm}, 1fr)` : null};
  }
  @media ${Devices.tablet} {
    grid-template-columns: ${(props) =>
      props.columns_tablet ? `repeat(${props.columns_tablet}, 1fr)` : null};
    grid-template-rows: ${(props) =>
      props.rows_tablet ? `repeat(${props.rows_tablet}, 5vw)` : null};
    padding: ${(props) => props.padding_tablet};
  }
  @media ${Devices.md} {
    grid-template-columns: ${(props) =>
      props.columns_md ? props.columns_md : null};
    grid-template-rows: ${(props) =>
      props.rows_md ? `repeat(${props.rows_md})` : null};
    grid-gap: ${(props) => props.gridGap_md};
    height: ${(props) => props.height_md};
    padding: ${(props) => props.padding_md};
    display: ${(props) => props.display_md};
    margin: ${(props) => props.margin_md};
  }
  @media ${Devices.lg} {
    grid-template-columns: ${(props) =>
      props.columns_lg ? `repeat(${props.columns_lg}, 1fr)` : null};
    padding: ${(props) => props.padding_lg};
  }
  @media ${Devices.xl} {
    grid-template-columns: ${(props) =>
      props.columns_xl ? `repeat(${props.columns_xl}, 1fr)` : null};
  }
  @media ${Devices.xxl} {
    grid-template-columns: ${(props) =>
      props.columns_xxl ? `repeat(${props.columns_xxl}, 1fr)` : null};
  }
`;

export const Header = ({
  hideArrowKey,
  uppercase,
  children,
  fontSize,
  fontSize_tablet,
  image,
  image_alt,
  svg_image,
  seo_title,
  title,
  htmlTitle,
  paragraph,
  paragraph_html,
  paragraphMargin,
  paragraphMargin_Tablet,
  height,
  height_md,
  height_tablet,
  background,
  margin,
  margin_md,
  margin_tablet,
  margin_xxs,
  padding,
  paddingTitle,
  paddingParagraph,
  paddingParagraph_tablet,
  paddingTitle_tablet,
  padding_xxs,
  padding_tablet,
  padding_lg,
  padding_md,
  position,
  textAlign_tablet,
  display_mobile,
  fontSize_title,
  fontSize_xxs,
  fontSizeTitle_tablet,
  fontFamily_title,
  fontSize_seo,
  fontSize_paragraph,
  fontWeight_paragraph,
  lineHeight,
  lineHeight_tablet,
  fontWeight_title,
  gridTemplateColumns_tablet,
  maxWidth,
  fontFamily,
  zIndex,
  id,
  textWrap,
  colorVariant,
  containerStyle,
}) => {
  const multilineTitle = title
    .split("\n")
    .map((l) => <span className="d-block">{l}</span>);

  const colorConfig = {
    white: {
      text: Colors.white,
      seo: Colors.verylightGray2,
    },
    default: {
      text: Colors.black,
      seo: Colors.darkGray2,
    },
  };

  const colors = colorConfig[colorVariant] || colorConfig.default;
  return (
    <Grid
      background={background}
      height={height}
      height_tablet={height_tablet}
      position={position}
      margin={margin}
      margin_tablet={margin_tablet}
      margin_md={margin_md}
      margin_xxs={margin_xxs}
      padding={padding || "0 0"}
      padding_tablet={padding_tablet || "60px 40px"}
      padding_md={padding_md || "60px 80px"}
      padding_lg={padding_lg || "60px 0"}
      gridTemplateColumns_tablet={gridTemplateColumns_tablet}
      maxWidth={maxWidth}
      id={id}
    >
      <Grid
        gridTemplateColumns_tablet="repeat(12, 1fr)"
        gridArea_tablet="1/1/1/15"
        maxWidth="1280px"
        margin="auto"
        style={containerStyle}
      >
        {/* hacer cambios aqui ... remover svg en mobile */}
        <Div
          flexDirection="column"
          gridColumn_tablet={svg_image ? null : "1 / 13"}
          gridArea_tablet={svg_image ? "1/1/1/7" : null}
        >
          <H1
            type="h1"
            textAlign_tablet={textAlign_tablet}
            margin="0 0 11px 0"
            padding={paddingTitle || "0 20px"}
            color={colors.seo}
            fontSize={fontSize_seo}
            textWrap="balance"
          >
            {seo_title}
          </H1>
          <H2
            type="h2"
            textAlign="center"
            textAlign_tablet={textAlign_tablet}
            padding="0 20px"
            padding_tablet={paddingTitle_tablet || paddingTitle || "0 20px"}
            fontSize={fontSize_title || "40px"}
            fontSize_xxs={fontSize_xxs || "30px"}
            fontSize_tablet={fontSizeTitle_tablet || "50px"}
            lineHeight={lineHeight || "50px"}
            lineHeight_tablet={lineHeight_tablet || "60px"}
            fontFamily={fontFamily_title}
            textTransform={uppercase && "uppercase"}
            fontWeight={fontWeight_title}
            zindex={zIndex}
            color={colors.text}
            textWrap={textWrap}
            {...(htmlTitle
              ? { dangerouslySetInnerHTML: { __html: htmlTitle } }
              : { children: multilineTitle })}
          />
          {(paragraph || paragraph_html) && (
            <SubTitle
              width="auto"
              letterSpacing="0.05em"
              padding={paddingParagraph || "20px"}
              padding_tablet={
                paddingParagraph_tablet || paddingParagraph || "0 20px"
              }
              textAlign_tablet={textAlign_tablet}
              margin={paragraphMargin || "26px auto"}
              margin_tablet={paragraphMargin_Tablet}
              fontSize={fontSize_paragraph}
              fontWeight={fontWeight_paragraph}
              maxWidth="64rem"
              color={colors.text}
              {...(paragraph_html
                ? { dangerouslySetInnerHTML: { __html: paragraph_html } }
                : { children: paragraph })}
            />
          )}
          {children}
        </Div>
        {svg_image ? (
          <Div
            width="100%"
            display={display_mobile || "none"}
            display_tablet="flex"
            gridArea_tablet="1/7/1/13"
          >
            {svg_image}
          </Div>
        ) : null}
      </Grid>
    </Grid>
  );
};

export const GridContainer = ({
  id,
  className,
  style,
  fluid,
  overflowChild,
  justifyContent,
  justifyContent_tablet,
  shadow,
  shadow_tablet,
  containerColumns,
  containerColumns_tablet,
  containerColumns_md,
  containerColumnsChild_tablet,
  children,
  display,
  display_xxs,
  display_xs,
  display_sm,
  display_tablet,
  display_md,
  background,
  borderRadius,
  borderRadiusChild,
  borderRadiusChild_tablet,
  backgroundChild,
  containerGridGap,
  columnGap,
  gridGap,
  gridGap_xxs,
  gridGap_tablet,
  gridTemplateRows,
  gridTemplateRows_tablet,
  width,
  height,
  height_tablet,
  minHeight,
  minHeight_tablet,
  columns,
  columns_tablet,
  margin,
  margin_tablet,
  margin_xs,
  margin_md,
  padding,
  padding_xxs,
  padding_tablet,
  padding_md,
  padding_lg,
  paddingChild,
  borderTop,
  padding_tabletChild,
  position,
  GridColumn,
  gridColumn_tablet,
  gridRow_tablet,
  gridTemplateAreas,
  gridTemplateAreas_tablet,
  maxWidth,
  childMaxWidth,
  childMargin,
  childWidth,
  childHeight,
  displayChild,
  displayChild_tablet,
  displayChild_xs,
  displayChild_xxs,
  displayChild_sm,
  displayChild_md,
  columns_sm,
  justifyContentChild,
  justifyItemsChild,
  border,
}) => {
  return (
    <Grid
      id={id}
      className={className}
      style={style}
      background={background}
      gridGap={containerGridGap}
      gridTemplateColumns={containerColumns}
      gridTemplateColumns_tablet={containerColumns_tablet}
      gridTemplateColumns_md={containerColumns_md}
      boxShadow={shadow}
      boxShadow_tablet={shadow_tablet}
      borderRadius={borderRadius}
      display={display}
      display_sm={display_sm}
      displa_xs={display_xs}
      display_xxs={display_xxs}
      display_tablet={display_tablet}
      display_md={display_md}
      justifyContent={justifyContent}
      justifyContent_tablet={justifyContent_tablet}
      position={position}
      borderTop={borderTop}
      width={width}
      maxWidth={maxWidth}
      height={height}
      height_tablet={height_tablet}
      minHeight={minHeight}
      minHeight_tablet={minHeight_tablet}
      margin={margin}
      margin_tablet={margin_tablet}
      margin_xs={margin_xs}
      margin_md={margin_md}
      padding={padding || "0 17px"}
      padding_tablet={padding_tablet || "0"}
      padding_xxs={padding_xxs}
      padding_md={padding_md}
      border={border}
      padding_lg={padding_lg}
    >
      <Grid
        display={displayChild}
        justifyContent={justifyContentChild}
        justifyItems={justifyItemsChild}
        display_xxs={displayChild_xxs}
        display_xs={displayChild_xs}
        display_sm={displayChild_sm}
        display_tablet={displayChild_tablet}
        display_md={displayChild_md}
        overflow={overflowChild}
        background={backgroundChild}
        columnGap={columnGap}
        gridGap={gridGap}
        gridGap_xxs={gridGap_xxs}
        gridGap_tablet={gridGap_tablet}
        borderRadius={borderRadiusChild}
        borderRadius_tablet={borderRadiusChild_tablet}
        gridTemplateRows={gridTemplateRows}
        gridTemplateRows_tablet={gridTemplateRows_tablet}
        gridTemplateColumns_sm={columns_sm}
        gridTemplateColumns_tablet={`repeat(${columns_tablet}, ${
          12 / columns_tablet
        }fr)`}
        padding={paddingChild}
        padding_tablet={padding_tabletChild}
        gridTemplateColumns={`${columns}, 1fr`}
        gridColumn={GridColumn}
        gridRow_tablet={gridRow_tablet}
        gridColumn_tablet={
          gridColumn_tablet
            ? gridColumn_tablet
            : fluid
            ? "1 / span 14"
            : "2 / span 12"
        }
        gridTemplateAreas={gridTemplateAreas}
        gridTemplateAreas_tablet={gridTemplateAreas_tablet}
        height={childHeight}
        margin={childMargin}
        maxWidth={childMaxWidth}
        width={childWidth}
      >
        {children}
      </Grid>
    </Grid>
  );
};
export const GridContainerWithImage = ({
  id,
  carousel,
  className,
  onMouseOutHandler,
  children,
  gridGap,
  gridGap_tablet,
  imageSide,
  background,
  height,
  height_tablet,
  columns,
  columns_tablet,
  margin,
  margin_tablet,
  padding,
  padding_tablet,
  padding_md,
  padding_lg,
  position,
  maxWidth_tablet,
  gridColumn_tablet,
  maxWidth,
  alignItems_tablet,
  alignItems_md,
}) => {
  return (
    <>
      <Grid
        id={id}
        className={className}
        onMouseOut={onMouseOutHandler}
        gridTemplateColumns_tablet={
          imageSide == "left" ? "repeat(14, 1fr)" : "repeat(14, 1fr)"
        }
        maxWidth={maxWidth}
        background={background}
        height={height}
        position={position}
        height_tablet={height_tablet}
        margin={margin}
        margin_tablet={margin_tablet}
        padding={padding || "0 17px"}
        padding_tablet={padding_tablet}
        padding_md={padding_md}
        padding_lg={padding_lg}
        maxWidth_tablet={maxWidth_tablet}
      >
        <Grid
          gridGap={gridGap}
          gridGap_tablet={gridGap_tablet}
          gridTemplateColumns_tablet={
            imageSide == "left"
              ? `repeat(${`12`}, ${14 / columns_tablet}fr)`
              : `repeat(${columns_tablet}, ${14 / columns_tablet}fr)`
          }
          gridTemplateColumns={columns}
          maxWidth_tablet={maxWidth_tablet}
          gridColumn_tablet={
            gridColumn_tablet
              ? gridColumn_tablet
              : imageSide == "left"
              ? "1 / span 14"
              : "2 / span 14"
          }
          alignItems_tablet={alignItems_tablet}
          alignItems_md={alignItems_md}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
};
export const Row = styled(Div)`
  border: ${(props) => props.border};
  border-top: ${(props) => props.borderTop};
  z-index: ${(props) => props.zIndex};
  flex-wrap: wrap;
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  justify-content: ${(props) => props.justifyContent};
  padding: ${(props) => props.padding};
  &:hover {
    background: ${(props) => props.backgroundHover};
    margin: ${(props) => props.marginHover};
    border-radius: ${(props) => props.borderRadiusHover};
  }
  @media ${Break.sm} {
    width: ${(props) => props.width_sm};
    display: ${(props) => props.display_sm};
    margin: ${(props) => props.m_sm};
    justify-content: ${(props) => props.alignResp || "center"};
    flex-direction: ${(props) => props.flexDirection_sm};
  }
  @media ${Break.xs} {
    width: ${(props) => props.width_xs};
    display: ${(props) => props.display_xs};
    justify-content: ${(props) => props.alignResp || "center"};
    padding: ${(props) => props.p_xs};
    margin: ${(props) => props.m_xs};
  }
`;

export const Column = styled(Div)`
  text-align: ${(props) => props.align || "left"};
  position: relative;
  width: 100%;
  background: ${(props) => props.background};
  border: ${(props) => props.borderStyle};
  align-self: ${(props) => props.alignSelf};
  padding-right: ${(props) => props.paddingRight};
  padding-left: ${(props) => props.paddingLeft};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  display: ${(props) => props.display};
  flex: 0 0 ${(props) => (props.size / 12) * 100}%;
  max-width: ${(props) => (props.size / 12) * 100}%;
  ${(props) => props.masonry && "display: inline-block;"}
  border-radius: ${(props) => props.borderRadius};

  @media ${Break.lg} {
    flex: 0 0 ${(props) => (props.size_lg / 12) * 100}%;
    max-width: ${(props) => (props.size_lg / 12) * 100}%;
    padding-left: ${(props) => props.pl_lg};
    display: ${(props) => props.disp_lg};
  }
  @media ${Break.md} {
    flex: 0 0 ${(props) => (props.size_md / 12) * 100}%;
    max-width: ${(props) => (props.size_md / 12) * 100}%;
    text-align: ${(props) => props.align};
    margin-bottom: ${(props) => props.respSizeMargin};
    border-radius: ${(props) => props.br_md};
    margin: ${(props) => props.m_md};
    padding: ${(props) => props.p_md};
    padding-left: ${(props) => props.pl_md};
    height: ${(props) => props.h_md};
    display: ${(props) => props.disp_md};
    grid-template-columns: ${(props) => props.templateColumns};
  }
  @media ${Break.sm} {
    flex: 0 0 ${(props) => (props.size_sm / 12) * 100}%;
    max-width: ${(props) => (props.size_sm / 12) * 100}%;
    height: ${(props) => props.h_sm};
    border-radius: ${(props) => props.br_sm};
    text-align: ${(props) => props.align_sm};
    margin-bottom: ${(props) => props.respSizeMargin};
    margin: ${(props) => props.m_sm};
    padding: ${(props) => props.p_sm};
    padding-left: ${(props) => props.pl_sm};
    display: ${(props) => props.disp_sm};
  }
  @media ${Break.xs} {
    flex: 0 0 ${(props) => (props.size_xs / 12) * 100}%;
    max-width: ${(props) => (props.size_xs / 12) * 100}%;
    display: ${(props) => props.disp_xs};
    margin: ${(props) => props.m_xs};
  }
`;

export const Wrapper = (props) => {
  return (
    <Container
      github={props.github}
      margin={props.margin}
      m_sm={props.m_sm}
      p_sm={props.p_sm}
      p_xs={props.p_xs}
      variant="fluid"
      display="flex"
    >
      <Column size="1" disp_md="none" />
      <Column
        size="11"
        size_sm="12"
        url={props.image}
        border={props.border}
        customBorderRadius={props.customBorderRadius}
        background={props.background}
        align={props.align}
        height={props.height}
        m_md={props.right ? "0 0 0 auto" : undefined}
        backgroundSize={props.backgroundSize}
      >
        <Row padding={`20px 0`} display={`flex`}>
          <Column size="1" disp_sm="none" />
          <Column
            size={props.wide ? 11 : 9}
            size_md={props.wide ? 12 : 11}
            paddingRight={props.wide ? 0 : undefined}
            height={props.height}
          >
            {props.children}
          </Column>
        </Row>
      </Column>
    </Container>
  );
};

export const WrapperImage = (props) => {
  return (
    <Container
      margin={props.margin}
      p_xs="0"
      github={props.github}
      variant="fluid"
    >
      <Row display={`flex`}>
        <Column size="1" d_sm="none" />
        <Column
          size="11"
          size_sm="12"
          url={props.image}
          border={props.border}
          customBorderRadius={props.customBorderRadius}
          background={props.background}
          align={props.align}
          height={props.height}
          paddingRight="0"
          backgroundSize={props.backgroundSize}
        >
          <StyledBackgroundSection
            className={props.className}
            height={props.height}
            borderRadius={props.customBorderRadius}
            backgroundColor={Colors.darkGray}
            backgroundPosition={props.backgroundPosition[0]}
            bp_lg={props.backgroundPosition[1]}
            bp_md={props.backgroundPosition[2]}
            bp_sm={props.backgroundPosition[3]}
            bp_xs={props.backgroundPosition[4]}
            image={props.imageData}
            bgSize={props.bgSize}
            alt={props.alt}
            filter={props.filter}
          >
            <Row display="flex">
              <Column
                size="9"
                margin="0 auto"
                height={props.height}
                align={props.align}
              >
                {props.children}
              </Column>
            </Row>
          </StyledBackgroundSection>
        </Column>
      </Row>
    </Container>
  );
};
WrapperImage.defaultProps = {
  customBorderRadius: "10px 10px",
  backgroundPosition: [],
};

export const WrapperCustom = (props) => {
  return (
    <Container width={props.width}>
      <Row display={`flex`}>
        <Column size={props.outerLeftCol}></Column>
        <Column
          size={props.outerRightCol}
          url={props.image}
          border={props.border}
          customBorderRadius={props.customBorderRadius}
          background={props.background}
        >
          {props.full ? (
            <Row justifyContent={props.innerLeftRowAlign} display="flex">
              <Column size={props.innerLeftCol}>{props.content}</Column>
              <Column size={props.innerRightCol}>{props.children}</Column>
            </Row>
          ) : (
            props.children
          )}
        </Column>
      </Row>
    </Container>
  );
};

export const Divider = styled.div`
  height: ${(props) => props.height};
  @media ${Break.lg} {
    height: ${(props) => props.lg};
  }
  @media ${Break.md} {
    height: ${(props) => props.md};
  }
  @media ${Break.sm} {
    height: ${(props) => props.sm};
  }
  @media ${Break.xs} {
    height: ${(props) => props.xs};
  }
`;
Div.defaultProps = {
  justifyContent: "flex-start",
};

Container.defaultProps = {
  maxWidth: "1280px",
  padding: "17px",
  padding_tablet: "0 40px",
  padding_md: "0 80px",
  padding_lg: "0",
};

Row.defaultProps = {
  marginLeft: "-15px",
  marginRight: "-15px",
};
Column.defaultProps = {
  paddingLeft: "15px",
  paddingRight: "15px",
  alignXs: "center",
  alignSm: "center",
};
// Column.defaultProps = {
//     align: 'center',
// };
Wrapper.defaultProps = {
  width: "fluid",
  variant: "default",
  outerLeftCol: "1",
  outerRightCol: "11",
  innerLeftCol: "1",
  innerRightCol: "10",
  right: null,
};

Divider.propTypes = {
  height: PropTypes.string,
};

// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr repeat(2, 1fr) 1fr;
//   grid-template-rows: repeat(${props => props.rows || "auto"});
//   grid-gap: ${props => props.gridGap || "15px"};
//   height: ${props => props.height};
//   // margin: 0 auto;
//   // width: 70%;
//   background: red;
//   padding: 5px 0;
//   @media  ${Devices.md}{
//     // grid-template-columns: 1fr repeat(12, 1fr) 1fr;
//     height: ${props => props.height_md};
//     padding: ${props => props.padding_md};
//     display: ${props => props.display_md};
//     margin: ${props => props.margin_md};
// }
// `

// const Test = styled.div`
//   grid-column: 3 / span 10;
//   grid-row: 1;
//   background: white;
//   display: flex;
//   justify-content: space-between;
//   @media ${Devices.xxs}{

// }
