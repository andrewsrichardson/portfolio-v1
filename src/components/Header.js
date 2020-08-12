import React from "react"
import { Link } from "gatsby"
import "./Header.css"

const Header = ({ color }) => {
  return (
    <header>
      <h2 className={color}>About</h2>
      <h2 className={color}>Projects</h2>
      <h2 className={color}>Work</h2>
      <h2 className={color}>
        <Link to="/blog">Blog</Link>
      </h2>

      <h2 className={color}>Contact</h2>
    </header>
  )
}
export default Header
