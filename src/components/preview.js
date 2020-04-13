import React from "react"
import styled from "styled-components"
import Link from "./link"
import { animated } from "react-spring"
import Thumbnail from "./thumbnail"
import Slide from './slide'
import { romanize, design } from './utils'
import Scroll from './scroll'

const Img = styled(animated.div)`
  position: relative;
  overflow: hidden;
`

const Prev = styled(animated.div)`
  position: relative;
  display: block;
  width: 60vw;
  height: calc(60vw * 9 / 16);
  @media (max-width: 768px) {
    width: calc(100vw - 80px);
    height: calc(100vh - var(--nav-size) - 6vw - 10px);
  }
`
const Date = styled.div`
  position: absolute;
  right: -30px;
  width: 20px;
  overflow: hidden;
  bottom: 0;

  p,
  a {
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
  p {
    align-self: flex-start;
  }
`
const Roman = styled(Tag)`
  @media (max-width: 768px) {
    display: none;
  }
  right: unset;
  left: -30px;
  height: 22px;
  width: auto;
  p {
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
  @media (max-width: 768px) {
    display: none;
  }
  a {
    font-variation-settings: unset;
    letter-spacing: unset;
    text-transform: uppercase;
  }
`
const intImg = (x, y) => `translate3d(${x * -0.005}px,${y * -0.005}px,0)`
const intView = f => `"wght" ${f}, "wdth" 85, "slnt" 0`

const Preview = ({ projects, spring, scroll, parallax, hoverIn, hoverOut, hover, hovered, setClip, ...props }) => (
  <Prev {...props}>
    <Date>
      <Slide spring={spring} moveX="true">
        {projects.map((p, i) => (
          <p key={`date${i}`}>{p.date}</p>
        ))}
      </Slide>
    </Date>
    <Tag>
      <Slide spring={spring} moveX="true">
        {projects.map((p, i) => (
          <p key={`tag${i}`}>{p.tags[0]}</p>
        ))}
      </Slide>
    </Tag>
    <Roman>
      <Slide spring={spring}>
        {projects.map((p, i) => (
          <p key={`roman${i}`}>{romanize(i + 1)}</p>
        ))}
      </Slide>
    </Roman>
    <View>
      <Slide
        style={{
          fontVariationSettings: hover
            .interpolate({
              range: [0, 1],
              output: [350, 1000],
            })
            .interpolate(intView),
          letterSpacing: hover
            .interpolate({
              range: [0, 1],
              output: [2, 4],
            })
            .interpolate(f => `${f}px`),
        }}
        spring={spring}
        moveX="true"
      >
        {projects.map((p, i) => (
          <Link
            to={`/${p.slug}`}
            key={`view${i}`}
            onMouseEnter={() => hoverIn(p.slug)}
            onMouseLeave={hoverOut}
            setClip={setClip}
          >
            {p.prompt}
          </Link>
        ))}
      </Slide>
    </View>
    <Img style={{ transform: parallax.xy.interpolate(intImg) }}>
      <Scroll scroll={scroll}>
        {projects.map((p, i) => {
          const imageData = p.images[0].childImageSharp.fluid
          return (
            <Thumbnail
              onMouseEnter={() => hoverIn(p.slug)}
              onMouseLeave={hoverOut}
              key={`prev${i}`}
              slug={p.slug}
              imageData={imageData}
              parallax={parallax}
              hovered={hovered}
              setClip={setClip}
            />
          )
        })}
      </Scroll>
    </Img>
  </Prev>
)

export default Preview
