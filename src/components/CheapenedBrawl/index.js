import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import Info from '../Info'
import Only from '../Only'
import Table from '../Table'
import Title from '../Title'
import { Crowns, Coins } from '../Resource'
import { BRAWL_MILESTONES } from '../../constants/brawl'
import getMilestoneCost from '../../helpers/getMilestoneCost'
import getRewardLabel from '../../helpers/getRewardLabel'
import styles from './styles'

const CheapenedBrawl = ({
  ratio = 1,
  children,
  difficulty,
  id = 'cheapened-brawl',
  title = 'Cheapened Brawl',
}) => {
  const { css } = useFela()
  const [active, setActive] = React.useState(difficulty || 'CASUAL')

  return (
    <>
      <Title id={id}>{title}</Title>

      {children}

      <Only.Desktop>
        <p>Here are the adjusted values for every milestone:</p>

        {difficulty !== 'LEGACY' && (
          <div className={css(styles.controls)}>
            <button
              type='button'
              className={css(styles.control({ isActive: active === 'CASUAL' }))}
              onClick={() => setActive('CASUAL')}
            >
              Casual
            </button>
            <button
              type='button'
              className={css(
                styles.control({ isActive: active === 'WARRIOR' })
              )}
              onClick={() => setActive('WARRIOR')}
            >
              Warrior
            </button>
            <button
              type='button'
              className={css(
                styles.control({ isActive: active === 'ULTIMATE' })
              )}
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
