const PREVIEW_TOKEN = import.meta.env.SANITY_STUDIO_PREVIEW_TOKEN
const PREVIEW_DOMAIN =
  import.meta.env.SANITY_STUDIO_ENVIRONMENT === 'production'
    ? 'https://stormbound-kitty.com'
    : 'http://localhost:3000'

async function mapCardIds(client) {
  const map = new Map()
  const query = `*[_type == "card"] { _id, "id": id.current }`
  const cards = await client.fetch(query)

  cards.forEach(card => map.set(card._id, card.id))

  return map
}

export default async function productionUrl(prev, context) {
  if (!PREVIEW_TOKEN) {
    return console.warn(
      'Missing environment variable `SANITY_STUDIO_PREVIEW_TOKEN`.'
    )
  }

  const { document, getClient } = context
  const client = getClient({ apiVersion: '2022-03-01' })
  const cardsMap = await mapCardIds(client)

  const getPreviewURL = args => {
    const params = new URLSearchParams(args)

    params.set('token', PREVIEW_TOKEN)
    params.set('type', document._type)

    return PREVIEW_DOMAIN + '/api/preview' + '?' + params.toString()
  }

  switch (document._type) {
    case 'changelog':
      return getPreviewURL({ id: cardsMap.get(document.card._ref) })

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
      return prev
  }
}
