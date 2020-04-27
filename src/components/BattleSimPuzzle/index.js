import React from 'react'
import { Link } from 'react-router-dom'
import { RESTRICTIONS, TYPES } from '../../constants/puzzles'
import Image from '../Image'
import Only from '../Only'
import './index.css'

export default React.memo(function BattleSimPuzzle(props) {
  return (
    <div className='BattleSimPuzzle'>
      {!props.noImage && (
        <Only.Desktop>
          <div className='BattleSimPuzzle__image-wrapper'>
            <Image
              className='BattleSimPuzzle__image'
              src={props.image}
              alt={props.name}
            />
          </div>
        </Only.Desktop>
      )}
      <div className='BattleSimPuzzle__content'>
        <h3 className='BattleSimPuzzle__name'>
          <Link to={`/sim/${props.board}/display`}>{props.name}</Link>
        </h3>
        <p className='BattleSimPuzzle__author'>by {props.author}</p>
        <dl className='BattleSimPuzzle__details'>
          <dt>{props.type.toLowerCase()}:</dt>
          <dd>
            {props.description || TYPES[props.type]} {props.note}
          </dd>

          <dt>Difficulty:</dt>
          <dd>{props.difficulty}/3</dd>

          <dt>Restrictions:</dt>
          <dd>
            {props.restrictions.length > 0
              ? [...props.restrictions].sort().map((restriction, index) => (
                  <React.Fragment key={index}>
                    <span
                      title={RESTRICTIONS[restriction].description}
                      className='BattleSimPuzzle__restriction'
                    >
                      {RESTRICTIONS[restriction].name}
                    </span>
                    {index !== props.restrictions.length - 1 && ', '}
                  </React.Fragment>
                ))
              : 'none'}
          </dd>
        </dl>
      </div>
    </div>
  )
})
