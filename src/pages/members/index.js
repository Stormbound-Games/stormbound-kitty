import Members from '~/components/Members'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getUsers from '~/api/users/getUsers'

export async function getStaticProps({ preview: isPreview = false }) {
  const members = await getUsers({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      settings,
      members,
      breadcrumbs: ['COMMUNITY', 'DISCOVER', 'MEMBERS'],
    },
  }
}

export default Members
