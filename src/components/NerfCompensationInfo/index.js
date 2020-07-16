import React from 'react'
import { Link } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import Info from '../Info'
import { Coins, Stones } from '../Resource'
import getRawCardData from '../../helpers/getRawCardData'

const NERFS = 'N70,N74,N76,F20,F28,S20,S21,S28,W9,W13,W19,W27'.split(',')
const COMPENSATION = {
  common: ['0/0', '10/0', '20/1', '50/2', '120/5'],
  rare: ['0/0', '15/2', '30/3', '90/7', '190/10'],
  epic: ['0/0', '15/2', '40/5', '120/10', '250/20'],
  legendary: ['0/1', '20/5', '50/10', '150/20', '300/50'],
}

export default React.memo(function NerfCompensationInfo(props) {
  const { collection } = React.useContext(CollectionContext)
  const { coins, stones } = NERFS.reduce(
    (total, id) => {
      const { rarity } = getRawCardData(id)
      const card = collection.find(card => card.id === id)
      if (!card || card.missing) return total

      const compensation = COMPENSATION[rarity][card.level - 1]
        .split('/')
        .map(Number)

      total.coins += compensation[0]
      total.stones += compensation[1]
      return total
    },
    { coins: 0, stones: 0 }
  )

  return (
    <Info icon='heart' title='Nerf compensation' style={{ marginTop: '2em' }}>
      Following the nerfs of the{' '}
      <Link to='/changelog/07-2020'>July update</Link>, you will be compensated
      with <Coins amount={coins} /> and <Stones amount={stones} /> given the
      level of the nerfed cards in your collection.
    </Info>
  )
})
