import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import CTA from '~/components/CTA'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Only from '~/components/Only'
import download from '~/helpers/download'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import sortCards from '~/helpers/sortCards'
import track from '~/helpers/track'

const useSerializedContent = () => {
  const { collection } = React.useContext(CollectionContext)
  const { cardsIndex } = React.useContext(CardsContext)

  const headers = ['id', 'name', 'level', 'copies']
  const data = [
    headers,
    ...collection
      .map(card => getResolvedCardData(cardsIndex, card))
      .sort(sortCards({ withFaction: false }))
      .map(card => [
        card.id,
        // Make sure the name doesn’t contain a comma otherwise it might cause
        // an issue when deserialising the CSV
        cardsIndex[card.id].name.replace(',', ''),
        // For people to open the CSV file in Excel, it’s better if it contains
        // *all* cards; missing ones are marked as level 0
        card.missing ? 0 : card.level,
        card.copies || 0,
      ]),
  ].join('\n')

  return data
}

export default React.memo(function CollectionClearHint() {
  const { resetCollection } = React.useContext(CollectionContext)
  const { notify } = React.useContext(NotificationContext)
  const content = useSerializedContent()

  const exportCollection = React.useCallback(() => {
    download({
      content: content,
      fileName: 'stormbound_collection.csv',
      mimeType: 'text/csv;encoding:utf-8',
    })
    notify({
      icon: 'books',
      children: 'Your collection has been successfully exported.',
    })
    track('export_collection_data')
  }, [content, notify])

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
