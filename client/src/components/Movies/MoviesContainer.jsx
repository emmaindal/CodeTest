import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Movies } from './Movies'
import { ErrorMessage } from '../utils/ErrorMessage'
import { Loader } from '../utils/Loader'

// sorting algorithm to sort the data by release date
// takes the the release data of a and b and converts it to a date format
// returns the sorted data
const sortDataByDate = data => {
  data.sort((a, b) => {
    let dateA = new Date(a.release_date)
    let dateB = new Date(b.release_date)
    return dateA - dateB
  })
  return data
}

export const MoviesContainer = () => {
  const [movies, setMovies] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  // makes api request when component is mounted
  useEffect(() => {
    setTimeout(() => {
      axios('https://swapi.co/api/films/')
        .then(({ data: { results } }) => {
          setMovies(sortDataByDate(results))
        })
        .catch(err => {
          setErrorMessage('Could not load movies')
        })
    }, 1000)
  }, [])

  // if movies is not set, a loader will be rendered
  // if movies is set, the movies will be rendered
  // if not movies is set but errormessage is set (means that the request failed)
  // a error message will show that no movies could be loaded
  return (
    <Wrapper>
      {movies || errorMessage ? (
        <StyledMovies>
          {errorMessage ? (
            <ErrorMessage error={errorMessage} />
          ) : (
            <Movies movies={movies} />
          )}
        </StyledMovies>
      ) : (
        <Loader width={100} height={100}/>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMovies = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

