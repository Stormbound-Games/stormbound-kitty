import PageMember from '~/components/PageMember'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getContentFromUser from '~/api/users/getContentFromUser'
import getUsers from '~/api/users/getUsers'

export async function getStaticPaths() {
  const paths = (await getUsers()).map(user => ({
    params: { slug: user.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const data = await getContentFromUser({
    slug: params.slug,
    isPreview,
  })

  if (!data.user) {
    return { notFound: true }
  }

  // This is a bit of a hack, in case there is a link to a member page that is
  // missing the ID and gets serialized as `undefined`.
  if (params.slug === 'undefined') {
    return { notFound: true }
  }

  return {
    props: {
      settings,
      ...data,
      breadcrumbs: ['COMMUNITY', 'DISCOVER', 'MEMBERS'],
    },
  }
}

export default PageMember
