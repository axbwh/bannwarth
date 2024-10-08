/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useLayoutEffect } from "react"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components"


import SEO from "./seo"
import "../fonts/fonts.css"
import Trans from "./trans"
import { design } from "./utils"
import { GlobalStateProvider } from "./GlobalStateContext"

const GlobalStyle = createGlobalStyle`
:root{
  /* touch-action: pan-x pan-y; */
  height: 100%;
  --nav-padding: 30px;
  --nav-size: calc( var(--nav-padding) * 2 + 19px);
  --gutter: 20vw;
  --vh: 1vh;

  @media (max-width: 768px) {
    --nav-padding: 15px;
    --gutter: 40px;
  }

}
*{
  box-sizing: border-box;
}
.simplebar-track{
  cursor: pointer;
  pointer-events: auto;
}
.simplebar-scrollbar::before {
  background: grey;
  opacity: 1;
}
.simplebar-scrollbar.simplebar-visible:before {
    opacity: 1;
    transition: opacity 0s linear;
    right: 4px;
    border-radius: 0px;
    //outline: 1px solid ${design.black.fg};
}

body{
  padding: 0;
  margin: 0;
  font-family: 'Roboto VF';
  background-color:${design.black.bg};
}
`



const Layout = ({ title, description, to, top, children, parallax, setClip, ...rest }) => {

  useLayoutEffect(() => {
    let vh = 0;
    const handleHeight = () => {
      const vHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const vWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if(vh != vHeight * 0.01){
        vh = vHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    }

    handleHeight()
    window.addEventListener("resize", handleHeight)
    window.addEventListener("gestureend", handleHeight)
    // window.addEventListener('gesturestart', function (e) {
    //   e.preventDefault();
    // });
    return () => {
      window.removeEventListener("resize", handleHeight)
      window.addEventListener("gestureend", handleHeight)
    }
  }, [])

  return (
    <>    
      <SEO title={title} description={description}/>
      <GlobalStyle />
      <GlobalStateProvider>
        <Trans setClip={setClip} {...rest}>
          <main>
          {children}
          </main>
        </Trans>
      </GlobalStateProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
