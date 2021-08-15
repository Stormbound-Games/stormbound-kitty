import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '../Checkbox'
import NumberInput from '../NumberInput'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../BattleSimShareButton'
import Spacing from '../Spacing'
import VisuallyHidden from '../VisuallyHidden'
import useRouter from '../../hooks/useRouter'
import styles from './styles'

export default React.memo(function BattleSimGameForm(props) {
  const { css } = useFela()
  const { params } = useRouter()
  const isPristine = !params.simId

  return (
    <div className={css(styles.form)}>
      <Row>
        <Row.Column>
          <NumberInput
            label='Current mana'
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
              id='gridMarkers'
              checked={props.gridMarkers}
              onChange={props.toggleGridMarkers}
              data-testid='grid-markers'
              extend={styles.gridMarkers}
            >
              Enable <VisuallyHidden>grid markers</VisuallyHidden>
            </Checkbox>
          </fieldset>
        </Row.Column>
      </Row>
      <Spacing top='BASE'>
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
      </Spacing>
    </div>
  )
})
