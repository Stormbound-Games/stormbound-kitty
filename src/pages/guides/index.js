export async function getStaticProps() {
  return { redirect: { destination: '/guides/essentials', permanent: false } }
}

export default () => null
