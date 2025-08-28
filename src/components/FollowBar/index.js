import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Colors, Button, Link, Anchor, PhoneText, PhoneTextDesktop } from "../Styling";
import { Break } from "../Responsive";
import { useScrollPosition } from "./useScrollPosition";

const ShadowedRow = styled.div`
  background: #ececec;
  font-family: "Lato-Bold", sans-serif;

  box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.3);
  height: ${(props) => (props.phone ? "80px" : "65px")};
  padding: 10px;
  width: 100%;
  z-index: 101;
  position: ${(props) => (props.position != "static" ? "fixed" : "static")};
  top: ${(props) => (props.position == "top" ? "0" : "inherit")};
  bottom: ${(props) => (props.position == "bottom" ? "0" : "inherit")};
  display: ${(props) => (props.hide ? "none" : "block")};
  @media ${Break.sm} {
    height: auto;
    top: inherit;
    bottom: 0;
  }
  @media ${Break.xxs} {
    height: 125px;
  }
`;
const Centered = styled.div`
  max-width: 750px;
  display: flex;
  margin: auto;
`;

const Center = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 900;
  @media ${Break.xs} {
    text-align: left;
  }
  @media ${Break.sm} {
    font-size: 20px;
  }
`;
const P1 = styled.p`
  font-size: 28px;
  font-weight: 900;
  @media ${Break.sm} {
    padding-top: 5px;
    font-size: 24px;
  }
  @media ${Break.xs} {
    padding-top: 10px;
    font-size: 18px;
  }
`;
const P2 = styled.p`
  font-size: 20px;
  @media ${Break.sm} {
    font-size: 20px;
  }
  @media ${Break.xs} {
    font-size: 14px;
    width: 190px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden !important;
  }
  @media ${Break.xxs} {
    width: 160px;
  }
`;
const Right = styled.div`
  width: 300px;
`;

const FollowBar = ({
  children,
  showOnScrollPosition,
  position,
  buttonText,
  phone,
  phoneText,
  link,
}) => {
  const [show, setShow] = useState(showOnScrollPosition == null);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (showOnScrollPosition && showOnScrollPosition + currPos.y < 0) {
        if (!show) setShow(true);
      } else {
        if (showOnScrollPosition && show) setShow(false);
      }
    },
    [show]
  );

  return (
    <ShadowedRow width="100%" position={position} hide={!show} phone={phone}>
      <Centered>
        <Center>{children}</Center>
        <Right>
          <Link to={link || "#"}>
            <Button
              background={Colors.blue}
              color={Colors.white}
              colorHover={Colors.blue}
              margin="0 auto"
            >
              {buttonText}
            </Button>
          </Link>
          {phone && (
            <>
              <PhoneText>
                <a className="d-sm-none" display="inline" href={`tel:${phone}`}>
                  {phoneText}
                  {phone}
                </a>
              </PhoneText>
              <PhoneTextDesktop>
                <a
                  className="d-none d-sm-block"
                  display="inline"
                  href={`tel:${phone}`}
                >
                  {phoneText}
                  {phone}
                </a>
              </PhoneTextDesktop>
            </>
          )}
        </Right>
      </Centered>
    </ShadowedRow>
  );
};
FollowBar.propTypes = {
  buttonText: PropTypes.string,
  buttonPath: PropTypes.string,
  position: PropTypes.string,
  showOnScrollPosition: PropTypes.number,
  onClick: PropTypes.func,
};
FollowBar.defaultProps = {
  buttonText: "Click me",
  phoneText: "Or call now",
  phone: "",
  buttonPath: "/apply",
  position: "static",
  showOnScrollPosition: null,
  onClick: null,
};
export default FollowBar;
