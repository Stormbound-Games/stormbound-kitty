import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import Article from '../Article'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Select from '../Select'
import Spacing from '../Spacing'
import Title from '../Title'
import FeedCardChange from '../FeedCardChange'
import changelog from '../../data/changelog'
import sortCards from '../../helpers/sortCards'
import getRawCardData from '../../helpers/getRawCardData'
import parseDate from '../../helpers/parseDate'
import { formatDate } from '../../helpers/formatDate'
import styles from './styles'

const getCardName = id => getRawCardData(id).name

export default function CardChangelog(props) {
  const { css } = useFela()
  const [sorting, setSorting] = React.useState('DATE')
  const [type, setType] = React.useState('*')
  const changesByDate = React.useMemo(() => {
    return changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        const chunks = change.date.split('/')
        const key = chunks[1] + '/' + chunks[2]

        if (!acc[key]) acc[key] = []
        acc[key].push(change)
        return acc
      }, {})
  }, [type])
  const changesByCard = React.useMemo(() => {
    return changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        if (!acc[change.id]) {
          acc[change.id] = []
        }
        acc[change.id].push(change)
        return acc
      }, {})
  }, [type])

  return (
    <Article title='Card Changelog'>
      <Article.Narrow>
        <Title>Filters</Title>
        <Row>
          <Row.Column>
            <Select
              label='Sort by'
              id='sorting'
              value={sorting}
              onChange={event => setSorting(event.target.value)}
            >
              <option value='DATE'>Date</option>
              <option value='CARD'>Card</option>
            </Select>
          </Row.Column>
          <Row.Column>
            <Select
              label='Types of changes'
              id='type'
              value={type}
              onChange={event => setType(event.target.value)}
            >
              <option value='*'>Any</option>
              <option value='BUFF'>Buff</option>
              <option value='INFO'>Info</option>
              <option value='MIXED'>Mixed</option>
              <option value='NERF'>Nerf</option>
            </Select>
          </Row.Column>
        </Row>

        <Info icon='compass' title='Release notes'>
          <p>
            If you happen to be looking for the details of a specific update,
            check out the <Link to='/releases'>release notes</Link> for a list
            of all the releases since July 2020.
          </p>
        </Info>

        {sorting === 'DATE'
          ? Object.keys(changesByDate)
              .sort((a, b) => parseDate(b) - parseDate(a))
              .map(date => (
                <Spacing top='LARGER' key={date}>
                  <Title extend={styles.title}>
                    {formatDate(parseDate(date))}
                  </Title>
                  <ul className={css(styles.list)}>
                    {changesByDate[date]
                      .sort((a, b) =>
                        sortCards()(getRawCardData(a.id), getRawCardData(b.id))
                      )
                      .map(change => (
                        <li
                          className={css(styles.item)}
                          key={change.date + change.id + change.description}
                        >
                          <FeedCardChange
                            {...change}
                            date={change.type}
                            author={change.id}
                          />
                        </li>
                      ))}
                  </ul>
                </Spacing>
              ))
          : Object.keys(changesByCard)
              .sort((a, b) => sortCards()(getRawCardData(a), getRawCardData(b)))
              .map(id => (
                <Spacing top='LARGER' key={id}>
                  <Title className={css(styles.title)}>{getCardName(id)}</Title>
                  <ul className={css(styles.list)}>
                    {changesByCard[id].map(change => (
                      <li
                        className={css(styles.item)}
                        key={id + change.date + change.description}
                      >
                        <FeedCardChange
                          {...change}
                          date={parseDate(change.date)}
                        />
                      </li>
                    ))}
                  </ul>
                </Spacing>
              ))}
      </Article.Narrow>

      <PageMeta
        title='Card Changes'
        description='Find all cards changes that ever happened on Stormbound'
      />
    </Article>
  )
}
