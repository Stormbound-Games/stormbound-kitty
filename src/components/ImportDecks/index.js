import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { NotificationContext } from '../NotificationProvider'
import Only from '../Only'
import './index.css'

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
      const [id, name, faction, category] = item.split(',')
      return { id, name, faction, category }
    })
}

export default React.memo(function ImportDecks(props) {
  const onFileUpload = useFileUpload(props.onChange)

  return (
    <div className='ImportDecks'>
      <label htmlFor='import' className='CTA'>
        <span className='CTA__content'>
          Import<Only.Desktop> decks</Only.Desktop>
        </span>
      </label>
      <input
        id='import'
        name='import'
        type='file'
        accept='.csv'
        onChange={onFileUpload}
        className='ImportDecks__file'
        data-testid='import-decks-btn'
      />
    </div>
  )
})
