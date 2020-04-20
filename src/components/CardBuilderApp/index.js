import React from 'react'
import CardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import CoreForm from '../CardBuilderCoreForm'
import Hint from '../Hint'
import ImageErrorDialog from '../CardBuilderImageErrorDialog'
import LevelForm from '../CardBuilderLevelForm'
import Row from '../Row'
import Title from '../Title'
import './index.css'

const CardBuilderApp = props => (
  <>
    <Title>
      {props.mode === 'EDITOR' ? 'Create your card' : props.name || 'Your card'}
    </Title>

    <CardDisplay {...props} />

    {props.hasSingleLevel && (
      <div className='CardBuilderApp__notice'>
        <Hint>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Hint>
      </div>
    )}

    {props.mode === 'EDITOR' && (
      <ImageErrorDialog dialogRef={props.imageErrorDialogRef} />
    )}

    {props.mode === 'EDITOR' ? (
      <div className='CardBuilderApp__bottom'>
        <Row desktopOnly wideGutter>
          <Column width={10} />
          <Column width={40}>
            <Title>Core attributes</Title>
            <CoreForm {...props} />
          </Column>
          <Column width={40}>
            <Title>Level-specific attributes</Title>
            <LevelForm {...props} />
          </Column>
          <Column width={10} />
        </Row>
      </div>
    ) : null}
  </>
)

export default CardBuilderApp
