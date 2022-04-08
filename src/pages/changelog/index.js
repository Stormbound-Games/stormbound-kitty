import PageCardChangelog from '~/components/PageCardChangelog'
import getChanges from '~/api/changes/getChanges'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const changelog = await getChanges({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      changelog,
      settings,
      breadcrumbs: ['GAME', 'UPDATES', 'CARD_CHANGELOG'],
    },
  }
}

export default PageCardChangelog
