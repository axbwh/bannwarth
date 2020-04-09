
import React from 'react'
import TransitionLink from "gatsby-plugin-transition-link"
import * as Mouse from "./mouse"
import { Link as RawLink } from 'gatsby'


const Link = ({children, instay = false, outstay = false, ...props}) => (
  // <TransitionLink
  //   exit={{ state: { stay: outstay }, length: 0.75, zIndex: instay ? 2 : 0 }}
  //   onClick={Mouse.set}
  //   entry={{ state: { stay: instay }, length: 0 }}
  //   {...props}
  // >
  //   {children}
  // </TransitionLink>
  <RawLink onClick={Mouse.set} {...props}>
    {children}
  </RawLink>
)

export default Link
