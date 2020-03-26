import React from "react"
import * as Mouse from "./mouse"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"
import Image from "gatsby-image"

const Project = styled(Link)`
  width: 100%;
  pointer-events: auto;
  overflow: hidden;
  display: block;
  position: relative;
  opacity: 0.5;
  &:not(:last-child) {
    padding-bottom: 10vw;
  }


`

const Preview = ({ slug, title, imageData }) => (
    <Project
      to={`/${slug}`}
      exit={{ length: 0.75, zIndex: 0 }}
      onClick={Mouse.set}
      entry={{ length: 0 }}
    >
      <Image fluid={imageData} alt={title} />
    </Project>
)

export default Preview
