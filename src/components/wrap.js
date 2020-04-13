import React, { useRef, useEffect, useLayoutEffect } from "react"
import styled from "styled-components"
import SimpleBar from "simplebar-react"
import "simplebar/dist/simplebar.min.css"

import throttle from "lodash.throttle"
import debounce from "lodash.debounce"
import { design } from "./utils"


let Wrapping = styled(SimpleBar)`
  width: 100vw;
  height: 100vh;
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
      console.log('onscroll', scrollRef.current.scrollTop)
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

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

  return (
    <Wrapping
    color={color}
    scrollableNodeProps={{
      ref: scrollRef,
      onScroll: onScroll,
      onMouseMove: ({ clientX: x, clientY: y }) => throttleMouse(x, y),
    }}
    {...props}>
      {children}
    </Wrapping>
  )
}

export default Wrap