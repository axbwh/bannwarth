import React, { useRef, useLayoutEffect, createRef, useState } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import anime from "animejs"

const Wrap = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  align-items: center;
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  z-index: 100;

  h2 {
    white-space: nowrap;
    text-transform: uppercase;
    box-sizing: border-box;
    min-width: 80vw;
    font-size: 6vw;
    line-height: 0.9em;
    font-variation-settings: "wght" 1000, "wdth" 85, "slnt" 0;
    letter-spacing: 1vw;
    padding: 3vw;
    margin: 0px;
    color: #000;
  }
`

const Stripe = styled(animated.div)`
  display: flex;
  mix-blend-mode: overlay;
`

const Ghost = styled(Stripe)`
opacity: 0.3;
`

const Mask = styled(animated.div)`
  display: flex;
  overflow: hidden;
  position: absolute;
  width: calc(80vw + 24px);
`

const axes = { x: 0, w: 0 }

const Titles = ({ titles, scroll }) => {
  const refs = useRef(titles.map(() => createRef()))
  const [offsets, setOffsets] = useState([])
  const [timeline, setTimeline] = useState()
  const [props, setProps] = useSpring(() => ({
    transform: `translateX(${-axes.x}%)`,
  }))
  

  const handleWidth = () => {
    axes.x = 0
    const off = refs.current.map(ref => {
      return ref.current.getBoundingClientRect().width
    })

    const tl = anime.timeline({
      targets: axes,
      easing: "easeInOutCubic",
      autoplay: false,
    })

    let whole = off.reduce((acc, w) => acc + w)

    off.reduce((acc, o, i) => {
      const duration = i < 1 ? 0.001 : 1
      tl.add({ x: (acc / whole) * 100, duration: duration })
      return acc + o
    }, 0)

    setOffsets(off)
    setTimeline(tl)
  }

  useLayoutEffect(() => {
    handleWidth()
  }, [])

  if (timeline) {
    timeline.seek(timeline.duration * scroll)
    setProps({ transform: `translateX(${-axes.x}%)` })
  }

  return (
    <Wrap>
      <Ghost style={props}>
        {titles.map((t, i) => (
          <h2 key={t} ref={refs.current[i]}>
            {t}
          </h2>
        ))}
      </Ghost>
      <Mask>
        <Stripe style={props}>
          {titles.map((t, i) => (
            <h2 key={`filled${t}`}>{t}</h2>
          ))}
        </Stripe>
      </Mask>
    </Wrap>
  )
}

export default Titles
