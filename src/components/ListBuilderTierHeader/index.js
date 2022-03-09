import React from 'react'
import { useFela } from 'react-fela'
import CardSelect from '~/components/CardSelect'
import DiamondButton from '~/components/DiamondButton'
import Input from '~/components/Input'
import generateId from '~/helpers/generateId'
import styles from './styles'

export default React.memo(function ListBuilderTierHeader(props) {
  const { css } = useFela()

  return (
    <header className={css(styles.header)}>
      <div className={css(styles.item)}>
        {props.isEditable ? (
          <Input
            label='Tier name'
            id={`${props.prefix}listName`}
            value={props.name}
            onChange={event => props.updateName(event.target.value)}
            maxLength={30}
            placeholder='Unnamed tier'
          />
        ) : (
          <h3 className={css(styles.name)} id={generateId(props.name)}>
            {props.name}
          </h3>
        )}
      </div>

      {props.isEditable ? (
        <div className={css(styles.item)}>
          <CardSelect
            label='Add card to tier'
            name='newCard'
            id={`${props.prefix}listName`}
            current=''
            onChange={option =>
              option ? props.addCard(option.value) : undefined
            }
            disabledOptions={props.cards}
            withSpells
            withClear
          />
        </div>
      ) : null}

      {props.isEditable && (
        <div className={css(styles.item, styles.buttons)}>
          <DiamondButton
            onClick={props.moveUp}
            label='Move tier up'
            disabled={!props.isEditable || !props.canMoveUp}
            icon='arrow-up'
            extend={styles.move}
          />
          <DiamondButton
            onClick={props.moveDown}
            label='Move tier down'
            disabled={!props.isEditable || !props.canMoveDown}
            icon='arrow-down'
            extend={styles.move}
          />
        </div>
      )}
    </header>
  )
})
