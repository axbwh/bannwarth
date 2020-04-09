import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { animated, useSpring } from "react-spring"
import Trans from "../components/trans"
import Bookmarks from "../components/bookmarks"

import styled from "styled-components"

import Layout from "../components/layout"
import { design } from "../components/utils"


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

const Wrap = styled(animated.div)`
  padding-top: ${design.navSize}px;
  padding-left: 20vw;
  padding-right: 20vw;
  display: flex;
  flex-direction: column;
  /* margin-bottom: -200px; */
  hr{
    border: 1px solid ${design.white.fg};
    align-self: center;
    width: 100vw;
    opacity: 0.5;
    margin: 80px 0;
  }
`

const Title = styled(animated.h1)`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 50px 0 0 0;
  *{
    margin : 0;
  }
  h1 {
    height: 1em;
    text-decoration: none;
    white-space: nowrap;
    text-transform: uppercase;
    font-size: 6vw;
    line-height: 1em;
    color: inherit;
    font-variation-settings: "wght" 1200, "wdth" 85, "slnt" 0;
    letter-spacing: 1vw;
  }
  div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  h2{
    /* line-height: 22px; */
    font-size: 20px;
    font-variation-settings: "wght" 1000, "wdth" 85, "slnt" 0;
  }

  p {
    margin: 0;
    align-self: flex-end;
    font-size: 14px;
    font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
    letter-spacing: 2px;
    padding-right: 1vw;
  }
`

const Desc = styled(animated.p)`
  font-size: 14px;
  font-weight: 500;
  line-height:1.5;
  margin: 0px 0 0px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-transform: capitalize;
  }
  p{
    max-width: 50%;
    align-self: right;
    margin: 0;
  }
`

const Frame = styled.div`
  overflow: hidden;
  margin-bottom: 150px;
  div{
  }
`

const Booknav = styled(Bookmarks)`
  position: sticky;
  align-self: center;
`

const intWrap = (x, y) => `translate3d(${x * 0.025}px,${y * 0.025}px,0)`
const intTitle = (x, y) => `translate3d(${x * 0.005}px,${y * 0.005}px,0)`
const intImg = (x, y) => `translate3d(${x * 0.01}px,${y * 0.01}px,0) scale(1.1)`

const ProjectTemplate = ({ data }) => {
  
  const projects = data.all.edges.map(e => e.node)
  const project = data.project

  const index = projects.map(p => p.slug).indexOf(project.slug)
  
  const [scroll, setScroll] = useSpring(() => ({top: 0, speed: 0, config: { mass: 20, tension: 550, friction: 140 }}))
  const [parallax, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  return (
      <Layout to={`/#${project.slug}`} title={project.title} color={design.grey} setScroll={setScroll} setParallax={setParallax}>
      <Booknav scroll={scroll} projects={projects} index={index} />
        <Wrap style={{ transform: parallax.xy.interpolate(intWrap) }}>
          <Title>
            <animated.h1
              style={{ transform: parallax.xy.interpolate(intTitle) }}
            >
              {project.title}
            </animated.h1>
            <p>{project.date}</p>
          </Title>
          <hr/>
          <Desc>
            <ul>
              {project.tags.map(tag => (
                <li>{tag}</li>
              ))}
            </ul>
            <p>{project.description}</p>
          </Desc>
          <hr/>
          {project.images.map((img, i) => {
            const imageData = img.childImageSharp.fluid
            return (
              <Frame>
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
        </Wrap>
      </Layout>
  )
}

export default ProjectTemplate
