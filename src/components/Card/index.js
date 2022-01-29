import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import { ImageSupportContext } from '~/components/ImageSupportProvider'
import microMarkdown from '~/helpers/microMarkdown'
import clamp from '~/helpers/clamp'
import useFluidSizing from '~/hooks/useFluidSizing'
import styles, { getOutlineColor } from './styles'

const useCardBackground = ({ missing, rarity, type, faction }) => {
  const { supportsWebp } = React.useContext(ImageSupportContext)
  const ext = supportsWebp ? 'webp' : 'png'
  const base = '/assets/images/card'
  const asUrl = fileName => `url("${base}/${fileName}.${ext}")`
  const prefix = missing ? 'missing' : faction
  const hasLegendaryBackground = rarity === 'legendary' && type !== 'spell'

  return asUrl(
    [prefix, hasLegendaryBackground && 'legendary', type]
      .filter(Boolean)
      .join('-')
  )
}

export default React.memo(function Card(props) {
  const { supportsWebp } = React.useContext(ImageSupportContext)
  const { fontSize, ref } = useFluidSizing(0.03902439024, props.containerWidth)
  const ext = supportsWebp ? 'webp' : 'png'
  const backgroundImage = useCardBackground(props)
  const level = clamp(props.level || 1, 1, 5)
  const styleProps = {
    ...props,
    hasDecreasedMana: props.manaDecreased,
    hasDecreasedMovement: props.movementDecreased,
    hasDecreasedStrength: props.strengthDecreased,
    hasFixedMovement: props.ability?.includes('fixed'),
    hasIncreasedMana: props.manaIncreased,
    hasIncreasedMovement: props.movementIncreased,
    hasIncreasedStrength: props.strengthIncreased,
    isAffordable: props.affordable,
    isCreated: props.created,
    isHero: props.hero,
    isMissing: props.missing,
    isUpgradable: props.upgradable,
    level,
  }
  const { css } = useFela(styleProps)

  return (
    <div
      className={css(styles.card, props.extend)}
      data-affordable={props.affordable || undefined}
      data-upgradable={props.upgradable || undefined}
      data-missing={props.missing || undefined}
      data-faction={props.faction}
      data-rarity={props.rarity}
      data-race={props.race}
      data-type={props.type}
      ref={ref}
      style={{
        '--font-size': fontSize,
        '--outline-color': getOutlineColor(styleProps),
      }}
      data-testid='card'
      id={[props.id, props.idx].filter(Boolean).join('_')}
    >
      <div className={css(styles.content)} style={{ backgroundImage }}>
        <div className={css(styles.header)}>
          <div className={css(styles.mana)}>
            <span className={css(styles.manaContent)} data-testid='card-mana'>
              {props.mana}
            </span>
          </div>
          <span className={css(styles.name)} data-testid='card-name'>
            {props.name}
          </span>

          <span className={css(styles.race)} data-testid='card-race'>
            {props.ancient && 'ancient'} {props.race} {props.elder && 'elder'}{' '}
            {props.hero && 'hero'}
          </span>
        </div>

        {!props.missing ? (
          <div className={css(styles.imageWrapper)}>
            <Image
              alt={props.image ? props.name : ''}
              src={
                (props.image || '').startsWith('http') || !props.image
                  ? props.image
                  : '/assets/images/cards/' + props.image
              }
              extend={styles.image}
              data-testid='card-image'
              lazy
              width={props.image ? 300 : undefined}
              height={props.image ? 300 : undefined}
              withAvif
            />
          </div>
        ) : (
          <span
            className={css(styles.missing)}
            style={{
              maskImage: `url(/assets/images/cards/${props.image.replace(
                '.png',
                '.' + ext
              )})`,
              WebkitMaskImage: `url(/assets/images/cards/${props.image.replace(
                '.png',
                '.' + ext
              )})`,
            }}
          />
        )}

        <div className={css(styles.footer)}>
          <p className={css(styles.ability)} data-testid='card-ability'>
            {microMarkdown(props.ability)}
          </p>
          {props.rarity && (
            <Image
              extend={styles.rarity(styleProps)}
              src={`/assets/images/card/rarity_${props.rarity}_${level}.png`}
              alt={props.rarity}
              data-testid='card-rarity'
              withoutWebp
              width={45}
              height={45}
              lazy
            />
          )}

          {props.type !== 'spell' && props.strength !== null && (
            <div className={css(styles.strength)}>
              <span
                className={css(styles.strengthContent)}
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

          <span className={css(styles.level)} data-testid='card-level'>
            Level{' '}
            {
              // Token cards carry their strength in their level but they should
              // always be displayed as level 1.
              props.token ? 1 : props.level
            }
          </span>

          {props.type === 'unit' && props.movement !== null && (
            <div className={css(styles.movement)}>
              <span
                className={css(styles.movementContent)}
                data-testid='card-movement'
              >
                {props.movement}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
