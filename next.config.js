module.exports = {
  staticPageGenerationTimeout: 90,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
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
      { source: '/donate', destination: '/about', permanent: true },
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
}
