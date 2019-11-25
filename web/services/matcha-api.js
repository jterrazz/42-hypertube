import axios from "axios"
import * as _ from 'lodash'
import ApiURL from "./ApiURL";

class MatchaAPI {
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:3000',
            withCredentials: true
        });
    }

    /*
     * Auth routes
     */

    signin = async (username, password) => await this.client.post('/auth/signin', { username, password })

    signup = async user => {
        const form = new FormData();

        form.append('firstName', user.firstName);
        form.append('lastName', user.lastName);
        form.append('username', user.userName);
        form.append('password', user.password);
        form.append('email', user.email);
        form.append('profileImage', user.file);

        return await this.client.post('/auth/signup', form)
    }

    postForgotPassword = username => this.client.post(`/me?username=${username}`)

    /*
     * Other routes
     */
    getMovie = async imdbID => {
        const r = await this.client.get(`/movies/${imdbID}`)
        return _.get(r, 'data.movie')
    }

    getHotMovies = async () => {
        const r = await this.client.get(`/movies/hot`)
        return r.data
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
}

export default new MatchaAPI()