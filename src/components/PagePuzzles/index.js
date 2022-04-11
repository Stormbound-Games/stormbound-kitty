import React from 'react'
import Page from '~/components/Page'
import Link from '~/components/Link'
import EmptySearch from '~/components/EmptySearch'
import Notice from '~/components/Notice'
import Title from '~/components/Title'
import PuzzlesFilters from '~/components/BattleSimPuzzlesFilters'
import Row from '~/components/Row'
import Teasers from '~/components/Teasers'
import {
  getCardForPuzzle,
  getExcerptForPuzzle,
} from '~/components/BattleSimPuzzle'

export default React.memo(function PagePuzzles(props) {
  const [difficulty, setDifficulty] = React.useState('*')
  const [category, setCategory] = React.useState('*')
  const [restrictions, setRestrictions] = React.useState([])
  const [name, setName] = React.useState('')

  const resetFilters = React.useCallback(() => {
    setDifficulty('*')
    setCategory('*')
    setRestrictions([])
    setName('')
  }, [])

  const updateFilter = name => value => {
    switch (name) {
      case 'difficulty':
        return setDifficulty(value)
      case 'category':
        return setCategory(value)
      case 'restrictions':
        return setRestrictions(value)
      case 'name':
        return setName(value)
    }
  }

  const matchesName = React.useCallback(
    puzzle =>
      name === '' ||
      puzzle.name.toLowerCase().replace('’', "'").includes(name.toLowerCase()),
    [name]
  )

  const matchesCategory = React.useCallback(
    puzzle => category === '*' || puzzle.category === category,
    [category]
  )

  const matchesDifficulty = React.useCallback(
    puzzle => difficulty === '*' || puzzle.difficulty === +difficulty,
    [difficulty]
  )

  const matchesRestriction = React.useCallback(
    puzzle =>
      restrictions.length === 0 ||
      restrictions.every(restriction =>
        puzzle.restrictions.includes(restriction)
      ),
    [restrictions]
  )

  const puzzles = React.useMemo(
    () =>
      props.puzzles
        .filter(matchesName)
        .filter(matchesDifficulty)
        .filter(matchesRestriction)
        .filter(matchesCategory)
        .reverse(),
    [
      props.puzzles,
      matchesName,
      matchesDifficulty,
      matchesRestriction,
      matchesCategory,
    ]
  )

  return (
    <Page
      title='Puzzles'
      description='Test your skills and resolve interesting and creative puzzles made by the Stormbound community'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Filters</Title>
          <PuzzlesFilters
            name={name}
            restrictions={restrictions}
            difficulty={difficulty}
            category={category}
            updateFilter={updateFilter}
          />
        </Row.Column>
        <Row.Column width='2/3'>
          <Title>Puzzles</Title>
          {puzzles.length > 0 ? (
            <Teasers
              columns={2}
              items={puzzles.map(puzzle => ({
                card: getCardForPuzzle(puzzle),
                title: puzzle.name,
                meta: (
                  <>
                    Made by{' '}
                    <Link to={'/members/' + puzzle.user.slug}>
                      {puzzle.user.name}
                    </Link>
                  </>
                ),
                to: `/puzzles/${puzzle.board}`,
                excerpt: getExcerptForPuzzle(puzzle),
                'data-testid': `puzzle ${puzzle.name} ${puzzle.category} ${
                  puzzle.difficulty
                }/3 ${puzzle.restrictions.join(' ')}`,
              }))}
            />
          ) : (
            <EmptySearch title='No puzzles found' resetFilters={resetFilters} />
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
})
