import React from 'react'
import { Link } from 'react-router-dom'
import Info from '../Info'
import Only from '../Only'
import Table from '../Table'
import Title from '../Title'
import { Crowns, Coins } from '../Resource'
import { BRAWL_MILESTONES } from '../../constants/brawl'
import getMilestoneCost from '../../helpers/getMilestoneCost'
import getRewardLabel from '../../helpers/getRewardLabel'
import './index.css'

const CheapenedBrawl = ({
  ratio = 1,
  children,
  difficulty,
  id = 'cheapened-brawl',
  title = 'Cheapened Brawl',
}) => {
  const [active, setActive] = React.useState(difficulty || 'CASUAL')

  return (
    <>
      <Title id={id}>{title}</Title>

      {children}

      <Only.Desktop>
        <p>Here are the adjusted values for every milestone:</p>

        {difficulty !== 'LEGACY' && (
          <div className='CheapenedBrawl__controls'>
            <button
              type='button'
              className={[
                'CheapenedBrawl__control',
                active === 'CASUAL' && 'CheapenedBrawl__control--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActive('CASUAL')}
            >
              Casual
            </button>
            <button
              type='button'
              className={[
                'CheapenedBrawl__control',
                active === 'WARRIOR' && 'CheapenedBrawl__control--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActive('WARRIOR')}
            >
              Warrior
            </button>
            <button
              type='button'
              className={[
                'CheapenedBrawl__control',
                active === 'ULTIMATE' && 'CheapenedBrawl__control--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActive('ULTIMATE')}
            >
              Ultimate
            </button>
          </div>
        )}

        <Table>
          <thead>
            <tr>
              <th>Required crowns</th>
              <th>Cost per match</th>
              <th>Reward once reached</th>
            </tr>
          </thead>
          <tbody>
            {BRAWL_MILESTONES[active].map(milestone => {
              const cost = getMilestoneCost(milestone, ratio)

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
}
export default React.memo(CheapenedBrawl)
