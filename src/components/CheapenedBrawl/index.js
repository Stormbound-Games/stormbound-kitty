import React from 'react'
import Link from '~/components/Link'
import Info from '~/components/Info'
import Only from '~/components/Only'
import Table from '~/components/Table'
import Tabs from '~/components/Tabs'
import { Crowns, Coins } from '~/components/Resource'
import { BRAWL_MILESTONES } from '~/constants/brawl'
import getMilestoneCost from '~/helpers/getMilestoneCost'
import getResourceLabel from '~/helpers/getResourceLabel'
import styles from './styles'

const BrawlTable = props => (
  <Table>
    <thead>
      <tr>
        <th>Required crowns</th>
        <th>Cost per match</th>
        <th>Reward once reached</th>
      </tr>
    </thead>
    <tbody>
      {BRAWL_MILESTONES[props.active].map(milestone => {
        const cost = getMilestoneCost(milestone, props.ratio)

        return (
          <tr key={milestone.crowns}>
            <td>
              <Crowns amount={milestone.crowns} />
            </td>
            <td>
              <Coins amount={cost} /> ({-1 * (milestone.cost - cost)})
            </td>
            <td>{getResourceLabel(milestone, true)}</td>
          </tr>
        )
      })}
    </tbody>
  </Table>
)

export default React.memo(function CheapenedBrawl({ ratio = 1, difficulty }) {
  return (
    <>
      <Only.Desktop>
        <p>Here are the adjusted values for every milestone:</p>

        {difficulty !== 'LEGACY' ? (
          <Tabs
            extend={{ tabList: styles.controls, tab: styles.control }}
            tabs={['Casual', 'Warrior', 'Ultimate'].map(difficulty => ({
              id: difficulty.toUpperCase(),
              label: difficulty,
              content: (
                <BrawlTable ratio={ratio} active={difficulty.toUpperCase()} />
              ),
            }))}
          />
        ) : (
          <BrawlTable ratio={ratio} active='LEGACY' />
        )}
      </Only.Desktop>

      <Info icon='equalizer' title='Brawl calculator'>
        <p>
          To calculate how far you can go with a given amount of coins, or how
          much it will cost you to reach a certain milestone, be sure to use the{' '}
          <Link to='/calculators/brawl'>Brawl calculator</Link>. It makes it
          possible to define a certain Brawl discount as well.
        </p>
      </Info>
    </>
  )
})
