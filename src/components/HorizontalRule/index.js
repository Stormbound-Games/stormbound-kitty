import React from 'react'
import { useFela } from 'react-fela'
import useSpacing from '../../hooks/useSpacing'
import styles from './styles'

const HorizontalRule = props => {
  const { css } = useFela()
  const margin = useSpacing(props.spacing || { vertical: 'LARGER' })

  return <hr className={css(margin, styles.rule)} />
}

export default React.memo(HorizontalRule)
