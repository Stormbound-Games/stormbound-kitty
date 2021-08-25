import React from 'react'
import { useFela } from 'react-fela'
import CardChangeFeed from '~/components/CardChangeFeed'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardDisplayControls from '~/components/CardDisplayControls'
import Page from '~/components/Page'
import CoreForm from '~/components/CardBuilderCoreForm'
import Notice from '~/components/Notice'
import LevelForm from '~/components/CardBuilderLevelForm'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import useQueryParams from '~/hooks/useQueryParams'
import getRawCardData from '~/helpers/getRawCardData'
import getCardBuilderMetaTags from '~/helpers/getCardBuilderMetaTags'
import parseDate from '~/helpers/parseDate'
import serialisation from '~/helpers/serialisation'
import { formatPreciseDate } from '~/helpers/formatDate'

const getWikiUrl = name =>
  'https://stormboundkingdomwars.fandom.com/' +
  encodeURIComponent(name.replace(/\s/g, '_').replace(/’/g, "'"))

const useArticleProps = (props, versionId) => {
  const isOfficial = Boolean(getRawCardData(props.cardId).name)
  const properties = {}
  const { name, faction, type, race } = props.card

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
  } else if (props.contest) {
    properties.meta = `Week #${props.contest.id} (season ${props.contest.season})`
    properties.author = props.contest.winner.author
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

const resolveCardData = data =>
  serialisation.card.deserialise(serialisation.card.serialise(data))

const useCardData = (props, versionId) => {
  if (!versionId || props.versions.length === 0) return props.card

  const cardData = props.versions
    .filter(version => parseDate(version.date) >= +versionId)
    .reduce(
      (acc, version) => ({ ...acc, ...version.from }),
      getRawCardData(props.cardId)
    )

  return resolveCardData(cardData)
}

export default React.memo(function CardBuilderApp(props) {
  const { css } = useFela()
  const versionId = +useQueryParams().v
  const { cardId } = props
  const isOfficial = isCardOfficial(cardId)
  const cardData = useCardData(props, versionId)
  const articleProps = useArticleProps(props, versionId)

  return (
    <Page {...articleProps} {...getCardBuilderMetaTags(cardData)}>
      <Spacing bottom='LARGEST'>
        <CardBuilderCardDisplay mode={props.mode} {...cardData} id={cardId} />
      </Spacing>

      {isOfficial && (
        <Spacing bottom='LARGEST'>
          <CardDisplayControls cardId={cardId} />
        </Spacing>
      )}

      {cardData.hasSingleLevel && (
        <Notice icon='wand'>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Notice>
      )}

      {props.mode === 'EDITOR' && (
        <Spacing vertical='LARGEST'>
          <div className={css({ maxWidth: '960px', margin: 'auto' })}>
            <Row isDesktopOnly>
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
            changes={props.versions}
          />
        </Page.Narrow>
      )}
    </Page>
  )
})
