import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import Link from '~/components/Link'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function Error(props) {
  const { css } = useFela()

  return (
    <>
      <div className={css(styles.error)}>
        <Title element='h1' className={css(styles.title)}>
          {props.title || 'An error has occurred'}
        </Title>

        <Image
          src='https://cdn.sanity.io/images/5hlpazgd/production/f675c9ec86b27088ee6433b53433a9a3fdd96803-512x512.png'
          alt=''
          extend={styles.image}
          width={250}
          height={280}
          lazy
        />

        {props.error === 'ChunkLoadError' ? (
          <p>
            You must have changed page during a re-deployment of the site. Very
            sorry about this! Please refresh the page.
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
      </div>
    </>
  )
})
