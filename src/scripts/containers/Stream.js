import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/streams.scss';

import {queueDuration, duration} from '../lib/duration';

const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  stream: {...ownProps.stream,
    listened: ownProps.stream.history_listeners.includes(state.session.user.id),
    duration: duration(queueDuration(ownProps.stream.playlist.songs))
  }
})

const mapDispatchToProps = dispatch => ({

});

class Stream extends Component {

  static propTypes = {
  }

  render() {
    const stream = this.props.stream;
    return (
      <div className={`${bp['col-xs-12']} ${styles.stream}`}>

        <div className={`${bp['col-xs-2']} ${styles.img}`}>
          <img src={stream.artwork_url} alt='artwork_url' style={{height: '100px', width: '100px'}} />
          <span className={styles.playPause}>
            <i className={'material-icons'}>pause</i>
            <i className={'material-icons'}>play_arrow</i>
          </span>
        </div>

        <div className={`${bp['col-xs-10']} ${styles.textData}`}>
          <div className={`${bp['col-xs-8']} no-padding`} style={{height: '100%'}}>
            <div className={`${styles.title}`}>{stream.playlist.title}</div>
            <div className={`${styles.duration}`}>{stream.playlist.songs.length} songs, {stream.duration}</div>

            <div className={`${bp['col-xs-12']} no-padding ${styles.llArea}`}>
              <div className={`${styles.playerIcon}`}>
                <span className={`${styles.miLike} ${stream.your_likes ? styles.active : ''}`}>
                  <i className={`material-icons ${stream.your_likes ? styles.liked : styles.notLiked}`}>{stream.your_likes ? 'favorite' : 'favorite_border'}</i>
                </span>
                <span className={`${styles.counter}`}>{stream.likes_count}</span>
              </div>
              <div className={`${styles.playerIcon}`}>
                <i className={`material-icons ${styles.miListeners} ${stream.listened ? 'active': ''}`}>&#xE310;</i>
                <span className={`${styles.counter} ${styles.ls}`}>{stream.history_listeners.length}</span>
              </div>
            </div>

            <div className={`${styles.tags}`}>
              {(stream.tags||[]).map(tag =>
                <span className={`${styles.tag}`}>#{tag} </span>
              )}
            </div>
          </div>

          <div className={`${bp['col-xs-4']} no-padding #{bp['pull-right']}`} style={{height: '100%'}}>
            <div className={`${bp['col-xs-12']} no-padding ${styles.author}`}>
              <div>
                <span>posted by</span>
                <a>
                  <img src={stream.user.avatar_url} alt='user avatar' className={`${styles.avatar}`} />
                  <span>{stream.user.name}</span>
                </a>
              </div>
              <div className={styles.playlistTime}>{stream.updated_at}</div>
            </div>
            <div className={`no-padding ${styles.rIcons}`}>
              <div className={`${styles.playerIcon}`}>
                <i className={`material-icons ${styles.miShare}`}>share</i>
              </div>
              <div className={`${styles.playerIcon}`} style={{position: 'relative', top: '-4px'}}>
                <div>
                  <i className={`material-icons ${styles.miTracklist}`}>queue_music</i>
                  <span className={`${styles.counter} ${styles.tracks}`} >{stream.playlist.songs.length}</span>
                </div>
              </div>
              <div className={`${styles.playerIcon}`} style={{position: 'relative', top: '-3px'}}>
                <i className='material-icons'>playlist_add</i>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Stream);