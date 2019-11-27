import React, {Component} from 'react';
import { Torrent } from '../components/templates/Torrent';
import {authentified} from "../wrappers/auth";

class TorrentPlay extends Component {
  render () {
    return (
      <Torrent />
    )
  }
}

export default authentified(true)(TorrentPlay);
