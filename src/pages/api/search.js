import Fuse from 'fuse.js'
import getSearchIndex from '~/helpers/getSearchIndex'

const index = new Fuse(getSearchIndex(true), {
  keys: ['label'],
  minMatchCharLength: 3,
  isCaseSensitive: false,
})

export default function handler(request, response) {
  return response.status(200).json(index.search(request.query.s).slice(0, 5))
}
