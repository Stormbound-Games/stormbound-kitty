module.exports = (on, config) => {
  require('cypress-react-unit-test/plugins/react-scripts')(on, config)

  return config
}
