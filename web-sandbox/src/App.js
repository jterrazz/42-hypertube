import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactPlayer from 'react-player'

class App extends Component {
  render () {
    return <ReactPlayer url='http://localhost:3000/torrents/694A30529C5FEDEE702053FA1E31291F54476387/stream' playing controls />
  }
}

export default App;
