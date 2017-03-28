import {fetcho, getAbsoluteUrl, getJson} from './api';

export const get = filters => fetcho.get(getAbsoluteUrl('/streams'), filters).then(getJson);

export const like = (id, token) => fetcho.post(getAbsoluteUrl(`/streams/${id}/add_like`), {token}).then(getJson);
export const unlike = (id, token) => fetcho.post(getAbsoluteUrl(`/streams/${id}/remove_like`), {token}).then(getJson);
