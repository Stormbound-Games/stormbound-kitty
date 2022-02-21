import member from './types/member'
import date from './types/date'

const deck = {
  title: 'Deck',
  name: 'deck',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'ID',
      name: 'id',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    member,
    date,
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      options: { sortable: false },
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Starter', value: 'STARTER' },
              { title: 'Regular', value: 'REGULAR' },
              { title: 'High Levels', value: 'HIGH_LEVELS' },
              { title: 'Equals', value: 'EQUALS' },
              { title: 'Brawl', value: 'BRAWL' },
              { title: 'Casual', value: 'CASUAL' },
              { title: 'Warrior', value: 'WARRIOR' },
              { title: 'Ultimate', value: 'ULTIMATE' },
              { title: 'Rush', value: 'RUSH' },
              { title: 'Midrange', value: 'MIDRANGE' },
              { title: 'Control', value: 'CONTROL' },
              { title: 'Dwarves -2 mana', value: 'DWARF_MANA' },
              { title: 'Pirates -2 mana', value: 'PIRATE_MANA' },
              { title: 'Raven +1 movement', value: 'RAVEN_MOVEMENT' },
              { title: 'Structures =2 mana', value: 'STRUCTURE_MANA' },
              { title: 'Rodents +3 strength', value: 'RODENT_STRENGTH' },
              { title: 'Pirates =2 movement', value: 'PIRATE_MOVEMENT' },
              { title: 'Felines +2 strength', value: 'FELINE_STRENGTH' },
              { title: 'Satyrs +1 movement', value: 'SATYR_MOVEMENT' },
              { title: 'Spells -2 mana', value: 'SPELL_MANA' },
              { title: 'Frostlings +4 strength', value: 'FROSTLING_STRENGTH' },
              { title: 'Toads =2 mana', value: 'TOAD_MANA' },
              { title: 'Elders +3 strength', value: 'ELDER_STRENGTH' },
              { title: 'Construct =2 movement', value: 'CONSTRUCT_MOVEMENT' },
              { title: 'Knights -2 mana', value: 'KNIGHT_MANA' },
              { title: 'Dragons +1 movement', value: 'DRAGON_MOVEMENT' },
              { title: 'Undead +2 strength', value: 'UNDEAD_STRENGTH' },
              { title: 'Heroes +3 strength', value: 'HERO_STRENGTH' },
              { title: 'Pure Amalgamation', value: 'PURE_AMALGAMATION' },
              { title: 'Fight of Threes', value: 'FIGHTS_OF_THREES' },
              { title: 'Thin No Man’s Land', value: 'THIN_NO_MANS_LAND' },
              { title: 'Stunning Attack', value: 'STUNNING_ATTACK' },
              { title: 'Reserve Management', value: 'RESERVE_MANAGEMENT' },
              { title: 'Chaos Unleashed', value: 'CHAOS_UNLEASHED' },
              { title: 'Steady Growth', value: 'STEADY_GROWTH' },
              { title: 'The Great Mill', value: 'THE_GREAT_MILL' },
            ],
          },
          validation: Rule => Rule.required(),
        },
      ],
      validation: Rule => Rule.required().min(1),
    },
    { ...date, title: 'Nerf date', name: 'nerfed', validation: undefined },
  ],
}

export default deck
