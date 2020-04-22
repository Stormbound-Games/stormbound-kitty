import React from 'react'
import Card from '../Card'
import CTA from '../CTA'
import chunk from '../../helpers/chunk'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

const CardsGallery = props => {
  const [activePage, setActivePage] = React.useState(0)
  const pages = chunk(props.cards.map(resolveCardForLevel), props.cardsPerPage)
  const filters = Object.values(props.filters || {})
  const page = pages[activePage] || pages[0]
  const { onPageChange } = props
  const changePage = React.useCallback(
    page => {
      setActivePage(page)
      if (typeof onPageChange === 'function') onPageChange(page)
    },
    [onPageChange]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => changePage(0), filters)

  return (
    <div className='CardsGallery'>
      <ul className='CardsGallery__list'>
        {page.map((card, index) => (
          <li
            className={[
              'CardsGallery__item',
              props.isCardInDeck &&
                props.isCardInDeck(card.id) &&
                'CardsGallery__item--in-deck',
            ]
              .filter(Boolean)
              .join(' ')}
            id={'card-' + card.id}
            key={card.id}
          >
            {props.onCardClick && (
              <button
                className='CardsGallery__button'
                type='button'
                onClick={() => props.onCardClick(card.id)}
              >
                <span className='VisuallyHidden'>Add card to deck</span>
              </button>
            )}

            <Card
              {...card}
              missing={props.isCardMissing && props.isCardMissing(card.id)}
              affordable={
                props.isCardAffordable ? props.isCardAffordable(card.id) : false
              }
              upgradable={
                props.isCardUpgradable ? props.isCardUpgradable(card.id) : false
              }
            />
          </li>
        ))}
      </ul>

      <div className='CardsGallery__nav'>
        <CTA
          type='button'
          className='CardsGallery__nav-button'
          onClick={() => changePage(p => p - 1)}
          disabled={activePage === 0}
        >
          Previous
        </CTA>

        {props.navChildren || null}

        <CTA
          type='button'
          className='CardsGallery__nav-button'
          onClick={() => changePage(p => p + 1)}
          disabled={pages.length === 0 || activePage === pages.length - 1}
        >
          Next
        </CTA>
      </div>
    </div>
  )
}

export default CardsGallery
