import PageReleaseNotes from '~/components/PageReleaseNotes'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getRelease from '~/api/releases/getRelease'
import getReleases from '~/api/releases/getReleases'

export async function getStaticPaths() {
  const releases = await getReleases()

  return {
    paths: releases.map(release => ({ params: { slug: release.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const release = await getRelease({ slug: params.slug, isPreview })

  if (!release) {
    return { notFound: true }
  }

  return {
    props: {
      settings,
      ...release,
      breadcrumbs: ['GAME', 'UPDATES', release.id],
    },
  }
}

export default PageReleaseNotes
