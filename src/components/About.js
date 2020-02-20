import React, { Component } from 'react'
import styled from 'styled-components'
import './About.css'

let Wrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  color: #fff;
`

let Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const About = (props) => {
    return (
        <Wrap>
          <Content>About</Content>
          {props.children}
        </Wrap>
    )
}

export default About
