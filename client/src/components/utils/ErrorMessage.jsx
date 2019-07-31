import React from 'react'
import styled from 'styled-components'

export const ErrorMessage = ({ error }) => {
  return (
    <Error>
      <p>{error}</p>
    </Error>
  )
}

const Error = styled.div``
