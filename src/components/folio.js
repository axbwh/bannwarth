import React, { useRef, useLayoutEffect, useState, useEffect } from "react"
import styled from "styled-components"
import Preview from "./preview"
import Titles from "./titles"
import { useSpring } from "react-spring"
import anime from "animejs"
import { easeCubicOut } from 'd3-ease'

const Abs = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`

const Wrap = styled.div`
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  overflow: hidden;
  align-items: center;
  @media (min-width: 768px) {
    justify-content: center;
  }
  height: calc(100 * var(--vh));
  width: 100vw;
  pointer-events: none;
  z-index: 100;
`

const intPrev = (x, y) => `translate3d(${x * 0.055}px,${y * 0.055}px,0)`
const intTitle = (x, y) => `translate3d(${x * 0.085}px,${y * 0.085}px,0)`

const Folio = ({ projects, scroll, parallax, setClip }) => {
  const [hovered, set] = useState(null)
  const [ready, setReady] = useState(false)

  const [props, setProps] = useSpring(() => ({
    factor: 0,
    config: { mass: 20, tension: 300, friction: 140 },
  }))

  const axes = useRef({ transform: 0, skew: 0 })

  const [timeline, setTimeline] = useState()

  const [spring, setSpring] = useSpring(() => ({
    transform: -axes.current.transform,
    skew: axes.current.skew,
  }))

  useLayoutEffect(() => {
    const tl = anime.timeline({
      targets: axes.current,
      easing: "easeInOutQuint",
      autoplay: false,
    })

    projects.forEach((p, i) => {
      const duration = i < 1 ? 0.001 : 1
      const trans = (100 / projects.length) * i
      tl.add({ transform: i < 1 ? [trans, trans] : trans, duration: duration })
    })
    setTimeline(tl)
  }, [projects])

  const hoverIn = slug => {
    set(slug)
    setProps({ factor: 1 })
  }
  const hoverOut = () => {
    set(null)
    setProps({ factor: 0 })
  }

  useEffect(() => {
    if (timeline) {
      timeline.seek(timeline.duration * scroll.top)
      if (!ready && scroll.render) {
        setSpring({
          transform: -axes.current.transform,
          immediate: true,
          onRest: () => {
            setSpring({ immediate: false, onRest: undefined })
            setReady(true)
          },
        })
      } else {
        timeline.seek(timeline.duration * scroll.top)
        let absSkew = easeCubicOut(Math.abs(scroll.speed)) * 50
        let skew = scroll.speed > 0 ? absSkew : -absSkew
        setSpring({
          transform: -axes.current.transform,
          skew: skew,
        })
      }
    }
  }, [scroll, timeline, setSpring, ready, setReady])

  return (
    <Abs>
      <Wrap>
        <Titles
          hoverIn={hoverIn}
          hoverOut={hoverOut}
          style={{ transform: parallax.xy.interpolate(intTitle) }}
          projects={projects}
          spring={spring}
          hover={props.factor}
          setClip={setClip}
        />
        <Preview
          hoverIn={hoverIn}
          hoverOut={hoverOut}
          style={{ transform: parallax.xy.interpolate(intPrev) }}
          projects={projects}
          spring={spring}
          scroll={scroll}
          hover={props.factor}
          hovered={hovered}
          parallax={parallax}
          setClip={setClip}
        />
      </Wrap>
    </Abs>
  )
}

export default Folio
