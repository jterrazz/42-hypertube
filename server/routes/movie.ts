import * as Router from 'koa-router'

import {findMoviesController, getMovieController, hotMoviesController} from "../controllers";

const router = new Router()

router.get('/movies/search', findMoviesController)
router.get('/movies/hot', hotMoviesController)
router.get('/movies/:movieId', getMovieController)

export default router



