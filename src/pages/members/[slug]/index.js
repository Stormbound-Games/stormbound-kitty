import React from 'react'
import Member from '~/components/Member'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import useUser from '~/hooks/useUser'
import getContentFromUser from '~/api/users/getContentFromUser'
import getUsers from '~/api/users/getUsers'

export async function getStaticPaths() {
  const paths = (await getUsers()).map(user => ({
    params: { slug: user.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const data = await getContentFromUser({
    slug: params.slug,
    isPreview,
  })

  // This is a bit of a hack, in case there is a link to a member page that is
  // missing the ID and gets serialized as `undefined`.
  if (params.slug === 'undefined') {
    return { notFound: true }
  }

  return {
    props: { settings, ...data },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const MemberPage = ({ settings, ...props }) => {
  const [user] = useUser()
  const active =
    user && user.slug === props.user.slug
      ? ['YOUR_CONTENT', 'YOUR_CONTENT', 'FEED']
      : ['COMMUNITY', 'DISCOVER', 'MEMBERS']

  return (
    <Layout active={active} settings={settings}>
      <Member {...props} />
    </Layout>
  )
}

export default MemberPage
