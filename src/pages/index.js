import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
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
  const trans2 = (x, y) => `translate3d(${x / 8 - 40}px,${y / 8 + 50}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  return (
    <Layout title={siteTitle}>
      <SEO title="Portfolio" />
      <Header color={headerStyle}></Header>
      <div className="email">
        <a href="mailto:and.richardson@live.co.uk">Email Me!</a>
      </div>
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
            <h2>Solo technology consultant based in London.</h2>
            <h2> Open to new opportunites.</h2>
          </animated.div>
        </div>
        <div className="arrow"></div>
      </section>

      <section id="work" ref={elementRef} className="work">
        <h2>Projects</h2>
        <div className="work-content">
          <div className="machine-music">
            <div className="data-wrapper">
              <h3>
                <span className="highlight">20sos</span>
              </h3>
              <p>Designed/ Developed / Co-Own</p>
              <div>
                <a
                  href="https://github.com/andrewsrichardson/quarter-life-frontend"
                  target="_blank"
                  role="button"
                  aria-label="link to 20sos repo"
                  rel="noreferrer"
                >
                  <Image
                    fixed={data.github.childImageSharp.fixed}
                    alt="github-mm"
                  ></Image>
                </a>
              </div>
            </div>
            <a
              href="https://20sos.co.uk"
              target="_blank"
              role="button"
              aria-label="link to 20sos"
              rel="noreferrer"
            >
              <Image fixed={data.sos.childImageSharp.fixed} alt="20sos" />
            </a>
          </div>
          <div id="machine-music" className="machine-music">
            <div className="data-wrapper">
              <h3>
                <span className="highlight">Machine Music</span>
              </h3>
              <p>Designed/ Developed</p>
              <div>
                <a
                  href="https://github.com/andrewsrichardson/machine-music"
                  target="_blank"
                  role="button"
                  aria-label="link to machine music repo"
                  rel="noreferrer"
                >
                  <Image
                    fixed={data.github.childImageSharp.fixed}
                    alt="github-mm"
                  ></Image>
                </a>
              </div>
            </div>
            <a
              href="https://andrewsrichardson.github.io/machine-music"
              target="_blank"
              role="button"
              aria-label="link to machine music repo"
              rel="noreferrer"
            >
              <Image
                fixed={data.machine_music.childImageSharp.fixed}
                alt="Machine Music"
              />
            </a>
          </div>
          <div className="trust-this-feast">
            <div className="data-wrapper">
              <h3>
                <span className="highlight-orange">Trust This Feast</span>
              </h3>
              <p>Designed/ Developed</p>
              <div>
                <a
                  href="https://github.com/andrewsrichardson/food-blog"
                  target="_blank"
                  role="button"
                  aria-label="link to machine music repo"
                  rel="noreferrer"
                >
                  <Image
                    fixed={data.github.childImageSharp.fixed}
                    alt="github-mm"
                  ></Image>
                </a>
              </div>
            </div>
            <a
              href="https://trustthisfeast.com"
              target="_blank"
              role="button"
              aria-label="link to machine music repo"
              rel="noreferrer"
            >
              <Image
                fixed={data.trust_this_feast.childImageSharp.fixed}
                alt="Trust This Feast"
              />
            </a>
          </div>
        </div>
      </section>
      <section id="experience" className="experience">
        <div className="vertical">
          {" "}
          <div className="horizontal">
            <div className="content">
              <div className="work-experience">
                <h3>
                  <span className="highlight">Accenture</span>
                </h3>
                <h4>
                  Full Stack Developer <i>1 Year</i>
                </h4>
              </div>
              <div className="university">
                <h3>
                  <span className="highlight">University of Reading</span>
                </h3>
                <h4>
                  BSc Computer Science <i>2:1</i>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="skills">
          <h2>Skills</h2>
          <ul>
            <li>Website Development</li>
            <li>API / Backend Development</li>
            <li>Technical Consulting</li>
            <li>eCommerce</li>
            <li>Static Sites</li>
            <li>Project Scoping</li>
            <li>UX Design</li>
          </ul>
          <h2>Technologies</h2>
          <p>
            React (Gatsby, Next), CMS, Shopify (+ anything else you need to
            perfect your project)
          </p>
          <p style={{ textAlign: "center", margin: "0px " }}>
            Got a great idea?{" "}
            <a
              style={{ textDecoration: "underline dotted" }}
              className="underline"
              href="mailto:and.richardson@live.co.uk"
            >
              Email Me!
            </a>
          </p>
        </div>
      </section>
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
    sos: file(absolutePath: { regex: "/20sos-splash.png/" }) {
      childImageSharp {
        fixed(width: 700, height: 342) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    machine_music: file(absolutePath: { regex: "/mm-splash.png/" }) {
      childImageSharp {
        fixed(width: 700, height: 342) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    trust_this_feast: file(absolutePath: { regex: "/ttf-splash.png/" }) {
      childImageSharp {
        fixed(width: 700, height: 342) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    github: file(absolutePath: { regex: "/github.png/" }) {
      childImageSharp {
        fixed(width: 30, height: 30) {
          ...GatsbyImageSharpFixed
        }
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
