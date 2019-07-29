import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import { RESTRICTIONS, TYPES } from '../../constants/puzzles'
import Image from '../Image'
import './index.css'

const BSPuzzle = props => {
  return (
    <div className="BSPuzzle">
      {!props.noImage && (
        <div className="BSPuzzle__image-wrapper">
          <Image
            className="BSPuzzle__image"
            src={props.image}
            alt={props.name}
          />
        </div>
      )}
      <div className="BSPuzzle__content">
        <span className="BSPuzzle__name">
          <Link to={`../${props.board}/display`}>{props.name}</Link>
        </span>
        <span className="BSPuzzle__author">by {props.author}</span>
        <span className="BSPuzzle__type">
          <span>{props.type.toLowerCase()}: </span>
          {props.description || TYPES[props.type]} {props.note}
        </span>
        <span className="BSPuzzle__difficulty">
          Difficulty: {props.difficulty}/3
        </span>
        <span className="BSPuzzle__restrictions">
          Restrictions:{' '}
          {props.restrictions.length > 0
            ? [...props.restrictions].sort().map((restriction, index) => (
                <Fragment key={restriction}>
                  <span
                    title={RESTRICTIONS[restriction].description}
                    className="BSPuzzle__restriction"
                  >
                    {RESTRICTIONS[restriction].name}
                  </span>
                  {index !== props.restrictions.length - 1 && ', '}
                </Fragment>
              ))
            : 'none'}
        </span>
      </div>
    </div>
  )
}

export default BSPuzzle
