import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Icon from '../Icon'
import PageMeta from '../PageMeta'
import Row from '../Row'
import './index.css'

export const VIDEOS = [
  {
    author: 'ThePopularEagle',
    href:
      'https://www.youtube.com/playlist?list=PLjem3bM4g6dU1c2PZnJcgYWZBd9eVMFpd',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJzYAkFSZZeww98CuTj3X5naRy3IK2x3rlWhCKtP=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        The Popular Eagle (TPE for short) is a long time Stormbound Youtuber,
        having created content and guides since as far back as 2018. TPE is also
        on{' '}
        <a
          href='https://twitter.com/ThePopularEagle'
          target='_blank'
          rel='noopener noreferrer'
        >
          Twitter
        </a>{' '}
        and{' '}
        <a
          href='https://discord.gg/zmkuDU'
          target='_blank'
          rel='noopener noreferrer'
        >
          Discord
        </a>
        .
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
    author: 'Arasanu',
    href: 'https://www.youtube.com/channel/UCC1mDPjyQ3OhC9MfTIBsI-g',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJxeOkPQKoVQn0OZbHMtCwuhNqb8BcUXviRBLhT-hw=s288-c-k-c0xffffffff-no-rj-mo',
    description: (
      <p>
        Arasanu is a popular Stormbound Youtuber regularly creating new videos.
      </p>
    ),
  },
  {
    author: 'LazyLotazo',
    href:
      'https://www.youtube.com/playlist?list=PLRZ8OyLIb3tOsqGHvXsGMEEFa4kDoKIsm',
    thumbnail:
      'https://yt3.ggpht.com/a/AATXAJyt5PB_hzgoV8QYGG-JZKonctwJANaxYMpBqz4_Mw=s176-c-k-c0x00ffffff-no-rj',
    description: (
      <p>
        LazyLotazo is a popular Stormbound Youtuber regularly creating new
        videos.
      </p>
    ),
  },
]

export default React.memo(function Videos(props) {
  return (
    <Article title='Videos'>
      <Article.Narrow>
        {VIDEOS.map(video => (
          <section key={video.author} className='Video'>
            <Row desktopOnly wideGutter>
              <Row.Column width='1/3'>
                <img
                  src={video.thumbnail}
                  alt={`${video.author}’s avatar`}
                  className='Video__image'
                />
              </Row.Column>
              <Row.Column width='2/3' style={{ justifyContent: 'center' }}>
                <h2 className='Video__title'>
                  <Link to={`/member/${video.author}`}>{video.author}</Link>
                </h2>
                {video.description}
                <p>
                  <Icon icon='arrow-right' className='Video__icon' />
                  <a
                    href={video.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='Video__link'
                  >
                    Visit {video.author}’s channel
                  </a>
                </p>
              </Row.Column>
            </Row>
          </section>
        ))}
      </Article.Narrow>

      <PageMeta
        title='Videos'
        description='Find here a list of popular and active Stormbound video content creators and their YouTube channels.'
      />
    </Article>
  )
})
