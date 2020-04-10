import React from "react"
import styled from "styled-components"
import { animated, interpolate } from 'react-spring'



const Div = styled(({moveX, ...rest}) => <animated.div {...rest} />)`
  display: ${props => props.moveX ? "inline-flex" : "flex"};
  flex-direction: ${props => props.moveX ? "row" : "column"};
`

const Slide = ({ children, spring, moveX = false, doesSkew = false, style, ...props }) => {

    const slideX = (transform, skew) => doesSkew ? `translateX(${transform}%) skew(${skew}deg, 0deg)` : `translateX(${transform}%) `
    const slideY = (transform, skew) => doesSkew ? `translateY(${transform}%) skew(0deg, ${skew}deg)` : `translateY(${transform}%) `
    
    return (
        <Div style={{...style, transform: interpolate([spring.transform, spring.skew], moveX ? slideX : slideY)}} moveX={moveX} {...props}>
            {children}
        </Div>
    )
}

export default Slide