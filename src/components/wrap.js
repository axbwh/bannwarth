import React, { useRef } from "react"
import {isMobile} from 'react-device-detect'
import styled from "styled-components"
import SimpleBar from "simplebar-react"
import "simplebar/dist/simplebar.min.css"

import throttle from "lodash.throttle"
import debounce from "lodash.debounce"
import { design } from "./utils"


let Wrapping = styled(SimpleBar)`
  width: 100vw;
  height: calc(100 * var(--vh));
  background-color: #fff;
  ${ props => `background-color: ${props.color.bg};
  color: ${props.color.fg};`}
  position: fixed;
  main{
    position: relative;
  }
`

const Wrap = ({children, color = design.white, setScroll, setParallax, ...props}) => {
  const scrollRef = useRef(null)

  //useRef to make throttle work
  const throttleMouse = useRef(
    throttle((x, y) => setParallax({ xy: calc(x, y) }), 100)
  ).current
  
  const throttleScroll = useRef(
    throttle(() => {
      if (scrollRef) {
        let scrollProgress =
          scrollRef.current.scrollTop /
          (scrollRef.current.scrollHeight - window.innerHeight)
        setScroll(({top = scrollProgress}) => ({top: scrollProgress, speed : top - scrollProgress, render: true}))
      }
    }, 100)
  ).current

  const debounceScroll = useRef(
    debounce(() => {
        setScroll(({speed = 0, ...rest}) => ({speed: 0, ...rest}))
    }, 100)
  ).current 

  const onScroll = (e) => {
    throttleScroll()
    debounceScroll()
    
  }

  const onMouseMove = ({ clientX: x, clientY: y }) => {
    if (!isMobile) {
      throttleMouse(x, y)
    }
  }

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

  return (
    <Wrapping
    color={color}
    autoHide={false}
    scrollableNodeProps={{
      ref: scrollRef,
      onScroll: onScroll,
      onMouseMove: onMouseMove,
    }}
    {...props}>
      {children}
    </Wrapping>
  )
}

export default Wrap