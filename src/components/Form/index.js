import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css, keyframes } from "styled-components";
import { Colors, Button } from "../Styling";
import { Break } from "../Responsive";
import { Div } from "../Sections";

const regex = {
  email:
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@(?!mailinator|leonvero|ichkoch|naymeo|naymio)[\-a-zA-Z0-9]*\.[a-zA-Z](-?[a-zA-Z0-9])*.*[a-zA-Z]+$/,
  text: /^.+$/,
  textarea: /^.+$/,
  number: /^\d+$/,
  phone: /^(?!(\d{2,})\1+)(?!(\d+)\2{3,})(\+\d{1,3})?(\d{8,10})$/,
  file: /^.*\.(jpg|png|JPG|gif|GIF|doc|DOC|pdf|PDF)$/,
};

const StyledInput = styled.input`
  background-color: ${(props) => (props.valid ? props.bgColor : "#FAF0F0")};
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "100%"};
  padding: 5px 10px;
  margin: ${(props) => props.margin || "5px 0px"};
  border-radius: ${(props) => props.borderRadius || "3px"};
  border: ${(props) =>
    props.valid ? props.border || "1px solid #A4A4A4" : "1px solid #d79f9f"};
  font-family: "Lato", sans-serif;
  font-size: 15px;
  line-height: 22px;
  font-weight: 400;
  color: ${(props) => props.color || "#606060"};
  user-select: initial;
  opacity: ${(props) => props.opacity || 0.7};
  :focus {
    opacity: 1;
    border: 1px solid ${(props) => (props.valid ? props.lightGray : "#d79f9f")};
  }
  @media ${Break.sm} {
    width: ${(props) => props.w_sm};
  }
`;
const Rel = styled.div`
  position: relative;
  width: ${(props) => props.width || "100%"};
`;
const Msg = styled.span`
  position: absolute;
  top: -13px;
  left: 0px;
  padding: 3px;
  font-size: 12px;
  background-color: ${Colors.lightRed};
`;

export const Input = ({
  onChange,
  type,
  required,
  validate,
  errorMsg,
  width,
  margin,
  ...rest
}) => {
  const [validStatus, setValidStatus] = useState({ valid: true });

  return (
    <Div flexDirection="column" width={width || "100%"} position="relative">
      {!validStatus.valid && <Msg>{errorMsg}</Msg>}
      <StyledInput
        {...rest}
        type={type}
        margin={margin}
        required={required}
        valid={validStatus.valid}
        onChange={(e) => {
          let isValid = true;
          if (required === false && e.target.value.length === 0) isValid = true;
          else if (rest.pattern)
            isValid = new RegExp(rest.pattern).test(e.target.value);
          else isValid = regex[type].test(e.target.value);

          if (isValid != validStatus) {
            setValidStatus({
              valid: isValid,
              msg: isValid ? "Ok" : errorMsg,
            });
          }
          if (onChange) onChange(e.target.value, isValid);
        }}
      />
    </Div>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  errorMsg: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.object,
  pattern: PropTypes.string,
  bcColor: PropTypes.string,
};
Input.defaultProps = {
  onChange: null,
  validate: null,
  type: "text",
  errorMsg: "Invalid Value",
  required: false,
  bgColor: Colors.lightGray,
  pattern: null,
};

const colors = {
  red: [Colors.lightRed, Colors.red],
  green: [Colors.lightGreen, Colors.green],
  blue: [Colors.lightBlue, Colors.blue],
  undefined: [Colors.white, Colors.gray3],
};
export const Alert = styled.div`
  background-color: ${(props) => colors[props.color][0]};
  border: ${(props) => props.border || "none"};
  padding: 10px;
  width: 100%;
  text-align: center;
  font-family: "Lato", sans-serif;

  font-size: 14px;
  color: ${(props) => colors[props.color][1]};
  margin: ${(props) => props.margin};
`;

//TextArea Styled Component
const StyledTextArea = styled.textarea`
  background-color: ${(props) =>
    props.valid ? Colors.lightGray : Colors.lightRed};
  width: 100%;
  padding: 5px 10px;
  border: none;
  font-family: "Lato", sans-serif;
  border: ${(props) => props.border || "1px solid #828282"};
  opacity: 0.7;
  font-size: 16px;
  color: ${Colors.black};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) =>
    props.valid ? props.bgColor : Colors.lightRed};
  :focus {
    opacity: 1;
    border: 1px solid
      ${(props) => (props.valid ? props.lightGray : Colors.lightRed)};
  }
`;

export const TextArea = ({
  onChange,
  type,
  errorMsg,
  required,
  validate,
  ...rest
}) => {
  const [validStatus, setValidStatus] = useState({ valid: true });
  return (
    <Rel>
      {!validStatus.valid && <Msg>{errorMsg}</Msg>}
      <StyledTextArea
        {...rest}
        type={type}
        required={required}
        valid={validStatus.valid}
        onChange={(e) => {
          let isValid = true;
          if (required === false && e.target.value.length === 0) isValid = true;

          if (isValid != validStatus)
            setValidStatus({
              valid: isValid,
              msg: isValid ? "Ok" : errorMsg,
            });
          if (onChange) onChange(e.target.value, isValid);
        }}
      />
    </Rel>
  );
};

TextArea.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  errorMsg: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.object,
};

TextArea.defaultProps = {
  onChange: null,
  type: "textarea",
  validate: null,
  errorMsg: "Missing Comment",
  required: false,
};
