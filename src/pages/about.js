import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import * as Mouse from "../components/mouse"
import { design } from "../components/utils"

import Layout from "../components/layout"
import Header from "../components/Header"
import { Title, Desc, Wrap, intWrap, intTitle } from "../components/styles"


const Footer = styled.footer`
  position: fixed;
  color: inherit;
  bottom: 0px;
  right: 0px;

  font-size: 14px;
  font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
  letter-spacing: 1px;
  line-height: 20px;

    padding: var(--nav-padding);
    transition: all 1s ${design.ease};
    pointer-events: all;
    display: block;
    
    @media (max-width: 768px) {
      writing-mode: vertical-lr;
      padding: calc((var(--gutter) - 20px) / 2);
      padding-bottom: var(--nav-padding);
    } 
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
        <Header setClip={setClip} parallax={parallax}/>
        <Wrap>
          <animated.div style={{ transform: parallax.xy.interpolate(intWrap) }}>
            <Title>
              <animated.h1 style={{ transform: parallax.xy.interpolate(intTitle) }}>Alex Bannwarth</animated.h1>
              <h2>Designer & Digital Artist</h2> 
            </Title>
            <hr/>
            <Desc>
              <ul>
                <li><a href="https://www.instagram.com/bannwarth.design/" target='_blank' rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://vimeo.com/user18232035" target='_blank' rel="noopener noreferrer">Vimeo</a></li>
                <li><a href="mailto:alex@bannwarth.design">alex@bannwarth.design</a></li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Desc>
            <hr/>
          </animated.div>
          <Footer>© {new Date().getFullYear()}</Footer>
        </Wrap>
      </Layout>
  )
}

export default About
