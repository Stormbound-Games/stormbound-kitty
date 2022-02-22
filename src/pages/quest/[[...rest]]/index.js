import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'
import getInitialQuestData from '~/helpers/getInitialQuestData'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })

  try {
    const [id] = params.rest || []

    if (!id) {
      return { props: { navigation, quest: {}, id: null } }
    }

    return { props: { navigation, quest: getInitialQuestData(id), id } }
  } catch (error) {
    return { props: { navigation, quest: {}, id: null } }
  }
}

const QuestBuilderPage = ({ navigation, ...props }) => (
  <Layout
    active={['TOOLS', 'BUILDERS', 'QUEST_BUILDER']}
    navigation={navigation}
  >
    <QuestBuilderRoot {...props} questId={props.id} />
  </Layout>
)

export default QuestBuilderPage
