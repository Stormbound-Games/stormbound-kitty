import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'

const QuestBuilderPage = () => (
  <Layout active={['TOOLS', 'QUEST_BUILDER']}>
    <QuestBuilderRoot />
  </Layout>
)

export default QuestBuilderPage
