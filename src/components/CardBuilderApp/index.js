import React from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import CardChangeFeed from '../CardChangeFeed'
import CardDisplay from '../CardBuilderCardDisplay'
import CardDisplayControls from '../CardDisplayControls'
import Article from '../Article'
import CoreForm from '../CardBuilderCoreForm'
import Notice from '../Notice'
import LevelForm from '../CardBuilderLevelForm'
import Row from '../Row'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import parseDate from '../../helpers/parseDate'
import serialisation from '../../helpers/serialisation'
import swcc from '../../data/swcc'
import changelog from '../../data/changelog'
import './index.css'

const getWikiUrl = name =>
  'https://stormboundkingdomwars.fandom.com/' +
  encodeURIComponent(name.replace(/\s/g, '_').replace(/’/g, "'"))

const useArticleProps = (props, versionId) => {
  const isOfficial = Boolean(getRawCardData(props.cardId).name)
  const contest = swcc
    .flat()
    .find(contest => contest.winner && contest.winner.id === props.cardId)
  const properties = {}
  const { name, faction, type, race } = props.cardData

  if (name && props.mode === 'DISPLAY') {
    properties.title = name
  } else {
    properties.title = 'Create your card'
  }

  if (isOfficial) {
    properties.meta = [faction, type, race, versionId ? 'v' + versionId : null]
      .filter(Boolean)
      .join(' · ')
    properties.action = {
      href: getWikiUrl(name),
      children: 'Open in wiki',
    }
  } else if (contest) {
    const season = parseDate(contest.date) > parseDate(swcc[1][0].date) ? 2 : 1

    properties.meta = `Week #${contest.id} (season ${season})`
    properties.author = contest.winner.author
    properties.action = { to: '/card/contest', children: 'Back to SWCC' }
  } else if (props.cardId) {
    properties.meta = [faction, type, race].filter(Boolean).join(' · ')
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

const stringifyDate = date =>
  [
    String(date.getDate()).padStart(2, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    date.getFullYear(),
  ].join('/')

const useCardVersion = (cardId, versionId) => {
  if (!versionId || !Boolean(getRawCardData(cardId).name)) return null

  const date = stringifyDate(new Date(+versionId))

  return changelog.find(change => change.id === cardId && change.date === date)
}

const getVersionIdFromURL = () => {
  const parameters = new URLSearchParams(window.location.search)

  return +parameters.get('v') || null
}

const resolveCardData = data =>
  serialisation.card.deserialise(serialisation.card.serialise(data))

const useCardData = (props, versionId) => {
  const version = useCardVersion(props.cardId, versionId)

  if (!version) return props.cardData

  const cardData = { ...getRawCardData(props.cardId), ...version.from }

  return resolveCardData(cardData)
}

export default React.memo(function CardBuilderApp(props) {
  const history = useHistory()
  const isOfficial = Boolean(getRawCardData(props.cardId).name)
  const [versionId, setVersionId] = React.useState(getVersionIdFromURL())
  const cardData = useCardData(props, versionId)
  const articleProps = useArticleProps(props, versionId)

  React.useEffect(() => {
    const parameters = new URLSearchParams(window.location.search)
    if (versionId) parameters.set('v', versionId)
    else parameters.delete('v')
    history.replace('?' + parameters.toString())
  }, [versionId, history])

  React.useEffect(() => {
    setVersionId(null)
  }, [props.cardId])

  return (
    <Article {...articleProps} smallFontSize>
      <CardDisplay mode={props.mode} {...cardData} />

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
                <CoreForm {...props} {...cardData} />
              </Row.Column>
              <Row.Column>
                <Title>Level-specific attributes</Title>
                <LevelForm {...props} {...cardData} />
              </Row.Column>
            </Row>
          </div>
        </>
      )}

      {isOfficial && (
        <Article.Narrow>
          <CardChangeFeed
            id={props.cardId}
            versionId={versionId}
            setVersionId={setVersionId}
          />
        </Article.Narrow>
      )}

      {articleProps.author && (
        <Helmet>
          <meta name='author' content={articleProps.author} />
        </Helmet>
      )}
    </Article>
  )
})
