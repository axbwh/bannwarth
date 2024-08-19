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
  //fill: ${design.black.bg};
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`

const LBox= styled(animated.div)`
  width: 100vw;
  height: calc(100 * var(--vh));
  //fill: ${design.black.bg};
  //pointer-events: none;
  background-color:${design.white.bg};
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  cursor: zoom-out;
  /* @media (max-width: 768px) {
     padding: 40px;
  }  */
  /* clip-path: url(#LHole); */
`

// const Trim = styled(Hole)`
//   position: absolute;
//   background-color: ${design.black.bg};
//   z-index: 10;
//   top: 0;
//   left: 0;
//   pointer-events: none;
// `

const Lightbox = ({ children, clip, setClip, open, setOpen, ...rest }) => {
  const [size, setSize] = useState({x: 1920, y: 1080})
  const [isClipDone, setIsClipDone] = useState(false)

  const handleClick = (e) => {
    console.log("click")
    setOpen(false)
    setIsClipDone(false)
    e.preventDefault()
    Mouse.set(e)

    const options =  { to : async (next, cancel) => {
      await next ({ mask: Mouse.calc(Mouse.pos.r), config: { immediate : true, duration: 0.00001} })
      await next ({ mask: Mouse.calc(0), config: { immediate : false, duration: 300 }})
    }}


     setClip({ ...options, onRest: () => {
        // setOpen(true)
    }})   
    
  }

  useLayoutEffect(() => {
    const handleClip = () => {
      setIsClipDone(false)
      setOpen(false)
      Mouse.setRad()
      setSize({x: window.innerWidth, y: window.innerHeight})
      setClip({ mask: Mouse.calc(0), trim: Mouse.calc(0),  config: { immediate : true, duration: 0.00001}})
    }

    handleClip()
    window.addEventListener("resize", handleClip)
    return () => {
      window.removeEventListener("resize", handleClip)
    }
  }, [])

  return (
    <>
        <Hole viewBox={`0 0 ${size.x} ${size.y}`}>
          <defs>
            <clipPath id="LHole">
               {/* <rect width="100%" height="100%" fill="white" />  */}
              <animated.circle
                r={clip.mask.interpolate((x, y, r) => r)}
                cx={clip.mask.interpolate((x, y, r) => x)}
                cy={clip.mask.interpolate((x, y, r) => y)}
                fill="black"
                onRest={() => setIsClipDone(true)}
              />
            </clipPath>
          </defs>
        </Hole>
        <LBox style={{clipPath : open ? 'none' : 'url(#LHole)'}} onClick={handleClick}>
            <Wrap {...rest}>
            {children}
            </Wrap>
        </LBox>
    </>
  )
}

export default Lightbox
