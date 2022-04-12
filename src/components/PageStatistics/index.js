import React from 'react'
import dynamic from 'next/dynamic'
import Link from '~/components/Link'
import Page from '~/components/Page'
import { CollectionContext } from '~/components/CollectionProvider'
import Info from '~/components/Info'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import ChartUnitRace from '../ChartUnitRace'
import ChartFactionCard from '../ChartFactionCard'

const ChartAbility = dynamic(() => import('~/components/ChartAbility'))
const ChartMana = dynamic(() => import('~/components/ChartMana'))
const ChartModifier = dynamic(() => import('~/components/ChartModifier'))
const ChartMovement = dynamic(() => import('~/components/ChartMovement'))
const ChartRarity = dynamic(() => import('~/components/ChartRarity'))
const ChartStrength = dynamic(() => import('~/components/ChartStrength'))
const ChartStrengthMana = dynamic(() =>
  import('~/components/ChartStrengthMana')
)
const ChartType = dynamic(() => import('~/components/ChartType'))

export default React.memo(function PageStatistics(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  return (
    <Page
      title='Statistics'
      description='Enjoy insights and statistics about the state of the Stormbound card collection'
      action={
        hasDefaultCollection
          ? undefined
          : {
              to: '/collection/stats',
              children: 'Your statistics',
              icon: 'arrow-right',
            }
      }
      isEditorialContent
    >
      <Page.Narrow>
        <p>
          This is data visualization about the current state of the Stormbound
          card collection. If you would like to suggest more data
          representations, please get in touch with me on Discord (Kitty#1909).
        </p>

        <Only.CustomCollection>
          <Info icon='books' title='Your collection'>
            <p>
              If you happen to be looking for data visualization on{' '}
              <strong className='Highlight'>your</strong> card collection, head
              over to <Link to='/collection/stats'>the collection section</Link>
              .
            </p>
          </Info>
        </Only.CustomCollection>

        <Row isDesktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartType />
            </Spacing>
          </Row.Column>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartRarity />
            </Spacing>
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartMovement />
            </Spacing>
          </Row.Column>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartAbility />
            </Spacing>
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartModifier />
            </Spacing>
          </Row.Column>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartUnitRace />
            </Spacing>
          </Row.Column>
        </Row>

        <Row isDesktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartFactionCard />
            </Spacing>
          </Row.Column>
          <Row.Column />
        </Row>

        <Row isDesktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartMana />
            </Spacing>
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartStrength />
            </Spacing>
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartStrengthMana />
            </Spacing>
          </Row.Column>
        </Row>
      </Page.Narrow>
    </Page>
  )
})
