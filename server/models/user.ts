import { Schema, model, Model, Document } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import config from '../config'

export interface UserModelInterface extends Document {
  savePassword(password: string): void
  authenticate(password: string): boolean
}

/*
 ** Email and username indexes are defined during database init in the mongo-init.js file
 */

const UserSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: {
    url: { type: String },
  },
  language: { type: String, enum: ['en', 'fr'], default: 'en' },
  hashedPassword: { type: String },
  googleAuthId: { type: String },
  intraAuthId: { type: String },
})

UserSchema.methods = {
  savePassword: async function(password): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, config.BCRYPT_COST)
    this.set('hashedPassword', hashedPassword)
  },
  authenticate: async function(password): Promise<boolean> {
    return await bcrypt.compare(password, this.hashedPassword)
  },
}

export const User: Model<UserModelInterface, any> = model('users', UserSchema)
