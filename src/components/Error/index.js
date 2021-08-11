import React from 'react'
import { useFela } from 'react-fela'
import CTA from '../CTA'
import Image from '../Image'
import Link from '../Link'
import Title from '../Title'
import styles from './styles'

export default React.memo(function Error(props) {
  const { css } = useFela()

  return (
    <>
      <div className={css(styles.error)}>
        {!props.noTitle && (
          <Title element='h1' className={css(styles.title)}>
            An error occurred
          </Title>
        )}

        {!props.noImage && (
          <Image
            src='/assets/images/cards/sweetcap_kittens.png'
            extend={styles.image}
            withAvif
          />
        )}

        {props.error === 'ChunkLoadError' ? (
          <p>
            You must have changed page during a re-deployment of the site. Very
            sorry about this! Please refresh the page or press “Retry”.
          </p>
        ) : (
          <>
            <p>
              It looks like something went wrong… It’s definitely not your fault
              though, don’t worry!
            </p>
            <p>
              What you can do is report it to Kitty#1909 on the{' '}
              <Link href='https://discord.gg/stormbound'>
                Stormbound Discord
              </Link>
              , along with the URL of this page and the following error:
            </p>

            <pre className={css(styles.pre)}>{props.error}</pre>
          </>
        )}

        {props.retry && <CTA onClick={props.retry}>Retry</CTA>}
      </div>
    </>
  )
})
