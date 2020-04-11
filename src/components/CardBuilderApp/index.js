import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Title from '../Title'
import Hint from '../Hint'
import CoreForm from '../CardBuilderCoreForm'
import LevelForm from '../CardBuilderLevelForm'
import CardDisplay from '../CardBuilderCardDisplay'
import ImageErrorDialog from '../CardBuilderImageErrorDialog'
import Row from '../Row'
import Column from '../Column'
import './index.css'

const CardBuilderApp = props => (
  <Fragment>
    <Title>
      {props.mode === 'EDITOR' ? 'Create your card' : props.name || 'Your card'}
    </Title>

    <CardDisplay {...props} />

    <div className='CardBuilderApp__notice'>
      {props.hasSingleLevel ? (
        <Hint>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Hint>
      ) : (
        <Hint>
          Discover the <Link to='/stories'>amazing back stories</Link> the
          community came up with about some cards!
        </Hint>
      )}
    </div>

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
  </Fragment>
)

export default CardBuilderApp
