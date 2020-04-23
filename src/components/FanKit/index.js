import React from 'react'
import LazyLoad from 'react-lazyload'
import Column from '../Column'
import Image from '../Image'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import Row from '../Row'
import cards from '../../data/cards'
import chunk from '../../helpers/chunk'
import sortCards from '../../helpers/sortCards'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

const FanKit = props => {
  const viewportWidth = useViewportWidth()
  const items = React.useMemo(
    () =>
      chunk(
        cards
          .filter(card => !card.token)
          .sort(sortCards())
          .concat(cards.filter(card => card.token)),
        3
      ),
    []
  )

  return (
    <>
      <h1 className='VisuallyHidden'>Stormbound Fan-kit</h1>

      {items.map(([a, b, c]) => (
        <LazyLoad
          offset={150}
          resize
          placeholder={<Loader hideLabel />}
          height={viewportWidth > 700 ? 300 : 900}
          key={a.id}
        >
          <Row desktopOnly>
            <Column width={33}>
              <Image src={a.image} alt={a.name} className='FanKit__image' />
            </Column>
            <Column width={33}>
              {b && (
                <Image src={b.image} alt={b.name} className='FanKit__image' />
              )}
            </Column>
            <Column width={33}>
              {c && (
                <Image src={c.image} alt={c.name} className='FanKit__image' />
              )}
            </Column>
          </Row>
        </LazyLoad>
      ))}

      <PageMeta
        title='Stormbound Fan Kit'
        description='All the assets from Stormbound used on Stormbound-Kitty'
      />
    </>
  )
}

export default FanKit
