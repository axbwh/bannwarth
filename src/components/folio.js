import React, { useRef, useLayoutEffect, createRef, useState } from "react"
import styled from "styled-components"
import Preview from "./preview"
import Scroll from "./scroll"
import Titles from "./titles"
import { animated, useSpring } from "react-spring"
import { romanize } from './utils'

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

const Prev = styled(animated.div)`
  position: absolute;
  width: 60vw;
  height: calc(60vw * 9 / 16);
`
const Date = styled.div`
  position: absolute;
  right: -30px;
  width: 20px;
  overflow: hidden;
  bottom: 0;
  p {
    display: block;
    writing-mode: vertical-lr;
    /* width: 20px; */
    line-height: 20px;
    font-size: 14px;
    font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
    letter-spacing: 2px;
    pointer-events: all;
    margin: 0;
    white-space: nowrap;
    align-self: flex-end;
    text-transform: capitalize;
  }
`

const Tag = styled(Date)`
top: 0;
bottom: unset;
p{
  align-self: flex-start;
}
`
const Roman = styled(Tag)`
right: unset;
left: -30px;
height: 22px;
width: auto;
p{
  align-self: flex-end;
  line-height: 22px;
  font-size: 20px;
  font-variation-settings: "wght" 1000, "wdth" 85, "slnt" 0;
  writing-mode: unset;
}
`


const intDate = (x, y) => `translate3d(${x * 0.055}px,${y * 0.055}px,0)`
const intTitle = (x, y) => `translate3d(${x * 0.085}px,${y *0.085}px,0)`
const intImg = (x, y) => `translate3d(${x * - 0.005}px,${y * - 0.005}px,0)`

const Folio = ({ projects, scroll, parallax }) => {

  const [hovered, set] = useState(null)

  const hoverIn = slug => {
    set(slug)
  }
  const hoverOut = () => {
    set(null)
  }
  
  return (
    <Wrap>
      <Prev style={{ transform: parallax.xy.interpolate(intDate) }}>
        <Date>
          <Scroll scroll={scroll} moveX='true'>
            {projects.map((p, i) => (
              <p key={`date${i}`}>{p.date}</p>
            ))}
          </Scroll>
        </Date>
        <Tag>
          <Scroll scroll={scroll} moveX='true'>
            {projects.map((p, i) => (
              <p key={`tag${i}`}>{p.tag}</p>
            ))}
          </Scroll>
        </Tag>
        <Roman>
          <Scroll scroll={scroll}>
            {projects.map((p, i) => (
              <p key={`roman${i}`}>{romanize(i + 1)}</p>
            ))}
          </Scroll>
        </Roman>
        <Img style={{ transform: parallax.xy.interpolate(intImg) }} >
          <Scroll scroll={scroll} >
            {projects.map((p, i) => {
              const imageData = p.images[0].childImageSharp.fluid
              return (
                <Preview
                  onMouseEnter={() => hoverIn(p.slug)}
                  onMouseLeave={hoverOut}
                  key={`prev${i}`}
                  slug={p.slug}
                  imageData={imageData}
                  parallax={parallax}
                  hovered={hovered}
                />
              )
            })}
          </Scroll>
        </Img>
      </Prev>

      <Titles hoverIn={hoverIn} hoverOut={hoverOut} style={{ transform: parallax.xy.interpolate(intTitle) }} projects={projects} scroll={scroll} />
    </Wrap>
  )
}

export default Folio
