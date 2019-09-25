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
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  email: { type: String, required: true },
  language: { type: String, enum: ['en', 'fr'], default: 'en' },
  hashedPassword: { type: String, required: true },
  google2FA: { type: String },
  school2FA: { type: String },
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

export const User: Model<UserModelInterface> = model('users', UserSchema)
