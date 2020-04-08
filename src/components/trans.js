import React from "react"
import { Spring } from "react-spring/renderprops"
import { TransitionState } from "gatsby-plugin-transition-link"
import * as Mouse from "../components/mouse"
import Wrap from '../components/wrap'

const Trans = ({ children, ...rest }) => {
  return (
  <TransitionState>
    {({ mount, transitionStatus, exit}) => {
      let to = {
        clipPath: `circle(${mount ? Mouse.pos.r : 0}px at ${Mouse.pos.x}px ${Mouse.pos.y}px)`,
      }

      if(exit.state.stay && transitionStatus === 'exiting' ){
        to = {
          clipPath: `circle(${Mouse.pos.r}px at ${Mouse.pos.x}px ${Mouse.pos.y}px)`,
        }
      }

      return (<Spring
        to={to}
      >
        
        {props => <Wrap style={props} {...rest}>{children}</Wrap>}
      </Spring>
    )}}
  </TransitionState>
)}

export default Trans
