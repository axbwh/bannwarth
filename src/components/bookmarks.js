import React, { useRef, useLayoutEffect, createRef, useState } from "react"
import styled from "styled-components"
import anime from "animejs"
import { animated, useSpring, interpolate } from "react-spring"
import { romanize } from './utils'
import { easeExpOut } from 'd3-ease'

const navSize = 79;

const Wrap = styled(animated.div)`
  display: flex;
  flex-direction: row;
  width: calc(60vw + 60px);
  top: 0px;

  @media (max-width: 768px) {
    display: inline-flex;
    flex-direction: column;
    width: 40px;
    height: calc(100vh - ${navSize}px - 6vw - 30px);
    top: calc(${navSize}px + 6vw + 30px - 10px);
    left: 0px;
  }

  justify-content: space-between;
  position: absolute;
  z-index: 10;
  background-color: #fff;
  a {
    pointer-events: all;
    line-height: 22px;
    font-size: 14px;
    font-variation-settings: "wght" 1000, "wdth" 85, "slnt" 0;
    writing-mode: unset;
    color: inherit;
    text-decoration: none;
    padding: 30px;
    text-align: center;
    box-sizing: unset;
    width: 20px;
    @media (max-width: 768px) {
      padding: 10px;
      text-align: center;
    }
    transition-property: font-variation-settings,  letter-spacing;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);

    &:hover{
      font-variation-settings: "wght" 500, "wdth" 85, "slnt" 0;
      letter-spacing: 2px;
    }
  }
`

const Dot = styled(animated.div)`
position: absolute;
width: 25px;
height: 25px;
left: -12.5px;
top: -12.5px;
/* border-radius: 50% 50%; */
background-color: #fff;
mix-blend-mode: difference;

`

const Bookmarks = ({projects, scroll, ...props}) => {
  const ref = useRef(null)
  const axes = useRef({x: 0, y:0})

  const [timeline, setTimeline] = useState()

  const [spring, setSpring] = useSpring(() => ({
    xy: [0, 0],
    s: [0 , 0],
    config : 	{ mass: 1, tension: 300, friction: 32 }
  }))

  const [stretch, setStretch] = useSpring(() => ({
    s: [0, 0],
    config : 	{ mass: 1, tension: 300, friction: 12 }
  }))

  const handleSize = () => {
    const bmarks = Array.from(ref.current.childNodes).slice(1)

    const tl = anime.timeline({
      targets: axes.current,
      easing: "easeInOutQuint",
      autoplay: false,
    })

    bmarks.forEach((e, i) => {
      const duration = i < 1 ? 0.001 : 1
      const x = e.offsetLeft + e.getBoundingClientRect().width /2
      const y = e.offsetTop + e.getBoundingClientRect().height /2 
      tl.add({ x: i < 1 ? [x, x] : x, y: i < 1 ? [y, y] : y, duration: duration })
    })

    tl.seek(tl.duration * scroll.top)
    setTimeline(tl)
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

    let absAcc = easeExpOut(Math.abs(scroll.speed)) * 50
    let acceleration = scroll.speed > 0 ? absAcc : -absAcc

    setStretch({s: [spring.xy.getValue()[0] === axes.current.x ? 0 : acceleration, spring.xy.getValue()[1] === axes.current.y ? 0 : -acceleration ] })
    setSpring(({ xy: [axes.current.x, axes.current.y] }))
  }

  
    return (
      <Wrap ref={ref} {...props}>
        <Dot style={{transform: interpolate( [spring.xy, stretch.s], ([x ,y], [sx, sy]) => `translate(${x}px, ${y}px) skew(${sx}deg, ${sy}deg)`)  }}/>
        {projects.map((p, i) => (
          <a href={`#${p.slug}`}>{romanize(i+1)}</a>
        ))}
      </Wrap>
    )
}

export default Bookmarks