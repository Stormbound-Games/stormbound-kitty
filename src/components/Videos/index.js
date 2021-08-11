import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import Page from '../Page'
import Icon from '../Icon'
import Image from '../Image'
import Row from '../Row'
import Spacing from '../Spacing'
import chunk from '../../helpers/chunk'
import styles from './styles'

export const VIDEOS = [
  {
    author: 'ThePopularEagle',
    href: 'https://www.youtube.com/playlist?list=PLjem3bM4g6dU1c2PZnJcgYWZBd9eVMFpd',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJzYAkFSZZeww98CuTj3X5naRy3IK2x3rlWhCKtP=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        The Popular Eagle (TPE for short) is a long time Stormbound Youtuber,
        having created content and guides since as far back as 2018. TPE is also
        on <Link href='https://twitter.com/ThePopularEagle'>Twitter</Link> and{' '}
        <Link href='https://discord.gg/zmkuDU'>Discord</Link>.
      </p>
    ),
  },
  {
    author: 'Emkaem',
    href: 'https://www.youtube.com/c/Emkaem',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJx9Ar5CUhQ7nQ7H9GI2bR2aKGG-Ti9whwHraCRG=s288-c-k-c0xffffffff-no-rj-mo',
    description: (
      <p>
        Emkaem is a former member of Paladin Studios, the original company
        behind Stormbound and has been playing and creating content since the
        early days of the game.
      </p>
    ),
  },
  {
    author: 'The_mirc',
    href: 'https://www.youtube.com/channel/UCLlIRRyYyULrRQVMbPvt8tQ',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJwmiUxp4HlH3SATkuzELxS0o-CRIrgu6DieDYWF=s288-c-k-c0xffffffff-no-rj-mo',
    description: (
      <p>
        The_mirc is an active and high-profile Stormbound player with a maxed
        out collection, active on Discord and contributing by composing new
        decks and trying new strategies.
      </p>
    ),
  },
  {
    author: 'RecklessRush',
    href: 'https://www.youtube.com/channel/UCqc9ONUhTVQ3WnTRci3dYXQ',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJycXe3vDT9iJherI79bxa5Pm20OiFyFgk8DT_AVlA=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        RecklessRush is a popular Stormbound community manager known for his
        eponymous deck which focuses on aggressive rush strategies.
      </p>
    ),
  },
  {
    author: 'Frostkhan',
    href: 'https://www.youtube.com/channel/UCy9LE_mTjVPEyZP56U_u0WA',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJw5m7JC1ALHO8RaK6qRn5rOEHyrO--dtDuYi8rPjQ=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        Frostkhan is a high-rank player producing a lot of Stormbound videos
        when they experiment with various decks and strategies, especially
        during Brawls.
      </p>
    ),
  },
  {
    author: 'LazyLotazo',
    href: 'https://www.youtube.com/playlist?list=PLRZ8OyLIb3tOsqGHvXsGMEEFa4kDoKIsm',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJyt5PB_hzgoV8QYGG-JZKonctwJANaxYMpBqz4_Mw=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        LazyLotazo is a popular Stormbound Youtuber regularly creating new
        videos.
      </p>
    ),
  },
  {
    author: 'Stratarts',
    href: 'https://www.youtube.com/channel/UC7qPCB2Qf8YeufRY1G9E_tg',
    thumbnail:
      'https://yt3.ggpht.com/ytc/AAUvwnhtxJdy4-GIAIqhdk15IDEvAICAA0QvndTqHoqk=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        Stratarts is an avid Spanish gamer and active member of the community
        who mainly uploads brawl videos.
      </p>
    ),
  },
  {
    author: 'AlsterSkyreader',
    href: 'https://www.youtube.com/channel/UCfcF-jWjMl9DjC8rUCV9ZKA',
    thumbnail:
      'https://yt3.ggpht.com/ytc/AAUvwnhtOU3oQj5cFMdhhypLS-rFCRwLQqjvNhSOVodO=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        Alster Skyreader is a winter rush player who consistenty plays in the
        Heroes League and shares his matches on YouTube.
      </p>
    ),
  },
  {
    author: 'ThomasPetree',
    href: 'https://www.youtube.com/channel/UCFC5zu4eV9zUZb--IkPpGLg',
    thumbnail:
      'https://yt3.ggpht.com/ytc/AKedOLTIk8hjrz7w5xXpqtowNZWvtfOzmYVqP2ULSA=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        Playing since October 2018, Thomas Petree is a Stormbound veteran always
        looking for ways to get an edge in the game.
      </p>
    ),
  },
]

export default React.memo(function Videos(props) {
  const { css } = useFela()

  return (
    <Page
      title='Videos'
      description='Find here a list of popular and active Stormbound video content creators and their YouTube channels.'
      isEditorialContent
    >
      {chunk(VIDEOS, 2).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          {row.map((video, index, array) => (
            <React.Fragment key={video.author}>
              <Row.Column>
                <Spacing bottom='LARGER'>
                  <Row desktopOnly wideGutter>
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
