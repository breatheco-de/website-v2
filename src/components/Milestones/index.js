import React from "react";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import Icon from "../Icon";

const Milestones = (props) => {
  const { milestones, lang } = props;

  if (!milestones || !milestones.items || milestones.items.length === 0) {
    return null;
  }

  const [selected, setSelected] = React.useState(null);

  return (
    <Div background={Colors.veryLightBlue3} margin="3rem 0">
      <Div
        maxWidth="1280px"
        margin="0 auto"
        padding="20px"
        padding_tablet="40px 60px"
        padding_lg="40px 0"
        gap="20px"
        flexDirection="column"
      >
        <H2 type="h2" textAlign="center" color={Colors.black}>
          {milestones.title}
        </H2>
        {milestones.sub_title && (
          <Paragraph textAlign="center" color={Colors.black} fontSize="18px">
            {milestones.sub_title}
          </Paragraph>
        )}

        {/* Unified accordion for all screen sizes */}
        <Div flexDirection="column" gap="10px" margin="10px 0 0 0">
          {milestones.items.map((item, index) => {
            const isOpen = selected && selected.id === item.id;
            return (
              <Div
                key={item.id || index}
                width="100%"
                height={isOpen ? "auto" : "76px"}
                padding_xs="10px 20px"
                border="1px solid #EBEBEB"
                borderLeft={`6px solid ${Colors.blue}`}
                borderRadius="3px"
                cursor="pointer"
                onClick={() => setSelected(isOpen ? null : item)}
                justifyContent="between"
                flexDirection={isOpen && "column"}
                style={{ position: "relative" }}
              >
                <Div
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <H3 textAlign="left" fontSize="24px">
                    {item.title}
                  </H3>
                </Div>
                <Div
                  style={{ position: "absolute", right: "13px", top: "15px" }}
                  transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                >
                  <Icon icon="arrowdown" width="32px" height="32px" />
                </Div>
                {isOpen && (
                  <Div flexDirection="column" margin="10px 0 0 0" gap="10px">
                    {item.content && (
                      <Paragraph
                        textAlign="left"
                        margin="0"
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      />
                    )}
                    {item.bullets?.items && item.bullets.items.length > 0 && (
                      <Div flexDirection="column" gap="8px">
                        {item.bullets.items.map((bullet, bulletIndex) => {
                          return (
                            <Div
                              as="li"
                              margin="0 0 0 16px"
                              key={bulletIndex}
                              flexDirection="column"
                              gap="4px"
                            >
                              <Paragraph
                                textAlign="left"
                                margin="0"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <span style={{ marginRight: "8px" }}>•</span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: bullet.text,
                                  }}
                                />
                              </Paragraph>
                            </Div>
                          );
                        })}
                      </Div>
                    )}
                  </Div>
                )}
              </Div>
            );
          })}
        </Div>
      </Div>
    </Div>
  );
};

export default Milestones;
