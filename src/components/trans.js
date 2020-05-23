import React, { useLayoutEffect, useState } from "react"
import * as Mouse from "../components/mouse"
import Wrap from "../components/wrap"
import { animated } from "react-spring"
import styled from "styled-components"
import { design } from "./utils"

const Mask = styled(animated.div)`
  width: 100vw;
  height: calc(100 * var(--vh));
`

const Hole = styled(animated.svg)`
  width: 100vw;
  height: calc(100 * var(--vh));
  fill: ${design.black.bg};
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`

// const Trim = styled(Hole)`
//   position: absolute;
//   background-color: ${design.black.bg};
//   z-index: 10;
//   top: 0;
//   left: 0;
//   pointer-events: none;
// `

const Trans = ({ children, clip, setClip, ...rest }) => {
  const [size, setSize] = useState({x: 1920, y: 1080})

  useLayoutEffect(() => {
    const handleClip = () => {
      Mouse.setRad()
      setSize({x: window.innerWidth, y: window.innerHeight})
      setClip({ mask: Mouse.calc(Mouse.pos.r), trim: Mouse.calc(0) })
    }

    handleClip()
    window.addEventListener("resize", handleClip)
    return () => {
      window.removeEventListener("resize", handleClip)
    }
  }, [])

  return (
    <>
      <Wrap {...rest}>{children}</Wrap>
      
        <Hole style={{display : clip.mask.interpolate((x, y, r) => r < Mouse.pos.r ? 'block' : 'none')}} viewBox={`0 0 ${size.x} ${size.y}`}>
          <defs>
            <mask id="hole">
              <rect width="100%" height="100%" fill="white" />
              <animated.circle
                r={clip.mask.interpolate((x, y, r) => r)}
                cx={clip.mask.interpolate((x, y, r) => x)}
                cy={clip.mask.interpolate((x, y, r) => y)}
                fill="black"
              />
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" mask="url(#hole)" />
        </Hole>

        <Hole style={{display : clip.trim.interpolate((x, y, r) => r > 0 ? 'block' : 'none')}} viewBox={`0 0 ${size.x} ${size.y}`}>
          <animated.circle
            r={clip.trim.interpolate((x, y, r) => r)}
            cx={clip.trim.interpolate((x, y, r) => x)}
            cy={clip.trim.interpolate((x, y, r) => y)}
          />
        </Hole>
    </>
  )
}

export default Trans
