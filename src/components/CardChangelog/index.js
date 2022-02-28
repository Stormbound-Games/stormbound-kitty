import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import CardChangelogForm from '~/components/CardChangelogForm'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import FeedCardChange from '~/components/FeedCardChange'
import sortCards from '~/helpers/sortCards'
import parseDate from '~/helpers/parseDate'
import { formatDate } from '~/helpers/formatDate'
import styles from './styles'

export default React.memo(function CardChangelog(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const [sorting, setSorting] = React.useState('DATE')
  const [type, setType] = React.useState('*')
  const changesByDate = React.useMemo(() => {
    return props.changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        const chunks = change.date.split('/')
        const key = chunks[1] + '/' + chunks[2]

        if (!acc[key]) acc[key] = []
        acc[key].push(change)
        return acc
      }, {})
  }, [type, props.changelog])
  const changesByCard = React.useMemo(() => {
    return props.changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        if (!acc[change.id]) {
          acc[change.id] = []
        }
        acc[change.id].push(change)
        return acc
      }, {})
  }, [type, props.changelog])

  return (
    <Page
      title='Card Changelog'
      description='Find all cards changes that ever happened on Stormbound'
      action={{ to: '/releases', children: 'All releases' }}
      isEditorialContent
    >
      <Page.Narrow>
        <CardChangelogForm
          sorting={sorting}
          setSorting={setSorting}
          type={type}
          setType={setType}
        />

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
                        sortCards()(
                          cardsIndex[a.id].name,
                          cardsIndex[b.id].name
                        )
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
              .sort((a, b) => sortCards()(cardsIndex[a], cardsIndex[b]))
              .map(id => (
                <Spacing top='LARGER' key={id}>
                  <Title className={css(styles.title)}>
                    {cardsIndex[id].name}
                  </Title>
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
      </Page.Narrow>
    </Page>
  )
})
