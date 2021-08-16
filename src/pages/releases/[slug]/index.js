import React from 'react'
import dynamic from 'next/dynamic'
import Layout from '~/components/Layout'
import RELEASES from '~/data/releases'

const RELEASE_COMPONENTS = {
  '08_2021': dynamic(() => import('~/components/ReleaseNotesAugust2021')),
  '07_2021': dynamic(() => import('~/components/ReleaseNotesJuly2021')),
  brawl_2021: dynamic(() => import('~/components/ReleaseNotesBrawl2021')),
  '06_2021': dynamic(() => import('~/components/ReleaseNotesJune2021')),
  '05_2021': dynamic(() => import('~/components/ReleaseNotesMay2021')),
  '04_2021': dynamic(() => import('~/components/ReleaseNotesApril2021')),
  '03_2021': dynamic(() => import('~/components/ReleaseNotesMarch2021')),
  '02_2021': dynamic(() => import('~/components/ReleaseNotesFebruary2021')),
  temple_of_focus: dynamic(() =>
    import('~/components/ReleaseNotesTempleOfFocus')
  ),
  ios_01_2021: dynamic(() => import('~/components/ReleaseNotesIOSJanuary2021')),
  end_of_2020: dynamic(() => import('~/components/ReleaseNotesEndOf2020')),
  '12_2020': dynamic(() => import('~/components/ReleaseNotesDecember2020')),
  '11_2020': dynamic(() => import('~/components/ReleaseNotesNovember2020')),
  '10_2020': dynamic(() => import('~/components/ReleaseNotesOctober2020')),
  '3RD_ANNIVERSARY': dynamic(() =>
    import('~/components/ReleaseNotes3rdAnniversary')
  ),
  '09_2020': dynamic(() => import('~/components/ReleaseNotesSeptember2020')),
  '07_2020': dynamic(() => import('~/components/ReleaseNotesJuly2020')),
}

export const getStaticPaths = () => {
  return {
    paths: RELEASES.map(release => ({ params: { slug: release.slug } })),
    fallback: false,
  }
}

export const getStaticProps = ({ params }) => {
  return {
    props: { id: RELEASES.find(release => release.slug === params.slug).id },
  }
}

export default props => {
  const Component = RELEASE_COMPONENTS[props.id]

  return (
    <Layout active={['GAME', props.id]}>
      <Component />
    </Layout>
  )
}
