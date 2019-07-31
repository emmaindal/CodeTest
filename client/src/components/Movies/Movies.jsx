import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Loader } from '../utils/Loader';

export const Movies = ({ movies }) => {
  // component state
  const [movieIsSelected, setMovieIsSelected] = useState({
    loading: false,
    selected: false,
    movie: {},
    characters: undefined
  })

  // make api request of every character based on the character urls in movies
  // return a array of characterNames
  const getCharacters = async ({ characters }) => {
    setMovieIsSelected({loading: true})
    let characterNames = characters.map(async url => {
      const { data } = await axios(url)
      return data.name
    })
    return await Promise.all(characterNames)
  }

  // get character names, set component state for the selected movie
  const handleClickOnMovie = async movie => {
    const characters = await getCharacters(movie)
    setMovieIsSelected({  
      selected: true,
      movie: movie,
      characters: characters
    })
  }

  // set the selected movie state to false which will render the movie section component
  const handleGoBack = () => {
    setMovieIsSelected({ selected: false })
  }

  return (
    <MoviesContainer>
      {movieIsSelected.loading && (
        <Loader width={100} height={100}/>
      )}
      {!movieIsSelected.selected && !movieIsSelected.loading &&
       <MovieList>
        <h1>Star Wars Movies</h1>
        <Headings>
          <Heading>Title</Heading>
          <Heading>Release Date</Heading>
        </Headings>
        {movies.map(movie => (
          <Row
            clickable
            key={movie.title}
            onClick={() => handleClickOnMovie(movie)}
          > 
            <li>{movie.title}</li>
            <li>{movie.release_date}</li>
          </Row>
        ))}
         </MovieList>
        }
      {movieIsSelected.selected && (
        <SelectedMovie>
          <Header>
            <h1>{movieIsSelected.movie.title}</h1>
            <Button onClick={handleGoBack}>back to movies</Button>
          </Header>
          <Headings>
            <Heading>Characters</Heading>
          </Headings>
          {movieIsSelected.characters.map(character => (
            <Row>
              <li key={character}>{character}</li>
            </Row>
          ))}
      </SelectedMovie>
      )}
   </MoviesContainer>
  )
}

const MoviesContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieList = styled.div`
  width: 80vw;
`;

const Headings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2%;
`

const Heading = styled.h4`
  color: #848484;
  text-transform: uppercase;
`

const Row = styled.div`
  li{
    list-style-type: none;
    padding: 2% 0;
  }
  border-bottom: 1px solid #2b2b2b;
  padding: 0 2%;
  cursor: ${props => props.clickable? 'pointer' : 'arrow'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${props => props.clickable? 'rgb(35, 35, 35, 0.7)' : 'none'};
    transition: 0.5s background;
  }
`

const SelectedMovie = styled.div`
  width: 80vw;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    margin-right: 2%;
  }
`;

const Button = styled.button`
  height: 20px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  background: #EF6C00;
  border-radius: 5px;
  border: none;
`;