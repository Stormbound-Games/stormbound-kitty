import React from 'react'
import Banner from '../Banner'
import PageMeta from '../PageMeta'

const Guides = props => (
  <>
    <h1 className="visually-hidden">Guides</h1>

    <Banner
      faction="neutral"
      title="Complete Guide"
      subline="By Arikrat"
      copy="Learn the basics of Stormbound and more with this in-depth guide by Arikrat. From battle placement to upgrade strategies, you’ll learn everything you’ll need to know to make your way towards Diamond!"
      cta={{
        'aria-label': 'Read complete guide by Arikrat',
        to: '/guides/complete',
        children: 'Read guide'
      }}
      image="/assets/images/cards/gifted_recruits.png"
    />

    <Banner
      faction="shadowfen"
      title="Deck Building Guide"
      subline="By Zemeu"
      copy="In this primer guide to building efficient decks, Zemeu goes through fundamental concepts such as mana curve, need for cheap units, and winning strategies. If you’re looking to making your own deck, you’re at the right place."
      cta={{
        'aria-label': 'Read deck building guide by Zemeu',
        to: '/guides/deck',
        children: 'Read guide'
      }}
      image="/assets/images/cards/archdruid_earyn.png"
    />

    <Banner
      faction="winter"
      title="Winter Guide"
      subline="By WinterBoii"
      copy="In this deep-dive, WinterBoii tells us how to play, well, Winter Pact. From creating a deck to using niche abilities like Broken Earth Drakes’ and Rockworkers’, you should learn everything you need to know. Snow problem."
      cta={{
        'aria-label': 'Read winter guide by WinterBoii',
        to: '/guides/winter',
        children: 'Read guide'
      }}
      image="/assets/images/cards/frozen_core.png"
    />

    <Banner
      faction="neutral"
      title="Pirate Guide"
      subline="By MooreFunn"
      copy="In this comprehensive guide, MooreFunn tells us how to conquer the seas with pirate cards! From composing an efficient deck to countering specific situations, you should learn everything you need to know to master pirate gameplay."
      cta={{
        'aria-label': 'Read pirate guide by MooreFunn',
        to: '/guides/pirate',
        children: 'Read guide'
      }}
      image="/assets/images/cards/lucky_charmers.png"
    />

    <Banner
      faction="ironclad"
      title="Lexicon"
      copy="Stormbound discussions are full of acronyms and shortened names. Tired of not being able to follow what’s going on on Discord and Reddit? This guide is for you."
      cta={{ to: '/guides/lexicon', children: 'Read lexicon' }}
      image="/assets/images/cards/lawless_herd.png"
    />

    <PageMeta
      title="Guides"
      description="Guides from the community about Stormbound"
    />
  </>
)

export default Guides
