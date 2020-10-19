import React from 'react'
import CardDisplay from '../CardBuilderCardDisplay'
import CardDisplayControls from '../CardDisplayControls'
import Column from '../Column'
import Article from '../Article'
import CoreForm from '../CardBuilderCoreForm'
import Notice from '../Notice'
import LevelForm from '../CardBuilderLevelForm'
import Row from '../Row'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const getWikiUrl = name =>
  'https://stormboundkingdomwars.gamepedia.com/' +
  encodeURIComponent(name.replace(/\s/g, '_').replace(/’/g, "'"))

export default React.memo(function CardBuilderApp(props) {
  const isOfficial = Boolean(getRawCardData(props.cardId).name)
  const title =
    props.mode === 'EDITOR' || !props.name ? 'Create your card' : props.name

  return (
    <Article
      title={title}
      meta={
        props.mode === 'DISPLAY' && isOfficial
          ? [props.faction, props.type, props.race].filter(Boolean).join(' · ')
          : undefined
      }
      action={
        isOfficial && {
          href: getWikiUrl(props.name),
          children: 'Open in wiki',
        }
      }
      smallFontSize
    >
      <CardDisplay {...props} />

      {isOfficial && <CardDisplayControls />}

      {props.hasSingleLevel && (
        <Notice icon='wand'>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Notice>
      )}

      {props.mode === 'EDITOR' && (
        <>
          <div className='CardBuilderApp__bottom'>
            <Row desktopOnly wideGutter>
              <Column>
                <Title>Core attributes</Title>
                <CoreForm {...props} />
              </Column>
              <Column>
                <Title>Level-specific attributes</Title>
                <LevelForm {...props} />
              </Column>
            </Row>
          </div>
        </>
      )}
    </Article>
  )
})
