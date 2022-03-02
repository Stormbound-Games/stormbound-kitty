import React from 'react'
import Member from '~/components/Member'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import useMemberName from '~/hooks/useMemberName'
import getContentFromUser from '~/api/users/getContentFromUser'
import getCards from '~/api/cards/getCards'
import getUsers from '~/api/users/getUsers'

export async function getStaticPaths() {
  const paths = (await getUsers()).map(user => ({
    params: { id: user.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const data = await getContentFromUser({
    author: params.id.toLowerCase(),
    isPreview,
  })

  // This is a bit of a hack, in case there is a link to a member page that is
  // missing the ID and gets serialized as `undefined`.
  if (params.id === 'undefined') {
    return { notFound: true }
  }

  return {
    props: { cards, navigation, ...data },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const MemberPage = ({ navigation, cards, ...props }) => {
  const [name] = useMemberName()
  const active =
    name?.toLowerCase() === props.user.slug
      ? ['YOUR_CONTENT', 'YOUR_CONTENT', 'FEED']
      : ['COMMUNITY', 'DISCOVER', 'MEMBERS']

  return (
    <Layout active={active} navigation={navigation}>
      <Member {...props} />
    </Layout>
  )
}

export default MemberPage
