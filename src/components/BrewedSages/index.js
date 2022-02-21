import React from 'react'
import { useFela } from 'react-fela'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Notice from '~/components/Notice'
import Page from '~/components/Page'
import Spacing from '~/components/Spacing'
import Sparkles from '~/components/Sparkles'
import Teasers from '~/components/Teasers'
import Title from '~/components/Title'
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
  const items = props.episodes
    .slice(0)
    .reverse()
    .map((entry, index) => ({
      ...entry,
      card: {
        ...CARD,
        mana: props.episodes.length - index,
        ability: entry.excerpt,
      },
    }))

  return (
    <Page
      title='Brewed Sages'
      description='The Brewed Sages is the first Stormbound podcast, by Freeloader, Subaiku and ThomasPetree'
      authors={['Freeloader', 'Subaiku', 'ThomasPetree']}
      background='/assets/images/banners/environment_shadowfen.png'
      withAvif
      isEditorialContent
    >
      <Page.Narrow>
        <p>
          The Brewed Sages is the first Stormbound podcast, by{' '}
          <Link to='/members/freeloader'>Freeloader</Link>,{' '}
          <Link to='/members/subaiku'>Subaiku</Link>, and{' '}
          <Link to='/members/thomaspetree'>ThomasPetree</Link>. They gather
          around the mic on a regular basis to discuss everything Stormbound.
          Tune in, and enjoy the show!
        </p>

        <Info icon='gift' title='Get some merch!'>
          <p>
            Looking to get that special someone a gift this holiday? Check out
            the new{' '}
            <Link href='https://www.zazzle.com/store/the_brewed_sages/products'>
              Brewed Sages Merchandise Store
            </Link>
            ! All proceeds (which are expected to derive entirely from our three
            spouses) go to offset our hosting costs.
          </p>
        </Info>

        <Spacing vertical='LARGER'>
          <div className={css(styles.container)}>
            <Sparkles>
              <Link extend={styles.cta} href='https://gumroad.com/l/KuFWl'>
                Support Brewed Sages
              </Link>
            </Sparkles>
          </div>
        </Spacing>

        <Notice icon='quill'>
          Be sure to check their{' '}
          <Link
            href='https://rb.gy/mnvj5n'
            target='_blank'
            rel='noopener noreferrer'
          >
            meta report spreadsheet
          </Link>{' '}
          and follow{' '}
          <Link
            href='https://twitter.com/BrewedSages'
            target='_blank'
            rel='noopener noreferrer'
          >
            @BrewedSages on Twitter
          </Link>{' '}
          to avoid missing any new episode!
        </Notice>
      </Page.Narrow>

      <Spacing vertical='LARGER'>
        <Title>Episodes</Title>
        <Teasers items={items} />
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
          className={css({ margin: 'var(--s-base) auto', border: 'none' })}
          width='100%'
          height='400'
        ></iframe>
      </Page.Narrow>
    </Page>
  )
})
