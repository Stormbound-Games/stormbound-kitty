import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import PoweredBySanity from '~/components/PoweredBySanity'
import PoweredByVercel from '~/components/PoweredByVercel'
import PoweredByCuttly from '~/components/PoweredByCuttly'
import PoweredByCypress from '~/components/PoweredByCypress'
import Icon from '~/components/Icon'
import Only from '~/components/Only'
import Row from '~/components/Row'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function Footer() {
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
              Stormbound community. <Link to='/contribute'>Want to help?</Link>
            </p>
            <p className={css(styles.info)}>
              Official Stormbound game content courtesy of{' '}
              <Link href='https://www.sheepyard.pl/'>Sheepyard</Link>.
            </p>
            <p className={css(styles.sponsors)}>
              <PoweredBySanity />
              <PoweredByVercel />
              <PoweredByCuttly />
              <PoweredByCypress />
            </p>
          </Row.Column>
          <Only.Desktop>
            <Row.Column>
              <Row isDesktopOnly>
                <Row.Column width='1/3'>
                  <span className={css(styles.heading)}>Stormbound</span>
                  <ul className={css(styles.list)}>
                    <li className={css(styles.item)}>
                      <Link href='https://sheepyard.pl/'>Sheepyard</Link>
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
                    <li className={css(styles.item)}>
                      <Link href='https://stormbound.checklyhq.com/'>
                        Service Status
                      </Link>
                    </li>
                  </ul>
                </Row.Column>
                <Row.Column width='1/3'>
                  <span className={css(styles.heading)}>Kitty</span>
                  <ul className={css(styles.list)}>
                    <li className={css(styles.item)}>
                      <Link to='/about'>About</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/contribute'>Contribute</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/faq'>FAQ</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/fan-kit'>Fan-kit</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/releases'>Patch notes</Link>
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
                      <Link to='/brewed-sages'>Brewed Sages</Link>
                    </li>

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
