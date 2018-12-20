import React from 'react'
import Search from './Search'
import { ExtensionContext } from '../../contexts/ExtensionContext'

export default () => (
  <ExtensionContext.Consumer>
    {({ extensions, handleSearch, searchValue }) => (
      <Search
        extensions={extensions}
        handleSearch={handleSearch}
        searchValue={searchValue}
      />
    )}
  </ExtensionContext.Consumer>
)
