import React, { useEffect, useMemo } from "react";
import { isCustomBarActive } from "../actions";
import { Header } from "../components/Sections";
import GeeksVsOthers from "../components/GeeksVsOthers";
import BaseRender from "./_baseLayout";
import { graphql } from "gatsby";
import { SessionContext } from "../session";
import TwoColumn from "../components/TwoColumn/index.js";
import { Div } from "../components/Sections";
import { Colors } from "../components/Styling";
import { H2, H4 } from "../components/Heading";
import { landingSections } from "../components/Landing";
import { Circle } from "../components/BackgroundDrawing";

const View = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  const [components, setComponents] = React.useState({});

  useEffect(() => {
    let _components = {};
    if (yml.components)
      yml.components.forEach(({ name, ...rest }) => {
        _components[name] = rest;
      });
    setComponents({ ...yml, ..._components });
  }, [yml]);

  return (
    <>
      <Header
        margin="10px auto 60px auto"
        margin_md="72px auto 80px auto"
        padding="90px 20px 42px 20px"
        padding_tablet="72px 130px 72px 130px"
        position="relative"
        background={Colors.lightYellow}
        display="block"
        fontFamily={"Archivo-Black"}
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={
          <>
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                color: "#424242",
                lineHeight: "1.5",
                fontSize: "22px",
              }}
              dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
            />
          </>
        }
      >
        {/* Decorative Circles */}
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="87px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="172px"
          left="74px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="17px"
          height="17px"
          top="216px"
          left="74px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="298px"
          left="74px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="106px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="145px"
          left="106px"
          zIndex="-1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="182px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="246px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="30px"
          height="30px"
          top="120px"
          right="83px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="170px"
          right="50px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="170px"
          right="89px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="170px"
          right="128px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="10px"
          right="320px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="32px"
          right="61px"
          display="none"
          display_tablet="inline"
        />
        {/* Mobile decorative elements */}
        <Circle
          color="blue"
          width="15px"
          height="15px"
          top="92px"
          left="9px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="white"
          width="15px"
          height="15px"
          top="130px"
          left="10px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="darkGray"
          width="15px"
          height="15px"
          top="195px"
          left="5px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
      </Header>

      {/* Section Title */}
      <Div display="block" margin="25px auto">
        <H2 type="h2" textAlign_tablet="center">
          {yml.section_heading?.text}
        </H2>

        <Div
          style={{
            maxWidth: "1280px",
            margin: "25px auto",
            padding: "0 20px",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              color: "#424242",
              lineHeight: "1.5",
              fontSize: "22px",
              textAlign: "center",
            }}
            dangerouslySetInnerHTML={{
              __html: yml.section_heading?.sub_heading,
            }}
          />
        </Div>
      </Div>

      <GeeksVsOthers lang={pageContext.lang} link={false} />

      {/* Dynamic Components */}
      {Object.keys(components)
        .filter(
          (name) =>
            components[name] &&
            (landingSections[name] || landingSections[components[name].layout])
        )
        .sort((a, b) =>
          components[b].position > components[a].position ? -1 : 1
        )
        .map((name, index) => {
          const layout = components[name].layout || name;
          return landingSections[layout]({
            ...props,
            yml: components[name],
            session,
            course: yml.meta_info?.utm_course,
            location: components.meta_info?.utm_location,
            index: index,
          });
        })}
    </>
  );
};

export const query = graphql`
  query GeeksQuery($file_name: String!, $lang: String!) {
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
          seo_title
          header {
            title
            sub_title
            paragraph
          }
          section_heading {
            text
            sub_heading
          }
          components {
            name
            position
            background
            proportions
            layout
            justify
            swipable
            image {
              src
              style
              shadow
            }
            button {
              text
              color
              path
              background
            }
            section_heading {
              text
            }
            heading {
              text
              font_size
              style
            }
            sub_heading {
              text
              style
              font_size
            }
            content {
              text
              style
            }
            bullets {
              item_style
              items {
                heading
                text
                icon
                icon_color
              }
            }
            icons {
              icon
              color
              title
              content
            }
          }
        }
      }
    }
  }
`;
export default BaseRender(View);
