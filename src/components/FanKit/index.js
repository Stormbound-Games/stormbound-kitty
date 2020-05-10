import React from 'react'
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

  return (
    <Dialog
      id='fan-kit-dialog'
      dialogRef={props.dialogRef}
      close={props.close}
      title={name || 'Download image'}
      image={image}
      ctaProps={
        image
          ? {
              href: image,
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
          <a href={image} target='_blank' rel='noopener noreferrer'>
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
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeCard = active
    ? [...cards, ...books].find(card => card.id === active)
    : null
  const assets = cards
    .filter(card => !card.token)
    .sort(sortCards())
    .concat(cards.filter(card => card.token))
    .concat(books)
  const { loading, items: displayedItems, ref } = useLazyLoad(assets, 4 * 2)
  const items = chunk(displayedItems, 4)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <>
      <h1 className='VisuallyHidden'>Stormbound Fan-kit</h1>

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

      {items.map(([a, b, c, d], index) => (
        <Row desktopOnly key={index}>
          <Column width='1/4'>
            <div className='FanKit__item' data-testid='fan-kit-item'>
              <Download {...a} setActive={setActive} />
              <Image src={a.image} alt={a.name} className='FanKit__image' />
            </div>
          </Column>
          <Column width='1/4'>
            {b && (
              <div className='FanKit__item'>
                <Download {...b} setActive={setActive} />
                <Image src={b.image} alt={b.name} className='FanKit__image' />
              </div>
            )}
          </Column>
          <Column width='1/4'>
            {c && (
              <div className='FanKit__item'>
                <Download {...c} setActive={setActive} />
                <Image src={c.image} alt={c.name} className='FanKit__image' />
              </div>
            )}
          </Column>
          <Column width='1/4'>
            {d && (
              <div className='FanKit__item'>
                <Download {...d} setActive={setActive} />
                <Image src={d.image} alt={d.name} className='FanKit__image' />
              </div>
            )}
          </Column>
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
