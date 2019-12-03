import { Schema, model, Model, Document } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import config from '../config'

export interface UserModelInterface extends Document {
  savePassword(password: string): void
  authenticate(password: string): boolean
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  usernameRandom: { type: Boolean, default: false },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  profileImageName: String,
  language: { type: String, default: 'en-US' },
  hashedPassword: String,
  googleAuthId: String,
  facebookAuthId: String,
  intraAuthId: String,
  githubAuthId: String,
  plays: [{ imdbId: String, createdAt: Date }],
})

UserSchema.methods = {
  savePassword: async function(password): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, config.BCRYPT_COST)
    this.set('hashedPassword', hashedPassword)
  },
  verifyPassword: async function(password): Promise<boolean> {
    if (!this.hashedPassword) return false
    return await bcrypt.compare(password, this.hashedPassword)
  },
}

export const User: Model<UserModelInterface, any> = model('users', UserSchema)
