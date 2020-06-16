import React from 'react'
import { Link } from 'react-router-dom'
import ChartAbility from '../ChartAbility'
import ChartMana from '../ChartMana'
import ChartModifier from '../ChartModifier'
import ChartMovement from '../ChartMovement'
import ChartRarity from '../ChartRarity'
import ChartStrength from '../ChartStrength'
import ChartStrengthMana from '../ChartStrengthMana'
import ChartType from '../ChartType'
import Column from '../Column'
import Info from '../Info'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

export default React.memo(() => {
  const viewportWidth = useViewportWidth()

  return (
    <>
      <div className='CardsStats'>
        <h1 className='VisuallyHidden'>Cards Stats</h1>
        <Row desktopOnly>
          <Column width='1/3'>
            <Title>What is this</Title>
            <p className='CardStats__intro'>
              This is data visualisation about the current state of the
              Stormbound card collection. If you would like to suggest more data
              representations, please get in touch with me on Discord
              (Kitty#1909).
            </p>

            <Only.CustomCollection>
              <Info icon='books' title='Your collection'>
                If you happen to be looking for data visualisation on{' '}
                <strong className='Highlight'>your</strong> card collection,
                head over to{' '}
                <Link to='/collection/stats'>the collection section</Link>.
              </Info>
            </Only.CustomCollection>
          </Column>
          <Column
            width={66}
            style={{
              // For some reason having 100%-width charts cause this column from
              // expanding forever, unless it has an explicit `width` (since
              // `flex-grow` and `flex-basis` don’t do the trick).
              width: viewportWidth > 700 ? 'calc(100% / 3 * 2)' : undefined,
            }}
          >
            <Row desktopOnly>
              <Column>
                <ChartType />
              </Column>
              <Column>
                <ChartRarity />
              </Column>
            </Row>
            <Row desktopOnly>
              <Column>
                <ChartMovement />
              </Column>
              <Column>
                <ChartAbility />
              </Column>
            </Row>
            <Row desktopOnly>
              <Column>
                <ChartModifier />
              </Column>
              <Column></Column>
            </Row>
            <Row desktopOnly>
              <Column>
                <ChartMana />
              </Column>
            </Row>
            <Row desktopOnly>
              <Column>
                <ChartStrength />
              </Column>
            </Row>
            <Row desktopOnly>
              <Column>
                <ChartStrengthMana />
              </Column>
            </Row>
          </Column>
        </Row>
      </div>

      <PageMeta
        title='Cards Stats'
        description='Enjoy insights and statistics about the state of the Stormbound card collection'
      />
    </>
  )
})
