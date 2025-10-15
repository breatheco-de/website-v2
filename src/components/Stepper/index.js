import React from "react";
// import "./Stepper.css";
import { Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Icon } from "../Icon";
import { Colors } from "../Styling";

const StepCard = ({ step, index, steps }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const scaleValue = isHovered ? 1.02 : 1;
  const boxShadow = isHovered
    ? "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    : "none";

  return (
    <>
      <Div
        position="relative"
        backgroundColor="#f3fdff"
        border="2px solid oklch(.92 0 0)"
        borderRadius="8px"
        padding="1.5rem"
        transform={`scale(${scaleValue})`}
        boxShadow={boxShadow}
        style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        flexDirection="column"
      >
        <Div display="flex" alignItems="flex-start" gap="1rem">
          <Div
            as="span"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            width="40px"
            height="40px"
            minWidth="40px"
            flexShrink="0"
            background={Colors.blue}
            color="white"
            style={{ fontFamily: "Lato", fontWeight: 700 }}
          >
            {index + 1}
          </Div>
          <Div flexDirection="column">
            <H3
              as="h3"
              textAlign="left"
              fontSize="1.5rem"
              margin="0 0 0.5rem 0"
            >
              {step.title}
            </H3>
            <Paragraph
              textAlign="left"
              fontSize="1.125rem"
              fontFamily="var(--font-sans)"
              lineHeight="1.6"
            >
              {step.description}
            </Paragraph>
            {step.sub_items && (
              <Div margin="1rem 0 0 0.5rem">
                <Div as="ul" display="flex" flexDirection="column" gap="0.5rem">
                  {step.sub_items.map((item, i) => (
                    <Div
                      as="li"
                      key={i}
                      display="flex"
                      alignItems="flex-start"
                      gap="0.5rem"
                      fontSize="1.125rem"
                      style={{
                        fontFamily: "var(--font-sans)",
                        lineHeight: 1.6,
                      }}
                    >
                      {typeof item === "string" ? (
                        item
                      ) : (
                        <>
                          {item.icon && <Icon icon={item.icon} />}
                          <Paragraph
                            textAlign="left"
                            fontFamily="var(--font-sans)"
                            style={{ flex: 1 }}
                          >
                            {item.text}
                          </Paragraph>
                        </>
                      )}
                    </Div>
                  ))}
                </Div>
              </Div>
            )}
          </Div>
        </Div>
        {index < steps.length - 1 && (
          <Div
            position="absolute"
            bottom="-2.25rem"
            left="50%"
            width="2px"
            transform="translateX(-50%)"
            height="2.2rem"
            backgroundColor="oklch(.92 0 0)"
          />
        )}
      </Div>
    </>
  );
};

const Stepper = ({ title, sub_title, steps }) => {
  return (
    <Div as="section" padding="4rem 1rem">
      <Div maxWidth="64rem" margin="0 auto">
        {title && (
          <H2
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              lineHeight: 1.2,
              textWrap: "balance",
            }}
          >
            {title}
          </H2>
        )}
        {sub_title && (
          <Paragraph
            style={{
              fontSize: "1.25rem",
              opacity: 0.9,
              textWrap: "pretty",
              lineHeight: 1.6,
            }}
          >
            {sub_title}
          </Paragraph>
        )}
        <Div display="flex" flexDirection="column" gap="2rem">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} steps={steps} />
          ))}
        </Div>
      </Div>
    </Div>
  );
};

export default Stepper;
