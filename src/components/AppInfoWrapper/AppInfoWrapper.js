import React, { Component, Fragment } from 'react'
import AppInfo from '../AppInfo'
import Search from '../Search'

class AppInfoWrapper extends Component {
  render() {
    const { disableAll, showSearch, extensions } = this.props

    const extensionList = extensions.map((ext, i) => (
      <AppInfo key={i} index={i} ext={ext} />
    ))

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
        <div className="results-wrapper">{showSearch && <Search />}</div>

        <ul style={showSearch ? blur : {}}>{extensionList}</ul>
      </Fragment>
    )
  }
}

export default AppInfoWrapper
