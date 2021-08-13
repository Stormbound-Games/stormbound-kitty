import React from 'react'
import Page from '../Page'
import Link from '../Link'
import puzzles from '../../data/puzzles'
import EmptySearch from '../EmptySearch'
import Notice from '../Notice'
import Title from '../Title'
import PuzzlesFilters from '../BattleSimPuzzlesFilters'
import Row from '../Row'
import Teasers from '../Teasers'
import { getCardForPuzzle, getExcerptForPuzzle } from '../BattleSimPuzzle'

class BattleSimPuzzles extends React.Component {
  state = {
    difficulty: '*',
    category: '*',
    restrictions: [],
    name: '',
  }

  resetFilters = () =>
    this.setState({
      difficulty: '*',
      category: '*',
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
  matchesCategory = puzzle =>
    this.state.category === '*' || puzzle.category === this.state.category
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
      .filter(this.matchesCategory)
      .reverse()

  render() {
    const puzzles = this.getPuzzles()

    return (
      <Page
        title='Puzzles'
        description='Test your skills and resolve interesting and creative puzzles made by the Stormbound community'
      >
        <Row isDesktopOnly withWideGutter>
          <Row.Column width='1/3'>
            <Title>Filters</Title>
            <PuzzlesFilters {...this.state} updateFilter={this.updateFilter} />
          </Row.Column>
          <Row.Column width='2/3'>
            <Title>Puzzles</Title>
            {puzzles.length > 0 ? (
              <Teasers
                columns={2}
                items={puzzles.map(puzzle => ({
                  card: getCardForPuzzle(puzzle),
                  title: puzzle.name,
                  meta: `Made by ${puzzle.author}`,
                  to: `/sim/${puzzle.board}/display`,
                  excerpt: getExcerptForPuzzle(puzzle),
                  'data-testid': `puzzle ${puzzle.name} ${puzzle.category} ${
                    puzzle.difficulty
                  }/3 ${puzzle.restrictions.join(' ')}`,
                }))}
              />
            ) : (
              <EmptySearch
                title='No puzzles found'
                resetFilters={this.resetFilters}
              />
            )}

            <Notice icon='sword'>
              Design your own puzzles and{' '}
              <Link to={{ pathname: '/faq', hash: '#adding-a-puzzle' }}>
                have them added
              </Link>{' '}
              to the list!
            </Notice>
          </Row.Column>
        </Row>
      </Page>
    )
  }
}

export default BattleSimPuzzles
