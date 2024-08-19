
import React, { useContext } from 'react'
import * as Mouse from "./mouse"
import { navigate } from "gatsby"
import styled from 'styled-components'
import { GlobalStateContext } from './GlobalStateContext'

let RawLink = styled.a`
cursor: pointer;
`
const Link = ({children, to, setClip,  ...props}) => {
  const {isDone, setDone} = useContext(GlobalStateContext);
  const handleClick = (e) => {
    e.preventDefault()
    Mouse.set(e)
    const options = to.includes('/#') || to === '/' ? { to : async (next, cancel) => {
      await next ({ mask: Mouse.calc(Mouse.pos.r), trim: Mouse.calc(0), config: { immediate : true, duration: 0.0001} })
      await next ({ mask: Mouse.calc(0), config: { immediate : false, duration: 300 }})
    }} : { to : async (next, cancel) => {
      await next ({ mask: Mouse.calc(Mouse.pos.r), trim: Mouse.calc(0), config: { immediate : true, duration: 0.0001 } })
      await next ({ trim: Mouse.calc(Mouse.pos.r), config: { immediate : false, duration: 300 }})
    }}

    setClip({ ...options, onRest: () => {
      navigate(to, { state: {linked: true}})
    }})

    setDone(false) 
    
  }
  
  return (
  <RawLink onClick={handleClick} href={to} {...props}>
    {children}
  </RawLink>
)}

export default Link
