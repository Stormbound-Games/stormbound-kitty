import React from 'react'
import hookIntoProps from 'hook-into-props'
import { useFela } from 'react-fela'
import Article from '../Article'
import Link from '../Link'
import puzzles from '../../data/puzzles'
import EmptySearch from '../EmptySearch'
import Notice from '../Notice'
import Puzzle from '../BattleSimPuzzle'
import PuzzlesFilters from '../BattleSimPuzzlesFilters'
import Row from '../Row'
import styles from './styles'

class BattleSimPuzzles extends React.Component {
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
      .reverse()

  render() {
    const puzzles = this.getPuzzles()

    return (
      <Article
        title='Puzzles'
        description='Test your skills and resolve interesting and creative puzzles made by the Stormbound community'
      >
        <Row desktopOnly wideGutter>
          <Row.Column width='1/3'>
            <PuzzlesFilters {...this.state} updateFilter={this.updateFilter} />
          </Row.Column>
          <Row.Column width='2/3'>
            {puzzles.length > 0 ? (
              <ul className={this.props.css(styles.list)}>
                {puzzles.map(puzzle => (
                  <li className={this.props.css(styles.item)} key={puzzle.name}>
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
          </Row.Column>
        </Row>
      </Article>
    )
  }
}

export default hookIntoProps(props => ({
  ...useFela(),
}))(BattleSimPuzzles)
