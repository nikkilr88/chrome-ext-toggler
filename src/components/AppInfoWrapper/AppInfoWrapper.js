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

    const extensionList = this.props.extensions
      .filter(ext => {
        if (this.props.searchValue.length > 0) {
          if (ext.name.match(searchReg)) {
            return ext
          }
        } else {
          return ext
        }
      })
      .map((ext, i) => <AppInfo key={i} index={i} ext={ext} />)

    return (
      <Fragment>
        <div className="section-title">
          <h3>Extensions</h3>
          <span className="turn-off" onClick={disableAll}>
            Disable all
          </span>
        </div>
        {showSearch && <Search />}
        <ul>{extensionList}</ul>
      </Fragment>
    )
  }
}

export default AppInfoWrapper
