import React from "react"
import { Spring } from "react-spring/renderprops"
import { TransitionState } from "gatsby-plugin-transition-link"
import * as Mouse from "../components/mouse"
import Wrap from '../components/wrap'

const Trans = ({ children, black }) => (
  <TransitionState>
    {({ mount }) => (
      <Spring
        to={{
          clipPath: `circle(${mount ? Mouse.pos.r : 0}px at ${Mouse.pos.x}px ${
            Mouse.pos.y
          }px)`,
        }}
      >
        {props => <Wrap style={props} black={black}>{children}</Wrap>}
      </Spring>
    )}
  </TransitionState>
)

export default Trans
