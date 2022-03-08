import React from 'react'
import Member from '~/components/Member'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
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
  const settings = await getSiteSettings({ isPreview })
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
    props: { cards, settings, ...data },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const MemberPage = ({ settings, cards, ...props }) => {
  const [name] = useMemberName()
  const active =
    name?.toLowerCase() === props.user.slug
      ? ['YOUR_CONTENT', 'YOUR_CONTENT', 'FEED']
      : ['COMMUNITY', 'DISCOVER', 'MEMBERS']

  return (
    <Layout active={active} settings={settings}>
      <Member {...props} />
    </Layout>
  )
}

export default MemberPage
