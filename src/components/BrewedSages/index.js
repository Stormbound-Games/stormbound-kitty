import React from 'react'
import Article from '../Article'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'
import Title from '../Title'
import chunk from '../../helpers/chunk'
import useViewportWidth from '../../hooks/useViewportWidth'

const CARD = {
  image: 'brewed_sages.png',
  type: 'unit',
  name: 'Brewed Sages',
  race: 'Podcast',
  faction: 'shadowfen',
}
const EPISODES = [
  {
    title: 'The Beginning',
    meta: '51 minutes and 56 seconds',
    href:
      'https://freeloader.podbean.com/e/episode-1-the-beginning-1599101201/',
    excerpt:
      'Find out where Freeloader and Subaiku came from, and how they see the fun and challenging game that is Stormbound.',
  },
  {
    title: 'Midsummer Buffs',
    meta: '51 minutes and 34 seconds',
    href: 'https://freeloader.podbean.com/e/episode-2-midsummer-buffs/',
    excerpt:
      'Sheepyard has gifted us some free content to discus. We oblige as only Freeloaders can!',
  },
  {
    title: 'OK, Boomers',
    meta: '41 minutes and 42 seconds',
    href: 'https://www.podbean.com/media/share/pb-kjsah-ebb8af',
    excerpt:
      'Freeloader and Subaiku are discussing some of the strongest elder cards in Stormbound. Who dodged the nerf hammer? Should they be nerfed now? Tune in to find out!',
  },
]

export default React.memo(function BrewedSages(props) {
  const viewportWidth = useViewportWidth()

  return (
    <Article
      title={viewportWidth < 700 ? 'Brewed Sages' : 'Brewed Sages Podcast'}
      authors={['Freeloader', 'Subaiku']}
      background='/assets/images/banners/environment_shadowfen.png'
    >
      <p>
        The Brewed Sages is the first Stormbound podcast, by Freeloader and
        Subaiku. They gather around the mic on a regular basis to discuss
        everything Stormbound. Tune in, and enjoy the show!
      </p>

      <Title>Episodes</Title>
      <div className='Article__fullwidth'>
        {chunk(EPISODES, 3).map((row, index) => (
          <Row desktopOnly key={index}>
            <Column width='1/3'>
              {row[0] && (
                <Teaser
                  {...row[0]}
                  card={{
                    ...CARD,
                    mana: (index + 1) * 1,
                    ability: row[0].excerpt,
                  }}
                />
              )}
            </Column>
            <Column width='1/3'>
              {row[1] && (
                <Teaser
                  {...row[1]}
                  card={{
                    ...CARD,
                    mana: (index + 1) * 2,
                    ability: row[1].excerpt,
                  }}
                />
              )}
            </Column>
            <Column width='1/3'>
              {row[2] && (
                <Teaser
                  {...row[2]}
                  card={{
                    ...CARD,
                    mana: (index + 1) * 3,
                    ability: row[2].excerpt,
                  }}
                />
              )}
            </Column>
          </Row>
        ))}
      </div>

      <Title>Listening</Title>

      <p>There are many ways for you to listen to Brewed Sages podcast:</p>
      <ul>
        <li>
          On{' '}
          <a
            href='https://freeloader.podbean.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Podbean,
          </a>
        </li>
        <li>
          On{' '}
          <a
            href='https://podcasts.apple.com/us/podcast/the-brewed-sages/id1530313986'
            target='_blank'
            rel='noopener noreferrer'
          >
            Apple Podcasts,
          </a>
        </li>
        <li>
          On{' '}
          <a
            href='https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL2ZyZWVsb2FkZXIvZmVlZC54bWw%3D'
            target='_blank'
            rel='noopener noreferrer'
          >
            Google Podcasts,
          </a>
        </li>
        <li>
          On{' '}
          <a
            href='https://open.spotify.com/show/0zPLDrVZesb2Xr8RzVNfmF?nd=1'
            target='_blank'
            rel='noopener noreferrer'
          >
            Spotify,
          </a>
        </li>
        <li>
          On{' '}
          <a
            href='https://tunein.com/podcasts/Media--Entertainment-Podcasts/The-Brewed-Sages-p1363569/?topicId=157030692'
            target='_blank'
            rel='noopener noreferrer'
          >
            TuneIn,
          </a>
        </li>
        <li>
          Or with the player below (from which you can also download the
          episodes as mp3 to consume them the way you want).
        </li>
      </ul>

      <iframe
        src='https://www.podbean.com/media/player/multi?playlist=http%3A%2F%2Fplaylist.podbean.com%2F9522621%2Fplaylist_multi.xml&amp;vjs=1&amp;size=430&amp;skin=1&amp;episode_list_bg=%23ffffff&amp;bg_left=%23427552&amp;bg_mid=%23689174&amp;bg_right=%23427552&amp;podcast_title_color=%23c4c4c4&amp;episode_title_color=%23ffffff&amp;auto=0&amp;share=1&amp;fonts=Helvetica&amp;download=1&amp;rtl=0&amp;show_playlist_recent_number=10'
        title='The Brewed Sages'
        scrolling='no'
        style={{ margin: '1em auto', border: ' none' }}
        width='100%'
        height='400'
      ></iframe>

      <PageMeta
        author='Freeloader, Subaiku'
        title='Brewed Sages Podcast'
        description='The Brewed Sages is the first Stormbound podcast, by Freeloader and
      Subaiku'
      />
    </Article>
  )
})
