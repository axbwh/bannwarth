import React from "react"
import * as Mouse from "./mouse"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"

const ease = "cubic-bezier(0.075, 0.82, 0.165, 1)"

let NavLink = styled(Link)`
position: fixed;
top: 0;
right: 0;
text-decoration: none;
color: inherit;
font-size: 14px;

padding: 30px;
transition: all 1s ${ease};
font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
letter-spacing: 1px;
pointer-events: all;

&:hover {
  font-variation-settings: "wght" 1100, "wdth" 95, "slnt" 0;
  letter-spacing: 2px;
}
`

const Nav = ({ children, to, above }) => (
    <NavLink
      to={to}
      exit={{ length: 0.75, zIndex : above ? 2 : 0}}
      onClick={Mouse.set}
      entry={{ length: 0 }}
    >
      {children}
    </NavLink>
)

export default Nav
