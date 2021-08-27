import React from 'react'
import dynamic from 'next/dynamic'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import ReleaseNotes from '~/components/ReleaseNotes'
import getNavigation from '~/helpers/getNavigation'
import RELEASES from '~/data/releases'

const options = { loading: Loader }

const RELEASE_COMPONENTS = {
  '2021_09': dynamic(
    () => import('~/components/ReleaseNotes/2021_09'),
    options
  ),
  '2021_08': dynamic(
    () => import('~/components/ReleaseNotes/2021_08'),
    options
  ),
  '2021_07': dynamic(
    () => import('~/components/ReleaseNotes/2021_07'),
    options
  ),
  '2021_06_Brawl': dynamic(
    () => import('~/components/ReleaseNotes/2021_06_Brawl'),
    options
  ),
  '2021_06': dynamic(
    () => import('~/components/ReleaseNotes/2021_06'),
    options
  ),
  '2021_05': dynamic(
    () => import('~/components/ReleaseNotes/2021_05'),
    options
  ),
  '2021_04': dynamic(
    () => import('~/components/ReleaseNotes/2021_04'),
    options
  ),
  '2021_03': dynamic(
    () => import('~/components/ReleaseNotes/2021_03'),
    options
  ),
  '2021_02': dynamic(
    () => import('~/components/ReleaseNotes/2021_02'),
    options
  ),
  '2021_01_iOS': dynamic(
    () => import('~/components/ReleaseNotes/2021_01_iOS'),
    options
  ),
  '2021_01': dynamic(
    () => import('~/components/ReleaseNotes/2021_01'),
    options
  ),
  '2020_12_end_of_year': dynamic(
    () => import('~/components/ReleaseNotes/2020_12_end_of_year'),
    options
  ),
  '2020_12': dynamic(
    () => import('~/components/ReleaseNotes/2020_12'),
    options
  ),
  '2020_11': dynamic(
    () => import('~/components/ReleaseNotes/2020_11'),
    options
  ),
  '2020_10': dynamic(
    () => import('~/components/ReleaseNotes/2020_10'),
    options
  ),
  '2020_09_3rd_anniversary': dynamic(
    () => import('~/components/ReleaseNotes/2020_09_3rd_anniversary'),
    options
  ),
  '2020_09': dynamic(
    () => import('~/components/ReleaseNotes/2020_09'),
    options
  ),
  '2020_07': dynamic(
    () => import('~/components/ReleaseNotes/2020_07'),
    options
  ),
}

export const getStaticPaths = () => {
  return {
    paths: RELEASES.map(release => ({ params: { slug: release.slug } })),
    fallback: false,
  }
}

export const getStaticProps = ({ params }) => {
  return {
    props: {
      navigation: getNavigation(),
      ...(RELEASES.find(release => release.slug === params.slug) || null),
    },
  }
}

const ReleasePage = ({ navigation, ...props }) => {
  if (!(props.id in RELEASE_COMPONENTS)) return null
  const Component = RELEASE_COMPONENTS[props.id]

  return (
    <Layout active={['GAME', 'UPDATES', props.id]} navigation={navigation}>
      <ReleaseNotes {...props}>
        <Component />
      </ReleaseNotes>
    </Layout>
  )
}

export default ReleasePage
