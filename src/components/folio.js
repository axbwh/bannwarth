import React, { useRef, useLayoutEffect, createRef, useState } from "react"
import styled from "styled-components"
import Preview from "./preview"
import Scroll from "./scroll"
import Titles from "./titles"
import { animated } from "react-spring"

const Wrap = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  z-index: 100;
`

const Img = styled(animated.div)`
  position: relative;
  overflow: hidden;
`

const Prev = styled.div`
  position: absolute;
  width: 60vw;
  height: calc(60vw * 9 / 16);
`
const Date = styled(animated.div)`
  position: absolute;
  right: -30px;
  width: 20px;
  overflow: hidden;
  bottom: 0;
  p {
    display: block;
    writing-mode: vertical-lr;
    width: 20px;
    line-height: 20px;
    font-size: 14px;
    font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
    letter-spacing: 1px;
    pointer-events: all;
    margin: 0;
    white-space: nowrap;
    align-self: flex-end;
  }
`


const intDate = (x, y) => `translate3d(${x / 15}px,${y / 15}px,0)`
const intTitle = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const intImg = (x, y) => `translate3d(${x / 20}px,${y / 20}px,0)`

const Folio = ({ projects, scroll, parallax }) => {
  
  return (
    <Wrap>
      <Prev>
        <Date style={{ transform: parallax.xy.interpolate(intDate) }} >
          <Scroll scroll={scroll} moveX='true'>
            {projects.map((p, i) => (
              <p key={`date${i}`}>{p.date}</p>
            ))}
          </Scroll>
        </Date>
        <Img style={{ transform: parallax.xy.interpolate(intImg) }} >
          <Scroll scroll={scroll}>
            {projects.map((p, i) => {
              const imageData = p.images[0].childImageSharp.fluid
              return (
                <Preview key={`prev${i}`} slug={p.slug} imageData={imageData} />
              )
            })}
          </Scroll>
        </Img>
      </Prev>

      <Titles style={{ transform: parallax.xy.interpolate(intTitle) }} projects={projects} scroll={scroll} />
    </Wrap>
  )
}

export default Folio
