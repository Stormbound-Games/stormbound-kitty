import React from 'react'
import ResourceIcon from '../ResourceIcon'

const Resource = ({ amount, resource }) => (
  <>
    <ResourceIcon resource={resource} />
    &nbsp;{amount}&nbsp;
    {resource === 'COIN' && (amount === 1 ? 'coin' : 'coins')}
    {resource === 'STONE' && (amount === 1 ? 'fusion stone' : 'fusion stones')}
  </>
)

export const Coins = props => <Resource resource='COIN' {...props} />
export const Stones = props => <Resource resource='STONE' {...props} />
