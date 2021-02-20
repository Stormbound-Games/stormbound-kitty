import React from 'react'
import { Link } from 'react-router-dom'
import Info from '../Info'
import Only from '../Only'
import Table from '../Table'
import Title from '../Title'
import { Crowns, Coins } from '../Resource'
import { MILESTONES } from '../../constants/brawl'
import getRewardLabel from '../../helpers/getRewardLabel'

const CheapenedBrawl = ({
  ratio = 1,
  children,
  id = 'cheapened-brawl',
  title = 'Cheapened Brawl',
}) => (
  <>
    <Title id={id}>{title}</Title>

    {children}

    <Only.Desktop>
      <p>Here are the adjusted values for every milestone:</p>

      <Table>
        <thead>
          <tr>
            <th>Required crowns</th>
            <th>Cost per match</th>
            <th>Reward once reached</th>
          </tr>
        </thead>
        <tbody>
          {MILESTONES.map(milestone => {
            const cost = Math.ceil(Math.ceil(milestone.cost * ratio) / 5) * 5

            return (
              <tr key={milestone.crowns}>
                <td>
                  <Crowns amount={milestone.crowns} />
                </td>
                <td>
                  <Coins amount={cost} /> ({-1 * (milestone.cost - cost)})
                </td>
                <td>{getRewardLabel(milestone, true)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
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

export default React.memo(CheapenedBrawl)
