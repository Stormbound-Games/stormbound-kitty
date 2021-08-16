import React from 'react'
import Member from '~/components/Member'
import Layout from '~/components/Layout'
import getMembersList from '~/helpers/getMembersList'

export async function getStaticPaths() {
  const paths = getMembersList().map(({ member }) => ({
    params: { id: member },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  return { props: { id: context.params.id.toLowerCase() } }
}

const MemberPage = props => (
  <Layout active={['COMMUNITY', 'MEMBERS']}>
    <Member memberId={props.id} />
  </Layout>
)

export default MemberPage
