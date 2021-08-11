import React from 'react'
import { useFela } from 'react-fela'
import Image from '../Image'
import VisuallyHidden from '../VisuallyHidden'
import useFluidSizing from '../../hooks/useFluidSizing'
import styles from './styles'

export default React.memo(function Quest(props) {
  const { css } = useFela()
  const { fontSize, ref } = useFluidSizing(0.04114285714)

  return (
    <div
      className={css(styles.quest)}
      style={{ '--font-size': fontSize }}
      ref={ref}
    >
      <div className={css(styles.inner)}>
        <span className={css(styles.difficulty)}>
          <VisuallyHidden>Difficulty {props.difficulty}</VisuallyHidden>
          <span
            className={css(
              styles.difficultyDiamond({ level: props.difficulty })
            )}
          />
          {props.difficulty > 1 && (
            <span
              className={css(
                styles.difficultyDiamond({ level: props.difficulty })
              )}
            />
          )}
          {props.difficulty > 2 && (
            <span
              className={css(
                styles.difficultyDiamond({ level: props.difficulty })
              )}
            />
          )}
        </span>
        <div className={css(styles.content)}>
          <span className={css(styles.name)}>{props.name}</span>
          <p className={css(styles.description)}>{props.description}</p>
        </div>
        <div className={css(styles.reward)}>
          <Image
            extend={styles.currencyImage}
            src={`/assets/images/iconography/${props.currency}.png`}
            alt={props.currency}
          />
          <span className={css(styles.amount)}>
            <span className={css(styles.number)}>{props.amount}</span>{' '}
            <span className={css(styles.currency)}>
              {props.currency.toLowerCase().replace('_', ' ')}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
})
