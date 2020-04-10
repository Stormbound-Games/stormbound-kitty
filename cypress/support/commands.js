import draw from './commands/draw'
import fill from './commands/fill'

Cypress.Commands.add('draw', { prevSubject: false }, draw)
Cypress.Commands.add('fill', { prevSubject: 'optional' }, fill)
