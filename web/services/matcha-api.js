import axios from "axios"
import * as _ from 'lodash'

class MatchaAPI {
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:3000',
            withCredentials: true
        });
    }

    getMovies = async imdbID => {
        const r = await this.client.get(`/movies/${imdbID}`)
        return _.get(r, 'data.movie')
    }
    getHotMovies = async () => {
        const r = await this.client.get(`/movies/hot`)
        return r.data
    }
    postForgotPassword = username => this.client.post(`/me?username=${username}`)

}

export default new MatchaAPI()