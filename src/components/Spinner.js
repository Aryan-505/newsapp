import React, { Component } from 'react'

export default class spinner extends Component {
  render() {
    return (
      <div>
        <div className="container text-center">
        <div className="spinner-border my-3" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
      </div>
      </div>
    )
  }
}
