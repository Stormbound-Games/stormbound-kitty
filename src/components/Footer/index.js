import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import Row from '../Row'
import './index.css'

const Footer = props => (
  <footer className='Footer' role='contentinfo'>
    <div className='Footer__inner'>
      <Row desktopOnly>
        <Column>
          <span className='Footer__heading'>Dedicated to the community</span>
          <p className='Footer__info'>
            Stormbound Kitty is made with{' '}
            <span aria-label='love' role='img'>
              💖
            </span>{' '}
            by Kitty and the vibrant Stormbound community.{' '}
            <a
              href='https://gum.co/stormbound-kitty'
              target='_blank'
              rel='noopener noreferrer'
            >
              Buy me a coffee?
            </a>
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
        </Column>
        <Column>
          <Row desktopOnly>
            <Column width={33}>
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
                    href='https://store.steampowered.com/app/790600/Stormbound/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Steam
                  </a>
                </li>
                <li className='Footer__item'>
                  <a
                    href='https://play.google.com/store/apps/details?id=com.kongregate.mobile.stormbound.google&hl=en'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Google Play
                  </a>
                </li>
                <li className='Footer__item'>
                  <a
                    href='https://itunes.apple.com/ph/app/stormbound/id1234446615'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Apple Store
                  </a>
                </li>
              </ul>
            </Column>
            <Column width={33}>
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
                  <Link to='/deck/suggestions'>Suggested Decks</Link>
                </li>
                <li className='Footer__item'>
                  <Link to='/sim/puzzles'>Puzzles</Link>
                </li>
                <li className='Footer__item'>
                  <a
                    href='https://gum.co/stormbound-kitty'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Donate
                  </a>
                </li>
              </ul>
            </Column>
            <Column width={33}>
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
                    href='https://www.kongregate.com/forums/1001068-stormbound'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Kongregate
                  </a>
                </li>

                <li className='Footer__item'>
                  <a
                    href='https://github.com/KittySparkles/stormbound-kitty'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    GitHub
                  </a>
                </li>

                <li className='Footer__item'>
                  <a
                    href='https://dashboard.cypress.io/projects/h321g2/runs'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Status
                  </a>
                </li>
              </ul>
            </Column>
          </Row>
        </Column>
      </Row>
    </div>
  </footer>
)

export default Footer
