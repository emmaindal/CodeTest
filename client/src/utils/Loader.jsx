import styled, { keyframes } from 'styled-components'

const keyframe = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid orange;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${keyframe} 2s ease-in-out 0s infinite;
`
