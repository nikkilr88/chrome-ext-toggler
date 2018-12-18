import React, { Component, Fragment } from 'react'
import Header from './Header'
import AppInfoWrapper from './AppInfoWrapper'

class App extends Component {
  componentDidMount() {
    this.props.getApps()
  }
  render() {
    return (
      <Fragment>
        {!this.props.loading && (
          <div className="container">
            <Header />
            <p style={{ textAlign: 'center' }}>dev mode</p>
            <AppInfoWrapper />
          </div>
        )}
      </Fragment>
    )
  }
}

export default App
