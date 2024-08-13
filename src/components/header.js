import Link from "./link"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { design } from './utils'
import { useStaticQuery, graphql } from "gatsby"

let Nav = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 10;
  pointer-events: none;
  background-color: ${props => props.color.bg};

  a {
    text-decoration: none;
    color: inherit;

    font-size: 14px;
    font-variation-settings: "wght" 1100, "wdth" 95, "slnt" 0;
    
    letter-spacing: 2px;

    padding: var(--nav-padding) calc(var(--nav-padding)*2);
    @media (max-width: 768px) {
      padding: var(--nav-padding);
    }   
    transition: all 1s ${design.ease};
    pointer-events: all;

    &:hover {
      font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
      letter-spacing: 1px;
    }
  }
`
const Abs = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`

const Header = ({ to = "/", setClip, top, color= design.white , children }) => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`)
  const siteTitle = data.site.siteMetadata.title

  return (
    <Abs>
      <Nav color={color}>
        {top ? <a href={`#${top}`} title='Top of Page'>{siteTitle}</a> :
        <Link
          to={'/'}
          setClip={setClip}
        >
          {siteTitle}
        </Link>
        }

        <Link
          setClip={setClip}
          to={to}
        >
          {to === "/about" ? "About Me" : "Work"}
        </Link>
      </Nav>
      {children}
    </Abs>
)}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
