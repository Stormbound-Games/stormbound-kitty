import React from 'react'
import { useFela } from 'react-fela'
import Only from '../Only'
import styles from './styles'

export default React.memo(function DeckCardLevelField(props) {
  const { css } = useFela()
  return (
    <div className={css(styles.field)}>
      <label htmlFor='level' className={css(styles.label)}>
        Cards level
        <Only.Desktop>
          <span className={css(styles.hint)}>(keyboard 1-5)</span>
        </Only.Desktop>
      </label>
      <select
        data-testid='level-select'
        name='level'
        id='level'
        value={props.cardLevel}
        onChange={event => props.setCardLevel(+event.target.value)}
        required
      >
        <Only.CustomCollection>
          <option value={0}>Yours</option>
        </Only.CustomCollection>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  )
})
