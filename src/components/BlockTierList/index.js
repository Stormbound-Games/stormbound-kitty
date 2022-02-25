import React from 'react'
import ListBuilderTier from '~/components/ListBuilderTier'
import getInitialListData from '~/helpers/getInitialListData'
import { TIER_COLORS } from '~/constants/list'

export default React.memo(function BlockTierList(props) {
  const { id } = props.value
  const tiers = React.useMemo(() => getInitialListData(id), [id])

  return tiers.map((tier, index) => (
    <ListBuilderTier
      {...tier}
      color={TIER_COLORS[index]}
      key={tier.name || index}
      prefix={`tier-${index}-`}
      isEditable={false}
    />
  ))
})
