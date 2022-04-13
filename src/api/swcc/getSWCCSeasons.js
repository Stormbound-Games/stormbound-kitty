import groupBy from '~/helpers/groupBy'
import getSWCCContests from './getSWCCContests'

const getSWCCSeasons = async ({ isPreview } = {}) => {
  const contests = await getSWCCContests({ isPreview })
  const groups = groupBy(contests, 'season')

  return Object.entries(groups)
    .map(([season, contests]) => ({ season: +season, contests }))
    .sort((a, b) => b.season - a.season)
}

export default getSWCCSeasons
