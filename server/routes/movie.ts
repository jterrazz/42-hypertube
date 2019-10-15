import * as Router from 'koa-router'

import {findMoviesController, getMovieController, hotMoviesController} from "../controllers";

const router = new Router()

router.get('/movies/:movieId', getMovieController)
router.get('/movies/search', findMoviesController)
router.get('/movies/hot', hotMoviesController)

export default router



