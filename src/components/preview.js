import React from "react"
import * as Mouse from "./mouse"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"
import Image from "gatsby-image"

const ProjectWrap = styled.div`
  max-height: 80vh;
  max-width: 80vw;
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
    </Link>
  </ProjectWrap>
)

export default Preview
