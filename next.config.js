const withPlugins = require('next-compose-plugins')
const { withPlausibleProxy } = require('next-plausible')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const plugins = [
  withPlausibleProxy(),
  withBundleAnalyzer({
    enabled: process.env.WEBPACK_BUNDLE_ANALYZER === '1',
  }),
]

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
      {
        source: '/patch-notes',
        destination: '/api/patch-notes',
        permanent: true,
      },
      {
        source: '/deck/suggestions',
        destination: '/deck/featured',
        permanent: true,
      },
      {
        source: '/guides/equals-intro',
        destination: '/guides/equals',
        permanent: true,
      },
      { source: '/rr', destination: '/guides/reckless-rush', permanent: true },
      { source: '/guides', destination: '/guides/essentials', permanent: true },
      { source: '/guides/lexicon', destination: '/lexicon', permanent: true },
      {
        source: '/guides/known-bugs',
        destination: '/known-bugs',
        permanent: true,
      },
      {
        source: '/list/ranked/display',
        destination: '/list/ranked',
        permanent: true,
      },
      {
        source: '/list/equals/display',
        destination: '/list/equals',
        permanent: true,
      },
      {
        source: '/collection/books',
        destination: '/calculators/books',
        permanent: true,
      },
      {
        source: '/income-calculator',
        destination: '/calculators/income',
        permanent: true,
      },
      {
        source: '/changelog/releases',
        destination: '/releases',
        permanent: true,
      },
      {
        source: '/changelog/cards',
        destination: '/changelog',
        permanent: true,
      },
      {
        source: '/changelog/:id*',
        destination: '/releases/:id*',
        permanent: true,
      },
      { source: '/donate', destination: '/contribute', permanent: true },
      {
        source: '/member/:id*',
        destination: '/members/:id*',
        permanent: true,
      },
      {
        source: '/sim/:id*',
        destination: '/simulators/battle/:id*',
        permanent: true,
      },
      {
        source: '/fan-kit/wallpapers',
        destination: '/fan-kit/wallpapers/desktop',
        permanent: true,
      },
      {
        source: '/releases/end-of-2020',
        destination: '/releases/01-2021',
        permanent: true,
      },
      {
        source: '/card/contest',
        destination: '/swcc',
        permanent: true,
      },
    ]
  },
  async headers() {
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
