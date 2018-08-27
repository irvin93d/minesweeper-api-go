import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { getMinefieldMineCell } from './selectors'
import { openCell } from './actions'
import classNames from 'classnames/bind'
import { MINE } from './constants'

import './Minecell.css'

class Minecell extends React.Component {
  render() {
    const classes = classNames({
      'Minecell': true,
      'Minecell-open': this.props.isOpen,
      'Minecell-closed': !this.props.isOpen,
      'Minecell-mine': this.props.content === MINE
    })
    return (
      <div className={classes}>
      </div>
    )
  }
}

Minecell.propTypes = {

  cell: PropTypes.shape({
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired
  }).isRequired,

  isOpen: PropTypes.bool.isRequired,
  content: PropTypes.string,
}

function mapDispatchToProps(dispatch, ownProps) {
  return { 
    open() {dispatch(openCell(ownProps.cell))} 
  }
}

function mapStateToProps(state, ownProps) {
  return { ...getMinefieldMineCell( state, ownProps.cell) }
} 

const ConnectedMinecell = connect(
  mapStateToProps, mapDispatchToProps
)(Minecell)

export default ConnectedMinecell
