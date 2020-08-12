import React from "react"
import { Link } from "gatsby"
import "./Header.css"

const Header = () => {
  return (
    <header>
      <h2>About</h2>
      <h2>Projects</h2>
      <h2>Work</h2>
      <h2>
        <Link to="/blog">Blog</Link>
      </h2>

      <h2>Contact</h2>
    </header>
  )
}
export default Header
