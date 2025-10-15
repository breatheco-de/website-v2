import React from "react";
// export default props => <svg style={props.style} width={props.width} height={props.height} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32"><path stroke={props.color} fill={props.fill} d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z" /></svg>
export default (props) => (
  <svg
    onClick={props.onClick}
    style={props.style}
    width={props.width || "14"}
    height={props.height || "14"}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L13.0001 13.0001"
      stroke={props.color || "black"}
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0001 1L1 13.0001"
      stroke={props.color || "black"}
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
