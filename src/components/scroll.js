import React, { useRef, useLayoutEffect, useState, useEffect } from "react"
import { useSpring, animated } from "react-spring"
import anime from "animejs"
import styled from "styled-components"

const Div = styled(({ moveX, passRef, ...rest }) =><animated.div ref={passRef} {...rest} />)`
  display: ${props => props.moveX ? "inline-flex" : "flex"};
  flex-direction: ${props => props.moveX ? "row" : "column"};
`

const Scroll = ({ children, scroll, moveX = false, style, ...props }) => {
  const ref = useRef(null)
  const axes = useRef({ x: 0, y: 0 })
  const [timeline, setTimeline] = useState()
  const [ready, setReady] = useState(false)

  const [spring, setSpring] = useSpring(() => ({
    x: `translateX(${-axes.current.x}px) `,
    y: `translateY(${-axes.current.y}px) `,
  }))

  useLayoutEffect(() => {
    const handleSize = () => {
      const elems = Array.from(ref.current.childNodes)
  
      const tl = anime.timeline({
        targets: axes.current,
        easing: "easeInOutQuint",
        autoplay: false,
      })
  
      elems.forEach((e, i) => {
        const duration = i < 1 ? 0.001 : 1
        const x = e.offsetLeft
        const y = e.offsetTop
        tl.add({
          x: i < 1 ? [x, x] : x,
          y: i < 1 ? [y, y] : y,
          duration: duration,
        })
      })
      setTimeline(tl)
    }
    
    handleSize()
    window.addEventListener("resize", handleSize)
    return () => {
      window.removeEventListener("resize", handleSize)
    }
  }, [])

  useEffect(() => {
    if (timeline) {
      timeline.seek(timeline.duration * scroll.top)
      if (!ready && scroll.render) {
        setSpring({
          x: `translateX(${-axes.current.x}px) `,
          y: `translateY(${-axes.current.y}px) `,
          immediate: true,
          onRest: () => {
            setSpring({ immediate: false, onRest: undefined })
            setReady(true)
          },
        })
      } else {
        setSpring({
          x: `translateX(${-axes.current.x}px) `,
          y: `translateY(${-axes.current.y}px) `,
        })
      }
    }
  }, [scroll, timeline, setSpring, ready, setReady])


  return (
    <Div
      moveX={moveX}
      passRef={ref}
      style={{ ...style, transform: moveX ? spring.x : spring.y }}
      {...props}
    >
      {children}
    </Div>
  )
}

export default Scroll
