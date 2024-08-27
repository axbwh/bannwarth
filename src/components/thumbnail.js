import React, { useEffect, useLayoutEffect, useState } from "react"
import styled from "styled-components"
import Link from "./link"
import Image from "gatsby-image"
import { animated, useSpring } from "react-spring"
import {isMobile} from 'react-device-detect'

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
    //height: calc((100 * var(--vh)) - var(--nav-size) - 6vw - 10px - 35px);
  }
`

const int = (x, y) => `translate3d(${x * -0.03}px,${y * -0.03}px,0)`

const Thumbnail = ({ slug, title, imageData, parallax, hovered, ...props }) =>{



  const [isSmall, setSmall] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return true;
  });

  const [hover, set] = useSpring(() => ({ val: 0, config: { mass: 1, tension: 280, friction: 200 } }))
  
  set({val: hovered === slug ? 1 : 0})

  if (typeof window !== "undefined") {
    set({val: window.innerWidth <= 768 ? 1 : hovered === slug ? 1 : 0})
  }

  useLayoutEffect( () => {
    const handleSmall = () =>{
      if(typeof window !== "undefined"){
        setSmall(window.innerWidth <= 768)
        set({val: window.innerWidth <= 768 ? 1 : hovered === slug ? 1 : 0})
      }
    }
    
    window.addEventListener("resize", handleSmall)
    window.addEventListener("gestureend", handleSmall)
    return () => {
      window.removeEventListener("resize", handleSmall)
      window.removeEventListener("gestureend", handleSmall)
    }
  }, [])

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
              output: [0.5, 1],
            }),
          }}
        >
          <Image loading='eager' fluid={imageData} alt={title} backgroundColor={true}/>
        </animated.div>
      </Clip>
    </Project>
  )}

export default Thumbnail
