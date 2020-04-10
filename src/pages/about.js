import React, { useState } from "react"
import Layout from "../components/layout"
import * as Mouse from '../components/mouse'
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

const About = ({location : {state}}) => {
  const [scroll, setScroll] = useState({top: scrollTop, speed: 0})
  const [parallax, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  
  const [clip, setClip] = useSpring( () => ({trim: Mouse.calc(0), mask: Mouse.calc(state?.linked ? 0 : Mouse.pos.r)}))
  

  return (
      <Layout title='About' clip={clip} setClip={setClip} color={design.black} setScroll={setScroll} setParallax={setParallax}>
        <Content>
          <Footer>© {new Date().getFullYear()}</Footer>
        </Content>
      </Layout>
  )
}

export default About
