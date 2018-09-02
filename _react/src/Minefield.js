import ConnectedMinecell from './Minecell.js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getMinefield } from './selectors'
import { connect } from 'react-redux'

import './Minefield.css'


class Minefield extends Component {

  render() {
    /*
    console.log(this.props.mines.map(
      (row, r) => 
        row.
      ) 
    )
          <tr>
            <td>
              <ConnectedMinecell {...{cell:{row:0,col:2}}} />
            </td>
            <td>
              <ConnectedMinecell {...{cell:{row:1,col:0}}} />
              <ConnectedMinecell {...{cell:{row:1,col:1}}} />
              <ConnectedMinecell {...{cell:{row:1,col:2}}} />
            </td>
            <td>
              <ConnectedMinecell {...{cell:{row:2,col:0}}} />
              <ConnectedMinecell {...{cell:{row:2,col:1}}} />
              <ConnectedMinecell {...{cell:{row:2,col:2}}} />
            </td>
          </tr>
    */
    return (
      <div className="Minefield">
        <div className="Minefield-row">
          <ConnectedMinecell {...{cell:{row:0,col:0}}} />
          <ConnectedMinecell {...{cell:{row:0,col:1}}} />
          <ConnectedMinecell {...{cell:{row:0,col:2}}} />
          <ConnectedMinecell {...{cell:{row:0,col:3}}} />
        </div>
        <div className="Minefield-row">
          <ConnectedMinecell {...{cell:{row:1,col:0}}} />
          <ConnectedMinecell {...{cell:{row:1,col:1}}} />
          <ConnectedMinecell {...{cell:{row:1,col:2}}} />
          <ConnectedMinecell {...{cell:{row:1,col:3}}} />
        </div>
        <div className="Minefield-row">
          <ConnectedMinecell {...{cell:{row:2,col:0}}} />
          <ConnectedMinecell {...{cell:{row:2,col:1}}} />
          <ConnectedMinecell {...{cell:{row:2,col:2}}} />
          <ConnectedMinecell {...{cell:{row:2,col:3}}} />
        </div>
        <div className="Minefield-row">
          <ConnectedMinecell {...{cell:{row:2,col:0}}} />
          <ConnectedMinecell {...{cell:{row:2,col:1}}} />
          <ConnectedMinecell {...{cell:{row:2,col:2}}} />
          <ConnectedMinecell {...{cell:{row:2,col:3}}} />
        </div>
      </div>
    )
  }
}

Minefield.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,

  mines: function(props, propName, componentName) {
    const mines = props[propName]
    if (mines === undefined) {
      return propError(propName, componentName, 'Is required')
    }
    if (!Array.isArray(mines)) {
      return propError(propName, componentName, 'Must be 2 dim array')
    }
    if (mines.length !== props['rows']) {
      return propError(propName, componentName, 'Does not match rows')
    }
    for (let r = 0; r < props.rows; r++) {
      if (!Array.isArray(mines[r])) {
        return propError(propName, componentName, 'Must be 2 dim array')
      }
      if (mines[r].length !== props.cols) {
        return propError(propName, componentName, 'Does not match cols')
      }
    }
  }
}

function propError(propName, componentName, msg) {
  return new Error(
    'Invalid prop `' + propName + '` supplied to `' +
    componentName + '`. ' + msg
  )
}

function mapDispatchToProps() {
  return { }
}

function mapStateToProps(state) {
  return { ...getMinefield(state) }
} 

const ConnectedMinefield = connect(
  mapStateToProps, mapDispatchToProps
)(Minefield)

export default ConnectedMinefield
