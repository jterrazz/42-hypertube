import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import ApiURL from "../utils/ApiURL";
import {CardPosterFilm} from "./components/molecules/CardPosterFilm";
import Grid from "@material-ui/core/Grid";

axios.defaults.withCredentials = true;

class App extends React.Component {
  state = {
    breweries: [],
    pageNumber: 1,
    hasMore: true
  };

  componentDidMount() {
    //initial request is sent
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(`${ApiURL.movies_search}query=the&source=yts&page=${this.state.pageNumber}`)
      .then(res =>
        this.setState({
          //updating data
          breweries: [...this.state.breweries, ...res.data.movies],
          //updating page numbers
          pageNumber: this.state.pageNumber + 1,
          hasMore: res.data.movies.length > 0
        })
      );
  };

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.breweries.length} //This is important field to render the next data
        next={this.fetchData}
        hasMore={this.state.hasMore}
      >
        <Grid container spacing={4}>
          {this.state.breweries.map((brewery, index) => (
            <CardPosterFilm {...brewery} key={index}/>
          ))}
        </Grid>
      </InfiniteScroll>
    );
  }
}

export default App;
