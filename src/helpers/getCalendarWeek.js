export default () => {
  const year = new Date(new Date().getFullYear(), 0, 1)

  return Math.ceil(((new Date() - year) / 86400000 + year.getDay() + 1) / 7)
}
