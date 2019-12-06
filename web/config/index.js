export default {
  ROOT_URL: 'http://localhost:3000',
  INTERNAL_ROOT_URL: process ? process.env.INTERNAL_CLIENT_API : 'http://localhost:3000'
}
