import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'
import * as fs from 'fs'

import { User } from '../models'
import {ClientError} from "../services/auth";
import * as crypto from "crypto";

export const PUBLIC_USER_PROPS = ['profileImageName', 'language', 'firstName', 'lastName', 'username']

export const PRIVATE_USER_PROPS = ['email', '_id', 'plays', ...PUBLIC_USER_PROPS]
const IMAGE_FOLDER = __dirname + '/../public/images/'

export const getMeController: Middleware = async ctx => {
  ctx.body = _.pick(ctx.state.user, PRIVATE_USER_PROPS)
}

export const getUsernameController: Middleware = async ctx => {
  const usernameValidator = Joi.string().required()
  const username = await usernameValidator.validateAsync(ctx.params.username)

  const user = await User.findOne({ username })
  ctx.assert(user, 404, 'User not found')
  ctx.body = _.pick(user, PUBLIC_USER_PROPS)
}

/*
 * Requires Image available bc multer middleware
 * TODO Utils folder ?
 */

export const transfertImage = file =>
  new Promise((resolve, reject) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const newName = crypto.randomBytes(20).toString('hex')
      fs.rename(file.path, IMAGE_FOLDER + newName, err => {
        if (err) return reject(err)
        resolve(newName)
      })
    } else {
      reject(new ClientError(422, 'Supported images format: png and jpeg'))
    }
  })

export const updateMeController: Middleware = async ctx => {
  const userSchema = Joi.object()
    .keys({
      username: Joi.string().max(42),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      firstName: Joi.string().max(42),
      lastName: Joi.string().max(42),
      language: Joi.string().valid('fr-FR', 'en-US'),
    })
    .required()

  const userInput = await userSchema.validateAsync(ctx.request.body)
  const profileImage = ctx.request.files['profile-image']

  let user = await User.findOne({ _id: ctx.state.user._id })
  ctx.assert(user, 404, "User doesn't exist")

  _.merge(user, userInput)
  if (userInput.password) {
    await user.savePassword(userInput.password)
  }
  if (profileImage) {
    const oldImage = user.profileImageName
    user.profileImageName = await transfertImage(profileImage)
    if (oldImage) {
      fs.unlink(IMAGE_FOLDER + oldImage, err => {})
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

  ctx.status = 200
}
