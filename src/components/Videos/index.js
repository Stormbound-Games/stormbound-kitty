import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Icon from '~/components/Icon'
import Image from '~/components/Image'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import chunk from '~/helpers/chunk'
import VIDEOS from '~/data/videos'
import styles from './styles'

export default React.memo(function Videos(props) {
  const { css } = useFela()

  return (
    <Page
      title='Videos'
      description='Find here a list of popular and active Stormbound video content creators and their YouTube channels.'
      isEditorialContent
    >
      {chunk(VIDEOS, 2).map((row, index) => (
        <Row key={index} isDesktopOnly withWideGutter>
          {row.map((video, index, array) => (
            <React.Fragment key={video.author}>
              <Row.Column>
                <Spacing bottom='LARGER'>
                  <Row isDesktopOnly withWideGutter>
                    <Row.Column width='1/3' extend={styles.column}>
                      <Image
                        src={video.thumbnail}
                        alt={`${video.author}’s avatar`}
                        extend={styles.image}
                      />
                    </Row.Column>
                    <Row.Column
                      width='2/3'
                      extend={{ justifyContent: 'center' }}
                    >
                      <h2 className={css(styles.title)}>
                        <Link to={`/member/${video.author}`}>
                          {video.author}
                        </Link>
                      </h2>
                      {video.description}
                      <p>
                        <Icon icon='arrow-right' extend={styles.icon} />
                        <Link href={video.href} extend={styles.link}>
                          Visit {video.author}’s channel
                        </Link>
                      </p>
                    </Row.Column>
                  </Row>
                </Spacing>
              </Row.Column>
              {VIDEOS.length % 2 !== 0 && index === array.length - 1 && (
                <Row.Column />
              )}
            </React.Fragment>
          ))}
        </Row>
      ))}
    </Page>
  )
})
