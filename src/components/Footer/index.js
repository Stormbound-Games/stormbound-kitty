import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import Icon from '../Icon'
import Only from '../Only'
import Row from '../Row'
import styles from './styles'

export default React.memo(function Footer(props) {
  const { css } = useFela()

  return (
    <footer className={css(styles.footer)} role='contentinfo'>
      <div className={css(styles.inner)}>
        <Row desktopOnly>
          <Row.Column>
            <span className={css(styles.heading)}>
              Dedicated to the community
            </span>
            <p className={css(styles.info)}>
              Stormbound Kitty is made with{' '}
              <Icon icon='heart' aria-label='love' extend={styles.icon} /> by
              Kitty and the vibrant Stormbound community.{' '}
              <Link to='/about'>Want to help?</Link>
            </p>
            <p className={css(styles.info)}>
              Official Stormbound game content courtesy of{' '}
              <a
                href='https://www.sheepyard.pl/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Sheepyard
              </a>
              .
            </p>
            <p className={css(styles.info)}>
              This site is hosted on{' '}
              <a
                href='https://github.com/KittySparkles/stormbound-kitty'
                target='_blank'
                rel='noopener noreferrer'
              >
                GitHub
              </a>{' '}
              and{' '}
              <a
                href='https://www.netlify.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                Netlify
              </a>
              .
            </p>
          </Row.Column>
          <Only.Desktop>
            <Row.Column>
              <Row desktopOnly>
                <Row.Column width='1/3'>
                  <span className={css(styles.heading)}>Stormbound</span>
                  <ul className={css(styles.list)}>
                    <li className={css(styles.item)}>
                      <a
                        href='https://paladinstudios.com/stormbound/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Official site
                      </a>
                    </li>
                    <li className={css(styles.item)}>
                      <a
                        href='https://twitter.com/stormboundccg'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Twitter
                      </a>
                    </li>
                    <li className={css(styles.item)}>
                      <a
                        href='https://www.facebook.com/stormboundccg'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Facebook
                      </a>
                    </li>
                    <li className={css(styles.item)}>
                      <a
                        href='https://www.instagram.com/stormboundccg/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Instagram
                      </a>
                    </li>
                    <li className={css(styles.item)}>
                      <a
                        href='https://store.steampowered.com/app/790600/Stormbound/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Steam
                      </a>
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
                      <Link to='/calculators/books'>Books Calculator</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/calculators/income'>Income Calculator</Link>
                    </li>
                    <li className={css(styles.item)}>
                      <Link to='/sim'>Battle sim</Link>
                    </li>

                    <li className={css(styles.item)}>
                      <Link to='/about'>Donate</Link>
                    </li>
                  </ul>
                </Row.Column>
                <Row.Column width='1/3'>
                  <span className={css(styles.heading)}>Community</span>
                  <ul className={css(styles.list)}>
                    <li className={css(styles.item)}>
                      <a
                        href='https://reddit.com/r/stormbound'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Reddit
                      </a>
                    </li>

                    <li className={css(styles.item)}>
                      <a
                        href='https://discord.gg/stormbound'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Discord
                      </a>
                    </li>

                    <li className={css(styles.item)}>
                      <a
                        href='https://stormboundkingdomwars.fandom.com'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Wiki
                      </a>
                    </li>

                    <li className={css(styles.item)}>
                      <a
                        href='https://www.youtube.com/results?search_query=stormbound&sp=CAI%253D'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Youtube
                      </a>
                    </li>

                    <li className={css(styles.item)}>
                      <a
                        href='https://www.twitch.tv/stormboundccg'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Twitch
                      </a>
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
