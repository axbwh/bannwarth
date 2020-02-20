import React, { Fragment, useState, useCallback } from 'react'
import {useTransition, animated} from 'react-spring'
import About from './About'
import styled from 'styled-components'
import { Button } from './Styles'

const ease = 'cubic-bezier(0.075, 0.82, 0.165, 1)'

const Navwrap = styled.div`
  position: fixed;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;

  button span {
    padding: 30px;
    transition: all 1s ${ease};
    font-variation-settings: 'wght' 350, 'wdth' 85, 'slnt' 0;
    writing-mode: vertical-rl;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  button:hover span {
    font-variation-settings: 'wght' 1100, 'wdth' 95, 'slnt' 0;
    letter-spacing: 2px;
  }
`

const getRad = (x, y) => {
  return Math.max(Math.hypot(x - window.innerWidth, y - window.innerHeight), Math.hypot(x, y - window.innerHeight), Math.hypot(x - window.innerWidth, y), Math.hypot(x, y))
}

const Nav = () => {
    // const [isOpen, setOpen] = useState(false);
    const [modal, setModal] = useState({isOpen: false, x: 0, y: 0, r: getRad(0 ,0)})

    const handleClick = useCallback( (e) => {
        setModal({isOpen: !modal.isOpen, x: e.clientX, y: e.clientY, r:  getRad(e.clientX, e.clientY)}) 
    })

    const transitions = useTransition(modal.isOpen, null, {
      from : {clipPath: `circle(0px at ${modal.x}px ${modal.y}px)`},
      enter:  {clipPath: `circle(${modal.r}px at ${modal.x}px ${modal.y}px)`},
      leave: {clipPath: `circle(0px at ${modal.x}px ${modal.y}px)`},  
    })

    return (
      <Fragment>
        <Navwrap><Button onClick={handleClick}><span>About</span></Button></Navwrap>
        {transitions.map(({item, key, props}) => item && <animated.div key={key} style={props}>
              <About>
                <Navwrap><Button onClick={handleClick}><span>Home</span></Button></Navwrap>
              </About>
            </animated.div>
        )}
      </Fragment>
    )
  }


export default Nav
