import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Table from '~/components/Table'
import TogglableContent from '~/components/TogglableContent'
import getResourceLabel from '~/helpers/getResourceLabel'

export default React.memo(function RewardsTable(props) {
  const { css } = useFela()
  const [isTableExpanded, expandTable] = React.useState(false)

  return (
    <TogglableContent
      isExpanded={isTableExpanded}
      id='reward-table'
      renderToggle={toggleProps => (
        <p>
          Refer to the following table to get the rewards breakdown per day.{' '}
          <Link
            {...toggleProps}
            onClick={() => expandTable(isExpanded => !isExpanded)}
          >
            {isTableExpanded
              ? '- Hide table breakdown'
              : '+ Show table breakdown'}
          </Link>
        </p>
      )}
    >
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
    </TogglableContent>
  )
})
