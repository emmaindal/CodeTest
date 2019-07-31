import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Movie } from './Movie'
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

export const Movies = () => {
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
    }, 2000)
  }, [])

  // if movies is not set, a loader will be rendered
  // if movies is set, the movies will be rendered
  // if not movies is set but errormessage is set (means that the request failed)
  // a error message will show that no movies could be loaded
  return (
    <React.Fragment>
      {movies || errorMessage ? (
        <StyledMovies>
          <Headings>
            <Heading>Title</Heading>
            <Heading>Release Date</Heading>
          </Headings>
          {errorMessage ? (
            <ErrorMessage error={errorMessage} />
          ) : (
            <Movie movies={movies} />
          )}
        </StyledMovies>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  )
}

// styles
const StyledMovies = styled.div`
  width: 30%;
`

const Headings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Heading = styled.h4`
  text-transform: uppercase;
`
