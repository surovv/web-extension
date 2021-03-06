import {setPlayingSongId} from '../actions/PlayerActions';

import at from 'lodash/at';
import {loadState} from '../store/localStorage.js';

import {getQueueSongs} from './stream';

const CURRENT_QUEUE_ID = -1;
const getPlayingPlaylist = () => window.echoApi.getPlayingPlaylist() || {};
const getSongIndex = (songs, song) => songs.findIndex(sng => sng.id == song.id);
const getFromLocalStorage = path => at(loadState(), path)[0];

export const isEchoApi = () => !!window.echoApi;
export const isPlaylistPlaying = playlistId => getPlayingPlaylist().id == playlistId;
export const getPlayingSongId = () => window.echoApi.getPlayingSongId();
export const isSongPlaying = id => getPlayingSongId() == id;
export const pause = () => window.echoApi.pausePlayingPlaylist();
export const hideRoot = () => document.getElementById('echo-app-ext').style.visibility = 'hidden';


export function either(right, left = () => false) {
  return isEchoApi() ? right() : left();
}

export const maybe = fn => isEchoApi() ? fn() : false;

export function playQueue(songs, playingSongPosition = 0) {
  return window.echoApi.playStream(createStreamData(songs), playingSongPosition);
}

export function playSongFrom(path, song) {
  const songs =  getQueueSongs(getFromLocalStorage(path));
  return playQueue(songs, getSongIndex(songs, song));
}

export const maybeUpdatePlaylistSongs = (path, streamId = CURRENT_QUEUE_ID) => isPlaylistPlaying(streamId) ?
  window.echoApi.updatePlaylistSongs(getQueueSongs(getFromLocalStorage(path)), streamId) : false;

export function playCurrentQueueWith(song) {
  return dispatch => {
    dispatch(setPlayingSongId(song.id));
    return playSongFrom('currentQueue', song);
  }
}

export const getSession = () => ((({EchoToken: token, ...user}) => ({token, user}))(window.echoApi.getSession()));
export const setSession = sessionData => window.echoApi.setSession({...sessionData.user, EchoToken: sessionData.token});

export const maybeReloadRouteAfterStreamPublication = () => window.echoApi.maybeReloadRouteAfterStreamPublication();

export const goToPath = path => window.echoApi.goToPath(path);

function createStreamData(songs) {
  return {
    playlist: {
      title: 'Current Queue',
      songs
    },
    id: CURRENT_QUEUE_ID,
    history_listeners:[]
  }
}
