import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Nav from "../components/nav"
import Preview from "../components/preview"

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
    <Layout>
      <SEO title="Home" />
      <h1>Home</h1>
      <Nav to="/about">about me</Nav>
      {projects.map(({ node: p}) => {
        const imageData = p.images[0].childImageSharp.fluid
        return(
        <Preview slug={p.slug} title={p.title} date={p.date} imageData={imageData} />
        )
      })}
      
    </Layout>
  )
}

export default IndexPage
