import React, { Fragment } from 'react'
import Header from '../Header/Header'
import ExtensionsWrapper from '../ExtensionsWrapper/ExtensionsWrapper'
import { StyledContainer } from './App.styles'
import { GlobalStyle } from '../../GlobalStyle.style'

const App = () => {
  return (
    <Fragment>
      <StyledContainer>
        <Header />
        <ExtensionsWrapper />
      </StyledContainer>
      <GlobalStyle />
    </Fragment>
  )
}

export default App
