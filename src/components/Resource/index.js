import React from 'react'
import ResourceIcon from '../ResourceIcon'

const Resource = React.memo(function Resource({ amount, resource }) {
  return (
    <>
      <ResourceIcon resource={resource} />
      &nbsp;{amount}&nbsp;
      {resource === 'COIN' && (amount === 1 ? 'coin' : 'coins')}
      {resource === 'STONE' &&
        (amount === 1 ? 'fusion stone' : 'fusion stones')}
    </>
  )
})

export const Coins = React.memo(function Coins(props) {
  return <Resource resource='COIN' {...props} />
})

export const Stones = React.memo(function Stones(props) {
  return <Resource resource='STONE' {...props} />
})
