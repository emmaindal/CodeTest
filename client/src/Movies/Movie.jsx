import React from 'react'
import styled from 'styled-components'

export const Movie = ({ title, release_date }) => {
  const handleClickOnMovie = title => {
    console.log(title)
  }

  return (
    <React.Fragment>
      <MovieSection onClick={() => handleClickOnMovie(title)}>
        <p>{title}</p>
        <p>{release_date}</p>
      </MovieSection>
    </React.Fragment>
  )
}

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
