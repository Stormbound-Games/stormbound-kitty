import PageBattleSim from '~/components/PageBattleSim'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import { DEFAULT_SIM } from '~/constants/battle'

export async function getStaticPaths({ preview: isPreview = false }) {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(settings.cards)
  const [id, display] = params.rest || []
  const breadcrumbs = ['TOOLS', 'SIMULATORS', 'BATTLE_SIM']

  if (display && display !== 'display') {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: {
        settings,
        simId: null,
        sim: DEFAULT_SIM,
        mode: 'EDITOR',
        breadcrumbs,
      },
    }
  }

  return {
    props: {
      settings,
      id: decodeURIComponent(id),
      sim: serialization.battle.deserialize(cardsIndex, decodeURIComponent(id)),
      mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      breadcrumbs,
    },
  }
}

export default PageBattleSim
