import React from "react";
import { H3, Paragraph } from "../Heading";
import { Div } from "../Sections";
import { Colors } from "../Styling";
import Icon from "../Icon";

export default ({ icon, title, content, color, content_style, content_mobile }) => {
  return (
    <Div
      background="#FFF"
      border="3px solid #000"
      width="100%"
      width_md="320px"
      width_tablet="200px"
      boxShadow="6px 6px 0px 0px rgba(0,0,0,1)"
      boxShadow_tablet="9px 8px 0px 0px rgba(0,0,0,1)"
      flexDirection_tablet="column"
      justifyContent_tablet="start"
      padding="15px"
      alignItems="center"
      alignItems_tablet="start"
      borderRadius="4px"
    >
      {icon && (
        <Icon
          icon={icon}
          width="56px"
          height="56px"
          color={Colors[color] || color}
        />
      )}
      <Div
        margin="0 0 0 15px"
        margin_tablet="24px 0 0 0"
        display="flex"
        flexDirection="column"
        display_tablet="block"
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
                  <span className="d-block d-xs-none w-100" dangerouslySetInnerHTML={{ __html: content }} />
                )}
                <span className="d-none d-xs-block w-100" dangerouslySetInnerHTML={{ __html: content_mobile }} />
              </>
            ) : (
              content && <span className="w-100" dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </Paragraph>
        )}
      </Div>
    </Div>
  );
};
