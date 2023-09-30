import { SlashCommandBuilder } from 'discord.js'
import arrayRandom from '#helpers/arrayRandom'
import getEmbed from '#helpers/getEmbed'

const getChunks = cards => {
  const starts = []
  const ends = []
  const names = []

  cards.forEach(card => {
    // Discard card names that include the word “Token” since it makes for weird
    // mashups. The check is made on the name instead of the `token` property on
    // purpose since it’s what we care about here.
    if (card.name.toLowerCase().includes('token')) return

    names.push(card.name)

    const [start, ...rest] = card.name.split(/\s+/g)
    if (rest.length === 0) {
      ends.push(start)
    } else {
      starts.push(start.replace(/,/g, ''))
      ends.push(rest.join(' '))
    }
  })

  return [starts, ends, names]
}

const getRandomCardName = cards => {
  const [STARTS, ENDS, NAMES] = getChunks(cards)
  const start = arrayRandom(STARTS)
  const end = arrayRandom(ENDS)
  const name = start + ' ' + end

  return NAMES.includes(name) ? getRandomCardName(cards) : name
}

const mashup = {
  data: new SlashCommandBuilder()
    .setName('mashup')
    .setDescription('Randomly generate a random card name from existing ones.'),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const cards = [...client.cards.values()]
    const embed = getEmbed()
      .setTitle('🤪 Card Mashup')
      .setDescription(`Here is your mashup: **${getRandomCardName(cards)}**`)

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default mashup
