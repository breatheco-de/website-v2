import React from "react";
import { H3, Paragraph } from "../Heading";
import { Div } from "../Sections";
import { Colors } from "../Styling";
import Icon from "../Icon";

export default ({
  icon,
  title,
  content,
  color,
  content_style,
  content_mobile,
}) => {
  return (
    <Div
      background="#FFF"
      border="3px solid #000"
      border_xs="2px solid #000"
      border_tablet="3px solid #000"
      border_md="3px solid #000"
      width="100%"
      width_md="320px"
      width_tablet="200px"
      boxShadow="6px 6px 0px 0px rgba(0,0,0,1)"
      boxShadow_xs="3px 3px 0px 0px rgba(0,0,0,1)"
      boxShadow_tablet="9px 8px 0px 0px rgba(0,0,0,1)"
      flexDirection_tablet="column"
      justifyContent_tablet="start"
      padding="15px"
      padding_xs="10px"
      padding_tablet="15px"
      padding_md="15px"
      alignItems="center"
      alignItems_tablet="start"
      borderRadius="4px"
    >
      <Div flexShrink="0" width_xs="48px" width_tablet="56px">
        {icon && (
          <Icon
            icon={icon}
            width="56px"
            width_xs="48px"
            height="56px"
            height_xs="48px"
            color={Colors[color] || color}
          />
        )}
      </Div>
      <Div
        margin="0 0 0 15px"
        margin_tablet="24px 0 0 0"
        display="flex"
        flexDirection="column"
        display_tablet="block"
        flex="1"
      >
        {title && (
          <H3
            textAlign="left"
            fontFamily="Archivo"
            fontWeight="600"
            fontSize="16px"
            margin="0"
          >
            {title}
          </H3>
        )}
        {(content || content_mobile) && (
          <Paragraph
            textAlign="left"
            color={Colors.darkGray}
            fontFamily="Archivo"
            fontSize="18px"
            style={content_style ? JSON.parse(content_style) : {}}
          >
            {content_mobile ? (
              <>
                {content && (
                  <span
                    className="d-block d-xs-none w-100"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}
                <span
                  className="d-none d-xs-block w-100"
                  dangerouslySetInnerHTML={{ __html: content_mobile }}
                />
              </>
            ) : (
              content && (
                <span
                  className="w-100"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )
            )}
          </Paragraph>
        )}
      </Div>
    </Div>
  );
};
