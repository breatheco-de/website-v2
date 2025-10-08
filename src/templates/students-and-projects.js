import React from "react";
import { graphql } from "gatsby";
import { Title, H1, H2, H3, H4, H5, Paragraph } from "../components/Heading";
import BaseRender from "./_baseLayout";
import Icon from "../components/Icon";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
import { Colors, StyledBackgroundSection, Anchor } from "../components/Styling";
import { GridContainer, Div, Header } from "../components/Sections";
import ReactPlayer from "../components/ReactPlayer";

const StudentAndProjects = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  let projects = data.allAlumniProjectsYaml.edges[0].node.projects;

  return (
    <Div margin="4rem 0 4rem 0" flexDirection="column">
      <Header
        padding="0 10px"
        margin_md={isCustomBarActive(session) ? "70px 0 0 0" : "0"}
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
      />
      {Array.isArray(projects) &&
        projects.map((l, i) => {
          return (
            <GridContainer
              key={i}
              paddingChild="25px 0px 40px 0"
              padding_tabletChild="0"
              columns_tablet="12"
              padding_tablet="50px 0"
            >
              <Div
                boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
                boxShadow_tablet="none"
                borderRadius="3px"
                border="1px solid #EBEBEB"
                border_tablet="none"
                padding="20px"
                flexDirection="column"
                justifyContent_tablet="start"
                padding_tablet="70px 0 0 0"
                gridArea_tablet={i % 2 != 0 ? "1/1/1/6" : "1/7/1/13"}
              >
                <H3 type="h3" textAlign="left">
                  {l.project_name}
                </H3>
                {l.alumni.map((alumni, index) => {
                  return (
                    <Div
                      key={index}
                      flexDirection="column"
                      margin="10px 0 5px 0"
                    >
                      <Div flexDirection="row">
                        <H4
                          width="auto"
                          type="h4"
                          textAlign="left"
                          fontWeight="700"
                        >
                          {`${alumni.first_name} ${alumni.last_name}`}
                        </H4>
                        {alumni.github != "" && (
                          <Div margin="0 0 0 auto" margin_tablet="0 0 0 15px">
                            <a
                              target="_blank"
                              href={alumni.github}
                              rel="noopener noreferrer nofollow"
                            >
                              <Icon icon="github" width="22" />
                            </a>
                          </Div>
                        )}
                        {alumni.linkedin != "" && (
                          <Div margin="0 0 0 10px" margin_tablet="0 0 0 10px">
                            <a
                              target="_blank"
                              href={alumni.linkedin}
                              rel="noopener noreferrer nofollow"
                            >
                              <Icon icon="linkedin" width="22" fill="#0e76a8" />
                            </a>
                          </Div>
                        )}
                      </Div>
                      <Paragraph primary textAlign="left">
                        {alumni.job_title}
                      </Paragraph>
                    </Div>
                  );
                })}
                <Paragraph
                  textAlign="left"
                  margin="15px 0"
                  letterSpacing="0.05em"
                >
                  {l.project_content}
                </Paragraph>
                <Paragraph
                  style={{ alignItems: "center" }}
                  padding="15px 0px"
                  display="flex"
                  fontWeight="700"
                  letterSpacing="0.05em"
                  lineHeight="16px"
                  textAlign="left"
                  fontSize="13px"
                  color={Colors.blue}
                >
                  <Anchor cursor="pointer" to={l.live_link}>
                    {l.project_name}
                    <Icon
                      style={{ margin: "0 0 0 10px", placeSelf: "center" }}
                      icon="arrow-right"
                      width="10"
                      height="12px"
                      color={Colors.blue}
                    />
                  </Anchor>
                </Paragraph>
              </Div>
              <Div
                height="auto"
                width="100%"
                gridArea_tablet={i % 2 != 0 ? "1/7/1/13" : "1/1/1/6"}
              >
                {l.project_video === "" ? (
                  <StyledBackgroundSection
                    borderRadius="3px"
                    height="389px"
                    image={l.project_image.childImageSharp.gatsbyImageData}
                    bgSize="cover"
                    alt={l.project_name}
                  />
                ) : (
                  <ReactPlayer
                    id={l.project_video}
                    thumb={l.project_image}
                    imageSize="maxresdefault"
                    videoHeight="389px"
                    style={{
                      width: "100%",
                      height: "389px",
                      borderRadius: "3px",
                    }}
                  />
                )}
              </Div>
            </GridContainer>
          );
        })}
    </Div>
  );
};
export const query = graphql`
  query AlumniProjectQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            slug
          }
          seo_title
          header {
            title
            paragraph
          }
        }
      }
    }
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          header {
            tagline
            sub_heading
          }
          project
          made_by
          description
          projects {
            project_name
            slug
            project_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            project_content
            project_video
            live_link
            github_repo
            alumni {
              first_name
              last_name
              job_title
              github
              linkedin
              twitter
            }
          }
          button_section {
            button_text
            button_link
          }
        }
      }
    }
  }
`;
export default BaseRender(StudentAndProjects);
