import React from 'react'
import Member from '~/components/Member'
import Layout from '~/components/Layout'
import getMemberContent from '~/helpers/getMemberContent'
import getMembersList from '~/helpers/getMembersList'
import getNavigation from '~/helpers/getNavigation'
import useMemberName from '~/hooks/useMemberName'

export async function getStaticPaths() {
  const paths = (await getMembersList()).map(({ member }) => ({
    params: { id: member.toLowerCase() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const id = context.params.id.toLowerCase()
  const { channel, count, content, details, displayName, roles } =
    await getMemberContent(id)

  // This is a bit of a hack, in case there is a link to a member page that is
  // missing the ID and gets serialized as `undefined`.
  if (id === 'undefined') {
    return { notFound: true }
  }

  return {
    props: {
      navigation: getNavigation(),
      id,
      channel,
      content,
      count,
      details,
      displayName,
      roles,
    },
  }
}

const MemberPage = ({ navigation, ...props }) => {
  const [name] = useMemberName()
  const active =
    name?.toLowerCase() === props.id
      ? ['YOUR_CONTENT', 'YOUR_CONTENT', 'FEED']
      : ['COMMUNITY', 'DISCOVER', 'MEMBERS']

  return (
    <Layout active={active} navigation={navigation}>
      <Member memberId={props.id} {...props} />
    </Layout>
  )
}

export default MemberPage
