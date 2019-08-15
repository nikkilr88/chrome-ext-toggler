import React, { Fragment, useContext } from 'react'
import ExtensionItem from '../ExtensionItem/ExtensionListItem'
import Search from '../Search/Search'
import { ExtensionContext } from '../../contexts/ExtensionContext'
import {
  StyledTitle,
  StyledExtensionListWrapper
} from './ExtensionWrapper.styles'

const ExtensionsWrapper = () => {
  const { disableAll, showSearch, extensions } = useContext(ExtensionContext)

  const extensionList = extensions.map((ext, i) => (
    <ExtensionItem key={i} index={i} ext={ext} />
  ))

  return (
    <Fragment>
      <StyledTitle>
        <h3>Extensions</h3>
        <span className="turn-off" onClick={disableAll}>
          Disable all
        </span>
      </StyledTitle>

      {showSearch && <Search />}

      <StyledExtensionListWrapper showSearch={showSearch}>
        {extensionList}
      </StyledExtensionListWrapper>
    </Fragment>
  )
}

export default ExtensionsWrapper
