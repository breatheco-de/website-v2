import React from "react";
import { graphql } from "gatsby";
import { Div, Header } from "../components/Sections";
import { H1, H2, Paragraph, SubTitle } from "../components/Heading";
import TestimonialCard from "../components/TestimonialCard";
import { Colors, Img } from "../components/Styling";
import BaseRender from "./_baseLayout";

const SVGBubblesLeft = () => (
  <svg
    style={{ top: "85px", left: "0", position: "absolute" }}
    width="321"
    height="433"
    viewBox="0 0 321 433"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="176.5" cy="185.5" r="13.5" fill="#CD0000" />
    <circle cx="16" cy="375" r="58" fill="#FFB718" />
    <circle
      cx="43.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 43.5 40.5)"
      fill="#FFB718"
      fillOpacity="0.2"
    />
    <circle
      cx="98.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 98.5 8.5)"
      fill="white"
    />
    <circle
      cx="78.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 78.5 40.5)"
      fill="black"
    />
    <circle
      cx="133.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 133.5 8.5)"
      fill="black"
    />
    <circle
      cx="133.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 133.5 40.5)"
      fill="white"
    />
    <circle
      cx="176.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 176.5 8.5)"
      fill="white"
    />
    <circle
      cx="176.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 176.5 40.5)"
      fill="white"
    />
    <circle
      cx="213.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 213.5 8.5)"
      fill="white"
    />
    <circle
      cx="257.5"
      cy="40.5"
      r="8.5"
      transform="rotate(-90 257.5 40.5)"
      fill="#0097CD"
    />
    <circle
      cx="312.5"
      cy="8.5"
      r="8.5"
      transform="rotate(-90 312.5 8.5)"
      fill="white"
    />
  </svg>
);

const SVGBubblesRight = () => (
  <svg
    style={{ right: "0px", position: "absolute", top: "100px" }}
    width="315"
    height="432"
    viewBox="0 0 315 432"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="274" cy="313" r="119" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="14" cy="14" r="14" fill="#FFB718" />
    <circle cx="227.5" cy="45.5" r="26.5" fill="#0097CD" />
    <circle
      cx="269.5"
      cy="131.5"
      r="8.5"
      transform="rotate(90 269.5 131.5)"
      fill="#F5F5F5"
    />
    <circle
      cx="230.5"
      cy="131.5"
      r="8.5"
      transform="rotate(90 230.5 131.5)"
      fill="black"
    />
    <circle
      cx="191.5"
      cy="131.5"
      r="8.5"
      transform="rotate(90 191.5 131.5)"
      fill="#F5F5F5"
    />
    <rect x="78" y="212" width="77" height="11" rx="5.5" fill="black" />
    <rect x="169" y="212" width="119" height="11" rx="5.5" fill="black" />
  </svg>
);

