import { Middleware } from 'koa'
import { Torrent, User } from '../models'

export const getVideoCommentsController: Middleware = async ctx => {
  const hash = ctx.params.hash
  // const page = ctx.query.page || 0

  // ctx.assert(Number.isInteger(page), 422, 'The page param must be a number') // TODO Use real http code

  const torrent = await Torrent.findOne({ hash }).populate('comments.user')
  if (!torrent) {
    ctx.body = { comments: [] }
  } else {
    ctx.body = { comments: torrent.comments }
  }
}

export const addVideoCommentController: Middleware = async ctx => {
  const hash = ctx.params.hash
  const text = ctx.request.body.text

  ctx.assert(text, 422, 'Data is missing the comment text') // TODO Use real http code

  const newComment = { text, date: new Date(), user: ctx.state.user._id }
  const torrent = await Torrent.findOneAndUpdate({ hash }, { $push: { comments: newComment } }, { new: true })
  if (!torrent) {
    const newTorrent = new Torrent({ hash, comments: [newComment] })
    await newTorrent.save()
  }
  ctx.status = 200
}

export const addTorrentPlayController: Middleware = async ctx => {
  const hash = ctx.params.hash
  const videoId = ctx.query.videoId
  const play = { createdAt: new Date(), hash, videoId }

  const me = await User.findOneAndUpdate({ _id: ctx.state.user._id }, { $push: { plays: play } })
  console.log(me)
  ctx.assert(me, 400, 'Error adding the torrent play time') // TODO Use real http code
  ctx.status = 200
}
