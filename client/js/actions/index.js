import axios from 'axios'
import {BACKEND_URL} from './../constants/types'

export const FETCH_POSTS = 'fetch_posts';

export const fetchPosts = () => {
    const url = `${BACKEND_URL}/`;
    const request = axios.get(url);
    return {type: FETCH_POSTS, payload: request}
}

