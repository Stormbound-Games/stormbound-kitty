import React from 'react'
import Member from '~/components/Member'
import Layout from '~/components/Layout'
import getMemberContent from '~/helpers/getMemberContent'
import getMembersList from '~/helpers/getMembersList'
import getNavigation from '~/helpers/getNavigation'
import useMemberName from '~/hooks/useMemberName'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  const paths = (await getMembersList()).map(({ member }) => ({
    params: { id: member.toLowerCase() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const id = params.id.toLowerCase()
  const { channel, count, content, details, displayName, roles } =
    await getMemberContent({ id, isPreview })

  // This is a bit of a hack, in case there is a link to a member page that is
  // missing the ID and gets serialized as `undefined`.
  if (id === 'undefined') {
    return { notFound: true }
  }

  return {
    props: {
      cards: CARDS,
      navigation: await getNavigation({ isPreview }),
      id,
      channel,
      content,
      count,
      details,
      displayName,
      roles,
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const MemberPage = ({ navigation, cards, ...props }) => {
  const [name] = useMemberName()
  const active =
    name?.toLowerCase() === props.id
      ? ['YOUR_CONTENT', 'YOUR_CONTENT', 'FEED']
      : ['COMMUNITY', 'DISCOVER', 'MEMBERS']

  return (
    <Layout active={active} navigation={navigation} cards={cards}>
      <Member memberId={props.id} {...props} />
    </Layout>
  )
}

export default MemberPage
