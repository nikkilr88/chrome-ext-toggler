import React from 'react'
import LogoLight from '../../images/logo-light.png'
import { StyledHeader } from './Header.styles'

const Header = () => {
  return (
    <StyledHeader>
      <img className="logo" src={LogoLight} alt="logo" />
    </StyledHeader>
  )
}

export default Header
