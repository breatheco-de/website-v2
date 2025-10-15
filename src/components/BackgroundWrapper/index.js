import React from "react";
import { Div } from "../Sections";
import { Colors } from "../Styling";

const BackgroundWrapper = ({
  bg_full = false,
  background,
  children,
  ...props
}) => {
  if (bg_full) {
    return (
      <Div
        width="100%"
        background={Colors[background] || background}
        flexDirection="column"
      >
        <Div {...props}>{children}</Div>
      </Div>
    );
  } else {
    return <Div {...props}>{children}</Div>;
  }
};

export default BackgroundWrapper;
