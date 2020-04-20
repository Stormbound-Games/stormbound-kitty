import React from 'react'
import { SHADES_LIST, TIER_COLORS } from '../../constants/list'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ListBuilderTier from '../ListBuilderTier'
import Title from '../Title'
import getInitialListData from '../../helpers/getInitialListData'

const ListBuilderDisplayView = props => {
  const id = SHADES_LIST
  const tiers = getInitialListData(id)

  return (
    <>
      <h1 className='visually-hidden'>Equals Tier List</h1>
      <Row wideGutter desktopOnly>
        <Column width={33}>
          <Title element='h2'>Info</Title>

          <p>
            This tier list was made by Shades, a multiple-times winner of
            equal-levels tournaments. It is his take at ranking cards by
            efficiency in Equals mode. Your mileage may vary.
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

      <PageMeta title='Equals Tier List' />
    </>
  )
}

export default ListBuilderDisplayView
