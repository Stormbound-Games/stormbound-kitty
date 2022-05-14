import React from 'react'
import { useRouter } from 'next/router'
import {
  TIER_COLORS,
  DEFAULT_LIST,
  DEFAULT_TIER,
  MAX_TIERS,
} from '~/constants/list'
import Page from '~/components/Page'
import CTA from '~/components/CTA'
import HorizontalRule from '~/components/HorizontalRule'
import ResetButton from '~/components/ResetButton'
import Row from '~/components/Row'
import ShareButton from '~/components/ListBuilderShareButton'
import ListBuilderTier from '~/components/ListBuilderTier'
import Title from '~/components/Title'
import serialization from '~/helpers/serialization'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function PageListBuilderEditor(props) {
  const isMounted = useIsMounted()
  const router = useRouter()
  const [tiers, setTiers] = React.useState(props.tiers)
  const reset = React.useCallback(() => setTiers(DEFAULT_LIST), [])
  const id = serialization.list.serialize(tiers)

  const updateTier = React.useCallback(
    (index, update) =>
      setTiers(curr => {
        const next = curr.slice(0)
        next[index] = { ...next[index], ...update }
        return next
      }),
    []
  )

  const addCardToTier = React.useCallback(
    (index, cardId) =>
      updateTier(index, { cards: [...tiers[index].cards, cardId] }),
    [updateTier, tiers]
  )

  const removeCardFromTier = React.useCallback(
    (index, cardId) =>
      updateTier(index, {
        cards: tiers[index].cards.filter(card => card !== cardId),
      }),
    [updateTier, tiers]
  )

  const moveTierUp = index => () => {
    if (index === 0) return

    setTiers(curr => {
      const next = curr.slice(0)
      const tier = next[index]
      const previousTier = next[index - 1]

      next[index] = previousTier
      next[index - 1] = tier

      return next
    })
  }

  const moveTierDown = index => () => {
    if (index === tiers.length - 1) return

    return setTiers(curr => {
      const next = curr.slice(0)
      const tier = next[index]
      const nextTier = next[index + 1]

      next[index] = nextTier
      next[index + 1] = tier

      return next
    })
  }

  const addTier = () => setTiers(tiers => [...tiers, { ...DEFAULT_TIER }])

  React.useEffect(() => {
    router.replace(['/list', id].filter(Boolean).join('/'), null, {
      scroll: false,
      shallow: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Page
      title='List Builder'
      description='Compose your own tier lists from the Stormbound cards, ranking them the way you see fit'
      action={
        id && {
          to: `/list/${id}/display`,
          children: 'Display view',
          icon: 'eye',
        }
      }
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Settings</Title>

          <p>
            This tier list editor makes it possible to create up to 12 tiers of
            cards. It is currently very much in active development so make sure
            to report any bug, oddity or desired features.
          </p>

          <Row withNarrowGutter spacing={{ vertical: 'BASE' }}>
            <Row.Column>
              <ResetButton
                label='Reset list'
                confirm='Are you sure you want to reset the list to its initial state?'
                reset={reset}
                disabled={!id}
              />
            </Row.Column>
            <Row.Column>
              <ShareButton title='Share tier list' disabled={!id} />
            </Row.Column>
          </Row>
        </Row.Column>
        <Row.Column width='2/3'>
          <Title>Tier list</Title>

          {tiers.map((tier, index) => (
            <ListBuilderTier
              {...tier}
              key={index}
              color={TIER_COLORS[index]}
              prefix={`tier-${index}-`}
              // Basic edition
              isEditable={true}
              reorderCards={cards => updateTier(index, { cards })}
              updateName={name => updateTier(index, { name })}
              addCard={cardId => addCardToTier(index, cardId)}
              removeCard={cardId => removeCardFromTier(index, cardId)}
              // Tiers order
              moveUp={moveTierUp(index)}
              moveDown={moveTierDown(index)}
              canMoveUp={index !== 0}
              canMoveDown={index !== tiers.length - 1}
            />
          ))}

          <HorizontalRule spacing={{ bottom: ['LARGE', 'LARGER'] }} />

          <CTA
            onClick={addTier}
            disabled={!isMounted || tiers.length === MAX_TIERS}
            extend={{ margin: '0 auto' }}
          >
            Add a new tier
          </CTA>
        </Row.Column>
      </Row>
    </Page>
  )
})
