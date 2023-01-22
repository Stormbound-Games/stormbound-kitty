import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { table } from '@sanity/table'
import { media } from 'sanity-plugin-media'
import structure, { defaultDocumentNode } from './config/structure'
import productionUrl from './config/productionUrl'
import actions from './config/actions'
import newDocumentOptions from './config/newDocumentOptions'
import theme from './config/theme'
import toolMenu from './config/toolMenu'
import schema from './config/schema'

export default defineConfig({
  name: 'default',
  title: 'Stormbound-Kitty',

  projectId: '5hlpazgd',
  dataset: 'production',

  plugins: [
    table(),
    deskTool({ structure, defaultDocumentNode }),
    media(),
    visionTool(),
  ],

  document: { actions, newDocumentOptions, productionUrl },
  schema: { types: schema },
  studio: { components: { toolMenu } },
  theme,
})
