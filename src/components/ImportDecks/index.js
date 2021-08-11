import React from 'react'
import { useFela } from 'react-fela'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { NotificationContext } from '../NotificationProvider'
import CTA from '../CTA'
import Only from '../Only'
import uuid from '../../helpers/uuid'
import styles from './styles'

const useFileUpload = onChange => {
  const { setDecks } = React.useContext(PersonalDecksContext)
  const { notify } = React.useContext(NotificationContext)

  return event => {
    const { nativeEvent } = event
    const file = nativeEvent.file
      ? new File([nativeEvent.file.data], nativeEvent.file.name, {
          type: nativeEvent.file.type,
        })
      : event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    try {
      reader.readAsText(file)
    } catch (error) {
      if (onChange) onChange(null)
    }

    reader.onload = event => {
      try {
        const data = parseCSVData(event.target.result)
        setDecks(data)
        notify({
          icon: 'stack',
          children: 'Your decks have been successfully imported.',
        })
        if (onChange) onChange(data)
      } catch (error) {
        if (onChange) onChange(null)
      }
    }
  }
}

const parseCSVData = data => {
  return data
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map(item => {
      // prettier-ignore
      const [id, name, /* faction */, tags] = item.split(',')
      return { id, name, tags: tags.split(' '), uuid: uuid() }
    })
}

export default React.memo(function ImportDecks(props) {
  const { css } = useFela()
  const onFileUpload = useFileUpload(props.onChange)

  return (
    <div className={css(styles.container)}>
      <CTA as='label' htmlFor='import'>
        Import<Only.Desktop> decks</Only.Desktop>
      </CTA>
      <input
        id='import'
        name='import'
        type='file'
        accept='.csv'
        onChange={onFileUpload}
        className={css(styles.file)}
        data-testid='import-decks-btn'
      />
    </div>
  )
})
