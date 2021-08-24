import React from 'react'
import { useFela } from 'react-fela'
import useSpacing from '~/hooks/useSpacing'
import styles from './styles'

export default React.memo(function HorizontalRule(props) {
  const { css } = useFela()
  const margin = useSpacing(props.spacing || { vertical: ['LARGE', 'LARGER'] })

  return <hr className={css(margin, styles.rule)} />
})
