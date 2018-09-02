
import { ConnectedCell } from './Cell/Cell';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import './Minefield.css';
import { getMinefield } from '../selectors';

class Minefield extends React.Component {

  render() {
    return (
      <div className="minefield">
        {this.renderMines()}
      </div>
    );
  }

  renderMines() {
    const mines = this.props.mines;
    const cols = this.props.cols;
    const size = 100 / cols
    const margin = size / 100;
    const width = 'calc(' + size + '% - ' + margin * 2 + '%)';
    const divStyle = {
      float: 'left',
      margin: margin + '%',
      height: 0,
      width: width,
      paddingBottom: width,
    };

    return mines.map((cell, i) => {
      cell = Object.assign({ col: i % cols, row: Math.floor(i / cols) })
      return (
        <div key={i} style={divStyle}>
          <ConnectedCell key={i} cell={cell} />
        </div>
      )
    });
  }
}

Minefield.propTypes = {
  mines: PropTypes.array.isRequired,
  cols: PropTypes.number.isRequired
}

export default Minefield;

const mapStateToProps = (state, ownProps) => ({ ...getMinefield(state) });
const mapDispatchToProps = (dispatch, ownProps) => ({});
export const ConnectedMinefield = connect(mapStateToProps, mapDispatchToProps)(Minefield);
