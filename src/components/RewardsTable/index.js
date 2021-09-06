import React from 'react'
import { useFela } from 'react-fela'
import Table from '~/components/Table'
import getResourceLabel from '~/helpers/getResourceLabel'
import useSpacing from '~/hooks/useSpacing'

export default React.memo(function RewardsTable(props) {
  const { css } = useFela()
  const spacing = useSpacing({ bottom: 'BASE' })

  return (
    <details>
      <summary className={css({ borderBottomColor: 'currentcolor' }, spacing)}>
        Expand the rewards breakdown per day.
      </summary>

      <Table>
        <thead>
          <tr>
            <th className={css({ width: '100px' })}>Day</th>
            <th>Free</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          {props.rewards.map(([free, premium], index) => (
            <tr key={index}>
              <td className={css({ width: '100px' })}>#{index + 1}</td>
              <td>{getResourceLabel(free, true)}</td>
              <td>{getResourceLabel(premium, true)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </details>
  )
})
