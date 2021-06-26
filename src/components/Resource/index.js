import React from 'react'
import ResourceIcon from '../ResourceIcon'

const THOUSANDS = /\B(?=(\d{3})+(?!\d))/g

const Resource = React.memo(function Resource({ amount, resource }) {
  return (
    <>
      <span style={{ whiteSpace: 'nowrap' }}>
        <ResourceIcon resource={resource} />
        &nbsp;{amount.toString().replace(THOUSANDS, ',')}
      </span>
      &nbsp;
      {resource === 'COIN' && (amount === 1 ? 'coin' : 'coins')}
      {resource === 'RUBY' && (amount === 1 ? 'ruby' : 'rubies')}
      {resource === 'HERO_CROWN' &&
        (amount === 1 ? 'Hero Crown' : 'Hero Crowns')}
      {resource === 'CROWN' && (amount === 1 ? 'crown' : 'crowns')}
      {resource === 'STONE' &&
        (amount === 1 ? 'fusion stone' : 'fusion stones')}
      {resource === 'COMMON' && (amount === 1 ? 'common card' : 'common cards')}
      {resource === 'RARE' && (amount === 1 ? 'rare card' : 'rare cards')}
      {resource === 'EPIC' && (amount === 1 ? 'epic card' : 'epic cards')}
      {resource === 'LEGENDARY' &&
        (amount === 1 ? 'legendary card' : 'legendary cards')}
    </>
  )
})

export const Coins = React.memo(function Coins(props) {
  return <Resource resource='COIN' {...props} />
})

export const Crowns = React.memo(function Crowns(props) {
  return <Resource resource='CROWN' {...props} />
})

export const HeroCrowns = React.memo(function HeroCrowns(props) {
  return <Resource resource='HERO_CROWN' {...props} />
})

export const Stones = React.memo(function Stones(props) {
  return <Resource resource='STONE' {...props} />
})

export const Rubies = React.memo(function Rubies(props) {
  return <Resource resource='RUBY' {...props} />
})

export const Common = React.memo(function Common(props) {
  return <Resource resource='COMMON' {...props} />
})
export const Rare = React.memo(function Rare(props) {
  return <Resource resource='RARE' {...props} />
})
export const Epic = React.memo(function Epic(props) {
  return <Resource resource='EPIC' {...props} />
})
export const Legendary = React.memo(function Legendary(props) {
  return <Resource resource='LEGENDARY' {...props} />
})
