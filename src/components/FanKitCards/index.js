import React from 'react'
import CardSelect from '../CardSelect'
import Column from '../Column'
import FanKitDownloadDialog from '../FanKitDownloadDialog'
import FanKitItem from '../FanKitItem'
import HeaderBanner from '../HeaderBanner'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import Row from '../Row'
import cards from '../../data/cards'
import chunk from '../../helpers/chunk'
import sortCards from '../../helpers/sortCards'
import getRawCardData from '../../helpers/getRawCardData'
import useLazyLoad from '../../hooks/useLazyLoad'

export default React.memo(function FanKit(props) {
  const [search, setSearch] = React.useState(null)
  const columns = 4
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeCard = getRawCardData(active)
  const assets = search ? [getRawCardData(search)] : cards.sort(sortCards())
  const { loading, items: displayedItems, ref } = useLazyLoad(
    assets,
    columns * 2
  )
  const items = chunk(displayedItems, columns)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <>
      <HeaderBanner title='Cards Fan-Kit' />

      <Row desktopOnly wideGutter>
        <Column width='1/4' />
        <Column>
          <CardSelect
            label='Search for a card'
            name='card'
            id='card'
            required
            current={search}
            onChange={option => setSearch(option ? option.value : null)}
            withSpells
            withTokens
            withClear
          />
        </Column>
        <Column width='1/4' />
      </Row>

      <FanKitDownloadDialog
        name={activeCard ? activeCard.name : undefined}
        image={
          activeCard ? '/assets/images/cards/' + activeCard.image : undefined
        }
        dialogRef={instance => {
          dialogRef.current = instance

          if (dialogRef.current) {
            dialogRef.current.on('hide', () => setActive(null))
          }
        }}
        close={() => dialogRef.current.hide()}
      />

      {items.map((row, rowIndex) => (
        <Row desktopOnly key={rowIndex}>
          {Array.from({ length: columns }, (_, index) => (
            <Column
              width={'1/' + columns}
              key={row[index] ? row[index].id : index}
            >
              {row[index] && (
                <FanKitItem
                  {...row[index]}
                  image={'/assets/images/cards/' + row[index].image}
                  key={row[index].id}
                  setActive={setActive}
                  width='300px'
                  height='300px'
                  withAvif
                />
              )}
            </Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      <div ref={ref} />

      <PageMeta
        title='Cards – Fan-Kit'
        description='Find all the cards assets from Stormbound used on Stormbound-Kitty, courtesy of Paladin Studios and Sheepyard'
      />
    </>
  )
})
