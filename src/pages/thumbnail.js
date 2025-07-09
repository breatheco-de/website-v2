import React, { useState, useEffect } from "react";
import "../assets/css/single-post.css";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import axios from "axios";
import { H1 } from "../components/Heading";

const options = {
  headers: {
    Academy: process.env.GATSBY_BLOG_ACADEMY_ID,
    Authorization: "Token " + process.env.GATSBY_BLOG_ACADEMY_TOKEN,
  },
};

const getPost = async (slug) => {
  try {
    const _resp = await axios.get(
      process.env.GATSBY_BREATHECODE_HOST + `/registry/asset/${slug}`,
      options
    );
    if (_resp.status !== 200) {
      // Log error but return null instead of throwing
      if (typeof logger !== 'undefined') logger.error(_resp.data);
      return null;
    }
    return _resp.data;
  } catch (e) {
    // Log error but return null instead of throwing
    if (typeof logger !== 'undefined') logger.error(e);
    return null;
  }
};

const ThumbnailPage = () => {
  const isWindow = () => (window !== undefined ? true : false);

  const data = useStaticQuery(graphql`
    query ThumbnailQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    console.log("looking for slug: " + slug);
    const posts = data.allMarkdownRemark.edges;
    const _post = posts.find(({ node }) => node.fields.slug == slug);
    if (_post) setPost(_post.node);
    else getPost(slug).then((_p) => setPost(_p));

    if (isWindow) document.body.className = "page-thumbnail";
  }, [data]);

  const url = `/images/bg/random-bg${Math.floor(Math.random() * 4) + 1}.png`;

  const Div = styled.div`
    background: url("${url}");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  return (
    <Div>
      <H1
        type="h1"
        fontSize="40px"
        width="90%"
        fontWeight="bold"
        textAlign="center"
        margin="0 auto"
        lineHeight="normal"
      >
        {post
          ? post.frontmatter?.title || post.title
          : "No post found or failed to load post."}
      </H1>
    </Div>
  );
};

export default ThumbnailPage;
