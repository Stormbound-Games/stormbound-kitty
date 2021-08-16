import React from 'react'
import { useFela } from 'react-fela'
import Card from '../Card'
import CardSelect from '../CardSelect'
import Page from '../Page'
import Image from '../Image'
import Info from '../Info'
import LearnMoreIcon from '../LearnMoreIcon'
import Link from '../Link'
import Row from '../Row'
import Select from '../Select'
import Title from '../Title'
import CARDS from '../../data/cards'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import getCardValue from '../../helpers/getCardValue'
import serialisation from '../../helpers/serialisation'
import useRouter from '../../hooks/useRouter'
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
  const value = props.id && getCardValue(props.id, props.level)

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

export default React.memo(function ValueCalculator(props) {
  const { css } = useFela()
  const { history } = useRouter()
  const [A, setA] = React.useState(props.cards[0])
  const [B, setB] = React.useState(props.cards[1])
  const disabledOptions = CARDS.filter(
    card => getCardValue(card.id) === null
  ).map(card => card.id)

  React.useEffect(() => {
    history.replace(
      ['/calculators/value', serialisation.cards.serialise([A, B])]
        .filter(Boolean)
        .join('/')
        .toLowerCase(),
      undefined,
      { scroll: false }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [A, B])

  return (
    <Page
      title='Value Calculator'
      description='Find an experimental and simplified card value calculator helping determine the numeric value of a given card based on its properties'
    >
      <Row isDesktopOnly withWideGutter>
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
          <Image
            src='/assets/images/card_value.png'
            alt='v(c) = s / m * f'
            extend={styles.formula}
          />
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
              <Link to='/member/Kitty'>Kitty#1909</Link> or{' '}
              <Link to='/member/Derk'>Derk#7109</Link> on Discord.
            </p>
          </Info>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>First card</Title>
          <Row>
            <Row.Column width='3/4'>
              <SlotSelect
                slot='A'
                value={A.id}
                setCard={id => setA(A => ({ id, level: A.level }))}
                disabledOptions={disabledOptions}
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
                <Card {...getResolvedCardData(A)} />
              </div>
            </>
          )}
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Second card</Title>
          <Row>
            <Row.Column width='3/4'>
              <SlotSelect
                slot='B'
                value={B.id}
                setCard={id => setB(B => ({ id, level: B.level }))}
                disabledOptions={disabledOptions}
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
                <Card {...getResolvedCardData(B)} />
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
