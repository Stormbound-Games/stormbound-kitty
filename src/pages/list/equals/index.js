import PageEqualsList from '~/components/PageEqualsList'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getEqualTierList from '~/api/misc/getEqualTierList'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const equalTierList = await getEqualTierList({ isPreview })

  return {
    props: {
      settings,
      date: equalTierList.date,
      list: equalTierList.tiers,
      breadcrumbs: ['COMMUNITY', 'META', 'EQUALS_LIST'],
    },
  }
}

export default PageEqualsList
