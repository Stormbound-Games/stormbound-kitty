import React from 'react'
import dynamic from 'next/dynamic'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CollectionFigures from '~/components/CollectionFigures'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

const ChartCollectionLevel = dynamic(() =>
  import('~/components/ChartCollectionLevel')
)
const ChartCollectionFaction = dynamic(() =>
  import('~/components/ChartCollectionFaction')
)
const ChartCollectionRarity = dynamic(() =>
  import('~/components/ChartCollectionRarity')
)
const ChartCollectionStatus = dynamic(() =>
  import('~/components/ChartCollectionStatus')
)
const ChartCollectionCardCopy = dynamic(() =>
  import('~/components/ChartCollectionCardCopy')
)
const ChartCollectionProgress = dynamic(() =>
  import('~/components/ChartCollectionProgress')
)

export default React.memo(function PageCollectionStats(props) {
  return (
    <Page
      title='Collection Stats'
      description='Get insights about your own card collection and visualize it'
      action={{
        to: '/collection',
        children: 'Back to collection',
      }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Row isDesktopOnly>
            <Row.Column>
              <Title>What is this</Title>
              <p>
                On this page, you can find some data visualization for your card
                collection.{' '}
                <Only.DefaultCollection>
                  Start by{' '}
                  <Link to='/collection'>setting up your card collection</Link>.
                  In the mean time, the visualised collection contains all cards
                  in the game at level 1.
                </Only.DefaultCollection>
              </p>
              <p>
                All charts titled with “(Stones)” rely on the cost of each card.
                A card cost is computed based on its current level in your
                collection and the amount of extra copies you have of that card
                before the next level.
              </p>
            </Row.Column>
          </Row>
          <Row isDesktopOnly>
            <Row.Column>
              <CollectionFigures maxCollectionCost={props.maxCollectionCost} />
            </Row.Column>
          </Row>
        </Row.Column>
        <Row.Column width='2/3'>
          <Row isDesktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <Title extend={styles.title}>Level repartition</Title>
                <ChartCollectionLevel />
              </Spacing>
            </Row.Column>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <Title extend={styles.title}>Faction (stones)</Title>
                <ChartCollectionFaction />
              </Spacing>
            </Row.Column>
          </Row>
          <Row isDesktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <Title extend={styles.title}>Rarity (stones)</Title>
                <ChartCollectionRarity />
              </Spacing>
            </Row.Column>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <Title extend={styles.title}>Statuses</Title>
                <ChartCollectionStatus />
              </Spacing>
            </Row.Column>
          </Row>

          <Row isDesktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <Title extend={styles.title}>Card copies</Title>
                <ChartCollectionCardCopy />
              </Spacing>
            </Row.Column>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <Title extend={styles.title}>Progress data</Title>
                <ChartCollectionProgress />
              </Spacing>
            </Row.Column>
          </Row>
        </Row.Column>
      </Row>
    </Page>
  )
})
