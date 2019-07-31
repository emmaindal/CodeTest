import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const Movie = ({ movies }) => {
  // component state
  const [movieIsSelected, setMovieIsSelected] = useState({
    selected: false,
    movie: {},
    characters: undefined
  })

  // make api request of every character based on the character urls in movies
  // return a array of characterNames
  const getCharacters = async ({ characters }) => {
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
    <React.Fragment>
      {!movieIsSelected.selected &&
        movies.map(movie => (
          <MovieSection
            key={movie.title}
            onClick={() => handleClickOnMovie(movie)}
          >
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
          </MovieSection>
        ))}

      {movieIsSelected.selected && (
        <div>
          <h3>{movieIsSelected.movie.title}</h3>
          <h5>Characters</h5>
          <ul>
            {movieIsSelected.characters.map(character => (
              <li key={character}>{character}</li>
            ))}
          </ul>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </React.Fragment>
  )
}

// styles
const MovieSection = styled.div`
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  padding: 0 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:hover {
    background: lightgray;
    transition: 0.5s background;
  }
`
