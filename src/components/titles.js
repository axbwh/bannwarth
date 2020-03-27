import React from "react"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"
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
    font-variation-settings: "wght" 1000, "wdth" 85, "slnt" 0;
    letter-spacing: 1vw;
    padding-left: 3vw;
    margin: 0px;
    color: #000;
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


const Titles = ({ projects, scroll, hoverIn, hoverOut, ...props }) => (
  <Wrap {...props}>
    <Title scroll={scroll} moveX="true">
      {projects.map((p, i) => (
        <a key={`hidden${i}`} href={`#${p.slug}`}>
          {p.title}
        </a>
      ))}
    </Title>

    <Mask>
      <Title scroll={scroll} moveX="true">
        {projects.map((p, i) => (
          <Link
            to={`/${p.slug}`}
            exit={{ length: 0.75, zIndex: 0 }}
            onClick={Mouse.set}
            entry={{ length: 0 }}
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

export default Titles
