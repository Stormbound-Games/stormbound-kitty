import React from 'react'
import CardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import CoreForm from '../CardBuilderCoreForm'
import Notice from '../Notice'
import ImageErrorDialog from '../CardBuilderImageErrorDialog'
import LevelForm from '../CardBuilderLevelForm'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default React.memo(function CardBuilderApp(props) {
  return (
    <>
      <Title className='CardBuilderApp__title'>
        {props.mode === 'EDITOR'
          ? 'Create your card'
          : props.name || 'Your card'}
      </Title>

      <CardDisplay {...props} />

      {props.hasSingleLevel && (
        <div className='CardBuilderApp__notice'>
          <Notice icon='wand'>
            This card was created before it was possible to define all 5 levels,
            or without consideration for leveling, therefore only the level{' '}
            {props.level} is relevant.
          </Notice>
        </div>
      )}

      {props.mode === 'EDITOR' && (
        <ImageErrorDialog dialogRef={props.imageErrorDialogRef} />
      )}

      {props.mode === 'EDITOR' ? (
        <div className='CardBuilderApp__bottom'>
          <Row desktopOnly wideGutter>
            <Column>
              <Title>Core attributes</Title>
              <CoreForm {...props} />
            </Column>
            <Column>
              <Title>Level-specific attributes</Title>
              <LevelForm {...props} />
            </Column>
          </Row>
        </div>
      ) : null}
    </>
  )
})
