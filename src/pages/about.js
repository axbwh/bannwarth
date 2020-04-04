import React from "react"
import Layout from "../components/layout"
import Trans from '../components/trans'

import styled from "styled-components"

let Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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


const About = () => {
  return (
    <Trans black>
      <Layout title='About'>
        <Content>
          <Footer>© {new Date().getFullYear()}</Footer>
        </Content>
      </Layout>
    </Trans>
  )
}

export default About
