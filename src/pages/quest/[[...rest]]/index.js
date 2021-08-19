import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'
import getInitialQuestData from '~/helpers/getInitialQuestData'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: true }
}

export async function getStaticProps(context) {
  try {
    const [id] = context.params.rest || []

    if (!id) {
      return { props: { quest: {}, id: null } }
    }

    return { props: { quest: getInitialQuestData(id), id } }
  } catch (error) {
    return { props: { quest: {}, id: null } }
  }
}

const QuestBuilderPage = props => (
  <Layout active={['TOOLS', 'QUEST_BUILDER']}>
    <QuestBuilderRoot quest={props.quest} questId={props.id} />
  </Layout>
)

export default QuestBuilderPage
