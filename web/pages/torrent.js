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
    name: '',
    edit: false
  };

  onClickEdit = () => {
    this.setState({edit: false});
  };

  onClick = () => {

    if (this.state.ErrorMagnet || !this.state.magnet)
      return;

    const magnet = magnetDecode(this.state.magnet);

    if (!magnet.tr || !magnet.infoHash || !magnet.name){
      this.setState({ErrorMagnet: 'Error magnet link!!', urlMovieTorrent: null});
      return;
    }

    if (!magnet.tr.length){
      this.setState({ErrorMagnet: 'No tracker available tracker', urlMovieTorrent: null});
      return;
    }

    this.setState({edit: true});

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
        onClickEdit={this.onClickEdit}
        error={this.state.ErrorMagnet}
        urlMovieTorrent={this.state.urlMovieTorrent}
        name={this.state.name}
        edit={this.state.edit}
      />
    )
  }
}

TorrentPlay.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default authentified(true)(TorrentPlay);
