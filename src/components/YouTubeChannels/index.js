import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Icon from '~/components/Icon'
import Image from '~/components/Image'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import chunk from '~/helpers/chunk'
import styles from './styles'

export default React.memo(function YouTubeChannels(props) {
  const { css } = useFela()

  return (
    <Page
      title='YouTube Channels'
      description='Find here a list of popular and active Stormbound video content creators and their YouTube channels.'
      isEditorialContent
    >
      {chunk(props.channels, 2).map(row => (
        <Row key={row.map(entry => entry.user.name).join('+')} isDesktopOnly>
          {row.map(({ channel, user }, index, array) => (
            <React.Fragment key={user.slug}>
              <Row.Column>
                <Spacing bottom='LARGER'>
                  <Row isDesktopOnly>
                    <Row.Column width='1/3' extend={styles.column}>
                      <Image
                        src={channel.thumbnail}
                        alt={`${user.name}’s avatar`}
                        extend={styles.image}
                        width={200}
                        height={200}
                        lazy
                      />
                    </Row.Column>
                    <Row.Column
                      width='2/3'
                      extend={{ justifyContent: 'center' }}
                    >
                      <h2 className={css(styles.title)}>
                        <Link to={`/members/${user.slug}`}>{user.name}</Link>
                      </h2>
                      {channel.description}
                      <p>
                        <Icon icon='arrow-right' extend={styles.icon} />
                        <Link href={channel.href} extend={styles.link}>
                          Visit {user.name}’s channel
                        </Link>
                      </p>
                    </Row.Column>
                  </Row>
                </Spacing>
              </Row.Column>
              {props.channels.length % 2 !== 0 &&
                index === array.length - 1 && <Row.Column />}
            </React.Fragment>
          ))}
        </Row>
      ))}
    </Page>
  )
})
