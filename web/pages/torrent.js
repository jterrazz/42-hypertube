import React, {Component} from 'react';
import {Torrent} from '../components/templates/Torrent';
import {authentified} from "../wrappers/auth";
import { magnetDecode } from '@ctrl/magnet-link';
import config from "../config/index"

class TorrentPlay extends Component {
  state = {
    magnet: '',
    ErrorMagnet: '',
    urlMovieTorrent: null,
    name: ''
  };

  onClick = () => {

    const magnet = magnetDecode(this.state.magnet);
    console.log(magnet)
    if (!magnet.tr.length){
      this.setState({ErrorMagnet: 'No tracker available tracker'});
      return;
    }

    const tr = magnet.tr.join('&tr=');
    const url = `${config.ROOT_URL}/torrents/${magnet.infoHash}/stream?tr=${tr}`; // TODO Use API Builder
    this.setState({urlMovieTorrent: url, name: magnet.name})
  };

  onChange = (ev) => {
    this.setState({magnet: ev.target.value, ErrorMagnet: '', name: ''});
  };

  render() {
    return (
      <Torrent
        magent={this.state.magnet}
        onChange={this.onChange}
        onClick={this.onClick}
        error={this.state.ErrorMagnet}
        urlMovieTorrent={this.state.urlMovieTorrent}
        name={this.state.name}
      />
    )
  }
}

TorrentPlay.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default authentified(true)(TorrentPlay);
