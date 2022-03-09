const useSelectStyles = ({ noBorder, withClear } = {}) => {
  return {
    input: provided => ({ ...provided, color: 'var(--white)' }),

    // The dropdown indicator and its separator are a little superfluous
    // and can be safely hidden at all time.
    dropdownIndicator: () => ({ display: 'none' }),
    indicatorSeparator: () => ({ display: 'none' }),

    singleValue: provided => ({
      ...provided,
      color: 'var(--white)',
      cursor: 'pointer',

      // The border color is usually tweaked to indicated interactivity but
      // it is not an option when there is no border.
      ...(noBorder && { ':hover': { color: 'var(--beige)' } }),
    }),

    valueContainer: (provided, { isDisabled }) => ({
      ...provided,
      opacity: isDisabled ? 0.5 : 1,
      cursor: isDisabled ? 'not-allowed' : undefined,
      lineHeight: 'inherit',
      paddingTop: '0.4em',
      paddingBottom: '0.4em',
      // When rendered without a border, it looks slightly better without
      // the  horizontal padding.
      paddingLeft: noBorder ? 0 : provided.paddingLeft,
      paddingRight: noBorder ? 0 : provided.paddingRight,
    }),

    clearIndicator: (provided, data) => ({
      ...provided,
      color: 'var(--white)',
      // If there is no chosen value, the clear button can be safely masked.
      display:
        !data.selectProps.value || !withClear ? 'none' : provided.display,
      cursor: 'pointer',
      ':hover': { color: 'var(--beige)' },
    }),

    control: (provided, { isFocused, selectProps }) => ({
      ...provided,

      // When there is no border, the width of the field should adapt to the
      // currently selected value.
      width: noBorder
        ? `calc(${selectProps.value.label.length}ch + ${
            selectProps.value.id ? '25px' : 0
          })`
        : provided.width,
      backgroundColor: 'transparent',
      color: 'var(--white)',
      boxShadow: 'none',

      ...(noBorder
        ? {
            borderColor: 'transparent',
            ':hover': { borderColor: 'transparent' },
          }
        : {
            borderColor: '#ded7a480',
            ':hover': { borderColor: '#ded7a480' },
            outline: isFocused
              ? ['auto 2px Highlight', 'auto 5px -webkit-focus-ring-color']
              : provided.outline,
          }),
    }),

    menu: provided => ({
      ...provided,
      zIndex: 20,
      backgroundColor: 'var(--dark-blue)',
    }),

    groupHeading: provided => ({ ...provided, color: 'var(--beige)' }),

    option: (provided, { data, isFocused, isDisabled }) => ({
      ...provided,
      ':active': {
        backgroundColor: isDisabled ? 'transparent' : 'var(--green)',
      },
      color: 'var(--white)',
      background: `url("/assets/images/card/rarity_${
        data.rarity || 'common'
      }_4.png") ${
        isFocused ? 'var(--light-blue)' : 'transparent'
      } no-repeat center left 1em`,
      opacity: isDisabled ? 0.7 : 1,
      backgroundSize: '0.75em',
      paddingLeft: '2.5em',
    }),

    multiValueLabel: provided => ({
      ...provided,
      color: 'var(--beige)',
      backgroundColor: 'var(--black)',
      border: '1px solid',
      borderRadius: '0.2em',
      paddingRight: '0.5em',
    }),

    multiValueRemove: provided => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'var(--beige)',
      color: 'var(--black)',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    }),
  }
}

export default useSelectStyles
