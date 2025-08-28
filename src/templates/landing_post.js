import React, { useEffect, useContext } from "react";
import { graphql } from "gatsby";
import { Paragraph } from "../components/Heading";
import { RoundImage, Colors, Button, Link } from "../components/Styling";
import CallToAction from "../components/CallToAction";
import Layout from "../global/Layout";
import "../assets/css/single-post.css";
import rehypeReact from "rehype-react";
import ScrollSpy from "../components/ScrollSpy";
import { SessionContext } from "../session";

//FROM components
import { GridContainer, Div, Header, Container } from "../components/Sections";

export default function Template(props) {
  const { data, pageContext } = props;
  const { session } = useContext(SessionContext);
  const post = data.markdownRemark;
  const lang = pageContext.lang;
  const isBrowser = typeof window !== `undefined`;
  let isCustombarActive;

  if (session && session.location) {
    isCustombarActive = session.location.custom_bar.active;
  }
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      button: Button,
      "call-to-action": CallToAction,
    },
  }).Compiler;

  // mdAST is a specification for representing Markdown in a syntax tree
  const markdownAST = renderAst(post.htmlAst).props.children;
  const sanitizedData = markdownAST?.filter((el) => el.type !== "h1");
  const filteredH2 = markdownAST?.filter((el) => el.type === "h2");

  //Returns month's name
  function GetMonth(n) {
    let monthsEs = [
      "",
      "ENE",
      "FEB",
      "MAR",
      "ABR",
      "MAY",
      "JUN",
      "JUL",
      "AGO",
      "SEP",
      "OCT",
      "NOV",
      "DIC",
    ];
    let monthsUs = [
      "",
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    let mes = "";

    if (pageContext.lang == "es") mes = monthsEs[n];
    else mes = monthsUs[n];

    return mes;
  }

  if (isBrowser) {
    const anchors = document.getElementsByTagName("a");

    Array.from(anchors).forEach((anchor) => {
      const linkRegex = new RegExp("(http)");
      if (
        linkRegex.test(anchor.href) &&
        !anchor.href.includes("4geeks.com") &&
        !anchor.href.includes("4geeksacademy.com")
      ) {
        anchor.rel = "nofollow";
        anchor.target = "_self";
      }
    });
  }

  return (
    // TODO: Create responsive styles
    <>
      <Layout
        type="post"
        seo={data.markdownRemark.frontmatter}
        context={pageContext}
        wordCount={data.markdownRemark.fields.wordCount}
      >
        <Header
          hideArrowKey
          padding={"90px 17px 70px 17px"}
          paddingParagraph="0"
          paddingTitle="10px 0 0 0"
          margin="20px 0 0 0"
          margin_tablet="10px 0 0 0"
          margin_md="10px 0 0 0"
          margin_xxs="0"
          height="100%"
          textAlign_tablet="left"
          seo_title={post.frontmatter.cluster}
          title={post.frontmatter.title}
          paragraph={post.frontmatter.excerpt}
          display_mobile="flex"
          svg_image={
            <RoundImage
              border="0rem"
              width="100%"
              height="320px"
              width_tablet="390px"
              width_md="520px"
              width_lg="630px"
              bsize="cover"
              position="right"
              url={post.frontmatter.image}
            />
          }
          background={Colors.lightYellow}
        />

        <Div
          display="flex"
          display_tablet="none"
          margin="0 0 0 -17px"
          background={Colors.white}
          style={{
            borderBottom: "1px solid #EBEBEB",
            overflowX: "auto",
            zIndex: "999",
            position: "sticky",
            top: `${isCustombarActive ? "120px" : "0"}`,
          }}
          padding="0 35px"
          alignItems="center"
          flexDirection="row"
          gap="40px"
          width="100%"
          height="70px"
          className="scroll-spy-container"
        >
          <ScrollSpy offsetTop={200} autoScrollOffsetTop={-190}>
            {filteredH2.map((nav) => {
              const { id, children } = nav.props;
              return (
                <button
                  key={id}
                  width="auto"
                  padding="0 20px"
                  href={`#${id}`}
                  ref={React.createRef()}
                >
                  <Paragraph textTransform="uppercase" width="max-content">
                    {children[1].props?.children?.toString().toUpperCase() ||
                      children[1].toString().toUpperCase()}
                  </Paragraph>
                </button>
              );
            })}
          </ScrollSpy>
        </Div>
        <Container>
          {/* Container */}
          <Div gap="6%" width="100%">
            <Div
              size="12"
              size_tablet="8"
              flexDirection="column"
              margin="30px 0 0 0"
              background={Colors.white}
            >
              <Div className="single-post" flexDirection="Column">
                {sanitizedData}
              </Div>
            </Div>

            {filteredH2.length >= 1 && (
              <>
                <Div
                  display="none"
                  size_tablet="4"
                  display_tablet="flex"
                  margin="54px 0 0 0"
                  style={{ position: "relative" }}
                >
                  <Div
                    style={{
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      top: `${isCustombarActive ? "150px" : "85px"}`,
                    }}
                    className="container-sidebar-content"
                    padding="25px 0"
                    margin="0 0 35px 0"
                    justifyContent="space-around"
                    gap="8px"
                    flexDirection="column"
                    position="sticky"
                    borderRadius="3px"
                    border={`1px solid #e5e5e5`}
                    width="250px"
                    height="fit-content"
                  >
                    <ScrollSpy offsetTop={60} autoScrollOffsetTop={-50}>
                      {filteredH2.map((heading, i) => {
                        const { id, children } = heading.props;
                        return (
                          <button ref={React.createRef()} href={`#${id}`}>
                            <Paragraph
                              className="sidebar-content"
                              letterSpacing="0.05em"
                              key={id}
                              fontSize="14px"
                              textAlign="center"
                              textAlign_tablet="left"
                            >
                              {children[1].props?.children?.toString() ||
                                children[1].toString()}
                            </Paragraph>
                          </button>
                        );
                      })}
                    </ScrollSpy>
                    <Link
                      style={{ color: Colors.white, margin: "0 30px" }}
                      to={lang === "us" ? "/us/apply" : "/es/aplica"}
                    >
                      <Button
                        width="100%"
                        fontSize="12px"
                        background={Colors.blue}
                        borderRadius=".25rem"
                        padding="5px"
                        // flexDirection
                        justifyContent="center"
                        margin="14px 0 4px 0"
                        color="#FFFFFF !important"
                      >
                        {lang === "us" ? "APPLY NOW" : "APLICA AHORA"}
                      </Button>
                    </Link>
                  </Div>
                </Div>
              </>
            )}
          </Div>
        </Container>
      </Layout>
    </>
  );
}
export const postQuery = graphql`
  query Landing_BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        slug
        title
        author
        date
        excerpt
        visibility
        image
        cluster
      }
      fields {
        readingTime {
          text
        }
        wordCount
      }
    }
  }
`;
