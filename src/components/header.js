import Link from "./link"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const ease = "cubic-bezier(0.075, 0.82, 0.165, 1)"

let Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 10;

  a {
    text-decoration: none;
    color: inherit;

    font-size: 14px;
    font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
    letter-spacing: 1px;

    padding: 30px;
    transition: all 1s ${ease};
    pointer-events: all;

    &:hover {
      font-variation-settings: "wght" 1100, "wdth" 95, "slnt" 0;
      letter-spacing: 2px;
    }
  }
`

const Header = ({ siteTitle, to = "/", setClip }) => {
  return (
  <header>
    <Nav>
      <Link
        to={'/'}
        setClip={setClip}
      >
        {siteTitle}
      </Link>

      <Link
        setClip={setClip}
        to={to}
      >
        {to === "/about" ? "About" : "Work"}
      </Link>
    </Nav>
  </header>
)}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
