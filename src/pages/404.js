import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import * as Mouse from "../components/mouse"
import { design } from "../components/utils"

import Layout from "../components/layout"
import Header from "../components/Header"
import { Title, Desc, Wrap, intWrap, intTitle } from "../components/styles"

const Error = styled(Desc)`
  justify-content : center;
`

const NotFoundPage = ({location : {state}}) => {
  const [scroll, setScroll] = useState({top: 0, speed: 0})
  const [parallax, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  
  const [clip, setClip] = useSpring( () => ({trim: Mouse.calc(0), mask: Mouse.calc(state?.linked ? 0 : Mouse.pos.r)}))
  

  return (
      <Layout title='404: Not found' clip={clip} setClip={setClip} color={design.black} setScroll={setScroll} setParallax={setParallax}>
        <Header setClip={setClip} parallax={parallax} color={design.black}/>
          <Wrap>
            <animated.div style={{ transform: parallax.xy.interpolate(intWrap) }}>
              <Title>            
                  <animated.h1 style={{ transform: parallax.xy.interpolate(intTitle) }}>404</animated.h1>
                  <h2>Not Found</h2>
              </Title>
              <hr/>

              <Error>
                <p><span role='img' aria-label="sadface">😢</span> There is nothing here <span role='img' aria-label="sadface">😢</span></p>
              </Error>
              <hr/>
            </animated.div>
          </Wrap>
      </Layout>
  )
}


export default NotFoundPage
