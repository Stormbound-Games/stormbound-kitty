import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import hookIntoProps from 'hook-into-props'
import debounce from 'lodash.debounce'
import decks from '../../data/decks'
import { CollectionContext } from '../CollectionProvider'
import Column from '../Column'
import EmptySearch from '../EmptySearch'
import Loader from '../Loader'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import FeaturedDeck from '../FeaturedDeck'
import SuggestionsFilters from '../DeckBuilderSuggestionsFilters'
import Title from '../Title'
import useViewportWidth from '../../hooks/useViewportWidth'
import chunk from '../../helpers/chunk'
import sortDeckSuggestions from '../../helpers/sortDeckSuggestions'
import { deserialiseDeck } from '../../helpers/deserialise'
import './index.css'

class DeckBuilderSuggestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.getURLParameters(),
      name: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setState(this.getURLParameters())
    }
  }

  getURLParameters = () => {
    const parameters = new URLSearchParams(window.location.search)

    return {
      category: parameters.get('category') || '*',
      faction: parameters.get('faction') || '*',
      author: parameters.get('author') || '*',
      including: parameters.get('including') || null,
    }
  }

  updateURLParameters = event => {
    const parameters = new URLSearchParams(window.location.search)

    if (this.state.category === '*') parameters.delete('category')
    else parameters.set('category', this.state.category)

    if (this.state.faction === '*') parameters.delete('faction')
    else parameters.set('faction', this.state.faction)

    if (this.state.author === '*') parameters.delete('author')
    else parameters.set('author', this.state.author)

    if (this.state.including === null) parameters.delete('including')
    else parameters.set('including', this.state.including)

    this.props.history.replace('?' + parameters.toString())
  }

  updateCategory = category =>
    this.setState({ category }, this.updateURLParameters)
  updateFaction = faction =>
    this.setState({ faction }, this.updateURLParameters)
  updateAuthor = author => this.setState({ author }, this.updateURLParameters)
  updateName = name =>
    this.setState(
      {
        name,
        category: '*',
        faction: '*',
        author: '*',
        including: null,
      },
      this.updateURLParameters
    )
  updateIncluding = including =>
    this.setState({ including }, this.updateURLParameters)
  debouncedUpdateName = debounce(this.updateName, 500)

  matchesName = deck =>
    this.state.name === '' ||
    deck.name
      .toLowerCase()
      .replace('’', "'")
      .includes(this.state.name.toLowerCase())
  matchesFaction = deck =>
    this.state.faction === '*' || deck.faction === this.state.faction
  matchesCategory = deck =>
    this.state.category === '*' || deck.category === this.state.category
  matchesAuthor = deck =>
    this.state.author === '*' || deck.author === this.state.author
  matchesIncluding = deck =>
    !this.state.including ||
    deserialiseDeck(deck.id)
      .map(card => card.id)
      .includes(this.state.including)
  getDecks = () => {
    return decks
      .filter(this.matchesFaction)
      .filter(this.matchesCategory)
      .filter(this.matchesAuthor)
      .filter(this.matchesName)
      .filter(this.matchesIncluding)
      .sort(sortDeckSuggestions(this.props))
  }

  resetFilters = () =>
    this.setState({
      faction: '*',
      category: '*',
      author: '*',
      name: '',
      including: null,
    })

  render() {
    const decks = this.getDecks()

    return (
      <>
        <h1 className='VisuallyHidden'>Deck Suggestions</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <Title>Filters</Title>

            <SuggestionsFilters
              {...this.state}
              updateCategory={this.updateCategory}
              updateFaction={this.updateFaction}
              updateAuthor={this.updateAuthor}
              updateName={this.debouncedUpdateName}
              updateIncluding={this.updateIncluding}
              resetFilters={this.resetFilters}
              formRef={this.formRef}
            />
            <p className='DeckBuilderSuggestions__order'>
              <Only.CustomCollection>
                Decks are ordered based on the cards in{' '}
                <span className='Highlight'>your collection</span>. That means
                decks you can make with your highest cards are at the top of the
                list and decks containing cards you do not possess are
                downranked.
              </Only.CustomCollection>
              <Only.DefaultCollection>
                If you have already{' '}
                <Link to='/collection'>created your collection</Link>, you can
                import it so decks are ordered based on whether or not you can
                compose them, and how well they perform based on the level of
                your cards.
              </Only.DefaultCollection>
            </p>
          </Column>
          <Column width={66}>
            <Title>Decks</Title>
            {decks.length > 0 ? (
              chunk(decks, 2).map(([a, b]) => (
                <LazyLoad
                  offset={100}
                  resize
                  placeholder={<Loader hideLabel />}
                  height={this.props.viewportWidth > 700 ? 280 : 560}
                  key={a.id}
                >
                  <Row desktopOnly key={a.id}>
                    <Column>
                      <FeaturedDeck
                        {...a}
                        onClick={card =>
                          this.props.history.push(
                            '/card/' + card.id + '/display'
                          )
                        }
                      />
                    </Column>
                    <Column>
                      {b ? (
                        <FeaturedDeck
                          {...b}
                          onClick={card =>
                            this.props.history.push(
                              '/card/' + card.id + '/display'
                            )
                          }
                        />
                      ) : null}
                    </Column>
                  </Row>
                </LazyLoad>
              ))
            ) : (
              <EmptySearch
                title='No Decks found'
                resetFilters={this.resetFilters}
              />
            )}
          </Column>
        </Row>

        <PageMeta
          title='Deck Suggestions'
          description='Decks suggested by the Stormbound community.'
        />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  viewportWidth: useViewportWidth(),
  history: useHistory(),
  location: useLocation(),
  ...React.useContext(CollectionContext),
}))(DeckBuilderSuggestions)
