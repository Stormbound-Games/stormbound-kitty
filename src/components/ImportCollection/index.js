import React from 'react'
import { useFela } from 'react-fela'
import { CollectionContext } from '../CollectionProvider'
import { NotificationContext } from '../NotificationProvider'
import CTA from '../CTA'
import Only from '../Only'
import CARDS from '../../data/cards'
import chunk from '../../helpers/chunk'
import styles from './styles'

const useFileUpload = onChange => {
  const { updateCollection } = React.useContext(CollectionContext)
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
        updateCollection(data)
        notify({
          icon: 'books',
          children: 'Your collection has been successfully imported.',
        })
        if (onChange) onChange(data)
      } catch (error) {
        if (onChange) onChange(null)
      }
    }
  }
}

const parseCSVData = data => {
  // The former CSV exporting didn’t use line breaks to split lines, therefore
  // the importing needs to be based on the line separator
  const isCollectionSplitWithLineBreaks = data.includes('\n')
  // The former CSV exporting didn’t include card names as it was just about
  // exporting/importing data, without caring about making it readable
  const hasCollectionCardNames = data.includes('name')
  const items = isCollectionSplitWithLineBreaks
    ? data
        .split('\n')
        .slice(1)
        .map(item => item.split(','))
    : chunk(data.split(',').slice(3), hasCollectionCardNames ? 4 : 3)

  // To make sure the collection is complete, the source of truth is the data
  // from the constant file
  return CARDS.filter(card => !card.token).map(card => {
    const item = items.find(item => item[0] === card.id)

    // The card has not been found in the CSV data, which might mean it’s a
    // new card, therefore consider it missing
    if (!item) {
      return { id: card.id, level: 1, copies: 0, missing: true }
    }

    const level = hasCollectionCardNames ? +item[2] : +item[1]
    const copies = hasCollectionCardNames ? +item[3] : +item[2]

    if (level === 0) {
      return { id: card.id, level: 1, copies: 0, missing: true }
    }

    return { id: card.id, level, copies, missing: false }
  })
}

export default React.memo(function ImportCollection(props) {
  const { css } = useFela()
  const onFileUpload = useFileUpload(props.onChange)

  return (
    <div className={css(styles.container)}>
      <CTA as='label' htmlFor='import'>
        Import<Only.Desktop> collection</Only.Desktop>
      </CTA>
      <input
        id='import'
        name='import'
        type='file'
        accept='.csv'
        onChange={onFileUpload}
        className={css(styles.file)}
        data-testid='import-btn'
      />
    </div>
  )
})
