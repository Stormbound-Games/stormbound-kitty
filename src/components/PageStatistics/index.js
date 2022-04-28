import React from 'react'
import dynamic from 'next/dynamic'
import Link from '~/components/Link'
import Page from '~/components/Page'
import { CollectionContext } from '~/components/CollectionProvider'
import Info from '~/components/Info'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'

const ChartAbility = dynamic(() => import('~/components/ChartAbility'))
const ChartMana = dynamic(() => import('~/components/ChartMana'))
const ChartMovement = dynamic(() => import('~/components/ChartMovement'))
const ChartRarity = dynamic(() => import('~/components/ChartRarity'))
const ChartStrength = dynamic(() => import('~/components/ChartStrength'))
const ChartStrengthMana = dynamic(() =>
  import('~/components/ChartStrengthMana')
)
const ChartType = dynamic(() => import('~/components/ChartType'))
const ChartUnitType = dynamic(() => import('~/components/ChartUnitType'))
const ChartFactionCard = dynamic(() => import('~/components/ChartFactionCard'))

export default React.memo(function PageStatistics() {
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
              <span className='Highlight'>your</span> card collection, head over
              to <Link to='/collection/stats'>the collection section</Link>.
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
              <ChartUnitType />
            </Spacing>
          </Row.Column>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartFactionCard />
            </Spacing>
          </Row.Column>
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
