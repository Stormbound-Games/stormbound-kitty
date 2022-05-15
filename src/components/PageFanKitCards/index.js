import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardSelect from '~/components/CardSelect'
import FanKitDownloadDialog from '~/components/FanKitDownloadDialog'
import FanKitItem from '~/components/FanKitItem'
import ListHeader from '~/components/ListHeader'
import ListLayoutItem from '~/components/ListLayoutItem'
import Loader from '~/components/Loader'
import Page from '~/components/Page'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import track from '~/helpers/track'
import useLazyLoad from '~/hooks/useLazyLoad'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function PageFanKitCards() {
  const isMounted = useIsMounted()
  const [layout, setLayout] = React.useState('GRID')
  const [order, setOrder] = React.useState('NATURAL')
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const [search, setSearch] = React.useState(null)
  const columns = 4
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeCard = cardsIndex[active] || {}
  const assets = (search ? [cardsIndex[search]].filter(Boolean) : cards)
    .slice(0)
    .sort((a, b) => {
      if (order === 'NATURAL') return 0
      if (order === 'NAME') return a.name.localeCompare(b.name)
      return 0
    })
  const {
    loading,
    items: displayedItems,
    ref,
  } = useLazyLoad(assets, columns * 2)
  const items = chunk(displayedItems, columns)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <Page
      title='Cards Fan-Kit'
      description='Find all the cards assets from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
      action={{ to: '/fan-kit', children: 'Back to fan-kit' }}
    >
      <ListHeader
        layout={layout}
        setLayout={setLayout}
        order={order}
        setOrder={setOrder}
        sorting={[
          { title: 'Natural', value: 'NATURAL' },
          { title: 'Name', value: 'NAME' },
        ]}
        filtering={
          <CardSelect
            hideLabel
            label='Search for a card'
            placeholder='Search…'
            name='card'
            id='card'
            required
            current={search}
            onChange={option => {
              setSearch(option ? option.value : null)
              track('fankit_card_search', {
                id: option ? option.value : null,
              })
            }}
            withSpells
            withTokens
            withClear
            disabled={!isMounted}
            noBorder
          />
        }
      >
        {assets.length} {assets.length === 1 ? 'card' : 'cards'}
      </ListHeader>

      <FanKitDownloadDialog
        name={activeCard.name}
        image={activeCard.image}
        dialogRef={instance => {
          dialogRef.current = instance

          if (dialogRef.current) {
            dialogRef.current.on('hide', () => setActive(null))
          }
        }}
        close={() => dialogRef.current.hide()}
      />

      {layout === 'GRID'
        ? items.map((row, rowIndex) => (
            <Row isDesktopOnly key={rowIndex}>
              {Array.from({ length: columns }, (_, index) => (
                <Row.Column
                  width={'1/' + columns}
                  key={row[index] ? row[index].id : index}
                >
                  {row[index] && (
                    <FanKitItem
                      {...row[index]}
                      key={row[index].id}
                      setActive={setActive}
                      width={280}
                      height={280}
                      aspectRatio='1 / 1'
                      lazy
                    />
                  )}
                </Row.Column>
              ))}
            </Row>
          ))
        : layout === 'LIST'
        ? items
            .slice(0)
            .flat()
            .map(item => {
              return (
                <ListLayoutItem
                  key={item.id}
                  title={item.name}
                  onClick={() => setActive(item.id)}
                  excerpt={[
                    item.rarity,
                    item.faction,
                    item.unitTypes.join(' '),
                    item.type,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  image={item.image + '?w=120'}
                />
              )
            })
        : null}

      {loading && <Loader />}
      <div ref={ref} />
    </Page>
  )
})
