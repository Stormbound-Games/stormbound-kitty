import { BRAWLS } from '../../constants/brawl'

const hasBrawlData = () =>
  BRAWLS.some(brawl => {
    try {
      const payload = localStorage.getItem('sk.brawl.' + brawl.id)
      const data = JSON.parse(payload)

      return data.some(entry => entry.matches.length > 0)
    } catch (error) {
      return false
    }
  })

export default hasBrawlData
