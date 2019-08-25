import React, { Fragment } from 'react'
import { navigate } from '@reach/router'
import debounce from 'lodash.debounce'
import PageMeta from '../PageMeta'
import Title from '../Title'
import SuggestionsFilters from '../DBSuggestionsFilters'
import SuggestionsNav from '../DBSuggestionsNav'
import Suggestion from '../DBSuggestion'
import CardZoom from '../CardZoom'
import Row from '../Row'
import Column from '../Column'
import EmptySearch from '../EmptySearch'
import chunk from '../../helpers/chunk'
import { deserialiseDeck } from '../../helpers/deserialise'
import decks from '../../data/decks'
import './index.css'

export default class DBSuggestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.getURLParameters(),
      name: '',
      zoomed: null,
      activePage: 0
    }
  }

  getURLParameters = () => {
    const parameters = new URLSearchParams(window.location.search)

    return {
      category: parameters.get('category') || '*',
      faction: parameters.get('faction') || '*',
      author: parameters.get('author') || '*',
      including: parameters.get('including') || null
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

    navigate('?' + parameters.toString(), { replace: true })
  }

  updateCategory = category =>
    this.setState({ category, activePage: 0 }, this.updateURLParameters)
  updateFaction = faction =>
    this.setState({ faction, activePage: 0 }, this.updateURLParameters)
  updateAuthor = author =>
    this.setState({ author, activePage: 0 }, this.updateURLParameters)
  updateName = name =>
    this.setState(
      {
        name,
        category: '*',
        faction: '*',
        author: '*',
        including: null,
        activePage: 0
      },
      this.updateURLParameters
    )
  updateIncluding = including =>
    this.setState({ including, activePage: 0 }, this.updateURLParameters)
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
  getDecks = () =>
    decks
      .filter(this.matchesFaction)
      .filter(this.matchesCategory)
      .filter(this.matchesAuthor)
      .filter(this.matchesName)
      .filter(this.matchesIncluding)
      .sort((a, b) => {
        if (a.faction > b.faction) return +1
        if (a.faction < b.faction) return -1
        if (a.name > b.name) return +1
        if (a.name < b.name) return -1
        return 0
      })

  resetFilters = () =>
    this.setState({
      faction: '*',
      category: '*',
      author: '*',
      name: '',
      including: null,
      zoomed: null,
      activePage: 0
    })

  render() {
    const decks = this.getDecks()
    const pages = chunk(decks, 10)
    const page = pages[this.state.activePage] || pages[0]

    return (
      <Fragment>
        <h1 className="visually-hidden">Deck Suggestions</h1>

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
              formRef={this.formRef}
            />
          </Column>
          <Column width={66}>
            <Title>Decks</Title>
            {page ? (
              chunk(page, 2).map(([a, b]) => (
                <Row desktopOnly key={a.id}>
                  <Column>
                    <Suggestion
                      {...a}
                      zoom={zoomed => this.setState({ zoomed })}
                    />
                  </Column>
                  <Column>
                    {b ? (
                      <Suggestion
                        {...b}
                        zoom={zoomed => this.setState({ zoomed })}
                      />
                    ) : null}
                  </Column>
                </Row>
              ))
            ) : (
              <EmptySearch
                title="No Decks found"
                resetFilters={this.resetFilters}
              />
            )}

            <SuggestionsNav
              pages={pages}
              setActivePage={activePage => this.setState({ activePage })}
              activePage={this.state.activePage}
            />
          </Column>

          <CardZoom
            cardId={this.state.zoomed ? this.state.zoomed.id : null}
            level={this.state.zoomed ? this.state.zoomed.level : null}
            close={() => this.setState({ zoomed: null })}
          />
        </Row>

        <PageMeta
          title="Deck Suggestions"
          description="Decks suggested by the Stormbound community."
        />
      </Fragment>
    )
  }
}
