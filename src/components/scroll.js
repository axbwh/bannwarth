import React, { useRef, useLayoutEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import anime from "animejs"
import styled from "styled-components"

// const axes = { t: 0 }



let Div = styled(animated.div)`
    display: ${props => props.moveX ? 'inline-flex' : 'flex'};
    flex-direction:${props => props.moveX ? 'row' : 'column'};
`


const Scroll = ({ children, scroll, moveX = false, style, ...props }) => {
  const ref = useRef(null)
  const axes = useRef({t: 0})
  const [timeline, setTimeline] = useState()

  const [spring, setSpring] = useSpring(() => ({
    t: moveX ? `translateX(${-axes.current.t}%)` : `translateY(${-axes.current.t}%)`,
  }))

  const handleSize = () => {
    axes.current.t = 0

    const sizes = Array.from(ref.current.childNodes).map(node => {
      return moveX
        ? node.getBoundingClientRect().width
        : node.getBoundingClientRect().height
    })

    let total = sizes.reduce((acc, size) => acc + size)

    const tl = anime.timeline({
      targets: axes.current,
      easing: "easeInOutQuint",
      autoplay: false,
    })

    sizes.reduce((acc, o, i) => {
      const duration = i < 1 ? 0.001 : 1
      tl.add({ t: (acc / total) * 100, duration: duration })
      return acc + o
    }, 0)
    tl.seek(tl.duration * scroll.top)
    setTimeline(tl)
    setSpring({
        from: { t: moveX ? `translateX(${-axes.current.t}%)` : `translateY(${-axes.current.t}%)` },
      })
  }

  useLayoutEffect(() => {
    handleSize()
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  if (timeline) {
    timeline.seek(timeline.duration * scroll.top)
    setSpring({
      t: moveX ? `translateX(${-axes.current.t}%)` : `translateY(${-axes.current.t}%)`,
    })
  }

  // console.log(moveX ? '' : axes.current.t )

  return (
    <Div moveX={moveX} ref={ref} style={{ ...style, transform: spring.t }} {...props}>
      {children}
    </Div>
  )
}

export default Scroll
