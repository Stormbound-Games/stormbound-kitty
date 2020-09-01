import React from 'react'
import Article from '../Article'
import CTA from '../CTA'
import Info from '../Info'
import ListBuilderTier from '../ListBuilderTier'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Timeline from '../Timeline'
import Title from '../Title'
import { Coins, Stones, Rubies } from '../Resource'

const TIMELINE = [
  {
    date: new Date(2020, 8, 7),
    title: (
      <>
        The{' '}
        <a
          href='https://forms.gle/hRo1iUAdBX4hG4tG9'
          target='_blank'
          rel='noopener noreferrer'
        >
          registration
        </a>{' '}
        opens and participants get to fill the form to enter the tournament.
      </>
    ),
  },
  {
    date: new Date(2020, 8, 14),
    title:
      'The registration closes and the brackets are being composed by the organisers.',
  },
  {
    date: new Date(2020, 8, 15),
    title: (
      <>
        The{' '}
        <a
          href='https://challonge.com/OddTournament'
          target='_blank'
          rel='noopener noreferrer'
        >
          group stage
        </a>{' '}
        starts and participants start battling each other.
      </>
    ),
  },
  {
    date: new Date(2020, 8, 25),
    title: 'The group stage ends and the final round is being layed down.',
  },
  {
    date: new Date(2020, 8, 26),
    title: 'The final stage starts and participants start battling each other.',
  },
  {
    date: new Date(2020, 9, 6),
    title: 'The final stage ends and the winners are announced.',
  },
]

