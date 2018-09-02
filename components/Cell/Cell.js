import React from 'react';
import './Cell.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { unflagCell, flagCell, openCell, toggleFlagOnCell } from '../../actions';
import { getMinefieldMineCell } from '../../selectors';


export const MINE = 'MINE';
export const UNKNOWN = 'UNKNOWN';
export const EMPTY = 'EMPTY';
export const CONTENTS = [undefined, MINE, EMPTY, '1', '2', '3', '4', '5', '6', '7', '8'];
export const CLOSED = 'CLOSED';
export const FLAGGED = 'FLAGGED';
export const OPEN = 'OPEN';
export const STATES = [CLOSED, FLAGGED, OPEN];

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    switch (e.type) {
      case 'click':
        this.props.leftClick(this.props.cell);
        break;
      case 'contextmenu':
        this.props.rightClick(this.props.cell);
        break;
      default:
        break;
    }
    return false;
  }

  render() {
    const state = this.props.state;
    const content = this.props.content;
    let style = ['cell', state];
    if(!isNaN(content)) {
      style.push(`surrounding${content}`);
    } else {
      style.push(content || UNKNOWN);
    }
    return (
      <div className={style.join(' ').toLowerCase()} onClick={this.handleClick} onContextMenu={this.handleClick} >
      </div>
    );
  }
}

Cell.propTypes = {
  state: PropTypes.string.isRequired,
  content: PropTypes.string,
  cell: PropTypes.any.isRequired,
  leftClick: PropTypes.func.isRequired,
  rightClick: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({ ...getMinefieldMineCell(state, ownProps.cell) })

const mapDispatchToProps = (dispatch, ownProps) => ({
  leftClick() { dispatch(openCell(this.cell)); },
  rightClick() { dispatch(toggleFlagOnCell(this.cell)); }
})
export default Cell;
export const ConnectedCell = connect(mapStateToProps, mapDispatchToProps)(Cell);