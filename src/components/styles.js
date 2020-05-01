import styled from "styled-components"
import { animated } from "react-spring"
import { design } from "../components/utils"

const Title = styled(animated.div)`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 50px 0 0 0;
  * {
    margin: 0;
  }
  @media (max-width: 768px) {
    align-self: flex-end;
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
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  h2 {
    margin: 0;
    align-self: flex-end;
    font-size: 14px;
    font-variation-settings: "wght" 350, "wdth" 85, "slnt" 0;
    letter-spacing: 2px;
    padding-right: 1vw;
  }
`

const Desc = styled(animated.div)`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.08em;
  margin: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: inherit;
    text-transform: none;
    transition-property: font-variation-settings, letter-spacing;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-transform: capitalize;
    line-height: 30px;
    a {
    padding: 10px;

    &:hover {
      font-variation-settings: "wght" 500, "wdth" 85, "slnt" 0;
      letter-spacing: 2px;
    }
  }

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
  }
  p {
    a{
      font-variation-settings: "wght" 500, "wdth" 85, "slnt" 15;
      &:hover {
      font-variation-settings: "wght" 300, "wdth" 89, "slnt" 15;
    }
    }
    max-width: 50%;
    align-self: right;
    margin: 0;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
`

const Wrap = styled.div`
  > div {
    padding-top: var(--nav-size);
    padding-left: var(--gutter);
    padding-right: var(--gutter);
    display: flex;
    flex-direction: column;
  }

  width: 100vw;
  overflow: hidden;

  hr {
    border: 1px solid ${design.white.fg};
    align-self: center;
    width: 100vw;
    opacity: 0.5;
    margin: 80px 0;
    @media (max-width: 768px) {
      margin: 30px 0;
      border: 0px;
    }
  }
`

const intWrap = (x, y) => `translate3d(${x * 0.025}px,${y * 0.025}px,0)`
const intTitle = (x, y) => `translate3d(${x * 0.005}px,${y * 0.005}px,0)`

export { Title, Desc, Wrap, intWrap, intTitle }
