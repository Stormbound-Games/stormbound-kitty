import React from 'react'
import Article from '../Article'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Title from '../Title'
import WikiLink from '../WikiLink'

export default React.memo(function ChangelogSeptember2020(props) {
  return (
    <Article
      author='Kitty'
      title='Update 09-2020'
      backLink={{
        to: '/changelog/releases',
        children: 'Back to release notes',
      }}
      meta='Official announcement'
      className='ChangelogSeptember2020'
      background='/assets/images/banners/environment_dragon.jpg'
      withAvif
    >
      <p>
        On the 1st of September, a small balance patch will{' '}
        <span style={{ color: 'var(--light-shadowfen)' }}>
          buff 12 different cards
        </span>{' '}
        (mainly neutral). Nothing too groundbreaking but it will hopefully show
        some love to some under-appreciated cards. Without further ado, allow me
        to disclose the list of changes.
      </p>

      <Title>Neutral</Title>

      <p>
        <WikiLink id='N20' /> now have 4/5/6/7/8 strength (instead of
        3/4/4/5/6).
      </p>

      <p>
        <WikiLink id='N29' />
        ’s ability now deals 1/2/2-3/3/4 damage (instead of 1/1-2/2/2-3/3),
        making it more compelling at level 5.
      </p>

      <p>
        <WikiLink id='N31' /> now costs 4 mana (instead of 5). It is unclear
        whether that will increase the popularity of this card at all however.
      </p>

      <p>
        <WikiLink id='N63' /> now costs 3 mana (instead of 2) and its ability
        now targets a unit with at most 4/5/6/7/8 strength.
      </p>

      <p>
        <WikiLink id='N23' /> now costs 2 mana at every level (instead of 3 at
        level 1 to 3) and its ability now deals 2/3/4/5/6 damage (instead of
        2/3/4/4/5 damage).
      </p>

      <p>
        <WikiLink id='N57' /> now cost 8 mana (instead of 9) and have
        6/7/9/11/13 strength (instead of 7/8/10/12/15). This might mean this
        card gets to be used outside of mana ramp decks.
      </p>

      <p>
        <WikiLink id='N38' /> now cost 5 mana (instead of 6). Hopefully a way to
        make this interesting community-designed card more prominent in the
        meta.
      </p>

      <p>
        <WikiLink id='N27' /> now have 2/3/4/5/6 strength (instead of
        1/2/3/4/5).
      </p>

      <p>
        <WikiLink id='N51' /> now cost 6 mana (instead of 7) and has 4/5/6/8/10
        strength (instead of 5/7/7/10/10).
      </p>

      <Title>Ironclad</Title>

      <p>
        <WikiLink id='I5' /> now has 5/6/7/8/9 strength (instead of 4/5/6/7/8),
        which essentially grants it an extra turn at levels 1, 3 and 5 (provided
        it does not receive other damage).
      </p>

      <p>
        <WikiLink id='I3' /> now costs 2 mana at every level (instead of 3 at
        level 1 to 3) and its ability now grants 2/3/4/5/6 strength (instead of
        2/3/4/4/5).
      </p>

      <Title>Winter</Title>

      <p>
        <WikiLink id='W24' /> now has 4/5/7/8/10 strength (instead of
        4/5/6/7/8), and its ability is 1/1-2/1-2/2/2 (instead of 1 at every
        level).
      </p>

      <Notice>
        <span className='Highlight'>Meow</span> and happy fighting, fellow
        Stormbounders!
      </Notice>

      <PageMeta
        title='Update 09-2020'
        description='Discover everything there is to know about the minor Stormbound balance tweaks!'
        image='/assets/images/banners/environment_dragon.png'
      />
    </Article>
  )
})
