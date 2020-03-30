import React, { useRef, useLayoutEffect, createRef, useState } from "react"
import styled from "styled-components"
import { animated, useSpring } from "react-spring"
import { romanize } from './utils'

const Wrap = styled(animated.div)`
display : flex;
flex-direction: column;
align-self: center;
justify-content: space-between;
flex-basis: 60vw;
flex-grow: 0;

a {
pointer-events: all;
  line-height: 22px;
  font-size: 20px;
  font-variation-settings: "wght" 1000, "wdth" 85, "slnt" 0;
  writing-mode: unset;
  color: inherit;
  text-decoration: none;
}
`

const Bookmarks = ({projects, ...props}) => {
    return (
      <Wrap {...props}>
        {projects.map((p, i) => (
          <a href={`#${p.slug}`}>{romanize(i+1)}</a>
        ))}
      </Wrap>
    )
}

export default Bookmarks