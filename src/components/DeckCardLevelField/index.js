import React from 'react'
import { useFela } from 'react-fela'
import Only from '~/components/Only'
import Select from '~/components/Select'
import styles from './styles'

export default React.memo(function DeckCardLevelField(props) {
  const { css } = useFela()

  return (
    <div className={css(styles.field)}>
      <Select
        label={
          <span className={css(styles.label)}>
            Cards level
            <Only.Desktop>
              <span className={css(styles.hint)}>(keyboard 1-5)</span>
            </Only.Desktop>
          </span>
        }
        extend={styles.select}
        data-testid='level-select'
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
      </Select>
    </div>
  )
})
