const withBundleAnalyzer = require('@next/bundle-analyzer')

const VERCEL_ENV = process.env.VERCEL_ENV || 'development'

const LEGACY_PATHS = {
  '/card/contest': '/swcc',
  '/card/official/:id*': '/cards/:id*',
  '/card/stats': '/stats',
  '/changelog/:id': '/releases/:id',
  '/changelog/cards': '/changelog',
  '/changelog/releases': '/releases',
  '/collection/books': '/calculators/books',
  '/deck/collection': '/decks/bookmarks',
  '/deck/featured': '/decks',
  '/deck/suggestions': '/decks',
  '/donate': '/contribute',
  '/fan-kit/wallpapers': '/fan-kit/wallpapers/desktop',
  '/guides/complete': '/guides/battle',
  '/guides/beginner': '/rulebook',
  '/guides/brawl': '/brawl-mode',
  '/guides/brawl-mode': '/brawl-mode',
  '/guides/draft': '/draft-mode',
  '/guides/drawing': '/drawing-mechanics',
  '/guides/equals-intro': '/guides/equals',
  '/guides/known-bugs': '/known-bugs',
  '/guides/lexicon': '/lexicon',
  '/income-calculator': '/calculators/income',
  '/list/equals': '/tier-list/equals',
  '/list/equals/display': '/tier-list/equals',
  '/member/:id*': '/members/:id*',
  '/releases/end-of-2020': '/releases/01-2021',
  '/sim/:id*': '/simulators/battle/:id*',
  '/simulators/battle/puzzles': '/puzzles',
  '/tier-list': '/card-usage',
  '/tier-list/heroes': '/card-usage/heroes',
  '/tier-list/diamond': '/card-usage/diamond',
  '/tier-list/platinum': '/card-usage/platinum',
  '/tier-list/gold': '/card-usage/gold',
  '/tier-list/silver': '/card-usage/silver',
  '/tier-list/bronze': '/card-usage/bronze',
  '/tier-list/iron': '/card-usage/iron',
  '/tier-list/starters': '/card-usage/starters',
}

const PERMALINKS = {
  '/guides': '/guides/essentials',
  '/patch-notes': '/api/patch-notes',
  '/rr': '/guides/reckless-rush',
}

const SANITY_STUDIO =
  VERCEL_ENV === 'development'
    ? 'localhost:3333'
    : 'stormbound-kitty.sanity.studio'

const toRedirect = ([source, destination]) => ({
  source,
  destination,
  permanent: true,
})

const wrapConfig =
  (...wrappers) =>
  configuration =>
    wrappers.reduceRight((config, wrapper) => wrapper(config), configuration)

module.exports = wrapConfig(
  withBundleAnalyzer({ enabled: process.env.WEBPACK_BUNDLE_ANALYZER === '1' }),
)({
  // Disable x-powered-by header
  // Ref: https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
  poweredByHeader: false,

  // Enable React strict mode
  // Ref: https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  // Remove `data-testid` attributes in production
  // Ref: https://nextjs.org/docs/advanced-features/compiler#remove-react-properties
  compiler: { reactRemoveProperties: VERCEL_ENV === 'production' },

  env: {
    // Expose the Vercel environment to the client
    // Ref: https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    NEXT_PUBLIC_VERCEL_ENV: VERCEL_ENV,
  },

  // Allow Sanity CDN to be used with next/image
  // Ref: https://nextjs.org/docs/basic-features/image-optimization#domains
  images: { domains: ['cdn.sanity.io'] },

  // Set up the legacy and permalink redirects
  // Ref: https://nextjs.org/docs/api-reference/next.config.js/redirects
  async redirects() {
    return [
      ...Object.entries(LEGACY_PATHS).map(toRedirect),
      ...Object.entries(PERMALINKS).map(toRedirect),
    ]
  },

  // Set up the right headers for all resources
  // Ref: https://nextjs.org/docs/api-reference/next.config.js/headers
  // Ref: https://nextjs.org/docs/advanced-features/security-headers
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
      'frame-ancestors': [/* preview mode */ SANITY_STUDIO],
      'frame-src': [/* Brewed Sages podcast player */ 'www.podbean.com'],
      'img-src': ['data:', /* custom card images */ '*'],
      'manifest-src': [SELF],
      'media-src': [NONE],
      'object-src': [NONE],
      'script-src': [
        SELF,
        /* Next.js rehydration */ UNSAFE_INLINE,
        /* react-refresh */ VERCEL_ENV === 'development' ? UNSAFE_EVAL : '',
        /* Vercel Analytics */ 'va.vercel-scripts.com',
      ],
      'style-src': [/* react-tooltip styles */ SELF, UNSAFE_INLINE],
      'worker-src': [NONE],
    }
    const ContentSecurityPolicy = Object.entries(directives)
      .map(([key, values]) => `${key} ${values.filter(Boolean).join(' ')}`)
      .join('; ')

    return [
      {
        source: '/:path*',
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
          {
            key: 'Permissions-Policy',
            value:
              'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(*), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(self), xr-spatial-tracking=(), clipboard-read=(self), clipboard-write=(self), gamepad=(), speaker-selection=(), conversion-measurement=(), hid=()',
          },
        ],
      },
      {
        source: '/:path*(woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*(svg|jpg|png|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/manifest.json',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800',
          },
          {
            key: 'Content-Type',
            value: 'application/manifest+json; charset=utf-8',
          },
        ],
      },
      {
        source: '/focus-visible.min.js',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ]
  },

  // Customize the webpack configuration to support SVG imports
  // Ref: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: {} }],
    })

    return config
  },
})
