import PageBattleSim from '~/components/PageBattleSim'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import { DEFAULT_SIM } from '~/constants/battle'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(settings.cards)
  const [id, view] = params.id || []
  const breadcrumbs = ['TOOLS', 'SIMULATORS', 'BATTLE_SIM']

  if (view && view !== 'display') {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: { settings, sim: DEFAULT_SIM, mode: 'EDITOR', breadcrumbs },
    }
  }

  return {
    props: {
      settings,
      id: decodeURIComponent(id),
      sim: serialization.battle.deserialize(cardsIndex, decodeURIComponent(id)),
      mode: view === 'display' ? 'DISPLAY' : 'EDITOR',
      breadcrumbs,
    },
  }
}

export default PageBattleSim
