import React from 'react'
import { Link } from 'react-router-dom'
import { RESTRICTIONS, TYPES } from '../../constants/puzzles'
import Image from '../Image'
import './index.css'

const BattleSimPuzzle = props => (
  <div className='BattleSimPuzzle'>
    {!props.noImage && (
      <div className='BattleSimPuzzle__image-wrapper'>
        <Image
          className='BattleSimPuzzle__image'
          src={props.image}
          alt={props.name}
        />
      </div>
    )}
    <div className='BattleSimPuzzle__content'>
      <span className='BattleSimPuzzle__name'>
        <Link to={`/sim/${props.board}/display`}>{props.name}</Link>
      </span>
      <span className='BattleSimPuzzle__author'>by {props.author}</span>
      <span className='BattleSimPuzzle__type'>
        <span>{props.type.toLowerCase()}: </span>
        {props.description || TYPES[props.type]} {props.note}
      </span>
      <span className='BattleSimPuzzle__difficulty'>
        Difficulty: {props.difficulty}/3
      </span>
      <span className='BattleSimPuzzle__restrictions'>
        Restrictions:{' '}
        {props.restrictions.length > 0
          ? [...props.restrictions].sort().map((restriction, index) => (
              <>
                <span
                  title={RESTRICTIONS[restriction].description}
                  className='BattleSimPuzzle__restriction'
                >
                  {RESTRICTIONS[restriction].name}
                </span>
                {index !== props.restrictions.length - 1 && ', '}
              </>
            ))
          : 'none'}
      </span>
    </div>
  </div>
)

export default BattleSimPuzzle
