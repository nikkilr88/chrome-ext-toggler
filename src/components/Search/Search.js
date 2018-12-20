import React, { Component } from 'react'
import AppInfo from '../AppInfo'

class Search extends Component {
  componentDidMount() {
    this.searchInput.focus()
  }
  render() {
    const { handleSearch, extensions, searchValue } = this.props
    const searchReg = new RegExp(searchValue, 'gi')

    const searchResults = extensions
      .filter(ext => {
        if (ext.name.match(searchReg)) {
          return ext
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((ext, i) => <AppInfo key={i} index={i} ext={ext} />)

    return (
      <div className="search-wrapper">
        <input
          type="text"
          onChange={handleSearch}
          className="search"
          spellCheck={false}
          ref={input => {
            this.searchInput = input
          }}
        />
        {searchValue.length > 0 && (
          <ul className="search-results">
            {searchResults.length > 0 ? searchResults : <p>No Results :(</p>}
          </ul>
        )}
      </div>
    )
  }
}

export default Search
