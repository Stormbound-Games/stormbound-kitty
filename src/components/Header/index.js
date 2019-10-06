import React, { Fragment } from 'react'
import { Link, Match } from '@reach/router'
import { FACTIONS } from '../../constants/game'
import BattleSimNav from '../BSNav'
import DeckBuilderNav from '../DBNav'
import CardBuilderNav from '../CBNav'
import ListBuilderNav from '../TLBNav'
import GuidesNav from '../GuidesNav'
import StoriesNav from '../StoriesNav'
import Icon from '../Icon'
import TogglableContent from '../TogglableContent'
import useViewportWidth from '../../helpers/useViewportWidth'
import {
  getLooseActiveLink,
  getStrictActiveLink
} from '../../helpers/getActiveLink'
import './index.css'

const Header = props => {
  const viewportWidth = useViewportWidth()
  const [isExpanded, expand] = React.useState(false)

  return (
    <header role="banner" className="Header">
      <TogglableContent
        id="navigation"
        isExpanded={viewportWidth > 700 ? true : isExpanded}
        renderToggle={toggleProps =>
          viewportWidth > 700 ? null : (
            <Fragment>
              <button
                {...toggleProps}
                type="button"
                onClick={() => expand(s => !s)}
                className="Header__toggle"
                title={isExpanded ? 'Close menu' : 'Open menu'}
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              >
                ☰
              </button>
              <Link to="/" className="Header__title">
                Stormbound Kitty
              </Link>
            </Fragment>
          )
        }
      >
        <nav className="Header__nav">
          <ul className="Header__list">
            <li className="Header__item Header__item--desktop">
              <Link getProps={getStrictActiveLink} to="/">
                <Icon icon="home" /> Home
              </Link>
            </li>
            <li className="Header__item">
              <Link getProps={getLooseActiveLink} to="/sim">
                <Icon icon="sword" /> Battle Sim
              </Link>
            </li>
            <li className="Header__item">
              <Link getProps={getLooseActiveLink} to="/deck">
                <Icon icon="stack" /> Deck builder
              </Link>
            </li>
            <li className="Header__item">
              <Link getProps={getLooseActiveLink} to="/card">
                <Icon icon="wand" /> Card builder
              </Link>
            </li>
            <li className="Header__item">
              <Link getProps={getLooseActiveLink} to="/list">
                <Icon icon="template" /> List Builder
              </Link>
            </li>
            <li className="Header__item">
              <Link getProps={getLooseActiveLink} to="/stories">
                <Icon icon="quill" /> Stories
              </Link>
            </li>
            <li className="Header__item">
              <Link getProps={getLooseActiveLink} to="/guides">
                <Icon icon="compass" /> Guides
              </Link>
            </li>
          </ul>
        </nav>

        <Match path="/sim/*">
          {({ match }) => {
            if (!match) return null

            const [id] = match['*'].split('/')
            const isStaticPage = ['puzzles'].includes(id)

            return match && <BattleSimNav simId={isStaticPage ? '' : id} />
          }}
        </Match>

        <Match path="/deck/*">
          {({ match }) => {
            if (!match) return null

            const [id] = match['*'].split('/')
            const isStaticPage = [
              'collection',
              'suggestions',
              'guide',
              'tier'
            ].includes(id)

            return match && <DeckBuilderNav deckId={isStaticPage ? '' : id} />
          }}
        </Match>

        <Match path="/card/*">
          {({ match }) => {
            if (!match) return null

            const [id] = match['*'].split('/')
            const isStaticPage = ['contest', 'stories'].includes(id)

            return match && <CardBuilderNav cardId={isStaticPage ? '' : id} />
          }}
        </Match>

        <Match path="/list/*">
          {({ match }) => {
            if (!match) return null

            const [id] = match['*'].split('/')

            return match && <ListBuilderNav listId={id} />
          }}
        </Match>

        <Match path="/guides/*">
          {({ match }) => {
            if (!match) return null

            return match && <GuidesNav />
          }}
        </Match>

        <Match path="/stories/*">
          {({ match }) => {
            if (!match) return null

            const [id] = match['*'].split('/')
            const isStaticPage = Object.keys(FACTIONS).includes(id)

            return match && <StoriesNav storyId={isStaticPage ? '' : id} />
          }}
        </Match>
      </TogglableContent>
    </header>
  )
}

export default Header
