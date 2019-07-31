import styled, { keyframes } from 'styled-components'

const keyframe = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Loader = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #EF6C00;
  border-radius: 50%;
  width: ${props => `${props.width}px`};
  height:  ${props => `${props.height}px`};
  animation: ${keyframe} 2s ease-in-out 0s infinite;
`
