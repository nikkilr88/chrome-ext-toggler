import React, { Fragment, useContext } from 'react'
import ExtensionItem from '../ExtensionItem/ExtensionListItem'
import Search from '../Search/Search'
import { ExtensionContext } from '../../contexts/ExtensionContext'
import { StyledTitle } from './ExtensionWrapper.styles'

const ExtensionsWrapper = () => {
  const { disableAll, showSearch, extensions } = useContext(ExtensionContext)

  const extensionList = extensions.map((ext, i) => (
    <ExtensionItem key={i} index={i} ext={ext} />
  ))

  const blur = {
    filter: 'blur(2px)',
    pointerEvents: 'none'
  }

  return (
    <Fragment>
      <StyledTitle>
        <h3>Extensions</h3>
        <span className="turn-off" onClick={disableAll}>
          Disable all
        </span>
      </StyledTitle>
      {showSearch && <Search />}
      <ul style={showSearch ? blur : null}>{extensionList}</ul>
    </Fragment>
  )
}

export default ExtensionsWrapper
