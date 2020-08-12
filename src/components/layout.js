import React from "react"
import { Link } from "gatsby"
import Header from "./Header"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
