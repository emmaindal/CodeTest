import React from 'react'
import styled from 'styled-components'
import image from './assets/astronomy-constellation-dark-998641.jpg';

import { MoviesContainer } from './components/Movies/MoviesContainer'

function App() {
  return (
    <Application className="App">
      <MoviesContainer />
    </Application>
  )
}

export default App

const Application = styled.div`
  background: 
    linear-gradient(
      rgb(45, 44, 44, 0.6), 
      rgb(20, 17, 17, 0.6)
    ),
    url(${image});
  background-size: cover; 
  color: white;
  font-family: 'Avenir';
`;
