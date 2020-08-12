import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import "./index.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/Header"
import { useSpring, animated } from "react-spring"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  //header colour state changes
  const [headerStyle, setHeaderStyle] = useState("white")

  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 })
  const elementRef = useRef()

  useScrollPosition(
    ({ currPos }) => {
      setElementPosition(currPos)
    },
    [],
    elementRef
  )

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isDark = elementPosition.y + currPos.y < 0
      const shouldBeStyle = isDark ? "dark" : "white"

      if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return

      setHeaderStyle(shouldBeStyle)
    },
    [headerStyle]
  )

  //animation
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
  const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Header color={headerStyle}></Header>
      <section id="about" className="about">
        <div
          class="container"
          onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
        >
          <animated.div
            class="card1"
            style={{ transform: props.xy.interpolate(trans1) }}
          ></animated.div>
          <animated.div
            class="card2"
            style={{ transform: props.xy.interpolate(trans2) }}
          ></animated.div>
          <animated.div
            class="card3"
            style={{ transform: props.xy.interpolate(trans3) }}
          ></animated.div>
          <animated.div
            class="card4"
            style={{ transform: props.xy.interpolate(trans4) }}
          >
            <h1>Andrew Richardson</h1>
            <h2>Freelance Web Developer & Designer based in London.</h2>
          </animated.div>
        </div>
      </section>
      <section id="projects" ref={elementRef} className="projects"></section>
      <section id="work" className="work"></section>
      <section id="contact" className="contact"></section>
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
