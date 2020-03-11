import styled from "styled-components"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


let Wrap = styled(SimpleBar)`
  position: fixed;
  top: 0;
  left: 0;
  /* overflow-y: scroll;
  overflow-x: hidden; */
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  ${ props => props.black ? `background-color: #000;
  color: #fff;  
  ` : ''}
  
`

export default Wrap