const SVGImage = () => (
  <svg
    width="100%"
    height="284"
    viewBox="0 0 419 284"
    fill="none"
    xmlns="https:://www.w3.org/2000/svg"
  >
    <rect
      x="419"
      y="284"
      width="419"
      height="11"
      rx="5.49998"
      transform="rotate(-180 419 284)"
      fill="#A4A4A4"
    />
    <rect
      x="133"
      y="257"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 133 257)"
      fill="#A4A4A4"
    />
    <rect
      x="276"
      y="257"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 276 257)"
      fill="#A4A4A4"
    />
    <rect
      x="133"
      y="229"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 133 229)"
      fill="#A4A4A4"
    />
    <rect
      x="276"
      y="229"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 276 229)"
      fill="#A4A4A4"
    />
    <rect
      x="276"
      y="199"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 276 199)"
      fill="#A4A4A4"
    />
    <rect
      x="419"
      y="257"
      width="133"
      height="11"
      rx="5.49999"
      transform="rotate(-180 419 257)"
      fill="#A4A4A4"
    />
    <circle cx="209.5" cy="81.5" r="58.5" fill="#FFB718" />
    <circle cx="238.5" cy="23.5" r="23.5" fill="#0097CD" />
    <circle cx="336.5" cy="81.5" r="8.5" fill="#C7F3FD" />
    <circle cx="368.5" cy="136.5" r="8.5" fill="#C7F3FD" />
    <circle cx="336.5" cy="116.5" r="8.5" fill="black" />
    <circle cx="368.5" cy="171.5" r="8.5" fill="black" />
    <circle cx="336.5" cy="171.5" r="8.5" fill="#C7F3FD" />
    <circle cx="368.5" cy="214.5" r="8.5" fill="#C7F3FD" />
    <circle
      cx="368.5"
      cy="100.5"
      r="8.5"
      transform="rotate(90 368.5 100.5)"
      fill="#C7F3FD"
    />
    <circle cx="336.5" cy="214.5" r="8.5" fill="#C7F3FD" />
    <circle cx="14" cy="122" r="14" fill="#FFB718" />
    <circle
      cx="95.5"
      cy="81.5"
      r="8.5"
      transform="rotate(90 95.5 81.5)"
      fill="#C7F3FD"
    />
    <rect
      x="74"
      y="119"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 74 119)"
      fill="black"
    />
    <circle cx="53.5" cy="67.5" r="13.5" fill="#CD0000" />
    <path
      d="M206.902 129.5C208.057 127.5 210.943 127.5 212.098 129.5L232.45 164.75C233.604 166.75 232.161 169.25 229.852 169.25H189.148C186.839 169.25 185.396 166.75 186.55 164.75L206.902 129.5Z"
      fill="#CD0000"
    />
    <path
      d="M184.5 147.5L156.5 153.5V132.5L134 121.5L142 104.5L124 85.5L138.5 68.5L124 54.5L148.5 41"
      stroke="#FFB718"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M236 148.027L263.769 154V133.093L286.083 122.142L278.149 105.218L296 86.3022L281.62 69.3778L296 55.44L271.702 42"
      stroke="#FFB718"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const Awards = ({ data, pageContext, yml }) => {
  return (
    <>
      <Div
        padding_xxs="0"
        padding_tablet="0"
        padding_md="0"
        padding_lg="0"
        margin="120px auto 0 auto"
        maxWidth="1280px"
        position="relative"
        justifyContent="center"
      >
        <Img
          src="/images/Group-6594.png"
          width="208px"
          height="35px"
          style={{
            position: "absolute",
            right: "4%",
            bottom: "0%",
            zIndex: "0",
          }}
          display_xxs="none"
          display_tablet="flex"
        />
        <Img
          src="/images/Vector-light-right.png"
          width="89px"
          height="80px"
          style={{
            position: "absolute",
            right: "4%",
            top: "0%",
            zIndex: "0",
          }}
        />
        <Img
          src="/images/Vector-light.png"
          width="164px"
          height="222px"
          style={{
            position: "absolute",
            left: "2%",
            top: "0%",
            zIndex: "0",
          }}
        />

        <Header
          margin="1rem 0"
          padding_md="2rem 0 1rem 0"
          padding_l="0"
          fontFamily={"Archivo-Black"}
          seo_title={yml.seo_title}
          title={yml.header.title}
          htmlTitle={yml.header.htmlTitle}
          containerStyle={{
            zIndex: 1,
            width: "100%",
          }}
          textWrap="balance"
          paragraph={
            <>
              {yml.header?.sub_title && (
                <span
                  style={{
                    display: "block",
                    fontFamily: "Lato, sans-serif",
                    fontWeight: "300",
                    color: "#606060",
                    marginBottom: "16px",
                    fontSize: "26px",
                  }}
                >
                  {yml.header.sub_title}
                </span>
              )}
              {yml.header?.paragraph && (
                <span
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#424242",
                    lineHeight: "1.5",
                    fontSize: "22px",
                  }}
                  dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
                />
              )}
            </>
          }
        />
      </Div>
      <Div
        padding_xxs="0 20px"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0"
        margin="60px auto 0 auto"
        gap="36px 25px"
        flexDirection="row"
        flexWrap="wrap"
        maxWidth="1280px"
        justifyContent_xxs="center"
        justifyContent_tablet="between"
        height="auto"
      >
        {Array.isArray(yml.awards_list) &&
          yml.awards_list.map((award, i) => {
            return (
              <>
                <TestimonialCard
                  key={i}
                  image={award.image && award.image}
                  style={{
                    height: "180px",
                    width: "100%",
                    minWidth: "150px",
                  }}
                  imgStyle={{
                    objectPosition: "center",
                    objectFit: "contain",
                    height: "180px",
                    width: "100%",
                    minWidth: "150px",
                  }}
                  name={award.title}
                  textUrl={award.text_link}
                  url={award.link}
                  description={award.paragraph}
                  starRating={false}
                  //margin="0"
                  minWidth="180px"
                  width_xxs="240px"
                  width_xs="280px"
                  width_sm="380px"
                  width_tablet="300px"
                  //width_md="260px"
                  width_lg="356px"
                  height="min-content"
                />
              </>
            );
          })}
      </Div>
    </>
  );
};
export const query = graphql`
  query AwardsQuery($file_name: String!, $lang: String!) {
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
            htmlTitle
            paragraph
          }
          badges {
            paragraph
          }
          awards_list {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1000
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            title
            paragraph
            link
            text_link
          }
        }
      }
    }
  }
`;
export default BaseRender(Awards);
