import React from 'react'
import { CollectionContext } from '~/components/CollectionProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import { CardsContext } from '~/components/CardsProvider'
import CTA from '~/components/CTA'
import FileUpload from '~/components/FileUpload'
import Only from '~/components/Only'
import chunk from '~/helpers/chunk'
import useIsMounted from '~/hooks/useIsMounted'

const parseCSVData = cards => data => {
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
  return cards
    .filter(card => !card.token)
    .map(card => {
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

const notification = {
  icon: 'books',
  children: 'Your collection has been successfully imported.',
}

export default React.memo(function ImportCollection(props) {
  const isMounted = useIsMounted()
  const { cards } = React.useContext(CardsContext)
  const { updateCollection } = React.useContext(CollectionContext)
  const { notify } = React.useContext(NotificationContext)
  const { onChange } = props

  const handleSuccess = React.useCallback(
    data => {
      updateCollection(data)
      notify(notification)
      if (typeof onChange === 'function') onChange(data)
    },
    [onChange, notify, updateCollection]
  )

  if (!isMounted) {
    return (
      <CTA disabled type='button'>
        Import<Only.Desktop> collection</Only.Desktop>
      </CTA>
    )
  }

  return (
    <CTA as='label' htmlFor='import'>
      Import collection
      <FileUpload
        id='import'
        process={parseCSVData(cards)}
        onSuccess={handleSuccess}
        data-testid='import-btn'
      />
    </CTA>
  )
})
