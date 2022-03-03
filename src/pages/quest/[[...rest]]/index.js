import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'
import getInitialQuestData from '~/helpers/getInitialQuestData'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  try {
    const [id] = params.rest || []

    if (!id) {
      return { props: { settings, quest: {}, id: null } }
    }

    return { props: { settings, quest: getInitialQuestData(id), id } }
  } catch (error) {
    return { props: { settings, quest: {}, id: null } }
  }
}

const QuestBuilderPage = ({ settings, cards, ...props }) => (
  <Layout active={['TOOLS', 'BUILDERS', 'QUEST_BUILDER']} settings={settings}>
    <QuestBuilderRoot {...props} questId={props.id} />
  </Layout>
)

export default QuestBuilderPage
