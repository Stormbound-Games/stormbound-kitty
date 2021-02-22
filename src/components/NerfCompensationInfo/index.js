import React from 'react'
import Info from '../Info'
import ResourceIcon from '../ResourceIcon'

export default React.memo(function NerfCompensationInfo(props) {
  return (
    <Info icon='heart' title='Nerf compensation'>
      <p>
        As usual, some compensation in the form of coins and fusion stones will
        be provided to owners of these nerfed cards, proportional to the level
        and rarity of the card. Find below the reimbursement values for each
        rarity and level (coins/stones).
      </p>
      <ul style={{ marginBottom: 0 }}>
        <li>
          <ResourceIcon resource='COMMON' />
          &nbsp; Common card: 0/0, 10/0, 20/1, 50/2, 120/5
        </li>
        <li>
          <ResourceIcon resource='RARE' />
          &nbsp; Rare card: 0/0, 15/2, 30/3, 90/7, 190/10
        </li>
        <li>
          <ResourceIcon resource='EPIC' />
          &nbsp; Epic card: 0/0, 15/2, 40/5, 120/10, 250/20
        </li>
        <li>
          <ResourceIcon resource='LEGENDARY' />
          &nbsp; Legendary card: 0/1, 20/5, 50/10, 150/20, 300/50
        </li>
      </ul>
    </Info>
  )
})
