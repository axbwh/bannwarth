import React from "react"
import * as Mouse from "../components/mouse"
import Wrap from '../components/wrap'
import { animated } from "react-spring"
import styled from "styled-components"
import { design } from './utils'

const Mask = styled(animated.div)`
  width: 100vw;
  height: 100vh;
`

const Trim = styled(Mask)`
position : absolute;
background-color: ${design.black.bg};
z-index: 10;
top: 0;
left: 0;
`

const Trans = ({ children, clip, setClip, ...rest }) => {
  setClip({ mask: Mouse.calc(Mouse.pos.r), trim: Mouse.calc(0) })
  return (
    <>
      <Mask style={{clipPath : clip.mask}}>        
        <Wrap {...rest}>{children}</Wrap>}
      </Mask>
      <Trim style={{clipPath : clip.trim}}/>
    </>
        )
}

export default Trans
