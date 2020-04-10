
import React from 'react'
import * as Mouse from "./mouse"
import { navigate } from "gatsby"
import styled from 'styled-components'

let RawLink = styled.a`
cursor: pointer;
`
const Link = ({children, to, setClip,  ...props}) => {
  const handleClick = (e) => {
    e.preventDefault()
    Mouse.set(e)

    const options = to.includes('/#') || to === '/' ? { to : async (next, cancel) => {
      await next ({ mask: Mouse.calc(Mouse.pos.r), config: { immediate : true, duration: 0} })
      await next ({ mask: Mouse.calc(0), config: { immediate : false, duration: 300 }})
    }} : { to : async (next, cancel) => {
      await next ({ trim: Mouse.calc(0), config: { immediate : true, duration: 0 } })
      await next ({ trim: Mouse.calc(Mouse.pos.r), config: { immediate : false, duration: 300 }})
    }}


    setClip({ ...options, onRest: () => {
      navigate(to, { state: {linked: true}})
    }})   
    
  }
  
  return (
  <RawLink onClick={handleClick} href={to} {...props}>
    {children}
  </RawLink>
)}

export default Link
