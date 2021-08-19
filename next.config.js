module.exports = {
  async redirects() {
    return [
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
    ]
  },
}
