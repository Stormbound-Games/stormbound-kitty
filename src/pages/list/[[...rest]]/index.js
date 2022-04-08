import React from 'react'
import PageListBuilderDisplay from '~/components/PageListBuilderDisplay'
import PageListBuilderEditor from '~/components/PageListBuilderEditor'
import getInitialListData from '~/helpers/getInitialListData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import { DEFAULT_LIST } from '~/constants/list'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [id, display] = params.rest || []
  const breadcrumbs = ['TOOLS', 'BUILDERS', 'LIST_BUILDER']

  if (display && display !== 'display') {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: {
        settings,
        tiers: DEFAULT_LIST,
        id: null,
        mode: 'EDITOR',
        breadcrumbs,
      },
    }
  }

  const tiers = getInitialListData(id)

  return {
    props: {
      settings,
      tiers,
      id,
      mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      breadcrumbs,
    },
  }
}

const ListBuilderPage = ({ settings, ...props }) =>
  props.mode === 'DISPLAY' ? (
    <PageListBuilderDisplay {...props} listId={props.id} />
  ) : (
    <PageListBuilderEditor {...props} listId={props.id} />
  )

export default ListBuilderPage
