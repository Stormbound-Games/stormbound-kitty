import React, { Fragment } from 'react'
import puzzles from '../../data/puzzles'
import PageMeta from '../PageMeta'
import Puzzle from '../BSPuzzle'
import PuzzlesFilters from '../BSPuzzlesFilters'
import EmptySearch from '../EmptySearch'
import Title from '../Title'
import Row from '../Row'
import Column from '../Column'
import './index.css'

export default class BSPuzzles extends React.Component {
  state = {
    difficulty: '*',
    type: '*',
    restrictions: [],
    name: ''
  }

  resetFilters = () =>
    this.setState({
      difficulty: '*',
      type: '*',
      restrictions: [],
      name: ''
    })

  updateFilter = name => value => this.setState({ [name]: value })

  matchesName = puzzle =>
    this.state.name === '' ||
    puzzle.name
      .toLowerCase()
      .replace('’', "'")
      .includes(this.state.name.toLowerCase())
  matchesType = puzzle =>
    this.state.type === '*' || puzzle.type === this.state.type
  matchesDifficulty = puzzle =>
    this.state.difficulty === '*' ||
    puzzle.difficulty === +this.state.difficulty
  matchesRestriction = puzzle =>
    this.state.restrictions.length === 0 ||
    this.state.restrictions.every(restriction =>
      puzzle.restrictions.includes(restriction)
    )

  getPuzzles = () =>
    puzzles
      .filter(this.matchesName)
      .filter(this.matchesDifficulty)
      .filter(this.matchesRestriction)
      .filter(this.matchesType)

  render() {
    const puzzles = this.getPuzzles()

    return (
      <Fragment>
        <h1 className="visually-hidden">Puzzles</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <Title>Filters</Title>
            <PuzzlesFilters {...this.state} updateFilter={this.updateFilter} />
          </Column>
          <Column width={66}>
            <Title>Puzzles</Title>

            {puzzles.length > 0 ? (
              <ul className="BSPuzzles__list">
                {puzzles.map(puzzle => (
                  <li className="BSPuzzles__item" key={puzzle.name}>
                    <Puzzle {...puzzle} key={puzzle.name} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptySearch
                title="No puzzles found"
                resetFilters={this.resetFilters}
              />
            )}
          </Column>
        </Row>

        <PageMeta
          title="Puzzles"
          description="Stormbound puzzles made by the community."
        />
      </Fragment>
    )
  }
}
