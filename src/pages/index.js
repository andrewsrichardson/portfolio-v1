import React, { useState } from "react"
import { graphql } from "gatsby"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import "./index.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/Header"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const [headerStyle, setHeaderStyle] = useState("white")

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isDark = currPos.y < -1420

      const shouldBeStyle = isDark ? "dark" : "white"

      if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return

      setHeaderStyle(shouldBeStyle)
    },
    [headerStyle]
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Header color={headerStyle}></Header>
      <section className="about"></section>
      <section className="projects"></section>
      <section className="work"></section>
      <section className="contact"></section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
