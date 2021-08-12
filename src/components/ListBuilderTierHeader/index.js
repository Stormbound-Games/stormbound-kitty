import React from 'react'
import { useFela } from 'react-fela'
import CardSelect from '../CardSelect'
import Input from '../Input'
import Only from '../Only'
import generateId from '../../helpers/generateId'
import styles from './styles'

export default React.memo(function ListBuilderTierHeader(props) {
  const { css } = useFela()

  return (
    <header className={css(styles.header)}>
      <div className={'ListBuilderTierHeader__item ' + css(styles.item)}>
        {props.isEditable ? (
          <Input
            label='Tier name'
            id={`${props.prefix}listName`}
            value={props.name}
            onChange={event => props.onNameChange(event.target.value)}
            maxLength={30}
            placeholder='Unnamed tier'
          />
        ) : (
          <h3 className={css(styles.name)} id={generateId(props.name)}>
            {props.name}
          </h3>
        )}
      </div>

      <div className={'ListBuilderTierHeader__item ' + css(styles.item)}>
        {props.isEditable ? (
          <>
            <CardSelect
              label='Add card to tier'
              name='newCard'
              id={`${props.prefix}listName`}
              current=''
              onChange={option => props.addCard(option ? option.value : null)}
              disabledOptions={props.cards.map(card => card.id)}
              withSpells
              withClear
            />
          </>
        ) : null}
      </div>

      {props.isEditable && (
        <Only.Desktop>
          <div className={'ListBuilderTierHeader__item ' + css(styles.item)}>
            <button
              type='button'
              onClick={props.moveUp}
              title='Move tier up'
              aria-label='Move tier up'
              className={css(styles.move)}
              disabled={!props.isEditable || !props.canMoveUp}
            >
              ↑
            </button>

            <button
              type='button'
              onClick={props.moveDown}
              title='Move tier down'
              aria-label='Move tier down'
              className={css(styles.move)}
              disabled={!props.isEditable || !props.canMoveDown}
            >
              ↓
            </button>
          </div>
        </Only.Desktop>
      )}
    </header>
  )
})
