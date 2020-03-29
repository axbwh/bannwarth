import React from "react"
import * as Mouse from "./mouse"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"
import Image from "gatsby-image"
import { animated, useSpring, interpolate } from "react-spring"

const Project = styled(Link)`
  width: 100%;
  pointer-events: auto;
  overflow: hidden;
  display: block;
  position: relative;
  &:not(:last-child) {
    padding-bottom: 10vw;
  }
`

const int = (x, y) => `translate3d(${x * -0.03}px,${y * -0.03}px,0)`

const Preview = ({ slug, title, imageData, parallax, hovered, ...props }) =>{ 
  
  const [hover, set] = useSpring(() => ({ val: 0, config: { mass: 1, tension: 280, friction: 120 } }))
  
  set({val: hovered === slug ? 1 : 0})

  return (
    <Project
      to={`/${slug}`}
      exit={{ length: 0.75, zIndex: 0 }}
      onClick={Mouse.set}
      entry={{ length: 0 }}
      {...props}
    >
      <animated.div style={{ transform: parallax.xy.interpolate(int) }}>
        <animated.div
          style={{
            transform: hover.val.interpolate({
              range: [0, 1],
              output: [1.05, 1.01]
            }).interpolate(s => `scale(${s})`),
            opacity: hover.val.interpolate({
              range: [0, 1],
              output: [0.5, 1]
            }),
          }}
        >
          <Image fluid={imageData} alt={title} />
        </animated.div>
      </animated.div>
    </Project>
  )}

export default Preview
