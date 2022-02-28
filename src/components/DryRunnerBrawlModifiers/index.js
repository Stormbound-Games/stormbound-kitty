import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Dialog from '~/components/Dialog'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import { BRAWLS, BRAWL_INDEX } from '~/constants/brawl'

const getDialogImage = (cardsIndex, modifier) => {
  if (!modifier || modifier === 'NONE') {
    return 'https://cdn.sanity.io/images/5hlpazgd/production/3886106424f6a20f584fa658760e7fe46bd35ab5-512x512.png'
  }

  return cardsIndex[BRAWL_INDEX[modifier].cardId].image
}

export default React.memo(function DryRunnerBrawlModifiers(props) {
  const dialogRef = React.useRef()
  const { cardsIndex } = React.useContext(CardsContext)
  const [modifier, setModifier] = React.useState(props.modifier)

  return (
    <Spacing bottom='LARGE'>
      <Select
        label='Brawl modifier'
        id='brawl-modifier'
        data-testid='brawl-modifier'
        value={props.modifier}
        onChange={event => {
          setModifier(event.target.value)
          dialogRef.current.show()
        }}
      >
        <option value='NONE'>None</option>
        {BRAWLS.map(brawl => (
          <option key={brawl.id} value={brawl.id}>
            {brawl.label}
          </option>
        ))}
      </Select>
      <Dialog
        id='brawl-modifier-dialog'
        title='Brawl mode'
        dialogRef={instance => (dialogRef.current = instance)}
        image={getDialogImage(cardsIndex, modifier)}
        close={() => dialogRef.current.hide()}
        ctaProps={{
          onClick: () => {
            props.setModifier(modifier)
            dialogRef.current.hide()
          },
          'data-testid': 'reset-confirm-btn',
          children: 'Reset game',
        }}
      >
        Changing the Brawl Modifier will reset the game. Are you sure you want
        to? Don’t worry, you’ll keep your deck.
      </Dialog>
    </Spacing>
  )
})
