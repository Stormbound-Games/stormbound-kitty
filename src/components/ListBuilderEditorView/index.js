import React from 'react'
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
import useNavigator from '~/hooks/useNavigator'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function ListBuilderEditorView(props) {
  const isMounted = useIsMounted()
  const navigator = useNavigator()
  const [tiers, setTiers] = React.useState(props.tiers)
  const reset = React.useCallback(() => setTiers(DEFAULT_LIST), [])

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
    if (props.listId) setTiers(serialization.list.deserialize(props.listId))
    else reset()
  }, [props.listId, reset])

  React.useEffect(() => {
    navigator.replace('/list/' + serialization.list.serialize(tiers))
    // eslint-disable-next-line
  }, [tiers])

  return (
    <Page
      title='Create your list'
      description='Compose your own tier lists from the Stormbound cards, ranking them the way you see fit'
      action={
        props.listId && {
          to: `/list/${props.listId}/display`,
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
                disabled={!props.listId}
              />
            </Row.Column>
            <Row.Column>
              <ShareButton title='Share tier list' disabled={!props.listId} />
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

/*
class ListBuilderEditorView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMounted: false,
      tiers: props.tiers,
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  componentDidUpdate(prevProps, prevState) {
    const hasAnyTierChanged = prevState.tiers.some(
      (tier, index) => !isEqual(tier, this.state.tiers[index])
    )

    if (hasAnyTierChanged) {
      this.props.navigator.replace(
        '/list/' + serialization.list.serialize(this.state.tiers)
      )
    }

    if (prevProps.listId !== this.props.listId) {
      if (this.props.listId) {
        this.setState({ tiers: getInitialListData(this.props.listId) })
      } else {
        this.reset()
      }
    }
  }

  addTier = () => {
    this.setState(state => ({ tiers: [...state.tiers, { ...DEFAULT_TIER }] }))
  }

  updateTier = (index, tier) => {
    this.setState(state => {
      const tiers = [...state.tiers]
      tiers[index] = { ...tiers[index], ...tier }
      return { tiers }
    })
  }

  addCardToTier = (index, cardId) => {
    if (!cardId) return

    this.updateTier(index, {
      cards: [...this.state.tiers[index].cards, cardId],
    })
  }

  removeCardFromTier = (index, cardId) => {
    if (this.state.preventRemoval) return

    this.updateTier(index, {
      cards: this.state.tiers[index].cards.filter(card => card !== cardId),
    })
  }

  moveTierUp = index => () => {
    if (index === 0) return

    this.setState(state => {
      const tiers = [...state.tiers]
      const tier = tiers[index]
      const previousTier = tiers[index - 1]

      tiers[index] = previousTier
      tiers[index - 1] = tier

      return { tiers }
    })
  }

  moveTierDown = index => () => {
    if (index === this.state.tiers.length - 1) return

    this.setState(state => {
      const tiers = [...state.tiers]
      const tier = tiers[index]
      const nextTier = tiers[index + 1]

      tiers[index] = nextTier
      tiers[index + 1] = tier

      return { tiers }
    })
  }

  reset = () => {
    this.setState({ tiers: DEFAULT_LIST })
  }

  render() {
    return (
      <Page
        title='Create your list'
        description='Compose your own tier lists from the Stormbound cards, ranking them the way you see fit'
        action={
          this.props.listId && {
            to: `/list/${this.props.listId}/display`,
            children: 'Display view',
            icon: 'eye',
          }
        }
      >
        <Row isDesktopOnly>
          <Row.Column width='1/3'>
            <Title>Settings</Title>

            <p>
              This tier list editor makes it possible to create up to 12 tiers
              of cards. It is currently very much in active development so make
              sure to report any bug, oddity or desired features.
            </p>

            <Row withNarrowGutter spacing={{ vertical: 'BASE' }}>
              <Row.Column>
                <ResetButton
                  label='Reset list'
                  confirm='Are you sure you want to reset the list to its initial state?'
                  reset={this.reset}
                  disabled={!this.props.listId}
                />
              </Row.Column>
              <Row.Column>
                <ShareButton
                  title='Share tier list'
                  disabled={!this.props.listId}
                />
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column width='2/3'>
            <Title>Tier list</Title>

            {this.state.tiers.map((tier, index) => (
              <ListBuilderTier
                {...this.state}
                {...tier}
                key={index}
                color={TIER_COLORS[index]}
                prefix={`tier-${index}-`}
                // Basic edition
                isEditable={true}
                updateName={name => this.updateTier(index, { name })}
                addCard={cardId => this.addCardToTier(index, cardId)}
                removeCard={cardId => this.removeCardFromTier(index, cardId)}
                // Tiers order
                moveUp={this.moveTierUp(index)}
                moveDown={this.moveTierDown(index)}
                canMoveUp={index !== 0}
                canMoveDown={index !== this.state.tiers.length - 1}
                // Cards order
                isDragging={this.state.dndTierIndex === index}
                onMouseDown={this.onMouseDown(index)}
                onMouseOver={this.onMouseOver}
                onMouseUp={this.onMouseUp}
              />
            ))}

            <HorizontalRule spacing={{ bottom: ['LARGE', 'LARGER'] }} />

            <CTA
              onClick={this.addTier}
              disabled={
                !this.state.isMounted || this.state.tiers.length === MAX_TIERS
              }
              extend={{ margin: '0 auto' }}
            >
              Add a new tier
            </CTA>
          </Row.Column>
        </Row>
      </Page>
    )
  }
}

export default hookIntoProps(() => ({
  ...useFela(),
  navigator: useNavigator(),
}))(ListBuilderEditorView)
*/
