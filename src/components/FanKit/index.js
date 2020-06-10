import React from 'react'
import CardSelect from '../CardSelect'
import Column from '../Column'
import Dialog from '../Dialog'
import DiamondButton from '../DiamondButton'
import Image from '../Image'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import Row from '../Row'
import cards from '../../data/cards'
import { BOOKS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'
import chunk from '../../helpers/chunk'
import sortCards from '../../helpers/sortCards'
import getRawCardData from '../../helpers/getRawCardData'
import useLazyLoad from '../../hooks/useLazyLoad'
import './index.css'

const Download = React.memo(function Download(props) {
  return (
    <span className='FanKit__download'>
      <DiamondButton
        data-testid='fan-kit-download-btn'
        onClick={() => props.setActive(props.id)}
        title={'Download asset ' + props.name}
        icon='download'
      />
    </span>
  )
})

const DownloadDialog = React.memo(function DownloadDialog(props) {
  const { name, image } = props.activeCard || {}
  const path =
    image &&
    (image.startsWith('/assets') ? image : '/assets/images/cards/' + image)

  return (
    <Dialog
      id='fan-kit-dialog'
      dialogRef={props.dialogRef}
      close={props.close}
      title={name || 'Download image'}
      image={path}
      ctaProps={
        image
          ? {
              href: path,
              download: true,
              className: 'FanKit__CTA',
              'data-testid': 'fan-kit-link',
              children: 'PNG file',
            }
          : undefined
      }
    >
      {image ? (
        <p>
          <a href={path} target='_blank' rel='noopener noreferrer'>
            Open image in new tab
          </a>{' '}
          or download it as:
        </p>
      ) : (
        <p>An error has occurred.</p>
      )}
    </Dialog>
  )
})

const books = [...Object.keys(BOOKS), 'ELDER'].map(book => ({
  name: capitalise(book.toLowerCase()) + ' book',
  id: book,
  image: '/assets/images/book-' + book.toLowerCase() + '.png',
}))

export default React.memo(function FanKit(props) {
  const [search, setSearch] = React.useState(null)
  const columns = 4
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeCard = active
    ? [...cards, ...books].find(card => card.id === active)
    : null
  const assets = search
    ? [getRawCardData(search)]
    : cards.sort(sortCards()).concat(books)
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
      <h1 className='VisuallyHidden'>Stormbound Fan-kit</h1>

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

      <DownloadDialog
        activeCard={activeCard}
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
                <div className='FanKit__item' data-testid='fan-kit-item'>
                  <Download {...row[index]} setActive={setActive} />
                  <Image
                    src={
                      row[index].faction
                        ? '/assets/images/cards/' + row[index].image
                        : row[index].image
                    }
                    alt={row[index].name}
                    className='FanKit__image'
                  />
                </div>
              )}
            </Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      <div ref={ref} />

      <PageMeta
        title='Stormbound Fan-Kit'
        description='Find all the assets from Stormbound used on Stormbound-Kitty, courtesy of Paladin Studios and Sheepyard'
      />
    </>
  )
})
