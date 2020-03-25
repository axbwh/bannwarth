import React, { useRef, useLayoutEffect, createRef, useState } from "react"
import styled from "styled-components"
import { useSpring, animated, interpolate } from "react-spring"
import anime from "animejs"
import Preview from "./preview"
import { clamp, normalize } from "./utils"

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
    text-shadow: 0 1px 100px rgba(255,255,255,0.12), 0 1px 50px rgba(255,255,255,0.12);
  }
`

const Stripe = styled(animated.div)`
  display: flex;
  /* mix-blend-mode: difference; */
  opacity: 1;
`

const Mask = styled(animated.div)`
  display: flex;
  overflow: hidden;
  position: absolute;
  width: calc(80vw + 24px);
  > div {
    /* mix-blend-mode: saturation; */
    opacity: 1;
  }
`

const Crop = styled.div`
  position: absolute;
  overflow: hidden;
  display: grid;
  width: 60vw;
  height: calc(60vw * 9 / 16);
  left: 20vw;
  box-sizing: border-box;
`

const Prev = styled(animated.div)`

`

const axes = { x: 0, y: 0 }

const Titles = ({ projects, scroll }) => {
  const titleRefs = useRef(projects.map(() => createRef()))
  const [offsets, setOffsets] = useState([])
  const [timeline, setTimeline] = useState()

  const [props, setProps] = useSpring(() => ({
    x: `translateX(${-axes.x}%)`,
    y: `translateY(${-axes.y}%)`,
  }))

  const handleSize = () => {
    axes.x = 0
    axes.y = 0
    const off = titleRefs.current.map(ref => {
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
      tl.add({ x: (acc / whole) * 100, y: 100/projects.length * i,  duration: duration })
      return acc + o
    }, 0)

    setOffsets(off)
    setTimeline(tl)
  }

  useLayoutEffect(() => {
    handleSize()
  }, [])

  if (timeline) {
    timeline.seek(timeline.duration * scroll)
    setProps({ x: `translateX(${-axes.x}%)`, y: `translateY(${-axes.y}%)` })
  }

  return (
    <Wrap>
      {/* <Crop>
      <Prev style={{transform: props.y }}>
        {projects.map((p, i) => {
          const imageData = p.images[0].childImageSharp.fluid
          return (            
              <Preview slug={p.slug} imageData={imageData} />
          )
        })}
        </Prev>
      </Crop> */}

      <Stripe style={{ transform: props.x }}>
        {projects.map((p, i) => (
          <h2 key={p.title} ref={titleRefs.current[i]}>
            {p.title}
          </h2>
        ))}
      </Stripe>

      <Mask>
        <Stripe style={{ transform: props.x }}>
          {projects.map((p, i) => (
            <h2 key={`filled${p.title}`}>{p.title}</h2>
          ))}
        </Stripe>
      </Mask>
    </Wrap>
  )
}

export default Titles
