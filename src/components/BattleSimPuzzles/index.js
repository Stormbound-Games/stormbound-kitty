import React from 'react'
import { Link } from 'react-router-dom'
import puzzles from '../../data/puzzles'
import Column from '../Column'
import EmptySearch from '../EmptySearch'
import HeaderBanner from '../HeaderBanner'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Puzzle from '../BattleSimPuzzle'
import PuzzlesFilters from '../BattleSimPuzzlesFilters'
import Row from '../Row'
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
        <HeaderBanner title='Puzzles' />

        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <PuzzlesFilters {...this.state} updateFilter={this.updateFilter} />
          </Column>
          <Column width='2/3'>
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
            <Notice icon='sword'>
              Design your own puzzles and{' '}
              <Link
                to={{
                  pathname: '/faq',
                  hash: '#adding-a-puzzle',
                }}
              >
                have them added
              </Link>{' '}
              to the list!
            </Notice>
          </Column>
        </Row>

        <PageMeta
          title='Puzzles'
          description='Test your skills and resolve interesting and creative puzzles made by the Stormbound community'
        />
      </>
    )
  }
}
