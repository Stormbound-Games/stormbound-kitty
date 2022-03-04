import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardSelect from '~/components/CardSelect'
import FanKitDownloadDialog from '~/components/FanKitDownloadDialog'
import FanKitItem from '~/components/FanKitItem'
import Page from '~/components/Page'
import Loader from '~/components/Loader'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import useLazyLoad from '~/hooks/useLazyLoad'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function FanKitCards(props) {
  const isMounted = useIsMounted()
  const { cardsIndex } = React.useContext(CardsContext)
  const [search, setSearch] = React.useState(null)
  const columns = 4
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeCard = cardsIndex[active] || {}
  const assets = search ? [cardsIndex[search]].filter(Boolean) : props.cards
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
      <Row isDesktopOnly>
        <Row.Column width='1/4' />
        <Row.Column>
          <CardSelect
            hideLabel
            label='Search for a card'
            name='card'
            id='card'
            required
            current={search}
            onChange={option => setSearch(option ? option.value : null)}
            withSpells
            withTokens
            withClear
            disabled={!isMounted}
          />
        </Row.Column>
        <Row.Column width='1/4' />
      </Row>

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

      {items.map((row, rowIndex) => (
        <Row isDesktopOnly key={rowIndex}>
          {Array.from({ length: columns }, (_, index) => (
            <Row.Column
              width={'1/' + columns}
              key={row[index] ? row[index].id : index}
            >
              {row[index] && (
                <FanKitItem
                  {...row[index]}
                  image={row[index].image}
                  key={row[index].id}
                  setActive={setActive}
                  width={280}
                  height={280}
                  aspectRatio='1 / 1'
                  lazy
                  withAvif
                />
              )}
            </Row.Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      <div ref={ref} />
    </Page>
  )
})
