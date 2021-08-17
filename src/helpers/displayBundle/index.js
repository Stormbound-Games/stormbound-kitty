import getRewardLabel from '~/helpers/getRewardLabel'

const displayBundle = value => {
  const keys = Object.keys(value)
  let tree = null

  keys.forEach((reward, index) => {
    const amount = value[reward]
    const content = getRewardLabel({ reward, amount }, true)
    const isLast = index === keys.length - 1
    tree = !tree ? (
      content
    ) : (
      <>
        {tree}
        {isLast ? ' and' : ','} {content}
      </>
    )
  })

  return tree
}

export default displayBundle
