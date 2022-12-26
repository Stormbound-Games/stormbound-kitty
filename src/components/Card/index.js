import React from 'react'
import { useFela } from 'react-fela'
import Image from '#components/Image'
import microMarkdown from '#helpers/microMarkdown'
import clamp from '#helpers/clamp'
import useFluidSizing from '#hooks/useFluidSizing'
import useImageSupport from '#hooks/useImageSupport'
import styles, { getOutlineColor } from './styles'

const useCardBackground = ({ missing, rarity, type, faction }) => {
  const { supportsWebp } = useImageSupport()
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
  const { fontSize, ref } = useFluidSizing(0.03902439024, props.containerWidth)
  const backgroundImage = useCardBackground(props)
  const level = clamp(props.level || 1, 1, 5)
  const styleProps = {
    ...props,
    hasDecreasedMana: props.manaDecreased,
    hasDecreasedMovement: props.movementDecreased,
    hasDecreasedStrength: props.strengthDecreased,
    hasFixedMovement: props.fixedMovement,
    hasIncreasedMana: props.manaIncreased,
    hasIncreasedMovement: props.movementIncreased,
    hasIncreasedStrength: props.strengthIncreased,
    isAffordable: props.affordable,
    isCreated: props.created,
    isHero: props.unitTypes.includes('hero'),
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
      data-unit-types={props.unitTypes.join(' ')}
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

          <span className={css(styles.unitTypes)} data-testid='card-unit-types'>
            {props.unitTypes.join(' ')}
          </span>
        </div>

        {!props.missing ? (
          <div className={css(styles.imageWrapper)}>
            <Image
              alt={props.image ? props.name : ''}
              src={props.image}
              extend={styles.image}
              data-testid='card-image'
              lazy
              width={props.image ? 300 : undefined}
              height={props.image ? 300 : undefined}
            />
          </div>
        ) : (
          <span
            className={css(styles.missing)}
            style={{
              maskImage: `url("${props.image}?auto=format&w=300&q=90")`,
              WebkitMaskImage: `url("${props.image}?auto=format&w=300&q=90")`,
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
              // This is a little awkward: back in the days of writing the
              // battle sim, I decided to store a token’s strength in its level
              // property since it doesn’t actually have a level per se. This
              // allowed for serializing a 3-strength token card as `3t1` for
              // instance.
              // This is why the property was originally expressed as:
              //    props.token ? 1 : props.level
              //
              // Unfortunately that notion that token cards do not have a level
              // no longer holds up, because cards like Malicious Finch create
              // token cards which very much have leveling. And when displaying
              // a token card across its 5 levels for showcasing purposes (such
              // as in release notes or the official card pages), we want the
              // levels to range from 1 to 5, not 1 every time.
              //
              // This check is not great because it would render a 4-strength
              // token as level 4 in the battle sim, which is not exactly
              // correct, but that’s the best I’ve got right now.
              props.token && props.level > 5 ? 1 : props.level
            }
          </span>

          {props.type === 'unit' && props.movement !== null && (
            <div className={css(styles.movement)}>
              <span
                className={css(styles.movementContent)}
                data-testid={[
                  'card-movement',
                  props.fixedMovement && 'card-movement-fixed',
                ]
                  .filter(Boolean)
                  .join(' ')}
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
