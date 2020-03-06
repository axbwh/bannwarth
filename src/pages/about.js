import React from "react"
import { Spring } from "react-spring/renderprops"
import { TransitionState } from "gatsby-plugin-transition-link"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import * as Mouse from '../components/mouse'
import Nav from '../components/nav'

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

const MySpring = ({ children }) => (
  <TransitionState>
    {({ mount }) => (
      <Spring
        to={{
          clipPath: `circle(${mount ? Mouse.pos.r : 0}px at ${Mouse.pos.x}px ${
            Mouse.pos.y
          }px)`,
        }}
      >
        {props => <Wrap style={props}>{children}</Wrap>}
      </Spring>
    )}
  </TransitionState>
)


const About = ({ transitionStatus, entry, exit }) => {
  return (
    <MySpring>
      <Layout>
        <SEO title="About" />
        <Content>
          <h1>About</h1>
          <Nav to="/" above='false'>
            go home
          </Nav>
        </Content>
      </Layout>
    </MySpring>
  )
}

export default About
