import React from 'react'
import { TIER_COLORS, MAX_TIERS } from '~/constants/list'
import Page from '~/components/Page'
import CTA from '~/components/CTA'
import Row from '~/components/Row'
import ShareButton from '~/components/ListBuilderShareButton'
import ListBuilderTier from '~/components/ListBuilderTier'
import ListBuilderToc from '~/components/ListBuilderToc'
import Title from '~/components/Title'

export default React.memo(function ListBuilderDisplayView(props) {
  const { tiers, listId: id } = props

  return (
    <Page
      title='List builder'
      description='Compose your own tier lists from the Stormbound cards, ranking them the way you see fit'
      action={{
        to: `/list/${id}`,
        children: 'Edit list',
      }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Information</Title>

          <p>
            This tier list editor makes it possible to create up to {MAX_TIERS}{' '}
            tiers of cards. It is currently very much in active development so
            make sure to report any bug, oddity or desired features.
          </p>

          <ListBuilderToc tiers={tiers} />

          <Row>
            <Row.Column>
              <CTA to={`/list/${id}`}>Edit list</CTA>
            </Row.Column>
            <Row.Column>
              <ShareButton title='Share tier list' />
            </Row.Column>
          </Row>
        </Row.Column>
        <Row.Column width='2/3'>
          <Title>Tier list</Title>

          {tiers.map((tier, index) => (
            <ListBuilderTier
              {...tier}
              color={TIER_COLORS[index]}
              key={index}
              prefix={`tier-${index}-`}
              isEditable={false}
            />
          ))}
        </Row.Column>
      </Row>
    </Page>
  )
})
