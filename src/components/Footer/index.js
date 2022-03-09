import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Image from '~/components/Image'
import Icon from '~/components/Icon'
import Only from '~/components/Only'
import PoweredBySanity from '~/components/PoweredBySanity'
import Row from '~/components/Row'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function Footer(props) {
  const { css } = useFela()

  return (
    <footer className={css(styles.footer)} role='contentinfo'>
      <div className={css(styles.inner)}>
        <Row isDesktopOnly>
          <Row.Column>
            <span className={css(styles.heading)}>
              Dedicated to the community
            </span>
            <p className={css(styles.info)}>
              Stormbound-Kitty is made with{' '}
              <Icon icon='heart' extend={styles.icon} />
              <VisuallyHidden>love</VisuallyHidden> by Kitty and the vibrant
              Stormbound community. <Link to='/about'>Want to help?</Link>
            </p>
            <p className={css(styles.info)}>
              Official Stormbound game content courtesy of{' '}
              <Link href='https://www.sheepyard.pl/'>Sheepyard</Link>.
            </p>
            <p className={css({ medium: { display: 'flex' } })}>
              <Link
                href='https://vercel.com/?utm_source=stormbound&utm_campaign=oss'
                hideNewTabIndicator
                extend={styles.logoLink}
              >
                <Image
                  src='https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg'
                  alt='Powered by Vercel'
                  extend={styles.vercel}
                  width={154}
                  height={32}
                  lazy
                />
              </Link>
              <Link
                href='https://www.sanity.io'
                hideNewTabIndicator
                extend={styles.logoLink}
              >
                <PoweredBySanity />
              </Link>
            </p>
          </Row.Column>
          <Only.Desktop>
            <Row.Column>
              <Row isDesktopOnly>
                <Row.Column width='1/3'>
                  <span className={css(styles.heading)}>Stormbound</span>
                  <ul className={css(styles.list)}>
                    <li className={css(styles.item)}>
                      <Link href='https://paladinstudios.com/stormbound/'>
                        Official site
                      </Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link href='https://twitter.com/stormboundccg'>
                        Twitter
                      </Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link href='https://www.facebook.com/stormboundccg'>
                        Facebook
                      </Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link href='https://www.instagram.com/stormboundccg/'>
                        Instagram
                      </Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link href='https://store.steampowered.com/app/790600/Stormbound/'>
                        Steam
                      </Link>
                    </li>
                  </ul>
                </Row.Column>
                <Row.Column width='1/3'>
                  <span className={css(styles.heading)}>Kitty</span>
                  <ul className={css(styles.list)}>
                    <li className={css(styles.item)}>
                      <Link to='/faq'>FAQ</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/fan-kit'>Fan-kit</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/deck/featured'>Decks</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/about'>Donate</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link href='https://github.com/sheepyard/stormbound-kitty'>
                        GitHub
                      </Link>
                    </li>
                  </ul>
                </Row.Column>
                <Row.Column width='1/3'>
                  <span className={css(styles.heading)}>Community</span>
                  <ul className={css(styles.list)}>
                    <li className={css(styles.item)}>
                      <Link href='https://reddit.com/r/stormbound'>Reddit</Link>
                    </li>

                    <li className={css(styles.item)}>
                      <Link href='https://discord.gg/stormbound'>Discord</Link>
                    </li>

                    <li className={css(styles.item)}>
                      <Link href='https://stormboundkingdomwars.fandom.com'>
                        Wiki
                      </Link>
                    </li>

                    <li className={css(styles.item)}>
                      <Link href='https://www.youtube.com/results?search_query=stormbound&sp=CAI%253D'>
                        Youtube
                      </Link>
                    </li>

                    <li className={css(styles.item)}>
                      <Link href='https://www.twitch.tv/stormboundccg'>
                        Twitch
                      </Link>
                    </li>
                  </ul>
                </Row.Column>
              </Row>
            </Row.Column>
          </Only.Desktop>
        </Row>
      </div>
    </footer>
  )
})
