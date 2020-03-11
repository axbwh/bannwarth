import React from "react"
import styled from "styled-components"

const Wrap = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  align-items: center;
  height: 100vh;
  width: 100vw;
  pointer-events:none;

  h2{
    white-space: nowrap;
    text-transform: uppercase;
    font-size: 6vw;
    line-height: 0.9em;
    font-variation-settings: 'wght' 1000, 'wdth' 85, 'slnt' 0;
    letter-spacing: 1vw;
    margin: 3vw;
    
  }
`

const Titles = ({ titles }) => (
  <Wrap>
    {titles.map(t => (
      <h2>{t}</h2>
    ))}
  </Wrap>
)

export default Titles
