import battleSimDraw from './commands/battleSimDraw'
import fill from './commands/fill'

Cypress.Commands.add('battleSimDraw', { prevSubject: false }, battleSimDraw)
Cypress.Commands.add('fill', { prevSubject: 'optional' }, fill)
