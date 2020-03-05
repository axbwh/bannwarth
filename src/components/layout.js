/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, {createGlobalStyle} from "styled-components"

import Header from "./header"
import '../fonts/fonts.css'

const GlobalStyle = createGlobalStyle`body{
  padding: 0;
  margin: 0;
  font-family: 'Roboto VF';
}
`

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

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <GlobalStyle/>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}
          {` `}
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
