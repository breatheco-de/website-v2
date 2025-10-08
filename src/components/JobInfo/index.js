import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Div, GridContainer, Grid } from "../Sections";
import { H3, Span, Paragraph } from "../Heading";
import { Colors } from "../Styling";
// import Link from "gatsby-link";
import Icon from "../Icon";

const JobInfo = ({ lang }) => {
  const data = useStaticQuery(graphql`
    query myNewJobsQuery {
      allJobYaml(
        filter: { meta_info: { visibility: { nin: ["hidden", "unlisted"] } } }
      ) {
        edges {
          node {
            banner_heading
            cities
            meta_info {
              slug
              open
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let jobs = data.allJobYaml.edges;
  console.log(jobs);
  const jobsInLang = jobs?.filter((j) => j.node.fields.lang == lang) || [];
  return (
    // <Fragment github="/job">
    <GridContainer
      background={Colors.white}
      containerColumns_tablet="1fr repeat(12,1fr) 1fr"
      padding="40px 17px"
      padding_tablet="40px 0"
      childMaxWidth="1280px"
      childMargin="auto"
      gridColumn_tablet="1 / span 14"
      childWidth="100%"
      overflow="hidden"
    >
      <Grid
        gridTemplateColumns="1fr"
        gridTemplateColumns_sm="repeat(2, 1fr)"
        gridTemplateColumns_tablet="repeat(3, 1fr)"
        gridGap="20px"
        padding="0"
        padding_tablet="0 40px 40px 0"
        padding_md="0 80px 80px 0"
        padding_lg="0 40px 40px 0"
        width="100%"
        maxWidth="100%"
        overflow="hidden"
      >
        {jobsInLang
          ? jobsInLang.map((item, index) => {
              return (
                <Div
                  key={index}
                  style={{
                    position: "relative",
                  }}
                  border="1px solid black"
                  borderLeft="6px solid black"
                  borderTop="1px solid black"
                  borderLeft_tablet="1px solid black"
                  borderTop_tablet="6px solid black"
                  display="flex"
                  flexDirection="column"
                  justifyContent="between"
                  minHeight="207px"
                  height="100%"
                  padding="24px"
                  background={Colors.white}
                  width="100%"
                  maxWidth="100%"
                  boxSizing="border-box"
                >
                  <H3 textAlign="left">
                    {item.node.banner_heading}
                    <Span animated color={Colors.yellow}>
                      _
                    </Span>
                  </H3>
                  <Div
                    display="flex"
                    flexWrap="wrap"
                    maxHeight="80px"
                    overflowY="auto"
                    margin="10px 0"
                    className="hideScrollbar"
                  >
                    {item.node.cities.map((city, index) => {
                      return (
                        <Paragraph
                          key={index}
                          width="auto"
                          padding="3px 8px"
                          margin="2px"
                          background={Colors.verylightGray}
                          textAlign="left"
                          color={Colors.darkGray}
                          fontSize="14px"
                          style={{
                            whiteSpace: "nowrap",
                            borderRadius: "4px",
                          }}
                        >
                          {city}
                        </Paragraph>
                      );
                    })}
                  </Div>
                  <Link to={`/job/${item.node.meta_info.slug}`}>
                    <Icon
                      style={{
                        position: "absolute",
                        bottom: "18px",
                        right: "18px",
                      }}
                      icon="arrowright"
                      height="32px"
                      width="32px"
                    />
                  </Link>
                </Div>
              );
            })
          : "Loading"}
      </Grid>
    </GridContainer>
  );
};

export default JobInfo;
