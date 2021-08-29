import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import { BrawlContext } from '~/components/BrawlProvider'
import Decks from '~/components/Decks'
import Icon from '~/components/Icon'
import Title from '~/components/Title'

export default React.memo(function BrawlRecommendedDecks(props) {
  const { css } = useFela()
  const { id } = React.useContext(BrawlContext)

  if (props.decks.length === 0) return null

  return (
    <>
      <Title>Recommended deck{props.decks.length === 1 ? '' : 's'}</Title>
      <Decks showUpgrades columns={props.columns} decks={props.decks} />
      <p className={css({ marginTop: '-1.25em' })}>
        <Icon icon='arrow-right' extend={{ transform: 'translateY(2px)' }} />{' '}
        Check more{' '}
        <Link to={'/deck/suggestions?tags=BRAWL%2C' + id}>
          decks for this brawl
        </Link>
      </p>
    </>
  )
})
