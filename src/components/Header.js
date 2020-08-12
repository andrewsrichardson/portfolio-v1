import React from "react"
import { Link } from "gatsby"
import { Link as LocalLink, animateScroll as scroll } from "react-scroll"
import "./Header.css"

const Header = ({ color }) => {
  return (
    <header>
      <h2 className={color}>
        <LocalLink
          activeClass="active white"
          to="about"
          spy={true}
          smooth={true}
          duration={400}
        >
          About
        </LocalLink>
      </h2>
      <h2 className={color}>
        <LocalLink
          activeClass="active dark"
          to="projects"
          spy={true}
          smooth={true}
          duration={400}
        >
          Projects
        </LocalLink>
      </h2>
      <h2 className={color}>
        <LocalLink to="work" spy={true} smooth={true} duration={400}>
          Work
        </LocalLink>
      </h2>
      <h2 className={color}>
        <Link to="/blog">Blog</Link>
      </h2>
    </header>
  )
}
export default Header
