import React from 'react'
import { useRouter } from 'next/router'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import Card from '~/components/Card'
import CardSelect from '~/components/CardSelect'
import Page from '~/components/Page'
import Image from '~/components/Image'
import Info from '~/components/Info'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import Link from '~/components/Link'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getCardValue from '~/helpers/getCardValue'
import serialization from '~/helpers/serialization'
import styles from './styles'

const LevelSelect = React.memo(function LevelSelect(props) {
  return (
    <Select
      label='Level'
      id={'level-' + props.slot}
      value={props.value}
      onChange={event => props.setLevel(+event.target.value)}
    >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </Select>
  )
})

const SlotSelect = React.memo(function SlotSelect(props) {
  return (
    <CardSelect
      label='Card'
      id={'card-' + props.slot}
      name={'card-' + props.slot}
      current={props.value?.toUpperCase() ?? null}
      onChange={option => props.setCard(option ? option.value : null)}
      withSpells
      disabledOptions={props.disabledOptions}
    />
  )
})

const CardValue = React.memo(function CardValue(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const value = props.id && getCardValue(cardsIndex, props.id, props.level)

  if (!value) {
    return (
      <p>It is unfortunately impossible to compute the value of this card.</p>
    )
  }

  const [min, max] = value

  return (
    <table className={css(styles.table)}>
      <thead>
        <tr>
          <th>Min</th>
          <th>Max*</th>
          <th>Avg</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{min.toFixed(2)}</td>
          <td>{max.toFixed(2)}</td>
          <td>{((min + max) / 2).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  )
})

export default React.memo(function PageValueCalculator(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { css } = useFela()
  const router = useRouter()
  const [A, setA] = React.useState(props.deck[0])
  const [B, setB] = React.useState(props.deck[1])

  React.useEffect(() => {
    router.replace(
      ['/calculators/value', serialization.cards.serialize([A, B])]
        .filter(Boolean)
        .join('/')
        .toLowerCase(),
      null,
      { scroll: false }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [A, B])

  return (
    <Page
      title='Value Calculator'
      description='Find an experimental and simplified card value calculator helping determine the numeric value of a given card based on its properties'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is a (simplified and experimental) card value calculator and
            comparator. The values are based on a single turn for sake of
            simplicity (minimum, maximum and averaged).
          </p>
          <p>
            The value of a card is derivated from its mana cost, its strength
            (in case of units and structures), its movement (in case of units)
            and its ability (when relevant).
          </p>
          <p>
            For instance, the value formula for vanilla cards (cards without an
            ability) is their strength divided by their mana cost times their
            speed factor. The speed factor is 0.5, 1, 1.5, 1.75 or 2 depending
            on the card’s effective movement between 0 and 4.
          </p>

          <Spacing top='BASE' bottom='LARGER'>
            <Image
              src='/assets/images/formulas/value.png'
              alt='v(c) = s / m * f'
              width={300}
              height={50}
              withoutWebp
              lazy
              extend={{ margin: 'auto' }}
            />
          </Spacing>

          <Info
            icon='equalizer'
            title={
              <>
                Experimental <LearnMoreIcon anchor='#value-calculator' />
              </>
            }
          >
            <p>
              This calculator is highly{' '}
              <Link to='/faq#value-calculator'>
                experimental and incomplete
              </Link>
              . If you would like to help, please get in touch with{' '}
              <Link to='/members/kitty'>Kitty#1909</Link> or{' '}
              <Link to='/members/derk'>Derk#7109</Link> on Discord.
            </p>
          </Info>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>First card</Title>
          <Row withNarrowGutter>
            <Row.Column width='3/4'>
              <SlotSelect
                slot='A'
                value={A.id}
                setCard={id => setA(A => ({ id, level: A.level }))}
                disabledOptions={props.disabledOptions}
              />
            </Row.Column>
            <Row.Column width='1/4'>
              <LevelSelect
                slot='A'
                value={A.level}
                setLevel={level => setA(A => ({ level, id: A.id }))}
              />
            </Row.Column>
          </Row>
          {A.id && (
            <>
              <CardValue {...A} />
              <div className={css(styles.cardHolder)}>
                <Card
                  {...getResolvedCardData(cardsIndex, A)}
                  containerWidth={220}
                />
              </div>
            </>
          )}
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Second card</Title>
          <Row withNarrowGutter>
            <Row.Column width='3/4'>
              <SlotSelect
                slot='B'
                value={B.id}
                setCard={id => setB(B => ({ id, level: B.level }))}
                disabledOptions={props.disabledOptions}
              />
            </Row.Column>
            <Row.Column width='1/4'>
              <LevelSelect
                slot='B'
                value={B.level}
                setLevel={level => setB(B => ({ level, id: B.id }))}
              />
            </Row.Column>
          </Row>
          {B.id && (
            <>
              <CardValue {...B} />
              <div className={css(styles.cardHolder)}>
                <Card
                  {...getResolvedCardData(cardsIndex, B)}
                  containerWidth={220}
                />
              </div>
            </>
          )}
        </Row.Column>
      </Row>
      <Row isDesktopOnly>
        <Row.Column width='1/3'></Row.Column>
        <Row.Column width='2/3'>
          <p className={css(styles.hint)}>
            * The maximum is not in fact the theoretical maximum as{' '}
            <Link to='/faq#value-calculator'>some values are capped</Link> for
            sake of simplicity or realism. Therefore, this is more of a
            realistic—albeit arbitrary—maximum value to be expected in a normal
            game.
          </p>
        </Row.Column>
      </Row>
    </Page>
  )
})
