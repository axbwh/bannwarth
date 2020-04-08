
import React from 'react'
import TransitionLink from "gatsby-plugin-transition-link"
import * as Mouse from "./mouse"


const Link = ({children, ...props}) => (
  <TransitionLink
    exit={{ length: 0.75, zIndex: 0 }}
    onClick={Mouse.set}
    entry={{ length: 0 }}
    {...props}
  >
    {children}
  </TransitionLink>
)

const ProjLink = ({children, ...props}) => (
  <TransitionLink
    exit={{ state: { stay: true }, length: 0.75, zIndex: 0 }}
    onClick={Mouse.set}
    entry={{ length: 0 }}
    {...props}
  >
    {children}
  </TransitionLink>
)

export default Link
export { ProjLink }
