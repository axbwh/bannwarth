import React, { useLayoutEffect, useRef, useState } from "react"
import * as Mouse from "../components/mouse"
import Wrap from "../components/wrap"
import { animated } from "react-spring"
import styled from "styled-components"
import { design } from "./utils"
import SimpleBar from "simplebar-react"
import "simplebar/dist/simplebar.min.css"

const Mask = styled(animated.div)`
  width: 100vw;
  height: calc(100 * var(--vh));
`

const Hole = styled(animated.svg)`
  width: 100vw;
  height: calc(100 * var(--vh));
  //fill: ${design.black.bg};
  pointer-events: none;
  touch-action:none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`

let Wrapping = styled(SimpleBar)`
  width: 100vw;
  height: calc(100 * var(--vh));
  background-color: rgba(255,255,255,0.7);
  /* color: grey; */
  /* ${ props => `background-color: ${props.color.bg};
  color: ${props.color.fg};`} */
  position: fixed;
  main{
    touch-action: pan-x pan-y;
    position: relative;
  }
`

const LBox= styled(animated.div)`
  width: 100vw;
  height: calc(100 * var(--vh));
  display: ${({ hide }) => (hide ? 'none' : 'block')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  cursor: zoom-out;
  background-color: rgba(255, 255, 255, 0.8);
  clip-path: ${({ open }) => (open ? 'none' : 'url(#LHole)')};
  -webkit-clip-path: ${({ open }) => (open ? 'none' : 'url(#LHole)')};
`

const ImgWrap = styled.div`
    display: block;
    min-height: calc(100 * var(--vh));
    
    align-content: center;
    justify-content:center;
`

// const Trim = styled(Hole)`
//   position: absolute;
//   background-color: ${design.black.bg};
//   z-index: 10;
//   top: 0;
//   left: 0;
//   pointer-events: none;
// `

const Lightbox = ({ children, clip, setClip, open, setOpen, hide, setHide, ...rest }) => {
  const [size, setSize] = useState({x: 1920, y: 1080})
  const scrollRef = useRef(null)

  const handleClick = (e) => {
    console.log("click")
    setOpen(false)
    setHide(false)
    e.preventDefault()
    Mouse.set(e)

    const options =  { to : async (next, cancel) => {
      await next ({ mask: Mouse.calc(Mouse.pos.r), config: { immediate : true, duration: 0.00001} })
      await next ({ mask: Mouse.calc(0), config: { immediate : false, duration: 300 }})
    }}


     setClip({ ...options, onRest: () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0,0)
        }
    }})   
    
  }

  useLayoutEffect(() => {
    const handleClip = () => {
      setOpen(false)
      setHide(true)
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
              />
            </clipPath>
          </defs>
        </Hole>
        <LBox open={open} hide={hide} onClick={handleClick}>
        <Wrapping
            color={design.white}
            autoHide={false}
            scrollableNodeProps={{
            ref: scrollRef,
            }}
            >
            <ImgWrap>
                {children}
            </ImgWrap>
        </Wrapping>
        </LBox>
    </>
  )
}

export default Lightbox
