import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import hookIntoProps from 'hook-into-props'
import querystring from 'querystring'
import debounce from 'lodash.debounce'
import { CollectionContext } from '~/components/CollectionProvider'
import BookmarkDeckButton from '~/components/BookmarkDeckButton'
import Decks from '~/components/Decks'
import EmptySearch from '~/components/EmptySearch'
import Page from '~/components/Page'
import ImportCollection from '~/components/ImportCollection'
import Info from '~/components/Info'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import SuggestionsFilters from '~/components/DeckSuggestionsFilters'
import Title from '~/components/Title'
import useViewportSize from '~/hooks/useViewportSize'
import useQueryParams from '~/hooks/useQueryParams'
import useNavigator from '~/hooks/useNavigator'
import sortDeckSuggestions from '~/helpers/sortDeckSuggestions'
import getDeckSearchDescription from '~/helpers/getDeckSearchDescription'
import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import serialisation from '~/helpers/serialisation'

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
    if (prevProps.asPath !== this.props.asPath) {
      this.setState(this.getURLParameters())
    }
  }

  getURLParameters = () => {
    const parameters = { ...this.props.queryParams }

    return {
      tags: parameters.tags?.split(',') ?? [],
      faction: parameters.faction || '*',
      author: parameters.author || '*',
      including: parameters.including || null,
    }
  }

  updateURLParameters = event => {
    const parameters = { ...this.props.queryParams }

    if (this.state.tags.length === 0) delete parameters.tags
    else parameters.tags = this.state.tags.join(',')

    if (this.state.faction === '*') delete parameters.faction
    else parameters.faction = this.state.faction

    if (this.state.author === '*') delete parameters.author
    else parameters.author = this.state.author

    if (this.state.including === null) delete parameters.including
    else parameters.including = this.state.including

    const path =
      Object.keys(parameters).length > 0
        ? '/deck/suggestions?' + querystring.stringify(parameters)
        : '/deck/suggestions'

    this.props.navigator.replace(path)
  }

  updateTags = tags => this.setState({ tags }, this.updateURLParameters)
  updateFaction = faction =>
    this.setState({ faction }, this.updateURLParameters)
  updateAuthor = author => this.setState({ author }, this.updateURLParameters)
  updateName = name =>
    this.setState(
      {
        name,
        tags: [],
        faction: '*',
        author: '*',
        including: null,
        order: this.props.hasDefaultCollection ? 'DATE' : 'FEASIBILITY',
      },
      this.updateURLParameters
    )
  updateIncluding = including =>
    this.setState({ including }, this.updateURLParameters)
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
  matchesTags = deck =>
    this.state.tags.length === 0 ||
    this.state.tags.every(tag => deck.tags.includes(tag))
  matchesAuthor = deck =>
    this.state.author === '*' || deck.author === this.state.author
  matchesIncluding = deck =>
    !this.state.including ||
    serialisation.deck
      .deserialise(deck.id)
      .map(card => card.id)
      .includes(this.state.including)

  getDecks = () => {
    return (
      [...this.props.decks]
        // New decks are added at the end of the JSON file, but should be
        // displayed first, therefore we reverse the array before filtering and
        // sorting it.
        .reverse()
        .filter(this.matchesFaction)
        .filter(this.matchesTags)
        .filter(this.matchesAuthor)
        .filter(this.matchesName)
        .filter(this.matchesIncluding)
        .sort(sortDeckSuggestions(this.props, this.state.order))
    )
  }

  resetFilters = () =>
    this.setState(
      {
        faction: '*',
        tags: [],
        author: '*',
        name: '',
        including: null,
      },
      this.updateURLParameters
    )

  render() {
    const decks = this.getDecks()

    return (
      <Page
        title='Popular Decks'
        description={getDeckSearchDescription(this.state)}
        meta={decks.length === 1 ? '1 deck' : `${decks.length} decks`}
        action={{
          to: '/deck/collection',
          children: 'Your decks',
          icon: 'arrow-right',
        }}
      >
        <Row isDesktopOnly withWideGutter>
          <Row.Column width='1/3'>
            <Title>Filters</Title>

            <SuggestionsFilters
              {...this.state}
              decks={decks}
              updateTags={this.updateTags}
              updateFaction={this.updateFaction}
              updateAuthor={this.updateAuthor}
              updateName={this.debouncedUpdateName}
              updateIncluding={this.updateIncluding}
              updateOrder={this.updateOrder}
              resetFilters={this.resetFilters}
              formRef={this.formRef}
            />
            <Spacing top='LARGE'>
              {this.state.order === 'FEASIBILITY' && (
                <Only.CustomCollection>
                  <Info icon='books' title='Your collection'>
                    <p>
                      Decks are ordered based on the cards in{' '}
                      <span className='Highlight'>your collection</span>. That
                      means decks you can make with your highest cards are at
                      the top of the list and decks containing cards you do not
                      possess are downranked.
                    </p>
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
                    <p>
                      If you have already created your collection, you can
                      import it so decks are sorted by how well they would
                      perform based on the level of your cards.
                    </p>
                  </Info>
                </Only.DefaultCollection>
              </Only.Desktop>
            </Spacing>
          </Row.Column>
          <Row.Column width='2/3'>
            <Title>Decks</Title>
            {decks.length > 0 ? (
              <Decks
                decks={decks}
                withBookmarking
                showUpgrades
                actions={deck => [
                  <BookmarkDeckButton key={deck.id} {...deck} />,
                ]}
              />
            ) : (
              <EmptySearch
                title='No Decks found'
                resetFilters={this.resetFilters}
              />
            )}
          </Row.Column>
        </Row>
      </Page>
    )
  }
}

export default hookIntoProps(() => ({
  ...useFela(),
  viewportWidth: useViewportSize().viewportWidth,
  asPath: useRouter().asPath,
  navigator: useNavigator(),
  queryParams: useQueryParams(),
  ...React.useContext(CollectionContext),
}))(DeckSuggestions)
