import React from 'react'
import Logo from '../images/logo.png'

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="logo" />
    </div>
  )
}

export default Header
