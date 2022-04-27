import React from 'react'
import Dialog from '~/components/Dialog'
import Row from '~/components/Row'
import Select from '~/components/Select'
import { TYPES, FACTIONS } from '~/constants/game'
import capitalize from '~/helpers/capitalize'

export default React.memo(function RandomCardFilters(props) {
  const [type, setType] = React.useState('*')
  const [faction, setFaction] = React.useState('*')
  const { createRandomCard } = props
  const dialog = props.dialog.current

  const handleSubmit = React.useCallback(
    event => {
      event.preventDefault()
      createRandomCard({ type, faction })
      dialog.hide()
    },
    [dialog, createRandomCard, type, faction]
  )

  return (
    <Dialog
      id='randomize-card-dialog'
      dialogRef={instance => (props.dialog.current = instance)}
      extend={{ dialog: { textAlign: 'start' } }}
      title='Randomize card'
      close={() => dialog.hide()}
      image='https://cdn.sanity.io/images/5hlpazgd/production/d7567c8333cfa033713404794775bc0b939f5715-301x300.png'
      ctaProps={{
        type: 'submit',
        children: 'Generate',
        'data-testid': 'randomize-card-dialog-cta',
      }}
      Body={props => <form {...props} onSubmit={handleSubmit} />}
    >
      <p>
        If you would like to retain some control over your card, you can specify
        the following filters.
      </p>

      <Row withNarrowGutter>
        <Row.Column>
          <Select
            label='Type'
            id='type'
            required
            value={type}
            onChange={event => setType(event.target.value)}
            data-testid='randomize-card-type'
          >
            <option value='*'>Any</option>
            {TYPES.map(type => (
              <option value={type} key={type}>
                {capitalize(type)}
              </option>
            ))}
          </Select>
        </Row.Column>
        <Row.Column>
          <Select
            label='Faction'
            id='faction'
            required
            value={faction}
            onChange={event => setFaction(event.target.value)}
            data-testid='randomize-card-faction'
          >
            <option value='*'>Any</option>
            {FACTIONS.map(faction => (
              <option value={faction} key={faction}>
                {capitalize(faction)}
              </option>
            ))}
          </Select>
        </Row.Column>
      </Row>
    </Dialog>
  )
})
