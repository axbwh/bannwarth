import React from "react"
import styled from "styled-components"
import Link from "./link"
import Scroll from './scroll'
import * as Mouse from "./mouse"
import { animated } from 'react-spring'

const navSize = 80;

const Title = styled(Scroll)`
a {
    text-decoration: none;
    white-space: nowrap;
    text-transform: uppercase;
    min-width: 80vw;
    font-size: 6vw;
    line-height: 1em;
    height: fit-content;
    padding-left: 3vw;
    padding-bottom: 30px;
    margin: 0px;
    color: inherit;
    pointer-events: all;
    opacity: 0.2;
    @media (max-width: 768px){
      margin-top: calc(${ navSize }px);
    }
  }
`

const Mask = styled.div`
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 0px;
  height: 100vh;
  width: calc(80vw + 24px);
  a {
    /* mix-blend-mode: saturation; */
    opacity: 1;
  }
`
const Wrap = styled(animated.div)`
  align-self: flex-start;
  /* justify-self: center; */
  position: relative;
  display: inline-block;
  padding-left: 30px;
  z-index: 5;
  @media (min-width: 768px){
      position: absolute;
    }
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
