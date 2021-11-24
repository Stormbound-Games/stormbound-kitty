import React from 'react'
import { CollectionContext } from '~/components/CollectionProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import CTA from '~/components/CTA'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Only from '~/components/Only'
import download from '~/helpers/download'
import getRawCardData from '~/helpers/getRawCardData'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import sortCards from '~/helpers/sortCards'

const formatCollectionAsCSV = cards => {
  const headers = ['id', 'name', 'level', 'copies']
  const data = [
    headers,
    ...cards
      .map(getResolvedCardData)
      .sort(sortCards({ withFaction: false }))
      .map(card => [
        card.id,
        // Make sure the name doesn’t contain a comma otherwise it might cause
        // an issue when deserialising the CSV
        getRawCardData(card.id).name.replace(',', ''),
        // For people to open the CSV file in Excel, it’s better if it contains
        // *all* cards; missing ones are marked as level 0
        card.missing ? 0 : card.level,
        card.copies || 0,
      ]),
  ].join('\n')

  return data
}

export default React.memo(function CollectionClearHint(props) {
  const { collection, resetCollection } = React.useContext(CollectionContext)
  const { notify } = React.useContext(NotificationContext)

  const exportCollection = React.useCallback(() => {
    download({
      content: formatCollectionAsCSV(collection),
      fileName: 'stormbound_collection.csv',
      mimeType: 'text/csv;encoding:utf-8',
    })
    notify({
      icon: 'books',
      children: 'Your collection has been successfully exported.',
    })
  }, [collection, notify])

  return (
    <Only.CustomCollection>
      <Info
        icon='books'
        title='Your collection'
        CTA={
          <CTA
            type='button'
            data-testid='export-btn'
            onClick={exportCollection}
          >
            Export collection
          </CTA>
        }
      >
        <p>
          A locally saved card collection was found and loaded. If you would
          like to remove it and start fresh, you can{' '}
          <Link onClick={resetCollection}>clear the local data</Link> (you will
          be asked to confirm).
        </p>
      </Info>
    </Only.CustomCollection>
  )
})
