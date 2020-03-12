import React, {useRef, useState} from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Preview from "../components/preview"
import Wrap from "../components/wrap"
import Titles from "../components/titles"

import throttle from 'lodash.throttle'

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
  const scrollRef = useRef(null)
  const [scroll, setScroll] = useState(0)

  //useRef to make throttle work
  const handleScroll = useRef(
    throttle(() => {
      if (scrollRef) {
        let scrollProgress =  scrollRef.current.scrollTop / (scrollRef.current.scrollHeight - window.innerHeight)
        setScroll(scrollProgress)
      }
    }, 50)
  ).current

  const onScroll = () => {
    handleScroll()    
  }

  return (
    <Wrap scrollableNodeProps={{ ref: scrollRef, onScroll : onScroll }}>
    <Layout title="Home" to="/about">
      {projects.map(({ node: p}) => {
        const imageData = p.images[0].childImageSharp.fluid
        return(
        <Preview slug={p.slug} title={p.title} date={p.date} imageData={imageData} />
        )
      })}
      <Titles scroll={scroll} titles={projects.map(({node: p}) => p.title)}/>
    </Layout>
    </Wrap>
  )
}

export default IndexPage
