import React, { useLayoutEffect } from "react"
import * as Mouse from "../components/mouse"
import Wrap from "../components/wrap"
import { animated } from "react-spring"
import styled from "styled-components"
import { design } from "./utils"

const Mask = styled(animated.div)`
  width: 100vw;
  height: calc(100 * var(--vh));
`

const Trim = styled(Mask)`
  position: absolute;
  background-color: ${design.black.bg};
  z-index: 10;
  top: 0;
  left: 0;
  pointer-events: none;
`

const Trans = ({ children, clip, setClip, ...rest }) => {
  useLayoutEffect(() => {
    const handleClip = () => {
      Mouse.setRad()
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
      <Mask style={{ clipPath: clip.mask, WebkitClipPath: clip.mask }}>
        <Wrap {...rest}>{children}</Wrap>}
      </Mask>
      <Trim style={{ clipPath: clip.trim , WebkitClipPath: clip.trim}} />
    </>
  )
}

export default Trans
