import React from 'react'
import ListBuilderDisplayView from '~/components/ListBuilderDisplayView'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import getInitialListData from '~/helpers/getInitialListData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import { DEFAULT_LIST } from '~/constants/list'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [id, display] = params.rest || []

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
    },
  }
}

const ListBuilderPage = ({ settings, ...props }) =>
  props.mode === 'DISPLAY' ? (
    <ListBuilderDisplayView {...props} listId={props.id} />
  ) : (
    <ListBuilderEditorView {...props} listId={props.id} />
  )

export default ListBuilderPage
