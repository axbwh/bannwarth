import React from "react"
import * as Mouse from "./mouse"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"
import Image from "gatsby-image"

const ProjectWrap = styled.div`
  width: 100%;
  padding: 100px 20vw;
  box-sizing: border-box;

  
  .gatsby-image-wrapper{
    max-height: 80vh;
    max-width: 60vw;
    
  }

  a{
    display: block;
    position: relative;
    text-decoration: none;
    color: inherit;
    
  }

  p{
    writing-mode: vertical-lr;
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
    transform: translateX(calc(100% + 10px));
    font-size: 14px;
    font-variation-settings: 'wght' 350, 'wdth' 85, 'slnt' 0;
    letter-spacing: 1px;
  }


`

const Preview = ({ slug, title, date, imageData }) => (
  <ProjectWrap>
    <Link
      to={`/${slug}`}
      exit={{ length: 0.75, zIndex: 0 }}
      onClick={Mouse.set}
      entry={{ length: 0 }}
    >
      <Image fluid={imageData} alt={title} />
      <p>{date}</p>
      {/* <h2>{title}</h2> */}
    </Link>
  </ProjectWrap>
)

export default Preview
