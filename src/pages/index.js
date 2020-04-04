import React, {useRef, useState, useEffect} from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Wrap from "../components/wrap"
import Folio from "../components/folio"

import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
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
            tag
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

  const projects = data.allProjectsJson.edges
  const scrollRef = useRef(null)
  const [scroll, setScroll] = useState({top: scrollTop, speed: 0})

  //useRef to make throttle work
  const throttleMouse = useRef(
    throttle((x, y) => set({ xy: calc(x, y) }), 100)
  ).current
  
  
  const throttleScroll = useRef(
    throttle(() => {
      if (scrollRef) {
        let scrollProgress =
          scrollRef.current.scrollTop /
          (scrollRef.current.scrollHeight - window.innerHeight)
        setScroll(({top}) => ({top: scrollProgress, speed : top - scrollProgress}))
      }
    }, 100)
  ).current

  const debounceScroll = useRef(
    debounce(() => {
        setScroll(({speed, ...prev}) => ({speed: 0, ...prev}))
    }, 100)
  ).current 


  const onScroll = () => {
    throttleScroll()
    debounceScroll()
  }

  useEffect(() => {
    let ref = scrollRef.current
    ref.scrollTo(0, scrollTop)
    return () => {
      scrollTop = ref.scrollTop
    }
  }, [])

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

  const [parallax, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  return (
    <Wrap
      scrollableNodeProps={{
        ref: scrollRef,
        onScroll: onScroll,
        onMouseMove: ({ clientX: x, clientY: y }) => throttleMouse(x, y),
      }}
    >
      <Layout title="Home" to="/about" parallax={parallax}>
        <Folio
          scroll={scroll}
          projects={projects.map(({ node: p }) => p)}
          parallax={parallax}
        />
        {projects.map(({ node: p }) => {
          return <Dummy key={p.slug} id={p.slug} />
        })}
      </Layout>
    </Wrap>
  )
}

export default IndexPage
