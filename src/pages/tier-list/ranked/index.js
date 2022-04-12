import PageRankedList from '~/components/PageRankedList'
import getInitialListData from '~/helpers/getInitialListData'
import getLiveTierList from '~/helpers/getLiveTierList'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const tierList = await getLiveTierList({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const list = getInitialListData(tierList)

  return {
    props: {
      settings,
      list,
      breadcrumbs: ['COMMUNITY', 'META', 'RANKED_LIST'],
    },
  }
}

export default PageRankedList
