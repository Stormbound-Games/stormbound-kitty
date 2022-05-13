import React from 'react'
import PageListBuilderDisplay from '~/components/PageListBuilderDisplay'
import PageListBuilderEditor from '~/components/PageListBuilderEditor'
import getInitialListData from '~/helpers/getInitialListData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import { DEFAULT_LIST } from '~/constants/list'

export async function getStaticPaths() {
  return { paths: [{ params: { id: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [id, view] = params.id || []
  const breadcrumbs = ['TOOLS', 'BUILDERS', 'LIST_BUILDER']

  if (view && view !== 'display') {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: { settings, tiers: DEFAULT_LIST, mode: 'EDITOR', breadcrumbs },
    }
  }

  return {
    props: {
      settings,
      tiers: getInitialListData(id),
      mode: view === 'display' ? 'DISPLAY' : 'EDITOR',
      breadcrumbs,
    },
  }
}

const ListBuilderPage = props =>
  props.mode === 'DISPLAY' ? (
    <PageListBuilderDisplay {...props} />
  ) : (
    <PageListBuilderEditor {...props} />
  )

export default ListBuilderPage
