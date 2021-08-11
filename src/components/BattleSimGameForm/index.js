import React from 'react'
import { useFela } from 'react-fela'
import { useRouteMatch } from 'react-router-dom'
import Checkbox from '../Checkbox'
import NumberInput from '../NumberInput'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../BattleSimShareButton'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

export default React.memo(function BattleSimGameForm(props) {
  const { css } = useFela()
  const match = useRouteMatch()
  const isPristine = !match.params.simId

  return (
    <div className={css(styles.form)}>
      <Row>
        <Row.Column>
          <label htmlFor='mana'>Current mana</label>
          <NumberInput
            name='mana'
            id='mana'
            min={3}
            max={99}
            value={props.mana}
            onChange={props.setMana}
            data-testid='mana-input'
            required
          />
        </Row.Column>
        <Row.Column>
          <fieldset>
            <legend>Grid Markers</legend>
            <Checkbox
              name='gridMarkers'
              id='gridMarkers'
              checked={props.gridMarkers}
              onChange={props.toggleGridMarkers}
              data-testid='grid-markers'
              extend={css(styles.gridMarkers)}
            >
              Enable <VisuallyHidden>grid markers</VisuallyHidden>
            </Checkbox>
          </fieldset>
        </Row.Column>
      </Row>
      <div className={css(styles.buttons)}>
        <Row>
          <Row.Column>
            <ResetButton
              label='Reset board'
              confirm='Are you sure you want to reset the board and all its configuration?'
              reset={props.resetBoard}
              disabled={isPristine}
            />
          </Row.Column>
          <Row.Column>
            <ShareButton disabled={isPristine} />
          </Row.Column>
        </Row>
      </div>
    </div>
  )
})
