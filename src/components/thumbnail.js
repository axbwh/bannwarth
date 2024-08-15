import React from "react"
import styled from "styled-components"
import Link from "./link"
import Image from "gatsby-image"
import { animated, useSpring } from "react-spring"

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

const Clip = styled(animated.div)`
  position: relative;
  display: block;
  overflow: hidden;
  width: calc(100vw - var(--gutter) * 2);
  height: calc( (100vw - var(--gutter) * 2) * 9 / 16);
  @media (max-width: 768px) {
    height: calc((100 * var(--vh)) - var(--nav-size) - 6vw - 10px - 35px);
  }
`

const int = (x, y) => `translate3d(${x * -0.03}px,${y * -0.03}px,0)`

const Thumbnail = ({ slug, title, imageData, parallax, hovered, ...props }) =>{ 
  
  const [hover, set] = useSpring(() => ({ val: 0, config: { mass: 1, tension: 280, friction: 200 } }))
  
  set({val: hovered === slug ? 1 : 0})
  return (
    <Project
      to={`/${slug}`}
      {...props}
    >
      <Clip style={{ transform: parallax.xy.interpolate(int) }}>
        <animated.div
          style={{
            transform: hover.val.interpolate({
              range: [0, 1],
              output: [1.05, 1.01]
            }).interpolate(s => `scale(${s})`),
            opacity: hover.val.interpolate({
              range: [0, 1],
              output: [0.4, 0.75]
            }),
          }}
        >
          <Image loading='eager' fluid={imageData} alt={title} backgroundColor={true}/>
        </animated.div>
      </Clip>
    </Project>
  )}

export default Thumbnail
