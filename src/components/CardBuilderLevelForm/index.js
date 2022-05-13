import React from 'react'
import Input from '~/components/Input'
import ResetButton from '~/components/ResetButton'
import Row from '~/components/Row'
import ShareButton from '~/components/CardBuilderShareButton'
import Spacing from '~/components/Spacing'
import formatCardStats from '~/helpers/formatCardStats'
import useRouteId from '~/hooks/useRouteId'

export default React.memo(function CardBuilderLevelForm(props) {
  const isPristine = !useRouteId()

  return (
    <>
      <p>
        Attributes leveling can be expressed using slashes (<code>/</code>) to
        separate dynamic values across levels, for instance “3/4/5/5/6”. Exactly
        one or five values need to be expressed for it to be valid.
      </p>

      <Row isDesktopOnly>
        <Row.Column>
          <Input
            label='Strength'
            id='strength'
            value={
              props.strength.display === null ? '' : props.strength.display
            }
            onChange={event => props.setStrength(event.target.value)}
            disabled={props.type === 'spell'}
            required
            placeholder='e.g. “3” or “1/2/3/4/5”'
            data-testid='cb-strength-input'
          />
        </Row.Column>
        <Row.Column>
          <Input
            label='Mana'
            id='mana'
            value={props.mana.display === null ? '' : props.mana.display}
            onChange={event => props.setMana(event.target.value)}
            required
            placeholder='e.g. “3” or “5/5/4/4/3”'
            data-testid='cb-mana-input'
          />
        </Row.Column>
      </Row>

      <Row>
        <Row.Column>
          <Input
            label='Ability'
            id='ability'
            maxLength={160}
            value={props.ability.display === null ? '' : props.ability.display}
            placeholder='e.g. Give 2/3/4/5/6 strength to a *bordering* friendly unit.'
            onChange={event => props.setAbility(event.target.value)}
            data-testid='cb-ability-input'
          />
        </Row.Column>
      </Row>

      <Spacing top='LARGE'>
        <Row withNarrowGutter>
          <Row.Column>
            <ResetButton
              label='Reset form'
              confirm='Are you sure you want to reset the form to its initial state?'
              reset={props.reset}
              disabled={isPristine}
            />
          </Row.Column>
          <Row.Column>
            <ShareButton
              title={props.name}
              content={formatCardStats(props)}
              disabled={isPristine}
            />
          </Row.Column>
        </Row>
      </Spacing>
    </>
  )
})
