const withPlugins = require('next-compose-plugins')
const { withPlausibleProxy } = require('next-plausible')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const plugins = [
  withPlausibleProxy(),
  withBundleAnalyzer({
    enabled: process.env.WEBPACK_BUNDLE_ANALYZER === '1',
  }),
]

const VERCEL_ENV = process.env.VERCEL_ENV || 'development'

const LEGACY_PATHS = {
  '/card/contest': '/swcc',
  '/card/official/:id*': '/cards/:id*',
  '/card/stats': '/stats',
  '/changelog/:id*': '/releases/:id*',
  '/changelog/cards': '/changelog',
  '/changelog/releases': '/releases',
  '/collection/books': '/calculators/books',
  '/deck/collection': '/decks/bookmarks',
  '/deck/featured': '/decks',
  '/deck/suggestions': '/decks',
  '/donate': '/contribute',
  '/fan-kit/wallpapers': '/fan-kit/wallpapers/desktop',
  '/guides/brawl': '/brawl-mode',
  '/guides/draft': '/draft-mode',
  '/guides/drawing': '/drawing-mechanics',
  '/guides/equals-intro': '/guides/equals',
  '/guides/known-bugs': '/known-bugs',
  '/guides/lexicon': '/lexicon',
  '/income-calculator': '/calculators/income',
  '/list/equals': '/tier-list/equals',
  '/list/equals/display': '/tier-list/equals',
  '/list/ranked': '/tier-list/ranked',
  '/list/ranked/display': '/tier-list/ranked',
  '/member/:id*': '/members/:id*',
  '/releases/end-of-2020': '/releases/01-2021',
  '/sim/:id*': '/simulators/battle/:id*',
  '/simulators/battle/puzzles': '/puzzles',
}

const PERMALINKS = {
  '/guides': '/guides/essentials',
  '/patch-notes': '/api/patch-notes',
  '/rr': '/guides/reckless-rush',
}

const toRedirect = ([source, destination]) => ({
  source,
  destination,
  permanent: true,
})

module.exports = withPlugins(plugins, {
  staticPageGenerationTimeout: 90,
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
      ...Object.entries(LEGACY_PATHS).map(toRedirect),
      ...Object.entries(PERMALINKS).map(toRedirect),
    ]
  },
  async headers() {
    const SELF = "'self'"
    const NONE = "'none'"
    const UNSAFE_INLINE = "'unsafe-inline'"
    const UNSAFE_EVAL = "'unsafe-eval'"
    const directives = {
      'base-uri': [NONE],
      'child-src': [NONE],
      'connect-src': [SELF, /* avif check */ 'data:'],
      'default-src': [SELF],
      'font-src': [SELF],
      'form-action': [SELF],
      'frame-ancestors': [NONE],
      'frame-src': [/* Brewed Sages podcast player */ 'www.podbean.com'],
      'img-src': ['data:', /* custom card images */ '*'],
      'manifest-src': [SELF],
      'media-src': [NONE],
      'object-src': [NONE],
      'script-src': [
        SELF,
        /* Next.js rehydration */ UNSAFE_INLINE,
        /* react-refresh */ VERCEL_ENV === 'development' ? UNSAFE_EVAL : '',
      ],
      'style-src': [/* react-tooltip styles */ SELF, UNSAFE_INLINE],
      'worker-src': [NONE],
    }
    const ContentSecurityPolicy = Object.entries(directives)
      .map(([key, values]) => `${key} ${values.filter(Boolean).join(' ')}`)
      .join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy,
          },
        ],
      },
      {
        source: '/:all*(woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, must-revalidate',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ]
  },
})
