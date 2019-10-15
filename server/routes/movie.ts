import * as Router from 'koa-router'

import { searchMoviesController, getMovieController, hotMoviesController } from '../controllers'

const router = new Router()

router.get('/movies/search', searchMoviesController)
router.get('/movies/hot', hotMoviesController)
router.get('/movies/:imdbID', getMovieController)

export default router



