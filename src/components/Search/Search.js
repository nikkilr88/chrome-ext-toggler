import React, { Component, Fragment } from 'react'
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
        <button onClick={toggleSearch} className="close-search">
          &times;
        </button>
      </div>
    )
  }
}

export default Search
