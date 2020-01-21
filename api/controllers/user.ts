import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'
import * as fs from 'fs'

import { User } from '../models'
import { ClientError } from '../services/auth'
import * as crypto from 'crypto'
import config from '../config'
import { addIncompleteProfile } from './auth'

export const PUBLIC_USER_PROPS = [
  'profileImageName',
  'profileImageUrl',
  'language',
  'firstName',
  'lastName',
  'username',
]
export const PRIVATE_USER_PROPS = ['email', '_id', 'plays', 'profileCompleted', 'noPassword', ...PUBLIC_USER_PROPS]
const IMAGE_FOLDER = __dirname + '/../public/images/'

export const cacheToImageFolder = file =>
  new Promise((resolve, reject) => {
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      const newName = crypto.randomBytes(20).toString('hex')
      fs.rename(file.path, IMAGE_FOLDER + newName, err => {
        if (err) return reject(err)
        resolve(newName)
      })
    } else {
      reject(new ClientError(422, 'Supported images format: png and jpeg'))
    }
  })

export const serializeUser = original => {
  if (original.usernameRandom) {
    delete original.usernameRandom
    delete original.username
  }

  return {
    ...original,
    noPassword: !original.hashedPassword,
    profileImageUrl: original.profileImageName ? `${config.API_URL}/images/${original.profileImageName}` : null,
  }
}

/*
 * Controllers
 */

export const getMeController: Middleware = async ctx => {
  ctx.body = _.pick(await addIncompleteProfile(serializeUser(ctx.state.user)), PRIVATE_USER_PROPS)
}

export const getUsersController: Middleware = async ctx => {
  const users = await User.find()

  ctx.body = {
    users: users.map(u => serializeUser(_.pick(u, PUBLIC_USER_PROPS))),
  }
}

export const getUsernameController: Middleware = async ctx => {
  const usernameValidator = Joi.string().required()
  const username = await usernameValidator.validateAsync(ctx.params.username)

  const user = await User.findOne({ username })
  ctx.assert(user, 404, 'User not found')
  ctx.body = _.pick(serializeUser(user.toObject()), PUBLIC_USER_PROPS)
}

export const updateMeController: Middleware = async ctx => {
  const userSchema = Joi.object()
    .keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(42),
      email: Joi.string().email(),
      password: Joi.string()
        .min(8)
        .max(100),
      firstName: Joi.string().max(42),
      lastName: Joi.string().max(42),
      language: Joi.string()
        .valid('fr-FR', 'en-US')
        .default('en-US'),
    })
    .required()

  const userInput = await userSchema.validateAsync(ctx.request.body)
  const profileImage = ctx.request.files['profileImage']

  const user = await User.findOne({ _id: ctx.state.user._id })
  ctx.assert(user, 404, "User doesn't exist")

  _.merge(user, userInput)
  if (userInput.password) {
    await user.savePassword(userInput.password)
  }
  if (userInput.username) {
    user.usernameRandom = false
  }
  if (profileImage) {
    const oldImage = user.profileImageName
    user.profileImageName = await cacheToImageFolder(profileImage)
    if (oldImage) {
      fs.unlink(IMAGE_FOLDER + oldImage, _ => {})
    }
  }
  try {
    await user.save()
  } catch (err) {
    if (err.code == 11000 && err.keyPattern) {
      if (err.keyPattern.hasOwnProperty('username')) {
        throw new ClientError(409, 'This username is already in use')
      } else if (err.keyPattern.hasOwnProperty('email')) {
        throw new ClientError(409, 'This email is already in use')
      }
    }
    throw err
  }

  const updatedUser = await User.findOne({ _id: ctx.state.user._id })

  ctx.body = _.pick(await addIncompleteProfile(serializeUser(updatedUser.toObject())), PRIVATE_USER_PROPS)
}
