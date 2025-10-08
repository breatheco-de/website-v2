import React, { useState, useContext, useEffect } from "react";
import { graphql } from "gatsby";
import BaseRender from "./_baseLayout";
import { Div, GridContainer, HR } from "../components/Sections";
import { H1, H2, H3, Paragraph } from "../components/Heading";
import { Colors, Anchor, Img } from "../components/Styling";
import Icon from "../components/Icon";
import { SessionContext } from "../session.js";
import { isCustomBarActive } from "../actions";
import AdmissionsStaff from "../components/AdmissionsStaff";
import { landingSections } from "../components/Landing";

const ThankYou = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = useContext(SessionContext);
  const [components, setComponents] = useState({});
  const [checkStatus, setCheckStatus] = useState([
    { label: "facebook", status: false, iconColor: "#166fe5" },
    { label: "twitter", status: false, iconColor: "#1da1f2" },
    { label: "instagram", status: false, iconColor: "#8a3ab9" },
    { label: "meetup", status: false, iconColor: "#f65858" },
  ]);

  const updateStatus = (index, newvalue) => {
    let g = checkStatus[index];
    g["status"] = newvalue;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setCheckStatus([
        ...checkStatus.slice(0, index),
        g,
        ...checkStatus.slice(index + 1),
      ]);
  };

  useEffect(() => {
    let _components = {};
    if (yml.components)
      yml.components.forEach(({ name, ...rest }) => {
        _components[name] = rest;
      });
    setComponents({ ...yml, ..._components });
  }, [yml]);

  const renderCompactSection = (comp, keyIndex) => {
    const { image, heading, content, button, background } = comp || {};
    const bg = background ? Colors[background] || background : undefined;
    const imageStyle = image && image.style ? JSON.parse(image.style) : null;
    const contentStyle =
      content && content.style ? JSON.parse(content.style) : null;
    return (
      <Div
        key={`compact-${keyIndex}`}
        background={bg || Colors.white}
        padding="16px"
        margin="10px 0"
        display="grid"
        gridTemplateColumns="60px 1fr"
        gap="12px"
        alignItems="start"
        borderRadius="8px"
        style={{ boxShadow: "0px 4px 16px rgba(0,0,0,0.08)" }}
      >
        {image?.src && (
          <Img
            src={image.src}
            alt="section"
            width="60px"
            height="60px"
            style={imageStyle}
            backgroundSize="cover"
          />
        )}
        <Div flexDirection="column" gap="6px" textAlign="left">
          {heading?.text && (
            <H3 fontSize="16px" lineHeight="20px" margin="0" textAlign="left">
              {heading.text}
            </H3>
          )}
          {content?.text && (
            <Paragraph
              fontSize="13px"
              lineHeight="18px"
              margin="0 0 8px 0"
              textAlign="left"
              style={contentStyle}
              dangerouslySetInnerHTML={{ __html: content.text }}
            />
          )}
          {button?.text && button?.path && (
            <Div display="flex" justifyContent="flex-end" width="100%">
              <Anchor
                to={button.path}
                display="inline-block"
                color={Colors.blue}
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {button.text}
              </Anchor>
            </Div>
          )}
        </Div>
      </Div>
    );
  };

  return (
    <>
      <Div className="circles-left" display="none" display_tablet="inherit">
        <Icon
          icon="landingCircles/smCircle-red"
          width="23px"
          height="23px"
          style={{
            zIndex: 2,
            position: "absolute",
            left: "218px",
            top: "225px",
          }}
        />
        <Icon
          icon="landingCircles/mdCircle-lightBlue"
          style={{ zIndex: 2, position: "absolute", left: "53px", top: "97px" }}
        />
        <Icon
          icon="landingCircles/bigCircle-yellowLight"
          width="115px"
          height="329px"
          style={{ zIndex: 2, position: "absolute", left: "0px", top: "250px" }}
        />
      </Div>
      <Div className="circles-right" display="none" display_tablet="inherit">
        <Icon
          icon="landingCircles/lgCircle-mustard"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "0px",
            top: "269px",
          }}
        />
        <Icon
          icon="landingCircles/mdCircle-blue"
          width="67px"
          height="67px"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "116px",
            top: "169px",
          }}
        />
        <Icon
          icon="landingCircles/smCircle-mustard"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "299px",
            top: "122px",
          }}
        />
      </Div>

      <Div
        flexDirection="column"
        background={Colors.lightYellow}
        padding="68px 0"
        height="auto"
        margin={isCustomBarActive(session) ? "140px 0 0 0" : "80px 0 0 0"}
      >
        <H1
          type="h1"
          zIndex="5"
          fontSize="13px"
          lineHeight="16px"
          fontWeight="700"
          letterSpacing="0.05em"
          color={Colors.darkGray2}
        >
          Coding Bootcamp
        </H1>

        <H2
          type="h2"
          zIndex="5"
          fontSize="48px"
          lineHeight="60px"
          margin="16px 0px 19px 0px"
        >
          {`< ${yml.banner.tagline} >`}
        </H2>

        <H3 type="h3" margin="5px 0">
          {yml.content.title}
        </H3>
        {yml.content.message.split("\n").map((m, i) => (
          <Paragraph
            key={i}
            align="center"
            paddingLeft="15px"
            paddingRight="10px"
          >
            {m}
          </Paragraph>
        ))}
      </Div>

      <AdmissionsStaff />

      {/* Dynamic Components (YAML-driven) */}
      {components?.title?.heading?.text && (
        <H2 type="h2" margin="30px 0 10px 0" fontSize="40px">
          {components.title.heading.text}
        </H2>
      )}

      {Object.keys(components)
        .filter(
          (name) =>
            components[name] &&
            name !== "title" &&
            (landingSections[name] || landingSections[components[name].layout])
        )
        .sort((a, b) =>
          components[b].position > components[a].position ? -1 : 1
        )
        .map((name, index) => {
          const comp = components[name];
          const layout = comp.layout || name;
          const original = landingSections[layout]({
            ...props,
            yml: comp,
            session,
            index: index,
          });
          return (
            <React.Fragment key={`section-${index}`}>
              <Div display="none" display_tablet="block">
                {original}
              </Div>
              <Div display="block" display_tablet="none">
                {renderCompactSection(comp, index)}
              </Div>
            </React.Fragment>
          );
        })}
    </>
  );
};
export const query = graphql`
  query ThankQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
          }
          banner {
            tagline
            sub_heading
          }
          content {
            title
            message
            button
          }
          title {
            heading {
              text
            }
          }
          components {
            name
            position
            background
            proportions
            layout
            image {
              style
              src
              shadow
            }
            button {
              text
              color
              path
              background
            }
            heading {
              text
            }
            content {
              text
            }
          }
        }
      }
    }
  }
`;
export default BaseRender(ThankYou);
