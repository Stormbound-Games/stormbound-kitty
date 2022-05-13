import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '~/components/Checkbox'
import Label from '~/components/Label'
import NumberInput from '~/components/NumberInput'
import ResetButton from '~/components/ResetButton'
import Row from '~/components/Row'
import ShareButton from '~/components/BattleSimShareButton'
import Spacing from '~/components/Spacing'
import VisuallyHidden from '~/components/VisuallyHidden'
import useRouteId from '~/hooks/useRouteId'
import styles from './styles'

export default React.memo(function BattleSimGameForm(props) {
  const { css } = useFela()
  const isPristine = !useRouteId()

  return (
    <div className={css(styles.form)}>
      <Row withNarrowGutter>
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
            <Label as='legend'>Grid Markers</Label>
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
      <Spacing top='LARGE'>
        <Row withNarrowGutter>
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
