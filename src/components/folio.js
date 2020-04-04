import React, { useRef, useLayoutEffect, useState } from "react"
import styled from "styled-components"
import Preview from "./preview"
import Titles from "./titles"
import { useSpring } from "react-spring"
import Bookmarks from "./bookmarks"
import anime from "animejs"
import { easeExpOut } from 'd3-ease'

const Wrap = styled.div`
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
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  z-index: 100;
`

const intPrev = (x, y) => `translate3d(${x * 0.055}px,${y * 0.055}px,0)`
const intTitle = (x, y) => `translate3d(${x * 0.085}px,${y * 0.085}px,0)`

const Folio = ({ projects, scroll, parallax }) => {
  const [hovered, set] = useState(null)

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

  if (timeline) {
    timeline.seek(timeline.duration * scroll.top)
    let absSkew = easeExpOut(Math.abs(scroll.speed)) * 50
    let skew = scroll.speed > 0 ? absSkew : -absSkew
    setSpring({ transform: -axes.current.transform, skew: skew})
  }

  return (
    <Wrap>
      <Bookmarks scroll={scroll} projects={projects} />
      <Titles
        hoverIn={hoverIn}
        hoverOut={hoverOut}
        style={{ transform: parallax.xy.interpolate(intTitle) }}
        projects={projects}
        spring={spring}
        hover={props.factor}
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
      />
    </Wrap>
  )
}

export default Folio
