import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'
import getInitialQuestData from '~/helpers/getInitialQuestData'

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps(context) {
  const quest = getInitialQuestData(context.params.id)

  return { props: { quest, id: context.params.id } }
}

export default props => (
  <Layout active={['TOOLS', 'QUEST_BUILDER']}>
    <QuestBuilderRoot quest={props.quest} questId={props.id} />
  </Layout>
)
