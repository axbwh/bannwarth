import React from "react"
import styled from "styled-components"
import Link from "./link"
import Scroll from './scroll'
import * as Mouse from "./mouse"
import { animated } from 'react-spring'


const Title = styled(Scroll)`
  position: absolute;
a {
    text-decoration: none;
    white-space: nowrap;
    text-transform: uppercase;
    min-width: 80vw;
    font-size: 6vw;
    line-height: 0.9em;
    /* font-variation-settings: "wght" 1000, "wdth" 85, "slnt" 0; */
    /* letter-spacing: 1vw; */
    padding-left: 3vw;
    margin: 0px;
    color: inherit;
    /* text-shadow: 0 1px 100px rgba(255,255,255,0.12), 0 1px 50px rgba(255,255,255,0.12); */
    pointer-events: all;
    opacity: 0.2;
  }
`

const Mask = styled.div`
  display: flex;
  overflow: hidden;
  position: absolute;
  height: 100vh;
  width: calc(80vw + 24px);
  a {
    /* mix-blend-mode: saturation; */
    opacity: 1;
  }
`
const Wrap = styled(animated.div)`
  align-self: flex-start;
`


const Titles = ({ projects, scroll, hoverIn, hoverOut, hover, ...props }) => { 

  let style = {
    fontVariationSettings: hover
      .interpolate({
        range: [0, 1],
        output: [1200, 800],
      })
      .interpolate(h => `"wght" ${h}, "wdth" 85, "slnt" 0`),
      letterSpacing: hover
      .interpolate({
        range: [0, 1],
        output: [1, 0.7],
      })
      .interpolate(h => `${h}vw`)
  }

 return (
  <Wrap {...props}>
    <Title style={style} scroll={scroll} moveX="true">
      {projects.map((p, i) => (
        <a key={`hidden${i}`} href={`#${p.slug}`}>
          {p.title}
        </a>
      ))}
    </Title>

    <Mask>
      <Title
        style={{...style}}
        scroll={scroll}
        moveX="true"
      >
        {projects.map((p, i) => (
          <Link
            to={`/${p.slug}`}
            key={`title${i}`}
            onMouseEnter={() => hoverIn(p.slug)}
            onMouseLeave={hoverOut}
          >
            {p.title}
          </Link>
        ))}
      </Title>
    </Mask>
  </Wrap>
)
        }

export default Titles
