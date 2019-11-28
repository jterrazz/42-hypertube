import React, {Component} from 'react';
import {Torrent} from '../components/templates/Torrent';
import {authentified} from "../wrappers/auth";
import { magnetDecode } from '@ctrl/magnet-link';
import ROOT_URL from "../config/index"

class TorrentPlay extends Component {
  state = {
    magnet: '',
    ErrorMagnet: '',
    urlPlay: ''
  };

  onClick = () => {
    const magnet = magnetDecode(this.state.magnet);
    if (!magnet.announce.length){
      this.setState({ErrorMagnet: 'error magnet'});
      return;
    }

    const i = magnet.announce.length;
    var tr = '';
    magnet.announce.map((item, index) => {
      tr.concat('tr=', item);
      if (i - 1 !== index)
        tr.concat('&');
    }, tr);
    const tmp = `${ROOT_URL.ROOT_URL}/torrent/${magnet.infoHash}/`;
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
      />
    )
  }
}

export default authentified(true)(TorrentPlay);
