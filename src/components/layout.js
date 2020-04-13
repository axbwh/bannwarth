/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components"

import Header from "./header"
import SEO from "./seo"
import "../fonts/fonts.css"
import Trans from "./trans"
import { design } from "./utils"

const GlobalStyle = createGlobalStyle`
:root{
  --nav-padding: 30px;
  --nav-size: calc( var(--nav-padding) * 2 + 19px);

  @media (max-width: 768px) {
    --nav-padding: 15px;
  }

}
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



const Layout = ({ title, to, top, children, parallax, setClip, ...rest }) => {
  return (
    <>    
      <SEO title={title} />
      <GlobalStyle />
      <Trans setClip={setClip} {...rest}>
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
