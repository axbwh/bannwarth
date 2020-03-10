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


const About = ({}) => {
  return (
    <Trans black>
      <Layout title='About'>
        {/* <Content>
        </Content> */}
      </Layout>
    </Trans>
  )
}

export default About
