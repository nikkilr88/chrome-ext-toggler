import React, { Component, Fragment } from 'react'
import AppInfo from '../AppInfo'
import Search from '../Search'

class AppInfoWrapper extends Component {
  componentDidMount() {
    window.addEventListener('keyup', e => {
      if (e.ctrlKey && e.which === 83) {
        this.props.toggleSearch()
      }
    })
  }

  render() {
    const { searchValue, disableAll, showSearch } = this.props
    const searchReg = new RegExp(searchValue, 'gi')

    const extensionList = this.props.extensions.map((ext, i) => (
      <AppInfo key={i} index={i} ext={ext} />
    ))

    const searchResults = this.props.extensions
      .filter(ext => {
        if (ext.name.match(searchReg)) {
          return ext
        }
      })
      .map((ext, i) => <AppInfo key={i} index={i} ext={ext} />)

    const blur = {
      filter: 'blur(2px)',
      pointerEvents: 'none'
    }
    return (
      <Fragment>
        <div className="section-title">
          <h3>Extensions</h3>
          <span className="turn-off" onClick={disableAll}>
            Disable all
          </span>
        </div>
        <div className="results-wrapper">
          {showSearch && <Search />}
          {searchValue.length > 0 && (
            <ul className="search-results">
              {searchResults.length > 0 ? searchResults : <p>No Results</p>}
            </ul>
          )}
        </div>

        <ul style={showSearch ? blur : {}}>{extensionList}</ul>
      </Fragment>
    )
  }
}

export default AppInfoWrapper
