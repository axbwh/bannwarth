import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Preview from "../components/preview"
import Wrap from "../components/wrap"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allProjectsJson {
        edges {
          node {
            title
            slug
            date
            images {
              childImageSharp {
                fluid(maxWidth: 1920)  {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  const projects = data.allProjectsJson.edges

  return (
    <Wrap>
    <Layout title="Home" to="/about">
      {projects.map(({ node: p}) => {
        const imageData = p.images[0].childImageSharp.fluid
        return(
        <Preview slug={p.slug} title={p.title} date={p.date} imageData={imageData} />
        )
      })}
    </Layout>
    </Wrap>
  )
}

export default IndexPage
