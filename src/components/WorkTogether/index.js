import React from "react";
import { GridContainer, Div, Grid } from "../Sections";
import { H2, H4, Paragraph } from "../Heading";
import { Colors } from "../Styling";
import Icon from "../Icon";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const WorkTogether = ({
  title,
  description,
  imageList,
  features,
  showImages = true,
  showDescription = true,
}) => {
  if (!features || !Array.isArray(features)) return null;

  return (
    <GridContainer
      background={Colors.verylightGray}
      containerColumns_tablet="1fr repeat(12,1fr) 1fr"
      padding="70px 0"
      padding_tablet="70px 0"
      childMaxWidth="1280px"
      childMargin="auto"
      gridColumn_tablet="1 / span 14"
      childWidth="100%"
    >
      <H2
        type="h2"
        fontSize="30px"
        width="auto"
        fontWeight="bold"
        margin={`10px 0 ${showImages ? "35px" : "0"} 10px`}
        textAlign="center"
      >
        {title}
      </H2>

      {/* Images Section - Only show if imageList provided and showImages is true */}
      {showImages && imageList && imageList.length > 0 && (
        <Div
          display="flex"
          flexFlow="wrap!important"
          gap="40px"
          margin="10px 0 0 0"
          flexDirection="row"
          justifyContent="center"
        >
          {imageList.map((l, i) => (
            <React.Fragment key={i}>
              <GatsbyImage
                style={{
                  height: "90px",
                  width: "90px",
                  margin: "0 20px",
                }}
                imgStyle={{
                  objectFit: "cover",
                  width: "90px",
                  borderRadius: "50px",
                }}
                alt={l.alt}
                image={getImage(l.image.childImageSharp.gatsbyImageData)}
              />
            </React.Fragment>
          ))}
        </Div>
      )}

      {/* Description Section - Only show if description provided and showDescription is true */}
      {showDescription && description && (
        <Paragraph
          fontSize="15px"
          color="#3A3A3A"
          padding={`${showImages ? "35px" : "0"} 10px 0`}
          padding_tablet={`${showImages ? "35px" : "0"} 20% 0`}
          letterSpacing="0.05em"
          textAlign="center"
        >
          {description}
        </Paragraph>
      )}

      {showImages && (
        <GridContainer
          padding_tablet="0"
          containerColumns_tablet="1fr repeat(12, 1fr) 1fr"
          gridColumn_tablet="1 / span 14"
          margin_tablet="3% 0 4% 0"
          margin="10% 0"
        >
          <Div height="2px" background="#ACACAC" style={{ opacity: "0.5" }} />
        </GridContainer>
      )}

      {/* Features Section */}
      <Grid
        gridTemplateColumns_tablet="repeat(auto-fill, minmax(40%, 1fr))"
        columnCount_tablet="2"
        columnCount="0"
        justifyContent="center"
        padding="0 6%"
        padding_tablet="0 40px"
        padding_md="0 80px"
        margin={!showImages ? "3rem 0 0 0" : ""}
        padding_lg="0"
        width="100%"
      >
        {features.map((item, i) => (
          <Div
            key={`${i}-${item.title}`}
            item={item.title}
            display="flex"
            flexDirection="row"
            style={{ position: "relative" }}
            gap="12px"
            width="100%"
            width_tablet="100%"
          >
            <Div height="100%">
              <Icon
                icon={item.icon}
                color={Colors.black}
                color2="#FFCF18"
                width="70px"
                height="54px"
              />
            </Div>
            <Div height="100%" display="flex" flexDirection="column">
              <H4
                type="h4"
                textAlign="left"
                fontSize="14px"
                align="left"
                align_sm="left"
                color={Colors.black}
                textTransform="uppercase"
                fontWeight="700"
              >
                {item.title}
              </H4>
              <Paragraph
                textAlign="left"
                letterSpacing="0.05em"
                lineHeight="22px"
                fontWeight="normal"
                margin="20px 0"
                align_sm="left"
                fontFamily="Lato, sans-serif"
              >
                {item.description}
              </Paragraph>
            </Div>
          </Div>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default WorkTogether;
