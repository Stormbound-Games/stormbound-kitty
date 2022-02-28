import React from 'react'
import { useFela } from 'react-fela'
import CTA from '~/components/CTA'
import Image from '~/components/Image'
import Only from '~/components/Only'
import Row from '~/components/Row'
import styles from './styles'

export default React.memo(function HomeSection(props) {
  const { css } = useFela()

  return (
    <section className={css(styles.section, { '--color': props.color })}>
      <div className={css(styles.inner)}>
        <Row isDesktopOnly>
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
          <Row.Column>
            {props.image && (
              <Only.Desktop>
                <Image
                  extend={styles.image}
                  src={props.image}
                  alt={props.imageAlt || ''}
                  width={270}
                  height={270}
                  lazy
                />
              </Only.Desktop>
            )}
          </Row.Column>
        </Row>
      </div>
    </section>
  )
})
