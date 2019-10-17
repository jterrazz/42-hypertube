import React, { Component } from 'react'
import axios from 'axios'

axios.defaults.withCredentials= true;

class Page extends Component {
  state = {
    stars: []
  };

  async componentDidMount() {
    const response = await axios.get('http://localhost:3000/movies/hot');

    console.log(response.data.rankedMovies);

    const res = response.data.rankedMovies.popcorn;

    this.setState({ stars: res })
  }
  render () {
    return (
      <div>
        {this.state.stars.map((item, index) => <div key={index}>{item.title}</div>)}
      </div>
    )
  }
}
export default Page