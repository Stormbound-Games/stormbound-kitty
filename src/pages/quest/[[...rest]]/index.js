import React from 'react'
import QuestBuilderRoot from '~/components/QuestBuilderRoot'
import Layout from '~/components/Layout'
import getInitialQuestData from '~/helpers/getInitialQuestData'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })
  const cards = CARDS

  try {
    const [id] = params.rest || []

    if (!id) {
      return { props: { cards, navigation, quest: {}, id: null } }
    }

    return { props: { card, navigation, quest: getInitialQuestData(id), id } }
  } catch (error) {
    return { props: { cards, navigation, quest: {}, id: null } }
  }
}

const QuestBuilderPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'BUILDERS', 'QUEST_BUILDER']}
    navigation={navigation}
    cards={cards}
  >
    <QuestBuilderRoot {...props} questId={props.id} />
  </Layout>
)

export default QuestBuilderPage
