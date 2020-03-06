import React from "react"
import * as Mouse from "./mouse"
import styled from "styled-components"
import Link from "gatsby-plugin-transition-link"
import Image from 'gatsby-image'

const Preview = ({ slug, title, date, imageData }) => (
    <Link
      to= {`/${slug}`}
      exit={{ length: 0.75, zIndex : 0 }}
      onClick={Mouse.set}
      entry={{ length: 0 }}
    >
      <Image fluid={imageData} alt={title}/>
      <p>date</p>
    </Link>

)

export default Preview