import React from 'react'
import PageEmbed from '~/components/PageEmbed'
import Table from '~/components/Table'
import iconify from '~/helpers/iconify'

export default React.memo(function BlockTable(props) {
  const [head, ...rows] = props.value.rows
  const isBiDirectional = head.cells[0].length === 0

  return (
    <PageEmbed>
      <Table>
        <thead>
          <tr>
            {head.cells.map(cell => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.cells.map((cell, index) => {
                const Component = isBiDirectional && index === 0 ? 'th' : 'td'
                return (
                  <Component
                    key={cell}
                    data-label={head.cells[index]}
                    title={head.cells[index]}
                  >
                    {iconify(cell)}
                  </Component>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </PageEmbed>
  )
})
