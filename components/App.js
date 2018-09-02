import React, { Component } from 'react';
import './App.css';
import { ConnectedMinefield } from './Minefield';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConnectedMinefield />
      </div>
    );
  }
}

export default App;
