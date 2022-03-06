import groupBy from '~/helpers/groupBy'
import getSWCCWeeks from './getSWCCWeeks'

const getSWCCSeasons = async ({ isPreview } = {}) => {
  const weeks = await getSWCCWeeks({ isPreview })
  const groups = groupBy(weeks, 'season')

  return Object.entries(groups)
    .map(([season, weeks]) => ({ season: +season, weeks }))
    .sort((a, b) => b.season - a.season)
}

export default getSWCCSeasons
