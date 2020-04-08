import React, { useState } from "react"
import Layout from "../components/layout"
import Trans from '../components/trans'
import {useSpring} from 'react-spring'

import styled from "styled-components"
import { design } from "../components/utils"

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
let scrollTop = 0

const About = () => {
  const [scroll, setScroll] = useState({top: scrollTop, speed: 0})
  const [parallax, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  return (
    <Trans color={design.black} setScroll={setScroll} setParallax={setParallax}>
      <Layout title='About'>
        <Content>
          <Footer>© {new Date().getFullYear()}</Footer>
        </Content>
      </Layout>
    </Trans>
  )
}

export default About
