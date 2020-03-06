import Link from "gatsby-plugin-transition-link"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import * as Mouse from "./mouse"

const ease = "cubic-bezier(0.075, 0.82, 0.165, 1)"

let Logo = styled(Link)`
  position: fixed;
  top: 0;
  left: 0;
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

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <h1 style={{ margin: 0 }}>
        <Logo
          to="/"
          exit={{ length: 0.75, zIndex: 2}}
          onClick={Mouse.set}
          entry={{ length: 0 }}
        >{siteTitle}
        </Logo>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
