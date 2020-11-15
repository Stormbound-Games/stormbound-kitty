import React from 'react'
import { useRouteMatch, useHistory, Link } from 'react-router-dom'
import Card from '../Card'
import CardSelect from '../CardSelect'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import LearnMoreIcon from '../LearnMoreIcon'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import cards from '../../data/cards'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import getCardValue from '../../helpers/getCardValue'
import serialisation from '../../helpers/serialisation'
import './index.css'

const LevelSelect = React.memo(function LevelSelect(props) {
  return (
    <>
      <label htmlFor={'level-' + props.slot}>Level</label>
      <select
        id={'level-' + props.slot}
        name={'level-' + props.slot}
        value={props.value}
        onChange={event => props.setLevel(+event.target.value)}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </>
  )
})

const SlotSelect = React.memo(function SlotSelect(props) {
  return (
    <>
      <label htmlFor={'card-' + props.slot}>Card</label>
      <CardSelect
        id={'card-' + props.slot}
        name={'card-' + props.slot}
        current={props.value}
        onChange={option => props.setCard(option ? option.value : null)}
        withSpells
        disabledOptions={props.disabledOptions}
      />
    </>
  )
})

const CardValue = React.memo(function CardValue(props) {
  const value = props.id && getCardValue(props.id, props.level)

  if (!value) {
    return (
      <p>It is unfortunately impossible to compute the value of this card.</p>
    )
  }

  const [min, max] = value

  return (
    <table className='ValueCalculator__table'>
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

const getCardsFromURL = id => {
  const defaultCard = { id: null, level: 1 }

  try {
    const cards = serialisation.cards.deserialise(id)
    return [cards[0] || defaultCard, cards[1] || defaultCard]
  } catch (error) {
    return [defaultCard, defaultCard]
  }
}

export default React.memo(function ValueCalculator(props) {
  const history = useHistory()
  const { params } = useRouteMatch()
  const initialCards = getCardsFromURL(params.id?.toUpperCase())
  const [A, setA] = React.useState(initialCards[0])
  const [B, setB] = React.useState(initialCards[1])
  const disabledOptions = cards
    .filter(card => getCardValue(card.id) === null)
    .map(card => card.id)

  React.useEffect(() => {
    history.replace(
      ['/calculators/value', serialisation.cards.serialise([A, B])]
        .filter(Boolean)
        .join('/')
        .toLowerCase()
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [A, B])

  return (
    <>
      <HeaderBanner title='Value Calculator' />
      <Row desktopOnly wideGutter>
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
          <img
            src='/assets/images/card_value.png'
            alt='v(c) = s / m * f'
            className='ValueCalculator__formula'
          />
          <Info
            icon='equalizer'
            title={
              <>
                Experimental <LearnMoreIcon anchor='#value-calculator' />
              </>
            }
          >
            This calculator is highly{' '}
            <Link to='/faq#value-calculator'>experimental and incomplete</Link>.
            If you would like to help, please get in touch with{' '}
            <Link to='/member/Kitty'>Kitty#1909</Link> or{' '}
            <Link to='/member/Derk'>Derk#7109</Link> on Discord.
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
              <div className='ValueCalculator__CardHolder'>
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
              <div className='ValueCalculator__CardHolder'>
                <Card {...getResolvedCardData(B)} />
              </div>
            </>
          )}
        </Row.Column>
      </Row>
      <Row desktopOnly>
        <Row.Column width='1/3'></Row.Column>
        <Row.Column width='2/3'>
          <p className='ValueCalculator__hint'>
            * The maximum is not in fact the theoretical maximum as{' '}
            <Link to='/faq#value-calculator'>some values are capped</Link> for
            sake of simplicity or realism. Therefore, this is more of a
            realistic—albeit arbitrary—maximum value to be expected in a normal
            game.
          </p>
        </Row.Column>
      </Row>
      <PageMeta
        title='Value Calculator'
        description='Find an experimental and simplified card value calculator helping determine the numeric value of a given card based on its properties'
      />
    </>
  )
})
