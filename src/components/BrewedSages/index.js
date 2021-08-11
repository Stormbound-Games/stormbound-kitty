import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import Page from '../Page'
import Row from '../Row'
import Spacing from '../Spacing'
import Sparkles from '../Sparkles'
import Teaser from '../Teaser'
import Title from '../Title'
import chunk from '../../helpers/chunk'
import podcasts from '../../data/podcasts'
import styles from './styles'

const CARD = {
  image: 'brewed_sages.png',
  type: 'unit',
  name: 'Brewed Sages',
  race: 'Podcast',
  faction: 'shadowfen',
}

export default React.memo(function BrewedSages(props) {
  const { css } = useFela()

  return (
    <Page
      title='Brewed Sages'
      description='The Brewed Sages is the first Stormbound podcast, by Freeloader and
    Subaiku'
      authors={['Freeloader', 'Subaiku']}
      background='/assets/images/banners/environment_shadowfen.png'
      withAvif
      isEditorialContent
    >
      <Page.Narrow>
        <p>
          The Brewed Sages is the first Stormbound podcast, by{' '}
          <Link to='/member/Freeloader'>Freeloader</Link>, and{' '}
          <Link to='/member/Subaiku'>Subaiku</Link>. They gather around the mic
          on a regular basis to discuss everything Stormbound. Tune in, and
          enjoy the show!
        </p>

        <Spacing vertical='LARGER'>
          <div className={css(styles.container)}>
            <Sparkles>
              <Link extend={styles.cta} href='https://gumroad.com/l/KuFWl'>
                Support Brewed Sages
              </Link>
            </Sparkles>
          </div>
        </Spacing>
      </Page.Narrow>

      <Spacing vertical='LARGER'>
        <Title>Episodes</Title>
        {chunk(podcasts.slice(0).reverse(), 3).map((row, index) => (
          <Row desktopOnly key={index}>
            <Row.Column width='1/3'>
              {row[0] && (
                <Teaser
                  {...row[0]}
                  card={{
                    ...CARD,
                    mana: podcasts.length - index * 3,
                    ability: row[0].excerpt,
                  }}
                />
              )}
            </Row.Column>
            <Row.Column width='1/3'>
              {row[1] && (
                <Teaser
                  {...row[1]}
                  card={{
                    ...CARD,
                    mana: podcasts.length - index * 3 - 1,
                    ability: row[1].excerpt,
                  }}
                />
              )}
            </Row.Column>
            <Row.Column width='1/3'>
              {row[2] && (
                <Teaser
                  {...row[2]}
                  card={{
                    ...CARD,
                    mana: podcasts.length - index * 3 - 2,
                    ability: row[2].excerpt,
                  }}
                />
              )}
            </Row.Column>
          </Row>
        ))}
      </Spacing>

      <Page.Narrow>
        <Title>Listening</Title>

        <p>There are many ways for you to listen to Brewed Sages podcast:</p>
        <ul>
          <li>
            On <Link href='https://freeloader.podbean.com/'>Podbean,</Link>
          </li>
          <li>
            On{' '}
            <Link href='https://podcasts.apple.com/us/podcast/the-brewed-sages/id1530313986'>
              Apple Podcasts,
            </Link>
          </li>
          <li>
            On{' '}
            <Link href='https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL2ZyZWVsb2FkZXIvZmVlZC54bWw%3D'>
              Google Podcasts,
            </Link>
          </li>
          <li>
            On{' '}
            <Link href='https://open.spotify.com/show/0zPLDrVZesb2Xr8RzVNfmF?nd=1'>
              Spotify,
            </Link>
          </li>
          <li>
            On{' '}
            <Link href='https://tunein.com/podcasts/Media--Entertainment-Podcasts/The-Brewed-Sages-p1363569/?topicId=157030692'>
              TuneIn,
            </Link>
          </li>
          <li>
            On{' '}
            <Link href='https://www.pandora.com/podcast/the-brewed-sages-of-stormbound/PC:47351'>
              Pandora,
            </Link>
          </li>
          <li>
            On{' '}
            <Link href='https://www.youtube.com/channel/UCTEax9JOxhsvDkY8rP-hqJg'>
              YouTube,
            </Link>
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
          className={css({ margin: '1em auto', border: ' none' })}
          width='100%'
          height='400'
        ></iframe>
      </Page.Narrow>
    </Page>
  )
})
