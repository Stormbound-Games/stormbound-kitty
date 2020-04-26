import React from 'react'
import ResourceIcon from '../ResourceIcon'

const Resource = React.memo(({ amount, resource }) => (
  <>
    <ResourceIcon resource={resource} />
    &nbsp;{amount}&nbsp;
    {resource === 'COIN' && (amount === 1 ? 'coin' : 'coins')}
    {resource === 'STONE' && (amount === 1 ? 'fusion stone' : 'fusion stones')}
  </>
))

export const Coins = React.memo(props => (
  <Resource resource='COIN' {...props} />
))

export const Stones = React.memo(props => (
  <Resource resource='STONE' {...props} />
))
