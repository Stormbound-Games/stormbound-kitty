import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Table(props) {
  const { css } = useFela({ isZebra: props.zebra })

  return (
    <table className={css(styles.table, props.extend)}>{props.children}</table>
  )
})
