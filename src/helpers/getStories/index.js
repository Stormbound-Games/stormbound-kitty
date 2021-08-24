import fs from 'fs/promises'
import path from 'path'

const cache = new Map()

const getStories = async () => {
  if (cache.has('stories')) {
    return cache.get('stories')
  }

  const dir = path.join(process.cwd(), 'src', 'data', 'stories')
  const files = await fs.readdir(dir)
  const stories = await Promise.all(
    files.map(async file => {
      const slug = file.replace('.json', '')
      const raw = await fs.readFile(path.join(dir, file), 'utf8')
      const content = JSON.parse(raw)

      return { ...content, slug }
    })
  )

  cache.set('stories', stories)

  return stories
}

export default getStories
