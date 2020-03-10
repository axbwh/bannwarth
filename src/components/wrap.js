import styled from "styled-components"


let Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  ${ props => props.black ? `background-color: #000;
  color: #fff;  
  ` : ''}
  
`

export default Wrap