import React, {useState} from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import ReactPlayer from 'react-player'
import { animated, useSpring } from "react-spring"
import parse from 'html-react-parser'
import Header from "../components/header"
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
            seo
            videos { 
              url
              ratio
              autoplay
              loop
             }
            tags
            images {
                childImageSharp { 
                    fluid(maxWidth: 1920, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                      presentationWidth
                      presentationHeight
                    }
                }
            }
        }
    }
`

const Img = styled(Image)`
      max-width: ${props => props.fluid.presentationWidth}px;
      margin: 0 auto;
`

// const Frame = styled.div`
//   overflow: hidden;
//   margin-bottom: 12vw;
//   flex-grow: 1;
//   flex-basis: ${props => props.width > 800 ? '100%' : '30%' };
//   @media (max-width: 768px) {
//     margin-bottom: 40px;
//   } 
// `

const Frame = styled.div`
  overflow: hidden;
  grid-column: ${props => props.width == props.height ? 'span 2' : 'span 6' };
  flex-basis: calc(${props => props.width == props.height ? '33.3333% - (4vw * 2) / 3' : '100%' });
`

// const Gallery = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: row;
//   justify-content: space-between;
// `

const Gallery = styled.div`
	/* display: grid;
	grid-template-columns: repeat(auto-fill, repeat(6, 1fr));;
	grid-column-gap: 4vw;
  grid-row-gap: 4vw; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4vw;
  margin-bottom: 12vw;

  margin-bottom: 12vw;
  @media (max-width: 768px) {
     margin-bottom: 40px;
  } 
`

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`

const Vid = styled(Frame)`
  position: relative;
  padding-top: calc( ${props => props.ratio  == "100%" ?  "50% - 2vw" : props.ratio}); /* Player ratio: 100 / (1280 / 720) */
  grid-column:  span ${props => props.ratio == "100%" ?  3 : 6};
  flex-basis: calc(${props => props.ratio == "100%" ?  "50% - 2vw" : "100%"});
  /* @media (max-width: 768px) {
    padding-top: ${props => props.ratio};
  } */
    align-self: center; 
    video, iframe{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    :first-child{
      padding-top: calc( ${props => props.ratio  == "100%" ?  "100%" : props.ratio});
      flex-basis: 100%;
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
    font-variation-settings: "wght" 1100, "wdth" 95, "slnt" 0;
    letter-spacing: 0.04em;;
    line-height: 20px;

    padding: var(--nav-padding) calc(var(--nav-padding)*2);
    transition: all 1s ${design.ease};
    pointer-events: all;
    display: block;

    &:hover {
      font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
      letter-spacing: 0.2em;
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
      <Layout to={`/#${project.slug}`} clip={clip} setClip={setClip} title={project.title} description={project.seo} color={design.white} setScroll={setScroll} setParallax={setParallax}>
      
      <Header to="/about" setClip={setClip} parallax={parallax}>
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
              <p>{parse(project.description)}</p>
            </Desc>
            <animated.hr style={{ transform: parallax.xy.interpolate(intHr) }}/>
            <Gallery>
            {
              project.videos.map((vid, i) => {
                // if (vid.type === "youtube") {
                  // const videoURL = vid.type === 'local' ? vid.url.publicURL : vid.url;
                  return (
                    <Vid key={`vidframe-${i}`} ratio={vid.ratio}>
                      <ReactPlayer url={vid.url} width='100%' height='100%' playing={vid.autoplay} loop={vid.loop} controls />
                    </Vid>
                  )
              })
            }
            {project.images.map((img, i) => {
              const imageData = img.childImageSharp?.fluid
              if (!imageData) return null;
              return (
                <Frame width={imageData.presentationWidth} height={imageData.presentationHeight} key={`frame-${i}`} >
                  <animated.div style={{ transform: parallax.xy.interpolate(intTitle) }}>
                    <Img
                      fluid={imageData}
                      key={`${project.title}-${i}`}
                      alt={`${project.title}-${i}`}
                      loading='eager'
                      backgroundColor={true}
                    />
                  </animated.div>
                </Frame>
              )
            })}
            </Gallery>
          </animated.div>
        </Wrap>
      </Layout>
  )
}

export default ProjectTemplate
