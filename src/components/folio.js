import React, { useRef, useLayoutEffect, createRef, useState } from "react"
import styled from "styled-components"
import Preview from "./preview"
import Scroll from "./scroll"
import Titles from "./titles"
import Link from './link'
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
  p, a {
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
    text-decoration: none;
    color: inherit;
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

const View = styled(Date)`
left: -30px;
right: unset;
a{
  font-variation-settings: unset;
  letter-spacing: unset;
  text-transform: uppercase;
}
`


const intDate = (x, y) => `translate3d(${x * 0.055}px,${y * 0.055}px,0)`
const intTitle = (x, y) => `translate3d(${x * 0.085}px,${y *0.085}px,0)`
const intImg = (x, y) => `translate3d(${x * - 0.005}px,${y * - 0.005}px,0)`
const intView = (f) => `"wght" ${f}, "wdth" 85, "slnt" 0`

const Folio = ({ projects, scroll, parallax }) => {

  const [hovered, set] = useState(null)

  const [props, setProps] = useSpring(() => ({ factor: 0, config: { mass: 20, tension: 300, friction: 140 } }))
  

  const hoverIn = slug => {
    set(slug)
    setProps({factor : 1})
  }
  const hoverOut = () => {
    set(null)
    setProps({factor : 0})
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
        <View>
          <Scroll style={{
            fontVariationSettings:
            props.factor.interpolate({
              range: [0, 1],
              output: [350, 1000]
            }).interpolate(intView),
            letterSpacing: props.factor.interpolate({
              range: [0, 1],
              output: [2, 4]
            }).interpolate(f => `${f}px`)
          }}
          
          scroll={scroll} moveX='true'>
          {projects.map((p, i) => (
          <Link
            to={`/${p.slug}`}
            key={`view${i}`}
            onMouseEnter={() => hoverIn(p.slug)}
            onMouseLeave={hoverOut}            
          >
            {p.prompt}
          </Link>
        ))}
          </Scroll>
        </View>
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
