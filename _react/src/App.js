import React, { Component } from 'react'
import './App.css'
//import Minefield from './Minefield'
import ConnectedMinefield from './Minefield.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConnectedMinefield />
      </div>
    )
  }
}

export default App
