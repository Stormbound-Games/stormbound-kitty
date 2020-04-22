import React from 'react'
import { Link } from 'react-router-dom'
import { TIER_COLORS } from '../../constants/list'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ListBuilderTier from '../ListBuilderTier'
import Title from '../Title'
import getInitialListData from '../../helpers/getInitialListData'
import getLiveTierList from '../../helpers/getLiveTierList'

const ListBuilderDisplayView = props => {
  const id = React.useMemo(() => getLiveTierList(), [])
  const tiers = getInitialListData(id)

  return (
    <>
      <h1 className='VisuallyHidden'>Ranked Tier List</h1>
      <Row wideGutter desktopOnly>
        <Column width={33}>
          <Title element='h2'>Info</Title>

          <p>
            This tier list is computed from the{' '}
            <Link to='/deck/suggestions'>deck suggestions</Link>. It orders
            cards based on how frequently they appear in top-ranking decks. This
            does not necessarily reflect the actual power of each card
            individually; it is more a popularity list that way.
          </p>

          <p>
            The name of each tier corresponds to the inclusion ratio. For
            instance, <span className='Highlight'>0.9 — 1.0</span> contains
            cards that are included in over 90% of decks that can include them.
          </p>
        </Column>

        <Column width={66}>
          <Title>Tier list</Title>

          {tiers.map((tier, index) => (
            <ListBuilderTier
              {...tier}
              color={TIER_COLORS[index]}
              key={index}
              prefix={`tier-${index}-`}
              isEditable={false}
            />
          ))}
        </Column>
      </Row>

      <PageMeta title='Ranked Tier List' />
    </>
  )
}

export default ListBuilderDisplayView
