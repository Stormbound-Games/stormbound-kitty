import React from 'react'
import Dialog from '~/components/Dialog'
import FactionSelect from '~/components/FactionSelect'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Select from '~/components/Select'

export default React.memo(function RandomDeckFilters(props) {
  const [faction, setFaction] = React.useState('*')
  const [minFactionCards, setMinFactionCards] = React.useState(0)
  const [maxLegendaryCards, setMaxLegendaryCards] = React.useState('')
  const [maxEpicCards, setMaxEpicCards] = React.useState('')
  const { createRandomDeck } = props
  const filters = React.useMemo(
    () => ({ faction, minFactionCards, maxEpicCards, maxLegendaryCards }),
    [faction, minFactionCards, maxEpicCards, maxLegendaryCards]
  )

  const handleSubmit = React.useCallback(
    event => {
      event.preventDefault()
      createRandomDeck(filters)
    },
    [createRandomDeck, filters]
  )

  return (
    <Dialog
      id='random-deck-dialog'
      dialogRef={instance => (props.dialog.current = instance)}
      title='Randomize deck'
      close={() => props.dialog.current.hide()}
      image='https://cdn.sanity.io/images/5hlpazgd/production/596e054dac114d033c4ceca539e4af9f00ff6f87-512x512.png'
      ctaProps={{
        type: 'submit',
        children: 'Generate',
        'data-testid': 'random-deck-dialog-confirm-btn',
      }}
      Body={props => <form {...props} onSubmit={handleSubmit} />}
    >
      <Row withNarrowGutter>
        <Row.Column>
          <FactionSelect
            data-testid='random-faction-select'
            value={faction}
            onChange={event => setFaction(event.target.value)}
            withAny
          />
        </Row.Column>
        <Row.Column>
          <Select
            label='Min faction cards'
            data-testid='random-min-faction-select'
            id='factionCards'
            value={minFactionCards}
            onChange={event => setMinFactionCards(+event.target.value)}
          >
            <option value={0}>0</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </Select>
        </Row.Column>
      </Row>
      <Row withNarrowGutter>
        <Row.Column>
          <Select
            label='Max epic cards'
            data-testid='random-max-epic-select'
            id='maxEpicCards'
            value={maxEpicCards}
            onChange={event => setMaxEpicCards(event.target.value)}
          >
            <option value=''>Any</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Select>
        </Row.Column>
        <Row.Column>
          <Select
            label={
              <>
                <Only.Mobile>Max leg. cards</Only.Mobile>
                <Only.Desktop>Max legendary cards</Only.Desktop>
              </>
            }
            data-testid='random-max-legendary-select'
            id='maxLegendaryCards'
            value={maxLegendaryCards}
            onChange={event => setMaxLegendaryCards(event.target.value)}
          >
            <option value=''>Any</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </Select>
        </Row.Column>
      </Row>
    </Dialog>
  )
})
