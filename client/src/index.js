import React from 'react';
import ReactDOM from 'react-dom';
import { Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class MineCell extends React.Component {

  handleClick(e) {
    e.preventDefault();
    const row = this.props.row;
    const col = this.props.col;
    if(this.props.open)
      return;
    if(e.type === 'click')
      this.props.handleClick(row, col, 'open');
    else if (e.type === 'contextmenu') 
      this.props.handleClick(row, col, this.props.flag ? 'unflag' : 'flag');
  };

  render() {
    const content = this.props.content 
    const flag = this.props.flag ? 'flag' : '' ;
    const status = this.props.open ? 'open' : 'closed';
    let className = 'minecell';
    className += ' ' + status;
    className += content || flag ? ' with' + (content || flag) : '';

    return (
      <div
        className={className}
        style={this.props.divStyle}
        onClick={this.handleClick.bind(this)}
        onContextMenu={this.handleClick.bind(this)}
      >
      </div>
    );
  }
}

class MineField extends React.Component {
  constructor(props) {
    super(props);
    this.newGame();

    this.state = 
      {
        cells:[],
        rows: 0,
        cols: 0
      }
  }
  newGame(rows, cols, mines) {
    fetch('http://127.0.0.1:8080/api/minesweeper',{
        method: 'POST'
      })
      .then(res => res.json())
      .then(
        (result) => {
          result.cells = result.cells.reduce( (a,b) => {
              return a.concat(b);
            });
          this.setState(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  updateCell(row, col, action) {
    console.log('Unflaging')
    fetch('http://127.0.0.1:8080/api/minesweeper', {
      method: 'PUT',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        row: row,
        col: col,
        action: action,
      })
      
    })
    .then(res => res.json())
    .then(
      (result) => {
        result.cells = result.cells.reduce( (a,b) => {
            return a.concat(b);
          });
        this.setState(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleClick(row, col, action) {
    this.updateCell(row, col, action)
  };
  
  renderGrid() {
    const grid = this.state;
    const size = 100/grid.cols
    const margin = 1;
    const divStyle = {
      margin: margin + 'px',
      width: 'calc(' + size + '% - ' + margin*2 + 'px)',
      paddingBottom: size + '%'
    };
    return grid.cells.map((cell, i) => {
      const col = i % grid.cols;
      const row = Math.floor(i/grid.cols);
      return <MineCell 
              key={i} divStyle={divStyle} row={row} col={col}
              flag={cell.flag} open={cell.open} content={cell.content}
              handleClick={this.handleClick.bind(this)}
              />
    });
  }

  render() {
    return (
      <Container>
        <div className='minefield'>
          {this.renderGrid()}
        </div>
      </Container>
    );
  }
}

ReactDOM.render(
    <MineField />,
    document.getElementById('root')
);

