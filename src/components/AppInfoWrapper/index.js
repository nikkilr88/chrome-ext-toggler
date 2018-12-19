import React from 'react'
import AppInfoWrapper from './AppInfoWrapper'
import { ExtensionContext } from '../../contexts/ExtensionContext'

export default () => (
  <ExtensionContext.Consumer>
    {({
      extensions,
      disableAll,
      handleSearch,
      searchValue,
      showSearch,
      toggleSearch
    }) => (
      <AppInfoWrapper
        extensions={extensions}
        disableAll={disableAll}
        handleSearch={handleSearch}
        searchValue={searchValue}
        showSearch={showSearch}
        toggleSearch={toggleSearch}
      />
    )}
  </ExtensionContext.Consumer>
)
