import serialisation from './serialisation'

export default {
  serialise: cards => window.btoa(serialisation.cards.serialise(cards)),
  deserialise: hash => serialisation.cards.deserialise(window.atob(hash)),
}
