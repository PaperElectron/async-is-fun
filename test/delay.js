/**
 * @file delay
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const tap = require('tap')
const delay = require('../src/delay')
const indexDelay = require('../index').delay


tap.test('Delays n ms before resolving', (t) => {

  let timeout = 250
  let start

  return Promise.resolve(100)
    .then((result) => {
      start = process.hrtime()
      return result
    })
    .then((res) => {
      return delay(timeout, res + res)
    })
    .then((result) => {
      let end = process.hrtime(start)
      t.ok(end[1]/1e6 >= timeout, 'Delays for the timeout value or greater.')
      t.notOk(end[0], 'Took 0 seconds')
      t.equal(result, 200)
    })

})

tap.test('Delays n ms before resolving in a chain.', (t) => {

  let timeout = 250
  let start

  return Promise.resolve(100)
    .then((result) => {
      start = process.hrtime()
      return result
    })
    .then(indexDelay(timeout))
    .then((result) => {
      let end = process.hrtime(start)
      t.ok(end[1]/1e6 >= timeout, 'Delays for the timeout value or greater.')
      t.notOk(end[0], 'Took 0 seconds')
      t.equal(result, 100)
    })

})