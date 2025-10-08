import React from "react";
export default (props) => (
  <svg
    style={props.style}
    width={props.width || "24"}
    height={props.height || "24"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 2.5H0.5V23.5H23.5V2.5H19.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 0.5H4.5V4.5H7.5V0.5Z"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 0.5H16.5V4.5H19.5V0.5Z"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 2.5H16.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.5 7.5H23.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 9.5V21.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 9.5V21.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 9.5V21.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 11.5H21.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 15.5H21.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 19.5H21.5"
      stroke={props.color || "#A4A4A4"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
