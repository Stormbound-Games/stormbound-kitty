import React from 'react'
import { useFela } from 'react-fela'
import CTA from '../CTA'
import Image from '../Image'
import Only from '../Only'
import Row from '../Row'
import styles from './styles'

const HomeSection = props => {
  const { css } = useFela()

  return (
    <section className={css(styles.section, { '--color': props.color })}>
      <div className={css(styles.inner)}>
        <Row desktopOnly>
          <Row.Column>
            {props.image && (
              <Only.Desktop>
                <Image extend={styles.image} src={props.image} withAvif />
              </Only.Desktop>
            )}
          </Row.Column>
          <Row.Column>
            <h2 className={css(styles.title)}>{props.title}</h2>

            {props.children}

            <div className={css(styles.actions)}>
              {props.actions.map(action => (
                <CTA key={action.to} extend={styles.action} to={action.to}>
                  {action.children}
                </CTA>
              ))}
            </div>
          </Row.Column>
        </Row>
      </div>
    </section>
  )
}

export default React.memo(HomeSection)
