import React from 'react'
import Image from '../Image'
import { WebpContext } from '../WebpProvider'
import { getRarityColor } from '../../helpers/getRarity'
import microMarkdown from '../../helpers/microMarkdown'
import useFluidSizing from '../../hooks/useFluidSizing'
import './index.css'

export default React.memo(function Card(props) {
  const supportsWebp = React.useContext(WebpContext)
  const { fontSize, ref } = useFluidSizing(0.03902439024)
  const ext = supportsWebp ? 'webp' : 'png'

  return (
    <article
      className={[
        'Card',
        `Card--${props.faction}`,
        props.affordable && 'Card--affordable',
        props.upgradable && 'Card--upgradable',
        props.missing && 'Card--missing',
        props.created && 'Card--created',
        props.player === 'RED' && 'Card--RED',
        props.player === 'BLUE' && 'Card--BLUE',
      ]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
      style={{ fontSize }}
      data-testid='card'
      id={[props.id, props.idx].filter(Boolean).join('_')}
    >
      <div
        className='Card__content'
        style={{
          backgroundImage: props.missing
            ? props.rarity === 'legendary'
              ? `url("/assets/images/missing-hero.${ext}")`
              : `url("/assets/images/missing-${props.type}.${ext}")`
            : props.rarity === 'legendary'
            ? `url("/assets/images/${props.faction}-hero.${ext}")`
            : `url("/assets/images/${props.faction}-${props.type}.${ext}")`,
        }}
      >
        <header className='Card__header'>
          <div className='Card__mana'>
            <span
              className={[
                'Card__mana-content',
                props.costReduced && 'Card__mana-content--cost-reduced',
              ]
                .filter(Boolean)
                .join(' ')}
              data-testid='card-mana'
            >
              {props.mana}
            </span>
          </div>
          <span className='Card__name' data-testid='card-name'>
            {props.name}
          </span>

          <span className='Card__race' data-testid='card-race'>
            {props.race} {props.elder && 'elder'} {props.hero && 'hero'}
          </span>
        </header>

        {!props.missing ? (
          <Image
            alt=''
            src={props.image}
            wrapperClassName={[
              'Card__image-wrapper',
              props.rarity === 'legendary' && 'Card__image-wrapper--hero',
            ]
              .filter(Boolean)
              .join(' ')}
            className='Card__image'
            data-testid='card-image'
          />
        ) : (
          <span
            className='Card__missing'
            style={{
              maskImage: `url(${props.image.replace('.png', '.' + ext)})`,
              WebkitMaskImage: `url(${props.image.replace('.png', '.' + ext)})`,
            }}
          />
        )}

        <footer className='Card__footer'>
          <p className='Card__ability' data-testid='card-ability'>
            {microMarkdown(props.ability)}
          </p>
          <img
            className='Card__rarity'
            src={`/assets/images/rarity-${props.rarity}.${ext}`}
            alt={props.rarity}
            data-testid='card-rarity'
          />

          {props.type !== 'spell' && props.strength !== null && (
            <div
              className={[
                'Card__strength',
                props.strengthIncreased && 'Card__strength--increased',
                props.strengthDecreased && 'Card__strength--decreased',
                props.type === 'structure' && 'Card__strength--structure',
                props.rarity === 'legendary' && 'Card__strength--hero',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                className='Card__strength-content'
                data-testid='card-strength'
              >
                {
                  // Token cards carry their strength in their level since their
                  // strength varies based on context and they technically do
                  // not have a level.
                  props.token ? props.level : props.strength
                }
              </span>
            </div>
          )}

          <span
            className='Card__level'
            style={{
              // Token cards do not have a rarity, but should be displayed as
              // “common” cards.
              color: getRarityColor(props.rarity || 'common', 'light'),
            }}
            data-testid='card-level'
          >
            Level{' '}
            {
              // Token cards carry their strength in their level but they should
              // always be displayed as level 1.
              props.token ? 1 : props.level
            }
          </span>

          {props.type === 'unit' && props.movement !== null && (
            <div className='Card__movement'>
              <span
                className={[
                  'Card__movement-content',
                  props.movementIncreased && 'Card__movement--increased',
                  props.movementDecreased && 'Card__movement--decreased',
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-testid='card-movement'
              >
                {props.movement}
              </span>
            </div>
          )}
        </footer>
      </div>
    </article>
  )
})
