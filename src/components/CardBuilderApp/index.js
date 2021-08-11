import React from 'react'
import { useFela } from 'react-fela'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import CardChangeFeed from '../CardChangeFeed'
import CardDisplay from '../CardBuilderCardDisplay'
import CardDisplayControls from '../CardDisplayControls'
import Page from '../Page'
import CoreForm from '../CardBuilderCoreForm'
import Notice from '../Notice'
import LevelForm from '../CardBuilderLevelForm'
import Row from '../Row'
import Spacing from '../Spacing'
import Title from '../Title'
import usePrevious from '../../hooks/usePrevious'
import getRawCardData from '../../helpers/getRawCardData'
import getCardBuilderMetaTags from '../../helpers/getCardBuilderMetaTags'
import parseDate from '../../helpers/parseDate'
import serialisation from '../../helpers/serialisation'
import { formatPreciseDate } from '../../helpers/formatDate'
import swcc from '../../data/swcc'
import changelog from '../../data/changelog'

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
    properties.meta = [
      faction,
      type,
      race,
      versionId ? 'Prior ' + formatPreciseDate(+versionId) : null,
    ]
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

const isCardOfficial = cardId => Boolean(getRawCardData(cardId).name)

const useCardVersions = cardId => {
  if (!isCardOfficial(cardId)) return []

  return changelog
    .filter(change => change.id === cardId)
    .map(change => ({ ...change, timestamp: parseDate(change.date) }))
    .sort((a, b) => b.timestamp - a.timestamp)
}

const getVersionIdFromURL = () => {
  const parameters = new URLSearchParams(window.location.search)

  return +parameters.get('v') || null
}

const resolveCardData = data =>
  serialisation.card.deserialise(serialisation.card.serialise(data))

const useCardData = (props, versionId) => {
  const versions = useCardVersions(props.cardId)

  if (!versionId || versions.length === 0) return props.cardData

  const cardData = versions
    .filter(version => version.timestamp >= +versionId)
    .reduce(
      (acc, version) => ({ ...acc, ...version.from }),
      getRawCardData(props.cardId)
    )

  return resolveCardData(cardData)
}

export default React.memo(function CardBuilderApp(props) {
  const { css } = useFela()
  const history = useHistory()
  const isOfficial = isCardOfficial(props.cardId)
  const [versionId, setVersionId] = React.useState(getVersionIdFromURL())
  const cardData = useCardData(props, versionId)
  const articleProps = useArticleProps(props, versionId)
  const previousCardId = usePrevious(props.cardId)

  React.useEffect(() => {
    const parameters = new URLSearchParams(window.location.search)
    if (versionId) parameters.set('v', versionId)
    else parameters.delete('v')
    history.replace('?' + parameters.toString())
  }, [versionId, history])

  React.useEffect(() => {
    if (previousCardId && previousCardId !== props.cardId) setVersionId(null)
  }, [previousCardId, props.cardId])

  return (
    <Page {...articleProps} {...getCardBuilderMetaTags(props.cardData)}>
      <CardDisplay mode={props.mode} {...cardData} />

      {isOfficial && (
        <Spacing bottom='LARGEST'>
          <CardDisplayControls />
        </Spacing>
      )}

      {props.hasSingleLevel && (
        <Notice icon='wand'>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Notice>
      )}

      {props.mode === 'EDITOR' && (
        <Spacing vertical='LARGEST'>
          <div className={css({ maxWidth: '960px', margin: 'auto' })}>
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
        </Spacing>
      )}

      {isOfficial && (
        <Page.Narrow>
          <CardChangeFeed
            id={props.cardId}
            versionId={versionId}
            setVersionId={setVersionId}
          />
        </Page.Narrow>
      )}

      {articleProps.author && (
        <Helmet>
          <meta name='author' content={articleProps.author} />
        </Helmet>
      )}
    </Page>
  )
})
