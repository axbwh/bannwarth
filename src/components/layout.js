/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import Header from "./header"
import SEO from "./seo"
import "../fonts/fonts.css"

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}

body{
  padding: 0;
  margin: 0;
  font-family: 'Roboto VF';
}
`

const Footer = styled.footer`
  position: fixed;
  right: 30px;
  bottom: 30px;

  color: inherit;

  font-size: 14px;
  font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
  letter-spacing: 1px;
`

const Layout = ({ title, to, children, parallax }) => {
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
      <Header siteTitle={data.site.siteMetadata.title} to={to} parallax={parallax}/>
      <SEO title={title} />
      <GlobalStyle />
      <main>{children}</main>
      {/* <Footer>© {new Date().getFullYear()}</Footer> */}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
