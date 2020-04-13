import React, { useState} from "react"
import { graphql, useStaticQuery } from "gatsby"
import * as Mouse from '../components/mouse'

import Layout from "../components/layout"
import Folio from "../components/folio"
import Header from "../components/Header"
import Bookmarks from "../components/bookmarks"

import styled from "styled-components"
import { useSpring } from "react-spring"

const Dummy = styled.div`
  height: 100vh;
  width: 100vw;
`

const IndexPage = ({location : {state}, location}) => {
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
  const [scroll, setScroll] = useState({top: 0, speed: 0, render : location.hash ? false : true})
  const [parallax, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  
  const [clip, setClip] = useSpring( () => ({trim: Mouse.calc( state?.linked ? Mouse.pos.r : 0), mask: Mouse.calc(Mouse.pos.r)}))

  return (
      <Layout title="Home" clip={clip} setClip={setClip} setScroll={setScroll} setParallax={setParallax}>
        <Header setClip={setClip} to="/about" top={projects[0].slug} parallax={parallax}>
          <Bookmarks scroll={scroll} projects={projects} setClip={setClip}/>
        </Header>
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
