import querystring from 'querystring'
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: '2022-03-01' })

let CARDS = new Map()

const fetchDocuments = async () => {
  const cards = await client.fetch(
    `*[_type == "card"] { _id, "id": id.current }`
  )

  cards.forEach(card => {
    CARDS.set(card._id, card.id)
  })
}

// Pretty ugly hack to not being able to resolve references in the main function
// because it needs to be synchronous.
// See: https://github.com/sanity-io/sanity/issues/2036
fetchDocuments()

const PREVIEW_PATH = '/api/preview'
const PREVIEW_TOKEN = process.env.SANITY_STUDIO_PREVIEW_TOKEN
const PREVIEW_DOMAIN =
  process.env.SANITY_STUDIO_ENVIRONMENT === 'production'
    ? 'https://stormbound-kitty.com'
    : 'http://localhost:3000'

export default function resolvePageURL(document) {
  if (!PREVIEW_TOKEN) {
    return console.warn(
      'Missing environment variable `SANITY_STUDIO_PREVIEW_TOKEN`.'
    )
  }

  const getPreviewURL = args =>
    PREVIEW_DOMAIN +
    PREVIEW_PATH +
    '?' +
    querystring.stringify({
      token: PREVIEW_TOKEN,
      type: document._type,
      ...args,
    })

  switch (document._type) {
    case 'changelog':
      return getPreviewURL({ id: CARDS.get(document.card._ref) })

    case 'card':
      return getPreviewURL({ id: document.id?.current })

    case 'deck':
    case 'SWCC':
      return getPreviewURL({ id: document.id })

    case 'brawl':
    case 'guide':
    case 'page':
    case 'puzzle':
    case 'release':
    case 'story':
    case 'user':
      return getPreviewURL({ slug: document.slug?.current })

    default:
      return getPreviewURL({})
  }
}
