import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card'
import CardSelect from '../CardSelect'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import LearnMoreIcon from '../LearnMoreIcon'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import cards from '../../data/cards'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import getCardValue from '../../helpers/getCardValue'
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
  const value = getCardValue(props.id, props.level)

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

export default React.memo(function ValueCalculator(props) {
  const [A, setA] = React.useState('N3')
  const [B, setB] = React.useState('N32')
  const [levelA, setLevelA] = React.useState(5)
  const [levelB, setLevelB] = React.useState(5)
  const disabledOptions = [A, B].concat(
    cards.filter(card => getCardValue(card.id) === null).map(card => card.id)
  )

  return (
    <>
      <HeaderBanner title='Value Calculator' />
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
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
        </Column>
        <Column width='1/3'>
          <Title>First card</Title>
          <Row>
            <Column width='3/4'>
              <SlotSelect
                slot='A'
                value={A}
                setCard={setA}
                disabledOptions={disabledOptions}
              />
            </Column>
            <Column width='1/4'>
              <LevelSelect slot='A' value={levelA} setLevel={setLevelA} />
            </Column>
          </Row>
          {A && (
            <>
              <CardValue id={A} level={levelA} />
              <div className='ValueCalculator__CardHolder'>
                <Card {...getResolvedCardData({ id: A, level: levelA })} />
              </div>
            </>
          )}
        </Column>
        <Column width='1/3'>
          <Title>Second card</Title>
          <Row>
            <Column width='3/4'>
              <SlotSelect
                slot='B'
                value={B}
                setCard={setB}
                disabledOptions={disabledOptions}
              />
            </Column>
            <Column width='1/4'>
              <LevelSelect slot='B' value={levelB} setLevel={setLevelB} />
            </Column>
          </Row>
          {B && (
            <>
              <CardValue id={B} level={levelB} />
              <div className='ValueCalculator__CardHolder'>
                <Card {...getResolvedCardData({ id: B, level: levelB })} />
              </div>
            </>
          )}
        </Column>
      </Row>
      <Row desktopOnly>
        <Column width='1/3'></Column>
        <Column width='2/3'>
          <p className='ValueCalculator__hint'>
            * The maximum is not in fact the theoretical maximum as{' '}
            <Link to='/faq#value-calculator'>some values are capped</Link> for
            sake of simplicity or realism. Therefore, this is more of a
            realistic—albeit arbitrary—maximum value to be expected in a normal
            game.
          </p>
        </Column>
      </Row>
      <PageMeta
        title='Value Calculator'
        description='Find an experimental and simplified card value calculator helping determine the numeric value of a given card based on its properties'
      />
    </>
  )
})
