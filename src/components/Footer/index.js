import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import Icon from '../Icon'
import Only from '../Only'
import Row from '../Row'
import './index.css'

export default React.memo(function Footer(props) {
  return (
    <footer className='Footer' role='contentinfo'>
      <div className='Footer__inner'>
        <Row desktopOnly>
          <Column>
            <span className='Footer__heading'>Dedicated to the community</span>
            <p className='Footer__info'>
              Stormbound Kitty is made with{' '}
              <Icon icon='heart' aria-label='love' className='Footer__icon' />{' '}
              by Kitty and the vibrant Stormbound community.{' '}
              <Link to='/donate'>Want to help?</Link>
            </p>
            <p className='Footer__info'>
              Official Stormbound game content courtesy of{' '}
              <a
                href='https://paladinstudios.com/stormbound/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Paladin Studios
              </a>{' '}
              and{' '}
              <a
                href='https://www.sheepyard.pl/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Sheepyard
              </a>
              .
            </p>
            <p className='Footer__info'>
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
          </Column>
          <Column>
            <Row desktopOnly>
              <Column width='1/3'>
                <Only.Desktop>
                  <span className='Footer__heading'>Stormbound</span>
                  <ul className='Footer__list'>
                    <li className='Footer__item'>
                      <a
                        href='https://paladinstudios.com/stormbound/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Official site
                      </a>
                    </li>
                    <li className='Footer__item'>
                      <a
                        href='https://twitter.com/stormboundccg'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Twitter
                      </a>
                    </li>
                    <li className='Footer__item'>
                      <a
                        href='https://www.facebook.com/stormboundccg'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Facebook
                      </a>
                    </li>
                    <li className='Footer__item'>
                      <a
                        href='https://www.instagram.com/stormboundccg/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Instagram
                      </a>
                    </li>
                    <li className='Footer__item'>
                      <a
                        href='https://store.steampowered.com/app/790600/Stormbound/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Steam
                      </a>
                    </li>
                  </ul>
                </Only.Desktop>
              </Column>
              <Column width='1/3'>
                <span className='Footer__heading'>Kitty</span>
                <ul className='Footer__list'>
                  <li className='Footer__item'>
                    <Link to='/faq'>FAQ</Link>
                  </li>
                  <li className='Footer__item'>
                    <Link to='/collection/books'>Books Calculator</Link>
                  </li>
                  <li className='Footer__item'>
                    <Link to='/quest'>Quest Builder</Link>
                  </li>
                  <li className='Footer__item'>
                    <Link to='/sim'>Battle sim</Link>
                  </li>

                  <li className='Footer__item'>
                    <Link to='/donate'>Donate</Link>
                  </li>
                </ul>
              </Column>
              <Column width='1/3'>
                <Only.Desktop>
                  <span className='Footer__heading'>Community</span>
                  <ul className='Footer__list'>
                    <li className='Footer__item'>
                      <a
                        href='https://reddit.com/r/stormbound'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Reddit
                      </a>
                    </li>

                    <li className='Footer__item'>
                      <a
                        href='https://discord.gg/stormbound'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Discord
                      </a>
                    </li>

                    <li className='Footer__item'>
                      <a
                        href='https://stormboundkingdomwars.gamepedia.com/Stormbound:_Kingdom_Wars_Wiki'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Wiki
                      </a>
                    </li>

                    <li className='Footer__item'>
                      <a
                        href='https://www.youtube.com/results?search_query=stormbound&sp=CAI%253D'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Youtube
                      </a>
                    </li>

                    <li className='Footer__item'>
                      <a
                        href='https://www.twitch.tv/stormboundccg'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Twitch
                      </a>
                    </li>
                  </ul>
                </Only.Desktop>
              </Column>
            </Row>
          </Column>
        </Row>
      </div>
    </footer>
  )
})
