import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import ChartAbility from '../ChartAbility'
import ChartMana from '../ChartMana'
import ChartModifier from '../ChartModifier'
import ChartMovement from '../ChartMovement'
import ChartRarity from '../ChartRarity'
import ChartStrength from '../ChartStrength'
import ChartStrengthMana from '../ChartStrengthMana'
import ChartType from '../ChartType'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Spacing from '../Spacing'
import Title from '../Title'
import useViewportSize from '../../hooks/useViewportSize'

export default React.memo(() => {
  const { css } = useFela()
  const { viewportWidth } = useViewportSize()

  return (
    <>
      <HeaderBanner title='Cards Statistics' />

      <Row desktopOnly>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p className={css({ marginBottom: '2em' })}>
            This is data visualisation about the current state of the Stormbound
            card collection. If you would like to suggest more data
            representations, please get in touch with me on Discord
            (Kitty#1909).
          </p>

          <Only.CustomCollection>
            <Info icon='books' title='Your collection'>
              If you happen to be looking for data visualisation on{' '}
              <strong className='Highlight'>your</strong> card collection, head
              over to <Link to='/collection/stats'>the collection section</Link>
              .
            </Info>
          </Only.CustomCollection>
        </Row.Column>
        <Row.Column
          width='2/3'
          extend={{
            // For some reason having 100%-width charts cause this column from
            // expanding forever, unless it has an explicit `width` (since
            // `flex-grow` and `flex-basis` don’t do the trick).
            width: viewportWidth > 700 ? 'calc(100% / 3 * 2)' : undefined,
          }}
        >
          <Row desktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartType />
              </Spacing>
            </Row.Column>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartRarity />
              </Spacing>
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartMovement />
              </Spacing>
            </Row.Column>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartAbility />
              </Spacing>
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartModifier />
              </Spacing>
            </Row.Column>
            <Row.Column />
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartMana />
              </Spacing>
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartStrength />
              </Spacing>
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <Spacing bottom='LARGER'>
                <ChartStrengthMana />
              </Spacing>
            </Row.Column>
          </Row>
        </Row.Column>
      </Row>

      <PageMeta
        title='Cards Stats'
        description='Enjoy insights and statistics about the state of the Stormbound card collection'
      />
    </>
  )
})
