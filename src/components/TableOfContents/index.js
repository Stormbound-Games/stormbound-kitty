import React from 'react'
import { useFela } from 'react-fela'
import Spacing from '../Spacing'

const TableOfContents = ({
  spacing = { vertical: 'LARGE' },
  extend,
  ...props
}) => {
  const { css } = useFela()
  return (
    <Spacing {...spacing}>
      <ol
        {...props}
        className={css(
          {
            columns: '16em',
            paddingLeft: 0,
            listStylePosition: 'inside',
          },
          extend
        )}
      />
    </Spacing>
  )
}

export default React.memo(TableOfContents)
