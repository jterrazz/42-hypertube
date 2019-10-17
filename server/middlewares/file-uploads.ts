import * as koaBody from 'koa-body'
import {transfertImage} from "../controllers";
import {User} from "../models";

const MAX_FILE_SIZE = 1024 * 1024 * 5

const formidableOptions = {
  uploadDir: __dirname + '/../cache',
  maxFileSize: MAX_FILE_SIZE
}

export const cacheFileMiddleware = koaBody({ multipart: true, formidable: formidableOptions })

export const saveProfileImageMiddleware = async (ctx, next) => {
  try {
    const profileImage = ctx.request.files['profile-image']
    console.log(profileImage)
    if (profileImage) {
      const profileImageName = await transfertImage(profileImage)
      await User.updateOne({ _id: ctx.state.user._id }, { profileImageName })
      ctx.state.user.profileImageName = profileImageName
    }
  } finally {
    next()
  }
}
