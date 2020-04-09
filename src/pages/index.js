import React, { useState, useRef} from "react"
import { graphql, useStaticQuery } from "gatsby"
import * as Mouse from '../components/mouse'

import Layout from "../components/layout"
import Folio from "../components/folio"

import styled from "styled-components"
import { useSpring } from "react-spring"

const Dummy = styled.div`
  height: 100vh;
  width: 100vw;
  /* border: 1px red solid; */
  &&:nth-child(2){
    margin-top: -100vh;
  }
`


const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allProjectsJson {
        edges {
          node {
            title
            slug
            date
            tags
            prompt
            images {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  const projects = data.allProjectsJson.edges.map(p => p.node)
  const [scroll, setScroll] = useState({top: 0, speed: 0})
  const [parallax, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  const [clip, setClip] = useSpring( () => ({trim: Mouse.calc(Mouse.pos.r), mask: Mouse.calc(Mouse.pos.r)}))
  return (
      <Layout title="Home" to="/about" parallax={parallax} clip={clip} setClip={setClip} setScroll={setScroll} setParallax={setParallax}>
        <Folio
          scroll={scroll}
          projects={projects}
          parallax={parallax}
          setClip={setClip}
        />
        {projects.map( p => {
          return <Dummy key={p.slug} id={p.slug} />
        })}
      </Layout>
  )
}

export default IndexPage
