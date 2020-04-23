import battleSimDraw from './commands/battleSimDraw'
import drCycle from './commands/drCycle'
import drDrawHand from './commands/drDrawHand'
import drEndTurn from './commands/drEndTurn'
import drPlay from './commands/drPlay'
import drSelect from './commands/drSelect'
import fill from './commands/fill'

Cypress.Commands.add('battleSimDraw', { prevSubject: false }, battleSimDraw)
Cypress.Commands.add('drCycle', { prevSubject: false }, drCycle)
Cypress.Commands.add('drDrawHand', { prevSubject: false }, drDrawHand)
Cypress.Commands.add('drEndTurn', { prevSubject: false }, drEndTurn)
Cypress.Commands.add('drPlay', { prevSubject: false }, drPlay)
Cypress.Commands.add('drSelect', { prevSubject: false }, drSelect)
Cypress.Commands.add('fill', { prevSubject: 'optional' }, fill)
