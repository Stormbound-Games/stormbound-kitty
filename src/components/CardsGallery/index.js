import React from 'react'
import { useFela } from 'react-fela'
import { motion } from 'framer-motion'
import BlankButton from '~/components/BlankButton'
import Card from '~/components/Card'
import CTA from '~/components/CTA'
import Spacing from '~/components/Spacing'
import chunk from '~/helpers/chunk'
import styles from './styles'

export default React.memo(function CardsGallery(props) {
  const { css } = useFela()
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

      if (info.offset.x > DRAG_THRESHOLD && isNotFirstPage) {
        changePage(page => page - 1)
      } else if (info.offset.x < DRAG_THRESHOLD * -1 && isNotLastPage) {
        changePage(page => page + 1)
      }
    },
    [activePage, changePage, pages.length]
  )

  React.useEffect(() => {
    changePage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, filters)

  return (
    <div
      ref={container}
      className={css(styles.gallery, props.extend?.container)}
      // The `CardsGallery` component is the only display of cards in the entire
      // site that uses *both* the “upgradable” color (yellow outline for cards
      // which can be upgraded) and the “affordable” color (green outline used
      // for the selected card in this case).
      // Unfortunately, these 2 colors are too close to one another for people
      // with color-blindness (deuteranopia) to be discernible. Because the
      // “affordable” color (green outline) from the game is used here for user
      // experience purposes (selected card), we replace the color in that
      // context so that both outlines are different enough to be discernible.
      style={{
        '--affordable': props.isCardAffordable ? '#FF1493' : undefined,
        '--cards-per-row': props.cardsPerPage / 2,
      }}
    >
      <motion.ul
        drag={pages.length > 1 ? 'x' : undefined}
        dragConstraints={container}
        dragDirectionLock
        onDragStart={(event, info) => {
          setAllowScroll(Math.abs(info.delta.y) > Math.abs(info.delta.x))
        }}
        onDragEnd={handleDrag}
        className={css(styles.list, props.extend?.list)}
      >
        {page.map((card, index) => {
          const key = [card.id, index].join('_')
          return (
            <motion.li
              className={css(styles.item, props.extend?.item)}
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
                <BlankButton
                  extend={styles.button({
                    isInDeck: props.isCardInDeck && props.isCardInDeck(card.id),
                  })}
                  onClick={() => props.onCardClick(card.id)}
                  label='Add card to deck'
                />
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

              {props.isCardInDeck && props.isCardInDeck(card.id) && (
                <span className={css(styles.inDeck)}>In deck</span>
              )}
            </motion.li>
          )
        })}
      </motion.ul>

      {!props.hideNavButtons && (
        <Spacing top='LARGER'>
          <div className={css(styles.nav)}>
            <div className={css(styles.navItem)}>
              <CTA
                type='button'
                isFullWidthOnMobile
                extend={styles.navButton}
                onClick={() => changePage(p => p - 1)}
                disabled={activePage === 0}
              >
                Previous
              </CTA>
            </div>

            {props.navChildren || null}

            <div className={css(styles.navItem)}>
              <CTA
                type='button'
                isFullWidthOnMobile
                extend={styles.navButton}
                onClick={() => changePage(p => p + 1)}
                disabled={pages.length === 0 || activePage === pages.length - 1}
              >
                Next
              </CTA>
            </div>
          </div>
        </Spacing>
      )}
    </div>
  )
})
