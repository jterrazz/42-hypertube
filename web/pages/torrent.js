import React, {Component} from 'react';
import {Torrent} from '../components/templates/Torrent';
import {authentified} from "../wrappers/auth";
import { magnetDecode } from '@ctrl/magnet-link';
import ROOT_URL from "../config/index"

class TorrentPlay extends Component {
  state = {
    magnet: '',
    ErrorMagnet: '',
    urlMovieTorrent: null
  };

  onClick = () => {

    const magnet = magnetDecode(this.state.magnet);
    if (!magnet.announce.length){
      this.setState({ErrorMagnet: 'error magnet'});
      return;
    }

    let tr = '';
    const nb = magnet.announce.length;

    magnet.announce.map((item, index) => {
      tr = tr.concat('tr=', item);
      if (nb - 1 !== index)
        tr = tr.concat('&');
    }, tr);

    const url = `${ROOT_URL.ROOT_URL}/torrent/${magnet.infoHash}/stream?${tr}`;
    this.setState({urlMovieTorrent: url})
  };

  onChange = (ev) => {
    this.setState({magnet: ev.target.value, ErrorMagnet: ''});
  };

  render() {
    return (
      <Torrent
        magent={this.state.magnet}
        onChange={this.onChange}
        onClick={this.onClick}
        error={this.state.ErrorMagnet}
        urlMovieTorrent={this.state.urlMovieTorrent}
      />
    )
  }
}

export default authentified(true)(TorrentPlay);
