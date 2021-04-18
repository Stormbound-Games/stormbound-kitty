import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import debounce from 'lodash.debounce'
import decks from '../../data/decks'
import { CollectionContext } from '../CollectionProvider'
import BookmarkDeckButton from '../BookmarkDeckButton'
import Decks from '../Decks'
import EmptySearch from '../EmptySearch'
import HeaderBanner from '../HeaderBanner'
import ImportCollection from '../ImportCollection'
import Info from '../Info'
import LearnMoreIcon from '../LearnMoreIcon'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import SuggestionsFilters from '../DeckSuggestionsFilters'
import Title from '../Title'
import useViewportSize from '../../hooks/useViewportSize'
import sortDeckSuggestions from '../../helpers/sortDeckSuggestions'
import getDeckSearchDescription from '../../helpers/getDeckSearchDescription'
import getFactionFromDeckID from '../../helpers/getFactionFromDeckID'
import serialisation from '../../helpers/serialisation'
import './index.css'

class DeckSuggestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.getURLParameters(),
      name: '',
      order: this.props.hasDefaultCollection ? 'DATE' : 'FEASIBILITY',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setState(this.getURLParameters())
    }
  }

  getURLParameters = () => {
    const parameters = new URLSearchParams(window.location.search)
    const brawl = parameters.get('brawl') || '*'
    // If a specific Brawl is defined in URL parameters, set the category to
    // `BRAWL`, otherwise read the category from the URL parameters if defined.
    const category = brawl !== '*' ? 'BRAWL' : parameters.get('category') || '*'

    return {
      category,
      faction: parameters.get('faction') || '*',
      author: parameters.get('author') || '*',
      including: parameters.get('including') || null,
      // If the category is set to Brawl, read the specific Brawl from the URL
      // parameters if defined, or display all Brawl decks otherwise.
      brawl: category === 'BRAWL' ? brawl : '*',
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

    if (this.state.brawl === '*') parameters.delete('brawl')
    else parameters.set('brawl', this.state.brawl)

    this.props.history.replace('?' + parameters.toString())
  }

  updateCategory = category =>
    this.setState(
      state => ({ category, brawl: category !== 'BRAWL' ? '*' : state.brawl }),
      this.updateURLParameters
    )
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
        brawl: '*',
        order: this.props.hasDefaultCollection ? 'DATE' : 'FEASIBILITY',
      },
      this.updateURLParameters
    )
  updateIncluding = including =>
    this.setState({ including }, this.updateURLParameters)
  updateBrawl = brawl =>
    this.setState(
      state => ({ brawl, category: brawl !== '*' ? 'BRAWL' : state.category }),
      this.updateURLParameters
    )
  updateOrder = order => this.setState({ order })

  debouncedUpdateName = debounce(this.updateName, 500)

  matchesName = deck =>
    this.state.name === '' ||
    deck.name
      .toLowerCase()
      .replace('’', "'")
      .includes(this.state.name.toLowerCase())
  matchesFaction = deck =>
    this.state.faction === '*' ||
    getFactionFromDeckID(deck.id) === this.state.faction
  matchesCategory = deck =>
    this.state.category === '*' || deck.category === this.state.category
  matchesAuthor = deck =>
    this.state.author === '*' || deck.author === this.state.author
  matchesIncluding = deck =>
    !this.state.including ||
    serialisation.deck
      .deserialise(deck.id)
      .map(card => card.id)
      .includes(this.state.including)
  matchesBrawl = deck =>
    this.state.brawl === '*' || deck.brawl === this.state.brawl

  getDecks = () => {
    return (
      [...decks]
        // New decks are added at the end of the JSON file, but should be
        // displayed first, therefore we reverse the array before filtering and
        // sorting it.
        .reverse()
        .filter(this.matchesFaction)
        .filter(this.matchesCategory)
        .filter(this.matchesAuthor)
        .filter(this.matchesName)
        .filter(this.matchesIncluding)
        .filter(this.matchesBrawl)
        .sort(sortDeckSuggestions(this.props, this.state.order))
    )
  }

  resetFilters = () =>
    this.setState(
      {
        faction: '*',
        category: '*',
        author: '*',
        brawl: '*',
        name: '',
        including: null,
      },
      this.updateURLParameters
    )

  render() {
    const decks = this.getDecks()

    return (
      <>
        <HeaderBanner title='Popular Decks' />

        <Row desktopOnly wideGutter>
          <Row.Column width='1/3'>
            <Title>Filters</Title>

            <SuggestionsFilters
              {...this.state}
              updateCategory={this.updateCategory}
              updateFaction={this.updateFaction}
              updateAuthor={this.updateAuthor}
              updateName={this.debouncedUpdateName}
              updateIncluding={this.updateIncluding}
              updateBrawl={this.updateBrawl}
              updateOrder={this.updateOrder}
              resetFilters={this.resetFilters}
              formRef={this.formRef}
            />
            <div className='DeckSuggestions__order'>
              {this.state.order === 'FEASIBILITY' && (
                <Only.CustomCollection>
                  <Info icon='books' title='Your collection'>
                    Decks are ordered based on the cards in{' '}
                    <span className='Highlight'>your collection</span>. That
                    means decks you can make with your highest cards are at the
                    top of the list and decks containing cards you do not
                    possess are downranked.
                  </Info>
                </Only.CustomCollection>
              )}
              <Only.Desktop>
                <Only.DefaultCollection>
                  <Info
                    icon='books'
                    title={
                      <>
                        Your collection
                        <LearnMoreIcon anchor='#collection-benefits' />
                      </>
                    }
                    CTA={<ImportCollection />}
                  >
                    If you have already created your collection, you can import
                    it so decks are sorted by how well they would perform based
                    on the level of your cards.
                  </Info>
                </Only.DefaultCollection>
              </Only.Desktop>
            </div>
          </Row.Column>
          <Row.Column width='2/3'>
            <Title>Decks</Title>
            {decks.length > 0 ? (
              <Decks
                decks={decks}
                withBookmarking
                showUpgrades
                data-testid='deck-suggestion'
                actions={deck => [<BookmarkDeckButton {...deck} />]}
              />
            ) : (
              <EmptySearch
                title='No Decks found'
                resetFilters={this.resetFilters}
              />
            )}
          </Row.Column>
        </Row>

        <PageMeta
          title='Popular Decks'
          description={getDeckSearchDescription(this.state)}
        />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  viewportWidth: useViewportSize().viewportWidth,
  history: useHistory(),
  location: useLocation(),
  ...React.useContext(CollectionContext),
}))(DeckSuggestions)
