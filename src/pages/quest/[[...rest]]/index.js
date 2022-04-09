import PageQuestBuilder from '~/components/PageQuestBuilder'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [id] = params.rest || []
  const quest = id ? serialization.quest.deserialize(id) : {}

  return {
    props: {
      settings,
      quest,
      breadcrumbs: ['TOOLS', 'BUILDERS', 'QUEST_BUILDER'],
    },
  }
}

export default PageQuestBuilder
