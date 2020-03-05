import React from "react"
import * as Mouse from "./mouse"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"

const ease = "cubic-bezier(0.075, 0.82, 0.165, 1)"

let Navwrap = styled.div`
  position: fixed;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
  pointer-events: none;

  a {
    text-decoration: none;
    color: inherit;
    padding: 30px;
    transition: all 1s ${ease};
    font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
    writing-mode: vertical-rl;
    text-transform: uppercase;
    letter-spacing: 1px;
    pointer-events: all;
  }

  a:hover {
    font-variation-settings: "wght" 1100, "wdth" 95, "slnt" 0;
    letter-spacing: 2px;
  }
`

const Nav = ({ children, to }) => (
  <Navwrap>
    <Link
      to={to}
      exit={{ length: 0.75 }}
      onClick={Mouse.set}
      entry={{ length: 0 }}
    >
      {children}
    </Link>
  </Navwrap>
)

export default Nav
