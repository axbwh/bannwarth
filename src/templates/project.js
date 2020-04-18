import React, {useState} from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { animated, useSpring } from "react-spring"
import Header from "../components/Header"
import Bookmarks from "../components/bookmarks"
import * as Mouse from '../components/mouse'

import styled from "styled-components"

import Layout from "../components/layout"
import Link from '../components/link'
import { design } from "../components/utils"
import { Title, Desc, Wrap } from "../components/styles"


export const query = graphql`
    query($slug: String!){
        all : allProjectsJson {
          edges {
            node {
              slug
              title
            }
          }
        }
        project : projectsJson(slug: { eq: $slug }) {
            slug
            title
            date
            description
            video
            tags
            images {
                childImageSharp { 
                    fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`
const Frame = styled.div`
  overflow: hidden;
  margin-bottom: 150px;
  @media (max-width: 768px) {
    margin-bottom: 40px;
  } 
`

const Next = styled(Link)`
    text-decoration: none;
    color: inherit;
    position: fixed;
    right : 0;
    bottom: 0;
    z-index: 2;

    font-size: 14px;
    font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
    letter-spacing: 1px;
    line-height: 20px;

    padding: var(--nav-padding);
    transition: all 1s ${design.ease};
    pointer-events: all;
    display: block;

    &:hover {
      font-variation-settings: "wght" 1100, "wdth" 95, "slnt" 0;
      letter-spacing: 2px;
    }
    @media (max-width: 768px) {
      writing-mode: vertical-lr;
      padding: calc((var(--gutter) - 20px) / 2);
      padding-bottom: var(--nav-padding);
    }    
`

const intWrap = (x, y) => `translate3d(${x * 0.025}px,${y * 0.025}px,0)`
const intTitle = (x, y) => `translate3d(${x * 0.005}px,${y * 0.005}px,0)`
const intHr = (x, y) => `translate3d(${x * -0.025}px,${y * -0.01}px,0) scale(1.1)`

const ProjectTemplate = ({ data, location : {state} }) => {
  
  const projects = data.all.edges.map(e => e.node)
  const project = data.project

  const index = projects.map(p => p.slug).indexOf(project.slug)
  
  const [scroll, setScroll] = useState(() => ({top: 0, speed: 0}))
  const [parallax, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  const [clip, setClip] = useSpring( () => ({trim: Mouse.calc(0), mask: Mouse.calc(state?.linked ? 0 : Mouse.pos.r)}))

  return (
      <Layout to={`/#${project.slug}`} clip={clip} setClip={setClip} title={project.title} color={design.white} setScroll={setScroll} setParallax={setParallax}>
      
      <Header setClip={setClip} parallax={parallax}>
        <Bookmarks setClip={setClip} scroll={scroll} projects={projects} index={index} />
      </Header>
      <Next setClip={setClip} to={`/${projects[index < projects.length -1 ?  index+1 : 0].slug}`}>Next Project</Next>
        <Wrap>
          <animated.div style={{ transform: parallax.xy.interpolate(intWrap) }}>
            <Title>
              <animated.h1 style={{ transform: parallax.xy.interpolate(intTitle) }}>
                {project.title}
              </animated.h1 >
              <h2>{project.date}</h2>
            </Title>
            <animated.hr style={{ transform: parallax.xy.interpolate(intHr) }}/>
            <Desc>
              <ul>
                {project.tags.map((tag, i) => (
                  <li key={`tag${i}`}>{tag}</li>
                ))}
              </ul>
              <p>{project.description}</p>
            </Desc>
            <animated.hr style={{ transform: parallax.xy.interpolate(intHr) }}/>
            {project.images.map((img, i) => {
              const imageData = img.childImageSharp.fluid
              return (
                <Frame
                  key={`frame-${i}`}
                >
                  <animated.div
                    style={{ transform: parallax.xy.interpolate(intTitle) }}
                  >
                    <Image
                      fluid={imageData}
                      key={`${project.title}-${i}`}
                      alt={`${project.title}-${i}`}
                    />
                  </animated.div>
                </Frame>
              )
            })}
          </animated.div>
        </Wrap>
      </Layout>
  )
}

export default ProjectTemplate
