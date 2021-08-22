import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'
import getInitialQuestData from '~/helpers/getInitialQuestData'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const navigation = getNavigation()

  try {
    const [id] = context.params.rest || []

    if (!id) {
      return { props: { navigation, quest: {}, id: null } }
    }

    return { props: { navigation, quest: getInitialQuestData(id), id } }
  } catch (error) {
    return { props: { navigation, quest: {}, id: null } }
  }
}

const QuestBuilderPage = props => (
  <Layout
    active={['TOOLS', 'BUILDERS', 'QUEST_BUILDER']}
    navigation={props.navigation}
  >
    <QuestBuilderRoot quest={props.quest} questId={props.id} />
  </Layout>
)

export default QuestBuilderPage
