import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [id] = params.rest || []
  const quest = id ? serialization.quest.deserialize(id) : {}

  return { props: { settings, quest, id: id || null } }
}

const QuestBuilderPage = ({ settings, ...props }) => (
  <Layout active={['TOOLS', 'BUILDERS', 'QUEST_BUILDER']} settings={settings}>
    <QuestBuilderRoot {...props} questId={props.id} />
  </Layout>
)

export default QuestBuilderPage
