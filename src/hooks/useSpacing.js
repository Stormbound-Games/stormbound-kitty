import { SPACING_TOKENS } from '~/constants/styles'

export const expandSpacingValue = value => {
  if (typeof value === 'string') {
    return expandSpacingValue({ all: value })
  }

  const { top, right, bottom, left, vertical, horizontal, all } = value

  return [
    top || vertical || all,
    right || horizontal || all,
    bottom || vertical || all,
    left || horizontal || all,
  ]
}

const resolveToken = value => {
  if (Array.isArray(value)) {
    return value.map(resolveToken)
  }

  return SPACING_TOKENS[value]
}

const useSpacing = (value = {}, spacingProp = 'margin') => {
  const [top, right, bottom, left] = expandSpacingValue(value).map(resolveToken)

  return {
    [spacingProp + 'Top']: top,
    [spacingProp + 'Right']: right,
    [spacingProp + 'Bottom']: bottom,
    [spacingProp + 'Left']: left,
  }
}

export default useSpacing
