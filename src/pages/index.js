import React, {useRef, useState, useEffect} from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Wrap from "../components/wrap"
import Folio from "../components/folio"

import throttle from 'lodash.throttle'
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

const Dummy = styled.div`
  height: 100vh;
  width: 100vw;
  /* border: 1px red solid; */
  &&:nth-child(2){
    margin-top: -100vh;
  }
`

let scrollTop = 0

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
  const [scroll, setScroll] = useState(scrollTop)
  

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

  useEffect(() => {
    scrollRef.current.scrollTo(0, scrollTop)
    return () => {
      scrollTop = scrollRef.current.scrollTop
    }
  }, [])

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

  const [parallax, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

  return (
    <Wrap scrollableNodeProps={{ ref: scrollRef, onScroll : onScroll, onMouseMove: ({ clientX: x, clientY: y }) => set({ xy: calc(x, y) }) }}>
    <Layout title="Home" to="/about">
    <Folio scroll={scroll} projects={projects.map(({node: p}) => p)} parallax={parallax}/>
      {projects.map(({ node: p}) => {
        const imageData = p.images[0].childImageSharp.fluid
        return(
        <Dummy key={p.slug} id={p.slug}/>
        )
      })}
      
    </Layout>
    </Wrap>
  )
}

export default IndexPage
