import React from 'react'
import { Link } from 'react-router-dom'
import puzzles from '../../data/puzzles'
import Column from '../Column'
import EmptySearch from '../EmptySearch'
import InfoHint from '../InfoHint'
import PageMeta from '../PageMeta'
import Puzzle from '../BattleSimPuzzle'
import PuzzlesFilters from '../BattleSimPuzzlesFilters'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default class BattleSimPuzzles extends React.Component {
  state = {
    difficulty: '*',
    type: '*',
    restrictions: [],
    name: '',
  }

  resetFilters = () =>
    this.setState({
      difficulty: '*',
      type: '*',
      restrictions: [],
      name: '',
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
      <>
        <h1 className='visually-hidden'>Puzzles</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <Title>Filters</Title>
            <PuzzlesFilters {...this.state} updateFilter={this.updateFilter} />
          </Column>
          <Column width={66}>
            <Title>Puzzles</Title>

            {puzzles.length > 0 ? (
              <ul className='BattleSimPuzzles__list'>
                {puzzles.map(puzzle => (
                  <li className='BattleSimPuzzles__item' key={puzzle.name}>
                    <Puzzle {...puzzle} key={puzzle.name} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptySearch
                title='No puzzles found'
                resetFilters={this.resetFilters}
              />
            )}
            <InfoHint icon='sword'>
              Design your own puzzles and{' '}
              <Link to='/faq#adding-a-puzzle'>have them added</Link> to the
              list!
            </InfoHint>
          </Column>
        </Row>

        <PageMeta
          title='Puzzles'
          description='Stormbound puzzles made by the community.'
        />
      </>
    )
  }
}
