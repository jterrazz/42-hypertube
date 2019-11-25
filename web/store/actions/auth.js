import * as types from '../types'

export const loginAction = ({
  type: types.SET_USER,
  payload: {
    test: "ok"
  }
})

// export const loginAction = ({
//     type: types.SET_USER,
//     payload: async () => {
//         console.log("YOOOO")
//         return {
//             "email": "maestru2a222@gmail.com",
//             "_id": "5dbd3fe45413de0c3681d68b",
//             "plays": [
//                 {
//                     "_id": "5dd03cf2a93f716fa7a471d9",
//                     "createdAt": "2019-11-16T18:16:18.687Z",
//                     "imdbId": "tt3829170"
//                 },
//                 {
//                     "_id": "5dd03e40b295697022703ccf",
//                     "createdAt": "2019-11-16T18:21:52.203Z",
//                     "imdbId": "tt4154756"
//                 }
//             ],
//             "profileImageName": "58c543a0c7a6cda024fecee19adf2ff6b2d7acaf",
//             "language": "en-US",
//             "firstName": "tttdd2",
//             "lastName": "Blyat",
//             "username": "blyat22222",
//             "profileImageUrl": "http://localhost:3000/images/58c543a0c7a6cda024fecee19adf2ff6b2d7acaf"
//         }
//     }
// })
