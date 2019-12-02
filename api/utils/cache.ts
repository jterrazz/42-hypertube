import * as NodeCache from 'node-cache'

class MemoryCache {
  private cache: NodeCache

  public KEYS = Object.freeze({
    MOVIES: 'movies',
    HOT_MOVIES: 'movies/hot',
  })

  constructor() {
    this.cache = new NodeCache({ stdTTL: 60 * 60 })
  }

  get(type, id, setter) {
    return new Promise((resolve, reject) => {
      const cacheKey = type + ':' + id

      this.cache.get(cacheKey, async (err, results) => {
        if (err) return reject(err)

        if (results == undefined) {
          setter()
            .then(results => {
              resolve(results)
              this.cache.set(cacheKey, results)
            })
            .catch(reject)
        } else {
          resolve(results)
        }
      })
    })
  }
}

export default new MemoryCache()
