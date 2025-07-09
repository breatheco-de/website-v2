import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { H1, Paragraph } from "../components/Heading";
import { RoundImage, Colors, Button } from "../components/Styling";
import Layout from "../global/Layout";
import LazyLoad from "react-lazyload";
import twitterUser from "../utils/twitter";
// import Icon from '../components/Icon'
// import {TwitterFollowButton} from 'react-twitter-embed';
import { isCustomBarActive, tagManager } from "../actions";
import { SessionContext } from "../session";
import CallToAction from "../components/CallToAction";
import "../assets/css/single-post.css";
import rehypeReact from "rehype-react";

//FROM components
import {
  GridContainer,
  Grid,
  Div,
  Header,
  Row,
  Column,
} from "../components/Sections";

export default function Template(props) {
  const { data, pageContext } = props;
  const { session } = React.useContext(SessionContext);
  const post = props.data.markdownRemark;
  const isWindow = () => (window !== undefined ? true : false);
  const isBrowser = typeof window !== `undefined`;
  const allowed = [
    `${post.frontmatter.author ? post.frontmatter.author.toLowerCase() : ""}`,
  ];
  const filtered = Object.keys(twitterUser)
    .filter((key) => allowed.includes(key.toLowerCase()))
    .reduce((obj, key) => {
      obj = twitterUser[key];
      return obj;
    }, {});

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      button: Button,
      "call-to-action": CallToAction,
    },
  }).Compiler;

  const markdownAST = renderAst(post.htmlAst).props.children;
  const sanitizedData = markdownAST?.filter((el) => el.type !== "h1");

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

  const langSwitcher = {
    es: "blog-en-espanol",
    us: "blog",
  };

  //Date Formatter
  function GetFormattedDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    let mes = d.getMonth() + 1;
    let mesName = GetMonth(mes);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let res = "";

    if (pageContext.lang == "es")
      //mes dia, año
      res = mesName + " " + day + ", " + year;
    //mes dia, año
    else res = mesName + " " + day + ", " + year;

    return res;
  }

  //Formatted post date
  let postDate = GetFormattedDate(post.frontmatter.date);

  if (isBrowser) {
    const anchors = document.getElementsByTagName("a");
    Array.from(anchors).forEach((anchor) => {
      const linkRegex = new RegExp("(http)");
      console.log(anchor.href);
      if (
        linkRegex.test(anchor.href) &&
        !anchor.href.includes("4geeks.com") &&
        !anchor.href.includes("4geeksacademy.com")
      ) {
        anchor.rel = "nofollow";
        anchor.target = "_self";
      }
    });
    const tables = document.getElementsByTagName("table");
    Array.from(tables).forEach((table) => {
      let wrapper;
      wrapper = document.createElement("div");
      wrapper.classList.add("table-container");

      if (table) {
        table.parentNode.insertBefore(wrapper, table);

        // move el into wrapper
        wrapper.appendChild(table);
        // insert wrapper before el in the DOM tree
      }
    });
  }

  React.useEffect(() => {
    tagManager("blog_post_rendered", {
      cluster: post?.frontmatter?.cluster,
      language: pageContext?.lang,
    });
  }, []);

  return (
    <>
      <Layout
        type="post"
        seo={data.markdownRemark.frontmatter}
        context={pageContext}
        wordCount={data.markdownRemark.fields.wordCount}
      >
        {/* Container */}
        <GridContainer
          columns_tablet="1"
          gridColumn_tablet="4 / -4"
          columns="1"
          margin={`${
            isCustomBarActive(session) ? "140px 0 0 0" : "90px 0 0 0"
          }`}
        >
          {/* Top cluster */}
          <Div justifyContent="center">
            <Link
              to={`/${pageContext.lang}/${langSwitcher[pageContext.lang]}/${
                post.frontmatter.cluster
              }`}
            >
              <Button
                variant="outline"
                color="black"
                fontSize="13px"
                lineHeight="15px"
                fontWeight="700"
              >
                {post.frontmatter.cluster && post.frontmatter.cluster}
              </Button>
            </Link>
          </Div>

          {/* Title */}
          <Div margin="28px 0 0 0">
            <H1
              type="h1"
              fontSize="40px"
              fontWeight="bold"
              lineHeight="48px"
              textAlign="center"
              style={{ color: "#000000" }}
              fs_lg="30px"
              textShadow="none"
            >
              {post.frontmatter.title}
            </H1>
          </Div>

          {/* Post Date */}
          <Div justifyContent="center">
            <Paragraph
              style={{ letterSpacing: "0.05em" }}
              color={Colors.gray}
              align="center"
              fontSize="14px"
              lineHeight="14px"
            >
              {postDate}
            </Paragraph>
          </Div>

          {/* Realizado Por */}
          <Div color={Colors.gray} justifyContent="center" margin="31px 0 0 0">
            <Paragraph
              color={Colors.gray}
              justifyContent="center"
              fontSize="15px"
              fontWeight="900"
              style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              Realizado por:
            </Paragraph>
          </Div>

          {/* Author */}
          <Div margin="0 0 0 0" justifyContent="center">
            <Paragraph
              color={Colors.gray}
              align="center"
              fontSize="14px"
              lineHeight="14px"
            >
              {post.frontmatter.author}
            </Paragraph>
          </Div>

          {/* Avatar + Main Image */}
          <Div width="100%" justifyContent="center" flex="column">
            {/* Avatar */}
            <Div
              background="#F3F3F3"
              justifyContent="center"
              height="100%"
              align="around"
              display="flex"
              style={{ zIndex: "1" }}
            >
              <LazyLoad scroll={true} height={100} once={true}>
                <RoundImage
                  border="0%"
                  style={{ border: "4px solid white" }}
                  width="75px"
                  height="75px"
                  bsize="contain"
                  position="center"
                  url={filtered.avatar}
                />
              </LazyLoad>
            </Div>

            {/* Main image */}
            <Div
              justifyContent="center"
              margin="0 0 0 0"
              position="absolute"
              transform="translate(0%, 10%)"
              style={{ zIndex: "0" }}
            >
              <LazyLoad scroll={true} height={100} once={true}>
                <RoundImage
                  border="0rem"
                  width="300px"
                  height="320px"
                  width_tablet="390px"
                  width_md="520px"
                  width_lg="760px"
                  bsize="cover"
                  position="center"
                  url={post.frontmatter.image}
                />
              </LazyLoad>
            </Div>
          </Div>

          <Div height="180px" height_tablet="250px"></Div>

          {/* Post Content */}
          <Div margin="100px 0 0 0" background={Colors.white}>
            <Div className="single-post" flexDirection="Column">
              {sanitizedData}
            </Div>
          </Div>
        </GridContainer>
      </Layout>
    </>
  );
}
export const postQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        slug
        title
        author
        wordcount
        date
        excerpt
        visibility
        image
        cluster
        status
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
