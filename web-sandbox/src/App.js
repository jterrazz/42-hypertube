import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from 'isomorphic-unfetch'
import ReactPlayer from 'react-player'

function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}


class App extends Component {
  state = {
    json: null
  }
  async componentDidMount() {
    const res = await fetch('http://localhost:3000/movies/hot')
    const json = await res.json()
    console.log(json)
    this.setState({ json })
  }
  render () {
    return <div>Next stars: {this.json}</div>

    return <ReactPlayer url='http://localhost:3000/torrents/694A30529C5FEDEE702053FA1E31291F54476387/stream' playing controls />
  }
}

export default App;
