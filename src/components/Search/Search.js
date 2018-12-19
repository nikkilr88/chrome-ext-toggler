import React, { Component } from 'react'
import AppInfo from '../AppInfo'

class Search extends Component {
  componentDidMount() {
    this.searchInput.focus()
  }
  render() {
    const { handleSearch, toggleSearch } = this.props

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
      </div>
    )
  }
}

export default Search
