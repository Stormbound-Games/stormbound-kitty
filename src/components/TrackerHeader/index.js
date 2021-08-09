import React from 'react'
import Checkbox from '../Checkbox'
import CTA from '../CTA'
import Mana from '../Mana'
import ResetButton from '../ResetButton'
import Row from '../Row'
import { STATUSES } from '../../constants/tracker'

export default React.memo(function TrackerHeader(props) {
  return (
    <div className='TrackerHeader'>
      <Row desktopOnly>
        <Row.Column width='1/3' align='center'>
          <span className='TrackerHeader__mana'>
            <div>
              Current mana:{' '}
              <Mana
                mana={props.mana}
                disabled={props.hand.every(
                  cardId => !props.canCardBePlayed(props.state, cardId)
                )}
              />
            </div>
            <Checkbox
              name='second-player'
              id='second-player'
              checked={props.playerOrder === 'SECOND'}
              disabled={props.untouchedCards.length !== 12}
              onChange={() =>
                props.setPlayerOrder(
                  props.playerOrder === 'FIRST' ? 'SECOND' : 'FIRST'
                )
              }
            >
              Second player
            </Checkbox>
          </span>
        </Row.Column>

        <Row.Column width='1/3' align='center'>
          <ResetButton
            label='Reset game'
            confirm='Are you sure you want to reset the game? Don’t worry, you’ll keep your deck.'
            reset={props.resetGame}
          >
            <div className='TrackerHeader__reset-checkbox'>
              <Checkbox
                name='equals-mode'
                id='equals-mode'
                checked={props.equalsMode}
                onChange={() => props.setEqualsMode(s => !s)}
              >
                Reset in equal levels
              </Checkbox>
            </div>
          </ResetButton>
        </Row.Column>

        <Row.Column width='1/3' align='center'>
          <CTA
            type='button'
            onClick={props.endTurn}
            disabled={props.status !== STATUSES.PLAYING}
          >
            <u>E</u>nd turn
          </CTA>
        </Row.Column>
      </Row>
    </div>
  )
})
