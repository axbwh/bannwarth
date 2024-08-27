import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import * as Mouse from "../components/mouse"
import { design } from "../components/utils"

import Layout from "../components/layout"
import Header from "../components/header"
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
        <Header setClip={setClip} parallax={parallax} color={design.black}/>
        <Wrap>
          <animated.div style={{ transform: parallax.xy.interpolate(intWrap) }}>
            <Title>
              <animated.h1 style={{ transform: parallax.xy.interpolate(intTitle) }}>Alex Bannwarth</animated.h1>
              <h2>Worldbuilder. 3D Artist. Creative Director</h2> 
            </Title>
            <hr/>
            <Desc>
              <ul>
                <li><a href="https://www.linkedin.com/in/alex-bannwarth/" target='_blank' rel="noopener noreferrer">Linkedin</a></li>
                <li><a href="https://www.artstation.com/bannwarth" target='_blank' rel="noopener noreferrer">Artstation</a></li> 
                <li><a href="mailto:alex@bannwarth.design">alex@bannwarth.design</a></li>
              </ul>
              <div>
                <p>I’m Alex, a 3D Artist and Designer, currently based in Windy Wellington, New Zealand.</p>
                <p>My goal in life is to create cool stuff and bring to life stories and worlds.</p>
                <p>I've been lucky to work in heaps of different creative disciplines from creative strategy & branding through to design, illustration, sculpture, animation and development. I love learning and perfecting skills & software to tackle fresh creative challenges.</p>
                <p>Whether through 3D Printing, Game Engines, or Web, I'm just keen to build immersive experiences.</p>
                <p>If you reckon I'd be a good fit for your project, I'm available for freelance or hire.</p>
              </div>
            </Desc>
            <hr/>
          </animated.div>
          <Footer>© {new Date().getFullYear()}</Footer>
        </Wrap>
      </Layout>
  )
}

export default About
