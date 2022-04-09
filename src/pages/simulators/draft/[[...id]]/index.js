import PageDraftSimulator from '~/components/PageDraftSimulator'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getDeckAdvice from '~/helpers/getDeckAdvice'
import indexArray from '~/helpers/indexArray'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [id] = params.id || []
  const cardsIndex = indexArray(settings.cards)
  const cards = id ? serialization.cards.deserialize(id) : []

  if (cards.some(card => !(card.id in cardsIndex))) {
    return { notFound: true }
  }

  const deck = cards.map(card => getResolvedCardData(cardsIndex, card))
  const advice = await getDeckAdvice(cardsIndex, deck)

  return {
    props: {
      settings,
      deck,
      advice,
      breadcrumbs: ['TOOLS', 'SIMULATORS', 'DRAFT_SIMULATOR'],
    },
  }
}

export default PageDraftSimulator
