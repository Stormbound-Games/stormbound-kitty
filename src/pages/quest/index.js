import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'QUEST_BUILDER']}>
    <QuestBuilderRoot />
  </Layout>
)
