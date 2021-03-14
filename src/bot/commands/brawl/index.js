import { formatPreciseDate } from '../../../helpers/formatDate'
import { getLastWeekDay, getNextWeekDay } from '../../../helpers/getWeekDay'
import getBrawlDescription from '../../../helpers/getBrawlDescription'
import getBrawlInformation from '../../../helpers/getBrawlInformation'
import getEmbed from '../../../helpers/getEmbed'
import isBrawlRunning from '../../../helpers/isBrawlRunning'
import { BRAWLS } from '../../../constants/brawl'

const getBrawl = message => {
  const date = new Date()
  // To try another day and/or hours:
  // date.setDate(date.getDate() + 4)
  // date.setHours(3)
  const options = {
    date,
    skipToday: isBrawlRunning(date),
    startOfDay: true,
    endOfDay: true,
  }

  if (message === 'next' || message === 'upcoming') {
    return getBrawlInformation(getNextWeekDay('THURSDAY', options))
  }

  if (message === 'prev' || message === 'previous') {
    return getBrawlInformation(getLastWeekDay('MONDAY', options))
  }

  return getBrawlInformation(date)
}

export default {
  command: 'brawl',
  label: '⚔️  Brawl',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/brawl')
      .setDescription(
        `Get some information on the current and upcoming brawls. For instance, \`!${this.command} list\` to list all brawls or \`!${this.command} current|next|previous\` for near brawls.`
      )
  },
  handler: function (message) {
    const embed = getEmbed().setURL('https://stormbound-kitty.com/brawl')

    if (message === 'list') {
      return embed
        .setTitle(`${this.label}: list`)
        .setDescription(
          'Find all Brawls, a tracker and a calculator on Stormbound-kitty.com!'
        )
        .addFields(
          ...BRAWLS.map(brawl => ({
            name: brawl.title,
            value: brawl.label,
            inline: true,
          }))
        )
    }

    const { start, end, ...brawl } = getBrawl(message) || {}

    if (!brawl.id) {
      return embed
        .setTitle(`${this.label}: current`)
        .setDescription(
          `There is currently no ongoing Brawl. Try \`${this.command} next\`.`
        )
        .setURL('https://stormbound-kitty.com/brawl')
    }

    const description = getBrawlDescription(brawl.id).replace(/\*/g, '**')
    const slug = brawl.id.toLowerCase().replace(/_/g, '-')
    const isRunning =
      !['next', 'prev', 'previous', 'upcoming'].includes(message) &&
      isBrawlRunning()

    return embed
      .setTitle(`${this.label}: ${brawl.title}`)
      .setDescription(description)
      .addField('Start date', formatPreciseDate(start), true)
      .addField('End date', formatPreciseDate(end), true)
      .addField('Active', isRunning ? 'Yes' : 'No', true)
      .setURL('https://stormbound-kitty.com/brawl/' + slug)
  },
}
