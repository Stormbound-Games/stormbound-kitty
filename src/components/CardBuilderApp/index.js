import React from 'react'
import { Helmet } from 'react-helmet-async'
import CardDisplay from '../CardBuilderCardDisplay'
import CardDisplayControls from '../CardDisplayControls'
import Article from '../Article'
import CoreForm from '../CardBuilderCoreForm'
import Notice from '../Notice'
import LevelForm from '../CardBuilderLevelForm'
import Row from '../Row'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import swcc from '../../data/swcc'
import './index.css'

const getWikiUrl = name =>
  'https://stormboundkingdomwars.fandom.com/' +
  encodeURIComponent(name.replace(/\s/g, '_').replace(/’/g, "'"))

const useArticleProps = props => {
  const isOfficial = Boolean(getRawCardData(props.cardId).name)
  const contest = swcc
    .flat()
    .find(contest => contest.winner && contest.winner.id === props.cardId)
  const properties = {}

  if (props.name && props.mode === 'DISPLAY') {
    properties.title = props.name
  } else {
    properties.title = 'Create your card'
  }

  if (isOfficial) {
    properties.meta = [props.faction, props.type, props.race]
      .filter(Boolean)
      .join(' · ')
    properties.action = {
      href: getWikiUrl(props.name),
      children: 'Open in wiki',
    }
  } else if (contest) {
    properties.meta = `Week #${contest.id || contest.week} (season ${
      contest.season
    })`
    properties.author = contest.winner.author
    properties.action = { to: '/card/contest', children: 'Back to SWCC' }
  } else if (props.cardId) {
    properties.meta = [props.faction, props.type, props.race]
      .filter(Boolean)
      .join(' · ')
    properties.action =
      props.mode === 'EDITOR'
        ? {
            to: `/card/${props.cardId}/display`,
            children: 'Display view',
            icon: 'eye',
          }
        : {
            to: `/card/${props.cardId}`,
            children: 'Edit card',
          }
  }

  return properties
}

export default React.memo(function CardBuilderApp(props) {
  const isOfficial = Boolean(getRawCardData(props.cardId).name)
  const articleProps = useArticleProps(props)

  return (
    <Article {...articleProps} smallFontSize>
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
              <Row.Column>
                <Title>Core attributes</Title>
                <CoreForm {...props} />
              </Row.Column>
              <Row.Column>
                <Title>Level-specific attributes</Title>
                <LevelForm {...props} />
              </Row.Column>
            </Row>
          </div>
        </>
      )}
      {articleProps.author && (
        <Helmet>
          <meta name='author' content={articleProps.author} />
        </Helmet>
      )}
    </Article>
  )
})
