import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col, Navbar, Form, FormGroup, Label, Input, Button} from 'reactstrap';
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

  handleClick(row, col, action) {
    this.props.updateCell(row, col, action)
  };
  
  renderGrid() {
    const grid = this.props.game || { cells:[], rows: 0, cols: 0 }
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
      <div className='minefield'>
        {this.renderGrid()}
      </div>
    );
  }
}


class SideBar extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const rows = parseInt(document.getElementById('rows').value, 10);
    const cols = parseInt(document.getElementById('cols').value, 10);
    const mines = parseInt(document.getElementById('mines').value, 10);
    this.props.newGame(rows, cols, mines);
  }

  render() {
    return (
      <Navbar className='sidebar'>
        <h1> Minesweeper </h1>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Button color='primary'>New Game</Button>
          <FormGroup>
            <Label for="rows">Rows</Label>
            <Input type="number" name="rows" id="rows" placeholder="Rows" />
          </FormGroup>
          <FormGroup>
            <Label for="cols">Columns</Label>
            <Input type="number" name="cols" id="cols" placeholder="Columns" />
          </FormGroup>
          <FormGroup>
            <Label for="mines">Mines</Label>
            <Input type="number" name="mines" id="mines" placeholder="Mines" />
          </FormGroup>
        </Form>
      </Navbar>
    );
  }
}

class MainFrame extends React.Component {

  constructor(props) {
    super(props)
    this.state = {game: null}
  }

  updateCell(row, col, action) {
    console.log(action)
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
        this.setState({game:result});
      },
      (error) => {
        console.error(error);
      }
    );
  }

  newGame(rows, cols, mines) {
    console.log('New game');
    console.log(rows, cols, mines);
    fetch('http://127.0.0.1:8080/api/minesweeper',{
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rows: rows,
          cols: cols,
          mines: mines,
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          result.cells = result.cells.reduce( (a,b) => {
              return a.concat(b);
            });
          this.setState({game:result});
        },
        (error) => {
          console.error(error);
        }
      );
  }

  handleClick(e) {
    this.setState({val:'you'})
  }

  render() {
    return (
      <Container onClick={this.handleClick.bind(this)} className='mainframe'>
        <Row>
          <Col xs='12' lg='4'> 
            <SideBar newGame={this.newGame.bind(this)} />
          </Col>
          <Col xs='12' lg='8'>
            <MineField game={this.state.game} updateCell={this.updateCell.bind(this)} />
          </Col>
        </Row>
      </Container>
    );
  } 
}

ReactDOM.render(
     <MainFrame />,
    document.getElementById('root')
);

