import React from "react"
import { graphql } from "gatsby"
import Image from 'gatsby-image'

import styled from "styled-components"
import { TransitionState } from "gatsby-plugin-transition-link"
import { Spring } from "react-spring/renderprops"


import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"

export const query = graphql`
    query($slug: String!){
        projectsJson(slug: { eq: $slug }) {
            title
            date
            description
            video
            images {
                childImageSharp { 
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`

const ProjectTemplate = ({ data }) => {
  const project = data.projectsJson
  console.log(project)

  return (
    <Layout>
      <h1>{project.title}</h1>
      <p>{project.date}</p>
      <p>{project.description}</p>
      {project.images.map((img, i) => {
        const imageData = img.childImageSharp.fluid
        return <Image fluid={imageData} key={`${project.title}-${i}`} alt={`${project.title}-${i}`} />
      })}
    </Layout>
  )
}

export default ProjectTemplate
