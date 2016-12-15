import React, {Component} from 'react';
import SongList from './SongList';
import SearchQueue from '../containers/SearchQueue';
import CurrentQueue from '../containers/CurrentQueue';

import bp from '../../assets/styles/bootstrap.css';

export default class QueueTab extends Component {
  render() {
    return (
      <div className={`${bp.container} h100perc`}>
        <div className={`${bp['col-md-offset-1']} ${bp['col-md-5']} h100perc`}>
          <SearchQueue />
        </div>
        <div className={`${bp['col-md-5']} h100perc`}>
          <CurrentQueue />
        </div>
      </div>
    );
  }
}
