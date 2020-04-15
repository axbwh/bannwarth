import React from "react"
import styled from "styled-components"
import Link from "./link"
import { animated } from "react-spring"
import Slide from "./slide"


const Title = styled(Slide)`
  height: 1em;
  a {
    text-decoration: none;
    white-space: nowrap;
    text-transform: uppercase;
    min-width: 80vw;
    font-size: 6vw;
    line-height: 1em;
    padding-left: 3vw;
    padding-bottom: 30px;
    margin: 0px;
    color: inherit;
    pointer-events: all;
    opacity: 0.2;
    @media (max-width: 768px) {
      margin-top: calc(var(--nav-size));
    }
    font-weight: bold;
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
  position: absolute;
  display: inline-block;
  padding-left: 30px;
  z-index: 5;
  
  @media (max-width: 768px) {
    position: relative;
    margin-bottom: 20px;
    margin-top: 15px;
    
  }
`

const Titles = ({ projects, spring, hoverIn, hoverOut, hover, setClip, ...props }) => {
  let style = {
    fontVariationSettings: hover
      .interpolate({
        range: [0, 1],
        output: [1200, 680],
      })
      .interpolate(h => `"wght" ${h}, "wdth" 85, "slnt" 0`),
    letterSpacing: hover
      .interpolate({
        range: [0, 1],
        output: [1, 0.7],
      })
      .interpolate(h => `${h}vw`),
  }

  return (
    <Wrap {...props}>
      <Title style={style} spring={spring} moveX="true" doesSkew="true">
        {projects.map((p, i) => (
          <a key={`hidden${i}`} href={`#${p.slug}`}>
            {p.title}
          </a>
        ))}
      </Title>
      <Mask>
        <Title style={style} spring={spring} moveX="true" doesSkew="true">
          {projects.map((p, i) => (
            <Link
              to={`/${p.slug}`}
              key={`title${i}`}
              onMouseEnter={() => hoverIn(p.slug)}
              onMouseLeave={hoverOut}
              setClip={setClip}
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