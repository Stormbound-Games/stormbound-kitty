import React from 'react'
import { useFela } from 'react-fela'
import Spacing from '~/components/Spacing'
import styles from './styles'

// Pages have a narrow width by default, imposed by the `Page.Narrow` wrapper,
// but it is sometimes necessary to display something across the full width of
// the container. For that, the `FullWidth` sub-component can be used.
const PageEmbed = React.memo(function PageEmbed(props) {
  const { css } = useFela()

  return (
    <div className={css(styles.embed)}>
      <Spacing vertical={['LARGE', 'LARGER']}>{props.children}</Spacing>
    </div>
  )
})

export default PageEmbed
