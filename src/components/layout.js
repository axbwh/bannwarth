/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import Header from "./header"
import SEO from "./seo"
import "../fonts/fonts.css"
import Trans from "./trans"
import { design } from "./utils"

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}

body{
  padding: 0;
  margin: 0;
  font-family: 'Roboto VF';
  background-color:${design.black.bg};
}
`



const Layout = ({ title, to, children, parallax, setClip, ...rest }) => {
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
      <SEO title={title} />
      <GlobalStyle />
      <Trans setClip={setClip} {...rest}>
        <Header siteTitle={data.site.siteMetadata.title} setClip={setClip} to={to} parallax={parallax}/>
        <main>
        {children}
        </main>
      </Trans>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
