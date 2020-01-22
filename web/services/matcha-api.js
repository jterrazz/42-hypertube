import axios from "axios"
import * as _ from 'lodash'
import config from '../config'

const cookieToStringReducer = cookies => (accumulator, key) => {
  return accumulator + `${key}=${cookies[key]}; `
}

/*
 * External URLS
 */

export const getStreamURL = hash => `${config.ROOT_URL}/torrents/${hash}/stream`

/*
 * Matcha API Client
 */

export class MatchaAPI {
  constructor(cookies = null, rootUrl = config.ROOT_URL) {
    const opt = {
      baseURL: rootUrl,
      withCredentials: true
    }

    if (cookies && cookies['koa:sess' && 'koa:sess.sig']) {
      opt.headers = {
        Cookie: Object.keys(cookies).reduce(cookieToStringReducer(cookies), "")
      }
    }

    this.client = axios.create(opt);
  }

  /*
   * Auth routes
   */

  signin = async (username, password) => {
    const r = await this.client.post('/auth/signin', {
      username,
      password
    })
    return _.get(r, 'data.user')
  }

  signup = async user => {
    const form = new FormData();
    form.append('firstName', user.firstName);
    form.append('lastName', user.lastName);
    form.append('username', user.userName);
    form.append('password', user.password);
    form.append('email', user.email);
    form.append('profileImage', user.file);
    form.append('reCaptcha', user.reCaptcha);

    const { data: { user: retUser } } = await this.client.post('/auth/signup', form)
    return retUser
  }

  signout = async () => await this.client.get('/auth/logout')

  postForgotPassword = username => this.client.post(`/auth/send-reset-email?username=${username}`)
  postResetPassword = data => this.client.post(`/auth/reset-password`, data)

  getMe = async () => {
    const me = await this.client.get('/me')
    return me.data
  }

  patchMe = async (user) => {
    const form = new FormData();

    Object.keys(user).forEach(key => {
      form.append(key, user[key])
    })

    const { data: userData } = await this.client.patch('/me', form)
    return userData
  }

  /*
   * Other routes
   */

  getMovie = async imdbID => {
    const r = await this.client.get(`/movies/${imdbID}`)
    return _.get(r, 'data.movie')
  }

  searchMovies = async ({query, source, sort, reverse, page}) => {
    const r = await this.client.get(`movies/search?query=${encodeURIComponent(query)}&source=${source}&sort=${sort}&reverse=${reverse}&page=${page}`)
    return _.get(r, 'data.movies')
  }

  getHotMovies = async () => {
    const r = await this.client.get(`/movies/hot`)
    return r.data
  }

  getMovieTorrents = async imdbID => {
    const r = await this.client.get(`/movies/${imdbID}/torrents`)
    return _.get(r, 'data')
  }

  getComments = async imdbID => {
    const r = await this.client.get(`/movies/${imdbID}/comments`)
    return _.get(r, 'data.comments')
  }

  getSubtitles = async imdbID => {
    const r = await this.client.get(`/movies/${imdbID}/subtitles`)
    return _.get(r, 'data.subtitles')
  }

  postComment = async (movieId, comment) => {
    const r = await this.client.post(`/movies/${movieId}/comments`, {
      text: comment
    })
    return _.get(r, 'data.comment')
  }

  postMoviePlay = async movieId => await this.client.post(`/movies/${movieId}/play`)

  getUser = async (username) => {
    const { data: user } = await this.client.get(`/users/${username}`)
    return user
  }

  getUsers = async () => {
    const r = await this.client.get('/users')
    return _.get(r, 'data.users')
  }
}

export default new MatchaAPI()
