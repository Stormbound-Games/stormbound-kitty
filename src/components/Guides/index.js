import React from 'react'
import CTA from '../CTA'
import Row from '../Row'
import Column from '../Column'
import PageMeta from '../PageMeta'
import './index.css'

const COLORS = {
  neutral: 'rgba(222, 215, 164, 0.5)',
  ironclad: 'var(--ironclad)',
  shadowfen: 'var(--shadowfen)',
  winter: 'var(--winter)',
  swarm: 'var(--swarm)'
}

const Guides = props => (
  <div className="Guides">
    <h1 className="visually-hidden">Guides</h1>
    <div className="Guides__base" style={{ '--color': COLORS.neutral }}>
      <div className="Guides__inner">
        <Row desktopOnly wideGutter>
          <Column width={66}>
            <h2 className="Guides__title">Complete Guide</h2>
            <span className="Guides__author">By Arikrat</span>
            <p className="Guides__excerpt">
              Learn the basics of Stormbound and more with this in-depth guide
              by Arikrat. From battle placement to upgrade strategies, you’ll
              learn everything you’ll need to know to make your way towards
              Diamond!
            </p>
            <CTA
              className="Guides__CTA"
              aria-label="Read complete guide by Arikrat"
              to="/guides/complete"
            >
              Read guide
            </CTA>
          </Column>
          <Column width={33}>
            <img
              src="/assets/images/cards/gifted_recruits.png"
              alt=""
              className="Guides__image"
            />
          </Column>
        </Row>
      </div>
    </div>

    <div className="Guides__base" style={{ '--color': COLORS.shadowfen }}>
      <div className="Guides__inner">
        <Row desktopOnly wideGutter>
          <Column width={66}>
            <h2 className="Guides__title">Deck building guide</h2>
            <span className="Guides__author">By Zemeu</span>
            <p className="Guides__excerpt">
              In this primer guide to building efficient decks, Zemeu goes
              through fundamental concepts such as mana curve, need for cheap
              units, and winning strategies. If you’re looking to making your
              own deck, you’re at the right place.
            </p>
            <CTA
              className="Guides__CTA"
              aria-label="Read deck building guide by Zemeu"
              to="/guides/deck"
            >
              Read guide
            </CTA>
          </Column>
          <Column width={33}>
            <img
              src="/assets/images/cards/archdruid_earyn.png"
              alt=""
              className="Guides__image"
            />
          </Column>
        </Row>
      </div>
    </div>

    <div className="Guides__base" style={{ '--color': COLORS.winter }}>
      <div className="Guides__inner">
        <Row desktopOnly wideGutter>
          <Column width={66}>
            <h2 className="Guides__title">Winter guide</h2>
            <span className="Guides__author">By WinterBoii</span>
            <p className="Guides__excerpt">
              In this deep-dive, WinterBoii tells us how to play, well, Winter
              Pact. From creating a deck to using niche abilities like Broken
              Earth Drakes’ and Rockworkers’, you should learn everything you
              need to know. Snow problem.
            </p>
            <CTA
              className="Guides__CTA"
              aria-label="Read winter guide by WinterBoii"
              to="/guides/winter"
            >
              Read guide
            </CTA>
          </Column>
          <Column width={33}>
            <img
              src="/assets/images/cards/frozen_core.png"
              alt=""
              className="Guides__image"
            />
          </Column>
        </Row>
      </div>
    </div>

    <div className="Guides__base" style={{ '--color': COLORS.neutral }}>
      <div className="Guides__inner">
        <Row desktopOnly wideGutter>
          <Column width={66}>
            <h2 className="Guides__title">Pirate guide</h2>
            <span className="Guides__author">By MooreFunn</span>
            <p className="Guides__excerpt">
              In this comprehensive guide, MooreFunn tells us how to conquer the
              seas with pirate cards! From composing an efficient deck to
              countering specific situations , you should learn everything you
              need to know to master pirate gameplay.
            </p>
            <CTA
              className="Guides__CTA"
              aria-label="Read pirate guide by MooreFunn"
              to="/guides/pirate"
            >
              Read guide
            </CTA>
          </Column>
          <Column width={33}>
            <img
              src="/assets/images/cards/lucky_charmers.png"
              alt=""
              className="Guides__image"
            />
          </Column>
        </Row>
      </div>
    </div>

    <div className="Guides__base" style={{ '--color': COLORS.ironclad }}>
      <div className="Guides__inner">
        <Row desktopOnly wideGutter>
          <Column width={66}>
            <h2 className="Guides__title">Lexicon</h2>
            <p className="Guides__excerpt">
              Stormbound discussions are full of acronyms and shortened names.
              Tired of not being able to follow what’s going on on Discord and
              Reddit? This guide is for you.
            </p>
            <CTA className="Guides__CTA" to="/guides/lexicon">
              Read lexicon
            </CTA>
          </Column>
          <Column width={33}>
            <img
              src="/assets/images/cards/lawless_herd.png"
              alt=""
              className="Guides__image"
            />
          </Column>
        </Row>
      </div>
    </div>

    <PageMeta
      title="Guides"
      description="Guides from the community about Stormbound"
    />
  </div>
)

export default Guides
