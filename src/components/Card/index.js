import React from 'react'
import Image from '../Image'
import { getRarityImage, getRarityColor } from '../../helpers/getRarity'
import useFluidSizing from '../../helpers/useFluidSizing'
import microMarkdown from '../../helpers/microMarkdown'
import './index.css'

const Card = props => {
  const { fontSize, ref } = useFluidSizing(0.03902439024)
  return (
    <article
      className={[
        'Card',
        `Card--${props.faction}`,
        props.affordable && 'Card--affordable',
        props.upgradable && 'Card--upgradable',
        props.player === 'RED' && 'Card--RED',
        props.player === 'BLUE' && 'Card--BLUE'
      ]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
      style={{ fontSize }}
      data-testid="card"
    >
      <div
        className="Card__content"
        style={{
          backgroundImage:
            props.rarity === 'legendary'
              ? `url("/assets/images/${props.faction}-hero.png")`
              : `url("/assets/images/${props.faction}-${props.type}.png")`
        }}
      >
        <header className="Card__header">
          <div className="Card__mana">
            <span className="Card__mana-content">{props.mana}</span>
          </div>
          <span className="Card__name" data-testid="card-name">
            {props.name}
          </span>

          <span className="Card__race">
            {props.race} {props.elder && 'elder'}
            {props.rarity === 'legendary' && props.type === 'unit'
              ? 'hero'
              : ''}
          </span>
        </header>

        {props.image && (
          <Image
            alt=""
            src={props.image}
            wrapperClassName={[
              'Card__image-wrapper',
              props.rarity === 'legendary' && 'Card__image-wrapper--hero'
            ]
              .filter(Boolean)
              .join(' ')}
            className="Card__image"
          />
        )}

        <footer className="Card__footer">
          <p className="Card__ability">{microMarkdown(props.ability)}</p>
          <img
            className="Card__rarity"
            src={getRarityImage(props.rarity)}
            alt={props.rarity}
          />

          {props.type !== 'spell' && props.strength !== null && (
            <div
              className={[
                'Card__strength',
                props.type === 'structure' && 'Card__strength--structure',
                props.rarity === 'legendary' && 'Card__strength--hero'
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                className="Card__strength-content"
                data-testid="card-strength"
              >
                {props.token ? props.level : props.strength}
              </span>
            </div>
          )}

          {!props.token && (
            <span
              className="Card__level"
              style={{ color: getRarityColor(props.rarity) }}
              data-testid="card-level"
            >
              Level {props.level}
            </span>
          )}

          {props.type === 'unit' && props.movement !== null && (
            <div className="Card__movement">
              <span className="Card__movement-content">{props.movement}</span>
            </div>
          )}
        </footer>
      </div>
    </article>
  )
}

export default Card
