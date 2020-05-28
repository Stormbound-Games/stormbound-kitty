import React from 'react'
import { motion } from 'framer-motion'
import Card from '../Card'
import CTA from '../CTA'
import chunk from '../../helpers/chunk'
import './index.css'

export default React.memo(function CardsGallery(props) {
  const [allowScroll, setAllowScroll] = React.useState(false)

  // See: https://github.com/framer/motion/issues/185#issuecomment-542829562
  React.useEffect(() => {
    if (allowScroll) {
      const handleTouch = event => event.stopPropagation()
      const html = document.documentElement

      html.addEventListener('touchmove', handleTouch)
      return () => html.removeEventListener('touchmove', handleTouch)
    }
  }, [allowScroll])

  const container = React.useRef()
  const [activePage, setActivePage] = React.useState(0)
  const pages = React.useMemo(
    () => chunk(props.cards || [], props.cardsPerPage),
    [props.cards, props.cardsPerPage]
  )
  const filters = Object.values(props.filters || {})
  const page = pages[activePage] || pages[0] || []
  const { onPageChange } = props
  const changePage = React.useCallback(
    page => {
      setActivePage(page)
      if (typeof onPageChange === 'function') onPageChange(page)
    },
    [onPageChange]
  )

  const handleDrag = React.useCallback(
    (event, info) => {
      const DRAG_THRESHOLD = 100
      const isNotFirstPage = activePage > 0
      const isNotLastPage = activePage < pages.length - 1

      if (info.point.x > DRAG_THRESHOLD && isNotFirstPage) {
        changePage(page => page - 1)
      } else if (info.point.x < DRAG_THRESHOLD * -1 && isNotLastPage) {
        changePage(page => page + 1)
      }
    },
    [activePage, changePage, pages.length]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => changePage(0), filters)

  return (
    <div
      ref={container}
      className='CardsGallery'
      style={{ '--cards-per-row': props.cardsPerPage / 2 }}
    >
      <motion.ul
        drag={pages.length > 1 ? 'x' : undefined}
        dragConstraints={container}
        dragDirectionLock
        onDragStart={(event, info) => {
          setAllowScroll(Math.abs(info.delta.y) > Math.abs(info.delta.x))
        }}
        onDragEnd={handleDrag}
        className='CardsGallery__list'
      >
        {page.map((card, index) => {
          const key = [card.id, index].join('_')
          return (
            <motion.li
              className='CardsGallery__item'
              id={'card-' + key}
              data-testid={'card-' + index}
              key={key}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                ease: 'easeOut',
                duration: 0.3,
                delay: index * 0.075,
              }}
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

              {props.isCardInDeck && props.isCardInDeck(card.id) && (
                <span className='CardsGallery__in-deck'>In deck</span>
              )}

              <Card
                {...card}
                missing={
                  (props.isCardMissing && props.isCardMissing(card.id)) ||
                  (props.isCardInDeck && props.isCardInDeck(card.id))
                }
                affordable={
                  props.isCardAffordable
                    ? props.isCardAffordable(card.id)
                    : false
                }
                upgradable={
                  props.isCardUpgradable
                    ? props.isCardUpgradable(card.id)
                    : false
                }
              />
            </motion.li>
          )
        })}
      </motion.ul>

      {!props.hideNavButtons && (
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
      )}
    </div>
  )
})
