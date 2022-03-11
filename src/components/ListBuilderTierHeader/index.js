import React from 'react'
import { useFela } from 'react-fela'
import CardSelect from '~/components/CardSelect'
import Label from '~/components/Label'
import Link from '~/components/Link'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import generateId from '~/helpers/generateId'
import styles from './styles'

const TierName = props => {
  return props.isEditable ? (
    <Input
      label='Tier name'
      id={`${props.prefix}listName`}
      value={props.name}
      onChange={event => props.updateName(event.target.value)}
      maxLength={30}
      placeholder='Unnamed tier'
    />
  ) : (
    <Label as='h3' id={generateId(props.name)}>
      {props.name}
    </Label>
  )
}

const CardPicker = props => (
  <CardSelect
    label='Add card to tier'
    name='newCard'
    id={`${props.prefix}listName`}
    current=''
    onChange={option => (option ? props.addCard(option.value) : undefined)}
    disabledOptions={props.cards}
    withSpells
    withClear
  />
)

const TierMoveButtons = props => (
  <>
    <Link
      type='button'
      onClick={props.moveUp}
      disabled={!props.isEditable || !props.canMoveUp}
      extend={styles.move}
    >
      <Icon icon='arrow-up' /> Move tier up
    </Link>
    <Link
      type='button'
      onClick={props.moveDown}
      disabled={!props.isEditable || !props.canMoveDown}
      extend={styles.move}
    >
      <Icon icon='arrow-down' /> Move tier down
    </Link>
  </>
)

export default React.memo(function ListBuilderTierHeader(props) {
  const { css } = useFela()

  return (
    <>
      <div className={css(styles.row)}>
        <div className={css(styles.item)}>
          <TierName
            isEditable={props.isEditable}
            name={props.name}
            prefix={props.prefix}
            updateName={props.updateName}
          />
        </div>

        {props.isEditable ? (
          <div className={css(styles.item)}>
            <CardPicker
              cards={props.cards}
              addCard={props.addCard}
              prefix={props.prefix}
            />
          </div>
        ) : null}
      </div>

      {props.isEditable && (
        <div className={css(styles.row, styles.buttons)}>
          <TierMoveButtons
            isEditable={props.isEditable}
            moveUp={props.moveUp}
            moveDown={props.moveDown}
            canMoveUp={props.canMoveUp}
            canMoveDown={props.canMoveDown}
          />
        </div>
      )}
    </>
  )
})
