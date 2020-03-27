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

const int = (x, y, s) => `translate3d(${x * -0.03}px,${y * -0.03}px,0) scale(${s})`

const Preview = ({ slug, title, imageData, parallax, hovered, ...props }) =>{ 
  
  const [hover, set] = useSpring(() => ({ opacity: 0.5, scale: 1.05, config: { mass: 20, tension: 300, friction: 140 } }))
  
  set({opacity: hovered === slug ? 1 : 0.5, scale: hovered === slug ? 1.01 : 1.05})

  return (
    <Project
      to={`/${slug}`}
      exit={{ length: 0.75, zIndex: 0 }}
      onClick={Mouse.set}
      entry={{ length: 0 }}
      {...props}
    >
      <animated.div style={{ transform: interpolate([parallax.xy, hover.scale], ([x, y], scale) => int(x, y, scale)) , opacity: hover.opacity }}>
        <Image fluid={imageData} alt={title}  />
      </animated.div>
    </Project>
)}

export default Preview
