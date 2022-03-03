import querystring from 'querystring'

const PREVIEW_PATH = '/api/preview'
const PREVIEW_TOKEN = process.env.SANITY_STUDIO_PREVIEW_TOKEN
const PREVIEW_DOMAIN =
  process.env.SANITY_ACTIVE_ENV === 'production'
    ? 'https://stormbound-kitty.com'
    : 'http://localhost:3000'

export default function getPreviewURL(document) {
  if (!PREVIEW_TOKEN) {
    return console.warn(
      'Missing environment variable `SANITY_STUDIO_PREVIEW_TOKEN`.'
    )
  }

  const goTo = args =>
    PREVIEW_DOMAIN +
    PREVIEW_PATH +
    '?' +
    querystring.stringify({
      token: PREVIEW_TOKEN,
      type: document._type,
      ...args,
    })

  switch (document._type) {
    case 'card':
    case 'changelog':
    case 'deck':
    case 'puzzle':
      return goTo({ id: document.board })
    case 'release':
    case 'story':
    case 'guide':
    case 'user':
      return goTo({ slug: document.slug?.current })
    default:
      return goTo({})
  }
}
