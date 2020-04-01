import React from "react"
import { graphql } from "gatsby"
import Image from 'gatsby-image'

import Trans from '../components/trans'

// import styled from "styled-components"

import Layout from "../components/layout"

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
    <Trans>
      <Layout title={project.title}>
        <p>{project.title}</p>
        <p>{project.date}</p>
        <p>{project.description}</p>
        {project.images.map((img, i) => {
          const imageData = img.childImageSharp.fluid
          return <Image fluid={imageData} key={`${project.title}-${i}`} alt={`${project.title}-${i}`} />
        })}
      </Layout>
    </Trans>
  )
}

export default ProjectTemplate
