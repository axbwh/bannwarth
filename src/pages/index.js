import React, { useRef } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Nav from '../components/nav'


const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Home</h1>
      <Nav
        to="/about"
      >
        About
      </Nav>
    </Layout>
  )
}

export default IndexPage