export default React.memo(function TournamentOddEven(props) {
  return (
    <Article
      title='Odd Tournament'
      authors={['Kitty', 'Derk']}
      backLink={{ to: '/', children: 'Home' }}
      readingTime='In preparation'
      noDropCap
    >
      <p>
        The Odd Tournament is organised by Derk (derk#7109), Arthis
        (arthisroo#7189) and Kitty (kitty#1909).
      </p>

      <ol style={{ columns: '16em' }}>
        <li>
          <a href='#introduction'>Introduction</a>
        </li>
        <li>
          <a href='#code-of-conduct'>Code of Conduct</a>
        </li>
        <li>
          <a href='#format'>Format</a>
        </li>
        <li>
          <a href='#timeline'>Timeline</a>
        </li>
        <li>
          <a href='#rewards'>Rewards</a>
        </li>
        <li>
          <a href='#banned-cards'>Banned cards</a>
        </li>
        <li>
          <a href='#deck-changes'>Deck changes</a>
        </li>
      </ol>

      <div style={{ color: 'var(--light-ironclad)' }}>
        <Notice>
          If you stumble upon this page before it is officially announced,
          please keep it for yourself. A lot of work goes into making this
          tournament nice, and I’d like it not to be spoiled.
        </Notice>
      </div>

      <Title id='introduction'>Introduction</Title>
      <p>
        The concept of the Odd Tournament relies on{' '}
        <span className='Highlight'>
          using only cards whose mana cost is odd
        </span>
        , or{' '}
        <span className='Highlight'>only cards whose mana cost is even</span>{' '}
        (token cards excluded). This sole restriction has a few consequences for
        deck making:
      </p>
      <ul>
        <li>
          By eliminating essentially half the cards of the Stormbound
          collection, the usual efficient combos (Archdruid Earyn + Gift of the
          Wise, Doctor Mia + Trueshot Post/Siege Assembly, Rain of Frogs + Prime
          Oracle Bragda…) are going to be less prominent or downright impossible
          to compose.
        </li>
        <li>
          At least one turn out of two is going to lead to some mana waste, for
          both players equally. This might make for some uncomfortable turns,
          that’s part of the deal.
        </li>
        <li>
          Deck building skills, like in any tournament, is going to be essential
          and will hopefully lead to some unseen decks.
        </li>
      </ul>

      <div style={{ textAlign: 'center' }}>
        <CTA
          href='https://forms.gle/3YhBGpddS5ip2Knk6'
          target='_blank'
          rel='noopener noreferrer'
        >
          Register
        </CTA>
      </div>

      <Title id='code-of-conduct'>Code of Conduct</Title>
      <p>
        In the interest of fostering an open and welcoming environment, we as
        organisers pledge to make participation in our tournament a
        harassment-free experience for everyone, regardless of their identity.
      </p>
      <p>
        No toxic behaviour of any kind will be tolerated, and the organisers
        reserve themselves the rights to disqualify participants contributing to
        a hostile environment, as well as revoking access to said players from
        all tournament-related material.
      </p>
      <p>Participants should be kind and respectful towards one another.</p>

      <Title id='format'>Format</Title>
      <p>
        The encounters will be decided as the{' '}
        <span className='Highlight'>best of 3 equal games</span> (or “Bo3”)
        except for the very final match which will be best of 5 equal games (or
        “Bo5”). To respect everyone’s time, the series of 3 matches (or 5 for
        the finale) should be done in one go as much as possible. Please try to
        play until reaching an outcome.
      </p>

      <p>
        The first match between 2 players will define who goes first. The second
        match between the same two players should{' '}
        <span className='Highlight'>
          make sure to swap the order of players
        </span>
        : the former first player becomes second and vice versa. If the game
        does not do that by chance, the game should be restarted until the order
        of players has switched. The order for the third match between the same
        two players (if there is one) is done at random by the game itself.
      </p>
      <p>
        In case a player does not show up or cannot perform their games within
        the allocated time, the matches they did not do will be counted as
        defeats.
      </p>

      <Title id='timeline'>Timeline</Title>
      <Timeline items={TIMELINE} />

      <Title id='rewards'>Rewards</Title>
      <p>The rewards go as follow:</p>
      <ol>
        <li>
          The tournament winner is awarded{' '}
          <span className='Highlight'>Mirz’ Stash</span>:{' '}
          <Coins amount='1000' />, <Rubies amount='80' /> and{' '}
          <Stones amount='15' />.
        </li>
        <li>
          The tournament runner-up is awarded{' '}
          <span className='Highlight'>Tegor’s Loot</span>:{' '}
          <Coins amount='600' />, <Rubies amount='60' /> and{' '}
          <Stones amount='10' />.
        </li>
        <li>
          The tournament third-place finisher is awarded{' '}
          <span className='Highlight'>Bragda’s Wisdom</span>:{' '}
          <Coins amount='300' />, <Rubies amount='40' /> and{' '}
          <Stones amount='5' />.
        </li>
      </ol>

      <p>
        Additionally, the top-performing player of each group during the group
        stage will be rewarded{' '}
        <span className='Highlight'>Edrik’s pocket money</span>:{' '}
        <Coins amount='100' />, <Rubies amount='10' /> and <Stones amount='2' />
        .
      </p>

      <Title id='banned-cards'>Banned Cards</Title>
      <ListBuilderTier
        name='You cannot use the following cards.'
        cards={['N8', 'N34', 'N46', 'I28']}
        color='red'
        prefix={`tier-`}
        isEditable={false}
      />

      <Title id='deck-changes'>Deck Changes</Title>
      <p>The basic rules for deck changes are as follow:</p>

      <ul>
        <li>
          Every player is granted one deck change for the tournament (see below
          for additional circumstances).
        </li>
        <li>
          At no point during the tournament can the faction be changed, so
          participants should pick their faction wisely.
        </li>
        <li>
          A deck change can replace up to 4 cards. This implies it is not
          possible to go from an even deck to an odd deck and vice versa.
        </li>
      </ul>
      <p>
        Additionally, before a match between two players is announced, here is
        what happens:
      </p>
      <ul>
        <li>
          If none of the two players is enabling their deck change, the match
          proceeds as usual.
        </li>
        <li>
          If a player wants to change their deck, their opponent is granted a
          deck change opportunity as well, whether or not they have already
          issued their own deck change during the tournament. The decks are
          updated privately and only revealed when both players have recorded
          their deck changes with the tournament organisers.
        </li>
      </ul>

      <p style={{ fontStyle: 'italic' }}>
        For example:{' '}
        <span style={{ color: 'var(--light-winter)' }}>Charlie</span> — who has
        already changed their deck once during the tournament — is supposed to
        face <span style={{ color: 'var(--light-shadowfen)' }}>Jamie</span>{' '}
        next. <span style={{ color: 'var(--light-shadowfen)' }}>Jamie</span>{' '}
        decides they want to change their deck. Therefore,{' '}
        <span style={{ color: 'var(--light-winter)' }}>Charlie</span> is also
        offered the possibility to change their deck. Both participants will
        inform the organisers of their deck change (or lack thereof) privately
        without disclosing the details to each other. Once done, the organisers
        will reveal both decks to everyone, and the match can be scheduled
        between the two participants. Note that while{' '}
        <span style={{ color: 'var(--light-winter)' }}>Charlie</span> was
        offered the opportunity to change their deck, they did not have to; they
        can inform the organiser that they will keep their deck as is.
      </p>
      <p>
        This rule is essentially there to make sure someone does not make a
        counter-deck, only to have their opponent waiting to see the changes to
        perform their own deck update reactionarily.
      </p>

      <Info icon='stack' title='Deck Spreadsheet'>
        You can have a look at every participant’s current deck (and information
        such as their timezone and Stormbound ID) at any time during the
        tournament by visiting the{' '}
        <a
          href='https://docs.google.com/spreadsheets/d/1qsqvQyPVlhBCp-kZAOVsIkC-25EHngjbvlLzc7Imz8E/edit#gid=0'
          target='_blank'
          rel='noopener noreferrer'
        >
          the deck spreadsheet
        </a>
        .
      </Info>

      <hr />

      <Notice icon='heart'>
        Be kind to one another, and enjoy the tournament!
      </Notice>

      <PageMeta
        title='The Odd Tournament'
        description='Everything you need to know to participate in The Odd Tournament, an upcoming Tournament by Derk & Kitty'
      />
    </Article>
  )
})
